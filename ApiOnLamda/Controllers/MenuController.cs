using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiOnLamda.Model;

namespace ApiOnLamda.Controllers
{
    [Route("api/menuitems")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly string _connectionString;

        public MenuController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        // Helper function to build the nested menu structure (for frontend display)
        private List<MenuItem> BuildNestedMenu(List<MenuItemRaw> items, int? parentId)
        {
            return items
                .Where(item => item.ParentMenuItemId == parentId)
                .OrderBy(item => item.DisplayOrder ?? int.MaxValue)
                .Select(item => new MenuItem
                {
                    MenuItemId = item.MenuItemId,
                    ParentMenuItemId = item.ParentMenuItemId,
                    title = item.Title,
                    handle = item.Handle,
                    href = item.Link,
                    target = item.Target,
                    rel = item.Rel,
                    ariaDescribedby = item.AriaDescribedBy,
                    label = string.IsNullOrEmpty(item.LabelText) ? null : new Model.Label
                    {
                        text = item.LabelText,
                        style = string.IsNullOrEmpty(item.LabelColor) ? null : new Dictionary<string, string> { { "backgroundColor", item.LabelColor } }
                    },
                    image = string.IsNullOrEmpty(item.ImageSrc) ? null : new Model.Image
                    {
                        src = item.ImageSrc,
                        style = string.IsNullOrEmpty(item.ImageStyle) ? null : JsonConvert.DeserializeObject<Dictionary<string, string>>(item.ImageStyle),
                        alt = item.ImageAlt
                    },
                    children = BuildNestedMenu(items.Where(i => i.MenuItemId != item.MenuItemId).ToList(), item.MenuItemId)
                })
                .ToList();
        }

        // ... (GetMenuItemsRaw and GetMenuNested methods remain the same) ...
        [HttpGet("nested")]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuNested()
        {
            List<MenuItemRaw> rawMenuItems = new List<MenuItemRaw>();
            using (SqlConnection connection = GetConnection())
            {
                try
                {
                    await connection.OpenAsync();
                    string sql = @"
                        SELECT
                            MenuItemId, Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor,
                            ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder
                        FROM
                            dbo.MenuItems
                        ORDER BY
                            DisplayOrder ASC;";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            rawMenuItems.Add(new MenuItemRaw
                            {
                                MenuItemId = reader.GetInt32(reader.GetOrdinal("MenuItemId")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Handle = reader.IsDBNull(reader.GetOrdinal("Handle")) ? null : reader.GetString(reader.GetOrdinal("Handle")),
                                ParentMenuItemId = reader.IsDBNull(reader.GetOrdinal("ParentMenuItemId")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("ParentMenuItemId")),
                                Link = reader.IsDBNull(reader.GetOrdinal("Link")) ? null : reader.GetString(reader.GetOrdinal("Link")),
                                LabelText = reader.IsDBNull(reader.GetOrdinal("LabelText")) ? null : reader.GetString(reader.GetOrdinal("LabelText")),
                                LabelColor = reader.IsDBNull(reader.GetOrdinal("LabelColor")) ? null : reader.GetString(reader.GetOrdinal("LabelColor")),
                                ImageSrc = reader.IsDBNull(reader.GetOrdinal("ImageSrc")) ? null : reader.GetString(reader.GetOrdinal("ImageSrc")),
                                ImageStyle = reader.IsDBNull(reader.GetOrdinal("ImageStyle")) ? null : reader.GetString(reader.GetOrdinal("ImageStyle")),
                                ImageAlt = reader.IsDBNull(reader.GetOrdinal("ImageAlt")) ? null : reader.GetString(reader.GetOrdinal("ImageAlt")),
                                Target = reader.IsDBNull(reader.GetOrdinal("Target")) ? null : reader.GetString(reader.GetOrdinal("Target")),
                                Rel = reader.IsDBNull(reader.GetOrdinal("Rel")) ? null : reader.GetString(reader.GetOrdinal("Rel")),
                                AriaDescribedBy = reader.IsDBNull(reader.GetOrdinal("AriaDescribedBy")) ? null : reader.GetString(reader.GetOrdinal("AriaDescribedBy")),
                                DisplayOrder = reader.IsDBNull(reader.GetOrdinal("DisplayOrder")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("DisplayOrder"))
                            });
                        }
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine($"SQL Error: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Database error fetching nested menu items: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Generic Error: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"An unexpected error occurred: {ex.Message}");
                }
            }

            var nestedMenu = BuildNestedMenu(rawMenuItems, null);
            return Ok(nestedMenu);
        }

        // POST: api/menuitems
        [HttpPost]
        public async Task<ActionResult<MenuItemRaw>> PostMenuItem([FromBody] MenuItemRaw menuItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Define what constitutes a "duplicate".
            // For a menu item, 'Title' is a common candidate for uniqueness.
            // You might also consider 'Handle' or a combination of 'Title' and 'ParentMenuItemId'
            // if you allow the same title under different parents.
            string uniqueCheckColumn = "Title"; // Or "Handle", or both

            using (SqlConnection connection = GetConnection())
            {
                try
                {
                    await connection.OpenAsync();

                    // --- Duplicate Check ---
                    string checkDuplicateSql = $"SELECT COUNT(*) FROM dbo.MenuItems WHERE {uniqueCheckColumn} = @Value;";
                    using (SqlCommand checkCommand = new SqlCommand(checkDuplicateSql, connection))
                    {
                        // Use the appropriate property of menuItem for the check
                        checkCommand.Parameters.AddWithValue("@Value", menuItem.Title); // Assuming 'Title' is your unique field

                        int existingCount = (int)await checkCommand.ExecuteScalarAsync();
                        if (existingCount > 0)
                        {
                            // A menu item with the same title already exists
                            return Conflict($"A menu item with the title '{menuItem.Title}' already exists.");
                        }
                    }
                    // --- End Duplicate Check ---



                    string sql = @"
                        INSERT INTO dbo.MenuItems (
                            Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor,
                            ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder
                        ) VALUES (
                            @Title, @Handle, @ParentMenuItemId, @Link, @LabelText, @LabelColor,
                            @ImageSrc, @ImageStyle, @ImageAlt, @Target, @Rel, @AriaDescribedBy, @DisplayOrder
                        );
                        SELECT SCOPE_IDENTITY();";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@Title", menuItem.Title);
                        command.Parameters.AddWithValue("@Handle", (object)menuItem.Handle ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ParentMenuItemId", (object)menuItem.ParentMenuItemId ?? DBNull.Value);
                        command.Parameters.AddWithValue("@Link", (object)menuItem.Link ?? DBNull.Value);
                        command.Parameters.AddWithValue("@LabelText", (object)menuItem.LabelText ?? DBNull.Value);
                        command.Parameters.AddWithValue("@LabelColor", (object)menuItem.LabelColor ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ImageSrc", (object)menuItem.ImageSrc ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ImageStyle", (object)menuItem.ImageStyle ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ImageAlt", (object)menuItem.ImageAlt ?? DBNull.Value);
                        command.Parameters.AddWithValue("@Target", (object)menuItem.Target ?? DBNull.Value);
                        command.Parameters.AddWithValue("@Rel", (object)menuItem.Rel ?? DBNull.Value);
                        command.Parameters.AddWithValue("@AriaDescribedBy", (object)menuItem.AriaDescribedBy ?? DBNull.Value);
                        command.Parameters.AddWithValue("@DisplayOrder", (object)menuItem.DisplayOrder ?? DBNull.Value);

                        int newId = Convert.ToInt32(await command.ExecuteScalarAsync());
                        menuItem.MenuItemId = newId;

                        return CreatedAtAction(nameof(GetMenuItemById), new { id = newId }, menuItem);
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine($"SQL Error during PostMenuItem: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Database error creating menu item: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Generic Error during PostMenuItem: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"An unexpected error occurred: {ex.Message}");
                }
            }
        }

        // ... (GetMenuItemById, PutMenuItem, and DeleteMenuItem methods remain the same) ...
    


// GET: api/menuitems/{id}
[HttpGet("{id}")]
        public async Task<ActionResult<MenuItemRaw>> GetMenuItemById(int id)
        {
            MenuItemRaw menuItem = null;
            using (SqlConnection connection = GetConnection())
            {
                try
                {
                    await connection.OpenAsync();
                    string sql = @"
                        SELECT
                            MenuItemId, Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor,
                            ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder
                        FROM
                            dbo.MenuItems
                        WHERE
                            MenuItemId = @MenuItemId;";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@MenuItemId", id);
                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                menuItem = new MenuItemRaw
                                {
                                    MenuItemId = reader.GetInt32(reader.GetOrdinal("MenuItemId")),
                                    Title = reader.GetString(reader.GetOrdinal("Title")),
                                    Handle = reader.IsDBNull(reader.GetOrdinal("Handle")) ? null : reader.GetString(reader.GetOrdinal("Handle")),
                                    ParentMenuItemId = reader.IsDBNull(reader.GetOrdinal("ParentMenuItemId")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("ParentMenuItemId")),
                                    Link = reader.IsDBNull(reader.GetOrdinal("Link")) ? null : reader.GetString(reader.GetOrdinal("Link")),
                                    LabelText = reader.IsDBNull(reader.GetOrdinal("LabelText")) ? null : reader.GetString(reader.GetOrdinal("LabelText")),
                                    LabelColor = reader.IsDBNull(reader.GetOrdinal("LabelColor")) ? null : reader.GetString(reader.GetOrdinal("LabelColor")),
                                    ImageSrc = reader.IsDBNull(reader.GetOrdinal("ImageSrc")) ? null : reader.GetString(reader.GetOrdinal("ImageSrc")),
                                    ImageStyle = reader.IsDBNull(reader.GetOrdinal("ImageStyle")) ? null : reader.GetString(reader.GetOrdinal("ImageStyle")),
                                    ImageAlt = reader.IsDBNull(reader.GetOrdinal("ImageAlt")) ? null : reader.GetString(reader.GetOrdinal("ImageAlt")),
                                    Target = reader.IsDBNull(reader.GetOrdinal("Target")) ? null : reader.GetString(reader.GetOrdinal("Target")),
                                    Rel = reader.IsDBNull(reader.GetOrdinal("Rel")) ? null : reader.GetString(reader.GetOrdinal("Rel")),
                                    AriaDescribedBy = reader.IsDBNull(reader.GetOrdinal("AriaDescribedBy")) ? null : reader.GetString(reader.GetOrdinal("AriaDescribedBy")),
                                    DisplayOrder = reader.IsDBNull(reader.GetOrdinal("DisplayOrder")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("DisplayOrder"))
                                };
                            }
                        }
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine($"SQL Error during GetMenuItemById: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Database error fetching menu item: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Generic Error during GetMenuItemById: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"An unexpected error occurred: {ex.Message}");
                }
            }

            if (menuItem == null)
            {
                return NotFound();
            }
            return Ok(menuItem);
        }

        // PUT: api/menuitems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItem(int id, [FromBody] MenuItemRaw menuItem)
        {
            if (id != menuItem.MenuItemId)
            {
                return BadRequest("MenuItemId in URL does not match body.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (SqlConnection connection = GetConnection())
            {
                try
                {
                    await connection.OpenAsync();

                    // --- DUPLICATE CHECK FOR UPDATE ---
                    // Check for duplicate Title for the same parent, excluding the current item being updated
                    string checkDuplicateSql = @"
                        SELECT COUNT(*)
                        FROM dbo.MenuItems
                        WHERE Title = @Title
                        AND (@ParentMenuItemId IS NULL AND ParentMenuItemId IS NULL OR ParentMenuItemId = @ParentMenuItemId)
                        AND MenuItemId != @CurrentMenuItemId;"; // Exclude the item being edited

                    using (SqlCommand checkCommand = new SqlCommand(checkDuplicateSql, connection))
                    {
                        checkCommand.Parameters.AddWithValue("@Title", menuItem.Title);
                        checkCommand.Parameters.AddWithValue("@ParentMenuItemId", (object)menuItem.ParentMenuItemId ?? DBNull.Value);
                        checkCommand.Parameters.AddWithValue("@CurrentMenuItemId", menuItem.MenuItemId);

                        int existingCount = (int)await checkCommand.ExecuteScalarAsync();
                        if (existingCount > 0)
                        {
                            return Conflict($"A menu item with the title '{menuItem.Title}' already exists under this parent (or as a root item).");
                        }
                    }
                    // --- END DUPLICATE CHECK FOR UPDATE ---


                    string sql = @"
                        UPDATE dbo.MenuItems SET
                            Title = @Title,
                            Handle = @Handle,
                            ParentMenuItemId = @ParentMenuItemId,
                            Link = @Link,
                            LabelText = @LabelText,
                            LabelColor = @LabelColor,
                            ImageSrc = @ImageSrc,
                            ImageStyle = @ImageStyle,
                            ImageAlt = @ImageAlt,
                            Target = @Target,
                            Rel = @Rel,
                            AriaDescribedBy = @AriaDescribedBy,
                            DisplayOrder = @DisplayOrder
                        WHERE MenuItemId = @MenuItemId;";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@MenuItemId", menuItem.MenuItemId);
                        command.Parameters.AddWithValue("@Title", menuItem.Title);
                        command.Parameters.AddWithValue("@Handle", (object)menuItem.Handle ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ParentMenuItemId", (object)menuItem.ParentMenuItemId ?? DBNull.Value);
                        command.Parameters.AddWithValue("@Link", (object)menuItem.Link ?? DBNull.Value);
                        command.Parameters.AddWithValue("@LabelText", (object)menuItem.LabelText ?? DBNull.Value);
                        command.Parameters.AddWithValue("@LabelColor", (object)menuItem.LabelColor ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ImageSrc", (object)menuItem.ImageSrc ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ImageStyle", (object)menuItem.ImageStyle ?? DBNull.Value);
                        command.Parameters.AddWithValue("@ImageAlt", (object)menuItem.ImageAlt ?? DBNull.Value);
                        command.Parameters.AddWithValue("@Target", (object)menuItem.Target ?? DBNull.Value);
                        command.Parameters.AddWithValue("@Rel", (object)menuItem.Rel ?? DBNull.Value);
                        command.Parameters.AddWithValue("@AriaDescribedBy", (object)menuItem.AriaDescribedBy ?? DBNull.Value);
                        command.Parameters.AddWithValue("@DisplayOrder", (object)menuItem.DisplayOrder ?? DBNull.Value);

                        int rowsAffected = await command.ExecuteNonQueryAsync();

                        if (rowsAffected == 0)
                        {
                            return NotFound($"Menu item with ID {id} not found.");
                        }
                        return NoContent();
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine($"SQL Error during PutMenuItem: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Database error updating menu item: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Generic Error during PutMenuItem: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"An unexpected error occurred: {ex.Message}");
                }
            }
        }

        // DELETE: api/menuitems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            using (SqlConnection connection = GetConnection())
            {
                try
                {
                    await connection.OpenAsync();

                    // Prevent deletion if children exist
                    string checkChildrenSql = "SELECT COUNT(*) FROM dbo.MenuItems WHERE ParentMenuItemId = @MenuItemId;";
                    using (SqlCommand checkCmd = new SqlCommand(checkChildrenSql, connection))
                    {
                        checkCmd.Parameters.AddWithValue("@MenuItemId", id);
                        int childCount = (int)await checkCmd.ExecuteScalarAsync();
                        if (childCount > 0)
                        {
                            return Conflict($"Cannot delete menu item with ID {id} because it has {childCount} child menu items. Delete children first.");
                        }
                    }

                    // Prevent deletion if products are linked to this MenuItemId
                    string checkProductsSql = "SELECT COUNT(*) FROM dbo.Products WHERE MenuItemId = @MenuItemId;";
                    using (SqlCommand checkCmd = new SqlCommand(checkProductsSql, connection))
                    {
                        checkCmd.Parameters.AddWithValue("@MenuItemId", id);
                        int productCount = (int)await checkCmd.ExecuteScalarAsync();
                        if (productCount > 0)
                        {
                            return Conflict($"Cannot delete menu item with ID {id} because it is linked to {productCount} products. Reassign or delete products first.");
                        }
                    }

                    string sql = "DELETE FROM dbo.MenuItems WHERE MenuItemId = @MenuItemId;";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@MenuItemId", id);
                        int rowsAffected = await command.ExecuteNonQueryAsync();

                        if (rowsAffected == 0)
                        {
                            return NotFound($"Menu item with ID {id} not found.");
                        }
                        return NoContent();
                    }
                }
                catch (SqlException ex)
                {
                    Console.WriteLine($"SQL Error during DeleteMenuItem: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Database error deleting menu item: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Generic Error during DeleteMenuItem: {ex.Message}");
                    return StatusCode(StatusCodes.Status500InternalServerError, $"An unexpected error occurred: {ex.Message}");
                }
            }
        }
    }
}