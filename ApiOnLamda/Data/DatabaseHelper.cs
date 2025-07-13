using System.Data;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using ApiOnLamda.Model;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using static System.Net.Mime.MediaTypeNames;
using System.Globalization;
using Dapper;
using Google.Apis.Auth;
using log4net;
using Microsoft.AspNetCore.Connections;

//using Microsoft.SqlServer.Dac.Model;
namespace ApiOnLamda.Data
{


    public class DatabaseHelper
    {
        //private readonly IConfiguration _configuration;
        //private readonly string _connectionString;


        //public DatabaseHelper(IConfiguration configuration)
        //{
        //    _configuration = configuration;
        //    _connectionString = _configuration.GetConnectionString("DefaultConnection");
        //}
        private readonly string _connectionString;

        public DatabaseHelper(string connectionString)
        {
            _connectionString = connectionString;
        }
        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        // Example Method for Adding User
        public async Task<int> AddUser(User user)
        {
            using (var connection = GetConnection())
            {
                var command = new SqlCommand("INSERT INTO Users (Name, Email, Password, Date,Role) VALUES (@Name, @Email, @Password, @Date,@Role); SELECT SCOPE_IDENTITY();", connection);
                command.Parameters.AddWithValue("@Name", user.Name);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@Password", user.Password);
                command.Parameters.AddWithValue("@Date", user.Date);
                command.Parameters.AddWithValue("@Role", user.Role);

                await connection.OpenAsync();
                var result = await command.ExecuteScalarAsync();
                return Convert.ToInt32(result);
            }
        }

        // Method for user login (to retrieve user by email)
        public async Task<User> GetUserByEmail(string Email)
        {
            using (var connection = GetConnection())
            {
                var command = new SqlCommand("SELECT * FROM Users WHERE Email = @Email", connection);
                command.Parameters.AddWithValue("@Email", Email);

                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return new User
                        {
                            Id = reader.GetInt32("UserId"),
                            //Name = reader.GetString("Name"),
                            Name = reader.GetString("Name"),
                            Email = reader.GetString("Email"),
                            Password = reader.GetString("Password"),
                            Date = reader.GetDateTime("Date"),
                            Role = reader.GetString("Role")
                        };
                    }
                    return null;
                }
            }
        }

        public async Task<User> CreateUserFromGoogle(GoogleJsonWebSignature.Payload payload)
        {
            using (var connection = GetConnection())
            {
                // First, check if the user exists using the email from the Google payload
                var trimmedEmail = payload.Email.Trim();
                var checkUserCommand = new SqlCommand("SELECT * FROM Users WHERE Email = @Email", connection);
                checkUserCommand.Parameters.AddWithValue("@Email", trimmedEmail);
                Console.WriteLine($"Debug - Trimmed Email: {trimmedEmail}");
                Console.WriteLine($"Debug - Parameter @Email Value: {checkUserCommand.Parameters["@Email"].Value}");
                Console.WriteLine($"Debug - Payload Email: {payload.Email}");


                await connection.OpenAsync();
                using (var reader = await checkUserCommand.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        // User found, return existing user
                        return new User
                        {
                            Id = reader.GetInt32("UserId"),
                            //Name = reader.GetString("Name"),
                            Name = reader.GetString("Name"),
                            Email = reader.GetString("Email"),
                            Password = reader.GetString("Password"),// can be null if register by google
                            Date = reader.GetDateTime("Date"),
                            Role = reader.GetString("Role")
                        };
                    }
                    else
                    {
                        // User doesn't exist, create a new user based on Google payload
                        var newUser = new User
                        {
                            Name = $"{payload.GivenName} {payload.FamilyName}",
                            Email = payload.Email,
                            Password = "", // No password for Google users
                            Date = DateTime.Now,
                            Role = "User" // Default role for new users
                        };

                        // Add new user to database
                        var userId = await AddUser(newUser);
                        newUser.Id = userId;
                        return newUser;
                    }
                }
            }
        }


        // Method to fetch all product images (no filtering by ProductId)
        public async Task<List<ProductCategory>> GetAllProductsWithImagesAsync()
        {
            var productCategories = new Dictionary<int, ProductCategory>();

            using (var connection = GetConnection())
            {
                var query = @"
            SELECT 
                p.ProductId,
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock,
            MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
            -- Use STRING_AGG to aggregate all hover images
            CONCAT('[', STRING_AGG(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END, ','), ']') AS HoverImageUrls
        FROM
            dbo.Products p
        LEFT JOIN
            dbo.ProductImages pi
        ON
            p.ProductId = pi.ProductId
        GROUP BY 
            p.ProductId, 
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
               
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock
        HAVING
            MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
            -- Only filter for hover images if there's at least one hover image
            OR COUNT(CASE WHEN pi.ImageType = 'hover' THEN 1 END) > 0;";

                using (var command = new SqlCommand(query, connection))
                {
                    // Open the connection asynchronously
                    await connection.OpenAsync();

                    // Execute the command and process the results
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

                            // Check if the product already exists in the dictionary
                            if (!productCategories.TryGetValue(productId, out var productCategory))
                            {
                                productCategory = new ProductCategory
                                {
                                    ProductId = productId,
                                    //Name = reader.GetString(reader.GetOrdinal("Name")),
                                    //Category = reader.GetString(reader.GetOrdinal("Category")),
                                    NewPrice = reader.IsDBNull(reader.GetOrdinal("NewPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                    //Available = reader.GetBoolean(reader.GetOrdinal("Available")),
                                    Date = reader.IsDBNull(reader.GetOrdinal("Date"))
                                                ? DateTime.MinValue
                                                : reader.GetDateTime(reader.GetOrdinal("Date")),
                                    //Size = reader.IsDBNull(reader.GetOrdinal("Size"))
                                    //            ? string.Empty
                                    //            : reader.GetString(reader.GetOrdinal("Size")),
                                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Description")),
                                    Handle = reader.IsDBNull(reader.GetOrdinal("Handle"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Handle")),
                                    Title = reader.IsDBNull(reader.GetOrdinal("Title"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Title")),
                                    //Color = reader.IsDBNull(reader.GetOrdinal("Color"))
                                    //            ? null
                                    //            : reader.GetString(reader.GetOrdinal("Color")),
                                    Is_In_Stock = reader.IsDBNull(reader.GetOrdinal("Is_In_Stock"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Is_In_Stock")),
                                    PrimaryImages = new List<string>(),
                                    HoverImages = new List<string>()
                                };

                                productCategories.Add(productId, productCategory);
                            }

                            // Add primary image URL
                            string primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));

                            if (!string.IsNullOrEmpty(primaryImageUrl))
                            {
                                productCategory.PrimaryImages.Add(primaryImageUrl);
                            }

                            // Add hover images (parse the aggregated hover image URLs)
                            string hoverImageUrls = reader.IsDBNull(reader.GetOrdinal("HoverImageUrls"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("HoverImageUrls"));

                            if (!string.IsNullOrEmpty(hoverImageUrls))
                            {
                                // Parse the comma-separated hover image URLs into a list
                                var hoverImages = hoverImageUrls.Trim('[', ']')
                                                               .Split(',')
                                                               .Select(url => url.Trim())
                                                               .Where(url => !string.IsNullOrEmpty(url))
                                                               .ToList();

                                productCategory.HoverImages.AddRange(hoverImages);
                            }
                        }
                    }
                }
            }

            return productCategories.Values.ToList();
        }




        // New method for creating a user from Google Sign-In payload
        //public async Task<User> CreateUserFromGoogle(GoogleJsonWebSignature.Payload payload)
        //{
        //    using (var connection = GetConnection())
        //    {
        //        // First, check if the user already exists in the database using the email from Google payload
        //        var command = new SqlCommand("SELECT * FROM Users WHERE Email = @Email", connection);
        //        command.Parameters.AddWithValue("@Email", payload.Email);

        //        await connection.OpenAsync();
        //        using (var reader = await command.ExecuteReaderAsync())
        //        {
        //            if (await reader.ReadAsync())
        //            {
        //                // If the user already exists, return the existing user
        //                return new User
        //                {
        //                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                    Name = reader.GetString(reader.GetOrdinal("Name")),
        //                    Email = reader.GetString(reader.GetOrdinal("Email")),
        //                    Password = reader.GetString(reader.GetOrdinal("Password")), // You might want to handle password securely
        //                    Date = reader.GetDateTime(reader.GetOrdinal("Date")),
        //                    Role = reader.GetString(reader.GetOrdinal("Role"))
        //                };
        //            }
        //            else
        //            {
        //                // If the user doesn't exist, create a new user in the database using the Google payload
        //                var newUser = new User
        //                {
        //                    Name = payload.GivenName + " " + payload.FamilyName,
        //                    Email = payload.Email,
        //                    Password = "", // Since the user is signing in with Google, no password is needed
        //                    Date = DateTime.Now,
        //                    Role = "User" // Default role for new users (you can adjust as needed)
        //                };

        //                var userId = await AddUser(newUser);
        //                newUser.Id = userId;
        //                return newUser;
        //            }
        //        }
        //    }
        //}

        // start product management
        //    public async Task<int> AddProduct(Product product)
        //    {
        //        using (var connection = GetConnection())
        //        {
        //            var command = new SqlCommand(@"
        //INSERT INTO Products (Name, Category, NewPrice, OldPrice, Available, Date,Size, Description)
        //VALUES (@Name, @Category, @NewPrice, @OldPrice, @Available, @Date,@Size, @Description);
        //SELECT SCOPE_IDENTITY();", connection);
        //            //command.Parameters.AddWithValue("@ProductId", product.ProductId);
        //            command.Parameters.AddWithValue("@Name", product.Name);

        //            command.Parameters.AddWithValue("@Category", product.Category);
        //            command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
        //            command.Parameters.AddWithValue("@OldPrice", product.OldPrice);
        //            command.Parameters.AddWithValue("@Available", product.Available);
        //            command.Parameters.AddWithValue("@Date", product.Date);
        //            command.Parameters.AddWithValue("@Size", product.Size);
        //            command.Parameters.AddWithValue("@Description", product.Description);

        //            await connection.OpenAsync();
        //            var result = await command.ExecuteScalarAsync();
        //            return Convert.ToInt32(result);
        //        }
        //    }
        public



   async Task<int> AddProduct(Product product)
        {
            using (var connection = GetConnection())
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        var productCommand = new SqlCommand(@"
                    INSERT INTO Products (Title, Handle, MenuItemId, NewPrice,OldPrice, Is_In_Stock, Description,Note,Material,Care,ModelHeightSize)
                    OUTPUT INSERTED.ProductId
                    VALUES (@Title, @Handle,@MenuItemId, @NewPrice, @OldPrice, @Is_In_Stock, @Description, @Note, @Material,@Care, @ModelHeightSize);",
                            connection,
                            transaction
                        );

                        productCommand.Parameters.AddWithValue("@Title", product.Title);
                        productCommand.Parameters.AddWithValue("@Handle", product.Handle);
                        productCommand.Parameters.AddWithValue("@MenuItemId", product.MenuItemId);


                        productCommand.Parameters.AddWithValue("@NewPrice", product.NewPrice);
                        productCommand.Parameters.AddWithValue("@OldPrice", product.OldPrice ?? (object)DBNull.Value); // Handle nullable OldPrice
                        productCommand.Parameters.AddWithValue("@Is_In_Stock", product.Is_In_Stock);
                        productCommand.Parameters.AddWithValue("@Description", product.Description);
                        productCommand.Parameters.AddWithValue("@Note", product.Note);
                        productCommand.Parameters.AddWithValue("@Material", product.Material);
                        productCommand.Parameters.AddWithValue("@Care", product.Care);
                        productCommand.Parameters.AddWithValue("@ModelHeightSize", product.ModelHeightSize);

                        int productId = Convert.ToInt32(await productCommand.ExecuteScalarAsync());

                        // Insert size details if provided
                        if (product.Sizes != null && product.Sizes.Any())
                        {
                            await AddProductSizeDetails(connection, transaction, productId, product.Sizes);
                        }

                        // Insert colors if provided
                        if (product.Colors != null && product.Colors.Any())
                        {
                            await AddProductColors(connection, transaction, productId, product.Colors);
                        }

                        transaction.Commit();
                        return productId;
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw; // Re-throw the exception to be handled by the calling code
                    }
                }
            }
        }

        private async Task AddProductColors(SqlConnection connection, SqlTransaction transaction, int productId, List<ProductColor> colors)
        {
            foreach (var productColor in colors) // Iterate through the list of ProductColor objects
            {
                var colorCommand = new SqlCommand(@"
            INSERT INTO ProductColors (ProductId, ColorValue)
            VALUES (@ProductId, @ColorValue);",
                    connection,
                    transaction
                );
                colorCommand.Parameters.AddWithValue("@ProductId", productId);
                colorCommand.Parameters.AddWithValue("@ColorValue", productColor.Color); // Access the Color property of the ProductColor object
                await colorCommand.ExecuteNonQueryAsync();
            }
        }

        private async Task AddProductSizeDetails(SqlConnection connection, SqlTransaction transaction, int productId, List<ProductSizeDetailRequest> sizes)
        {
            var sizeDetailCommand = new SqlCommand(@"
            INSERT INTO ProductSizeDetails (ProductId, SizeCategoryId, Chest, FullLengthBack, FullLengthFront, PantWaistRelax, PantLength)
            VALUES (@ProductId, (SELECT SizeCategoryId FROM SizeCategories WHERE CategoryName = @CategoryName), @Chest, @FullLengthBack, @FullLengthFront, @PantWaistRelax, @PantLength);",
                connection,
                transaction
            );

            foreach (var size in sizes)
            {
                sizeDetailCommand.Parameters.Clear();
                sizeDetailCommand.Parameters.AddWithValue("@ProductId", productId);
                sizeDetailCommand.Parameters.AddWithValue("@CategoryName", size.Category);
                sizeDetailCommand.Parameters.AddWithValue("@Chest", size.Chest.HasValue ? (object)size.Chest.Value : DBNull.Value);
                sizeDetailCommand.Parameters.AddWithValue("@FullLengthBack", size.FullLengthBack.HasValue ? (object)size.FullLengthBack.Value : DBNull.Value);
                sizeDetailCommand.Parameters.AddWithValue("@FullLengthFront", size.FullLengthFront.HasValue ? (object)size.FullLengthFront.Value : DBNull.Value);
                sizeDetailCommand.Parameters.AddWithValue("@PantWaistRelax", size.PantWaistRelax.HasValue ? (object)size.PantWaistRelax.Value : DBNull.Value);
                sizeDetailCommand.Parameters.AddWithValue("@PantLength", size.PantLength.HasValue ? (object)size.PantLength.Value : DBNull.Value);

                await sizeDetailCommand.ExecuteNonQueryAsync();
            }
        }



        public async Task<List<string>> GetAllColors()
        {
            var colors = new List<string>();
            using (var connection = GetConnection())
            {
                var command = new SqlCommand(@"
                    SELECT DISTINCT pc.ColorValue
                    FROM Products p
                    INNER JOIN ProductColors pc ON p.ProductId = pc.ProductId;",
                    connection
                );

                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        colors.Add(reader.GetString(reader.GetOrdinal("ColorValue")));
                    }
                }
            }
            return colors;
        }

        // Database helper method for inserting product images                                                                                




        public async Task InsertProductImage(int productId, string imageType, string imageUrl)
        {
            using (var connection = GetConnection())
            {
                var command = new SqlCommand("InsertProductImage", connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                command.Parameters.AddWithValue("@ProductId", productId);
                command.Parameters.AddWithValue("@ImageType", imageType);
                command.Parameters.AddWithValue("@ImageUrl", imageUrl);

                await connection.OpenAsync();
                await command.ExecuteNonQueryAsync();
            }
        }

        // In your DatabaseHelper.cs

        public async Task<List<string>> GetAvailableColorsAsync()
        {
            using (var connection = GetConnection()) // Assuming you have a connection factory
            {
                await connection.OpenAsync();
                var colors = await connection.QueryAsync<string>("SELECT ColorValue FROM AvailableColors ORDER BY ColorValue");
                return colors.ToList();
            }
        }

        public async Task InsertColorAsync(string colorValue)
        {
            using (var connection = GetConnection())
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync("INSERT INTO AvailableColors (ColorValue) VALUES (@ColorValue)", new { ColorValue = colorValue });
            }
        }

        public async Task<string> GetColorByValueAsync(string colorValue)
        {
            using (var connection = GetConnection())
            {
                await connection.OpenAsync();
                return await connection.QueryFirstOrDefaultAsync<string>("SELECT ColorValue FROM AvailableColors WHERE ColorValue = @ColorValue", new { ColorValue = colorValue });
            }
        }

        // Method to add a product
        //public async Task<int> AddProduct(Product product)
        //{
        //    using (var connection = GetConnection())
        //    {
        //        // Open the connection before starting the transaction
        //        await connection.OpenAsync();

        //        // Start a transaction to ensure both insertions are successful
        //        using (var transaction = connection.BeginTransaction())
        //        {
        //            try
        //            {
        //                // First, insert the product into the Products table
        //                var command = new SqlCommand("InsertProduct", connection, transaction)
        //                {
        //                    CommandType = CommandType.StoredProcedure
        //                };

        //                command.Parameters.AddWithValue("@Name", product.Name);
        //                command.Parameters.AddWithValue("@Category", product.Category);
        //                command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
        //                command.Parameters.AddWithValue("@OldPrice", product.OldPrice);
        //                command.Parameters.AddWithValue("@Available", product.Available);
        //                command.Parameters.AddWithValue("@Date", product.Date);
        //                command.Parameters.AddWithValue("@Size", product.Size);
        //                command.Parameters.AddWithValue("@Description", product.Description);

        //                var result = await command.ExecuteScalarAsync();
        //                int productId = Convert.ToInt32(result);

        //                // Now insert the primary image into ProductImages table
        //                var imageCommand = new SqlCommand("InsertProductImage", connection, transaction)
        //                {
        //                    CommandType = CommandType.StoredProcedure
        //                };

        //                imageCommand.Parameters.AddWithValue("@ProductId", productId);
        //                imageCommand.Parameters.AddWithValue("@ImageType", "primary");
        //                imageCommand.Parameters.AddWithValue("@ImageUrl", product.PrimaryImage);

        //                await imageCommand.ExecuteNonQueryAsync();

        //                // Now insert the hover image into ProductImages table
        //                imageCommand.Parameters["@ImageType"].Value = "hover";
        //                imageCommand.Parameters["@ImageUrl"].Value = product.HoverImage;

        //                await imageCommand.ExecuteNonQueryAsync();

        //                // Commit the transaction if both insertions were successful
        //                transaction.Commit();

        //                return productId;
        //            }
        //            catch (Exception ex)
        //            {
        //                // Rollback the transaction if an error occurs
        //                transaction.Rollback();
        //                throw new Exception("Error saving product and images: " + ex.Message);
        //            }
        //        }
        //    }
        //}


        public async Task<List<ProductCategory>> GetTopSoldItemsPerCategory()
        {
            var productCategories = new Dictionary<int, ProductCategory>();

            using (var connection = GetConnection())
            {
                var query = @"
    SELECT TOP 5 
                p.ProductId,
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock,
        MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
        MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl,
        SUM(oi.Quantity) AS TotalSold
    FROM
        dbo.Products p
    LEFT JOIN
        dbo.ProductImages pi ON p.ProductId = pi.ProductId
    LEFT JOIN
        dbo.OrderItems oi ON p.ProductId = oi.ProductId
    LEFT JOIN
        dbo.Orders o ON oi.OrderId = o.OrderId
    WHERE
      (o.Status = 'Completed' OR o.Status IS NULL)
    GROUP BY 
               p.ProductId, 
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
               
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock
       HAVING
        MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
        OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL
    ORDER BY 
        TotalSold DESC;";

                using (var command = new SqlCommand(query, connection))
                {


                    // Open the connection asynchronously
                    await connection.OpenAsync();

                    // Execute the command and process the results
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

                            // Check if the product already exists in the dictionary
                            if (!productCategories.TryGetValue(productId, out var productCategory))
                            {
                                productCategory = new ProductCategory
                                {
                                    ProductId = productId,
                                    //Name = reader.GetString(reader.GetOrdinal("Name")),
                                    //Category = reader.GetString(reader.GetOrdinal("Category")),
                                    NewPrice = reader.IsDBNull(reader.GetOrdinal("NewPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                    //Available = reader.GetBoolean(reader.GetOrdinal("Available")),
                                    Date = reader.IsDBNull(reader.GetOrdinal("Date"))
                                                ? DateTime.MinValue
                                                : reader.GetDateTime(reader.GetOrdinal("Date")),
                                    //Size = reader.IsDBNull(reader.GetOrdinal("Size"))
                                    //            ? string.Empty
                                    //            : reader.GetString(reader.GetOrdinal("Size")),
                                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Description")),
                                    Handle = reader.IsDBNull(reader.GetOrdinal("Handle"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Handle")),
                                    Title = reader.IsDBNull(reader.GetOrdinal("Title"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Title")),
                                    //Color = reader.IsDBNull(reader.GetOrdinal("Color"))
                                    //            ? null
                                    //            : reader.GetString(reader.GetOrdinal("Color")),
                                    Is_In_Stock = reader.IsDBNull(reader.GetOrdinal("Is_In_Stock"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Is_In_Stock")),
                                    PrimaryImages = new List<string>(),
                                    HoverImages = new List<string>()
                                };

                                productCategories.Add(productId, productCategory);
                            }

                            // Add image URLs to the appropriate collection
                            string primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));

                            string hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

                            if (!string.IsNullOrEmpty(primaryImageUrl))
                            {
                                productCategory.PrimaryImages.Add(primaryImageUrl);
                            }

                            if (!string.IsNullOrEmpty(hoverImageUrl))
                            {
                                productCategory.HoverImages.Add(hoverImageUrl);
                            }
                        }
                    }
                }
            }

            return productCategories.Values.ToList();
        }

        //update product 
        //public async Task<bool> UpdateProduct(ProductCategory product)
        //{
        //    using (var connection = GetConnection())
        //    {
        //        await connection.OpenAsync();

        //        using (var transaction = connection.BeginTransaction())
        //        {
        //            try
        //            {
        //                // Update product details
        //                var updateProductQuery = @"
        //            UPDATE Products
        //            SET
        //                NewPrice = @NewPrice,
        //                OldPrice = @OldPrice,
        //                Date = @Date,
        //                Description = @Description,
        //                Handle = @Handle,
        //                Title = @Title,
        //                MenuItemId = @MenuItemId,
        //                Note = @Note,
        //                Material = @Material,
        //                Care = @Care,
        //                ModelHeightSize = @ModelHeightSize,
        //                Is_In_Stock = @IsInStock
        //            WHERE ProductId = @ProductId";

        //                using (var productCommand = new SqlCommand(updateProductQuery, connection, transaction))
        //                {
        //                    productCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
        //                    productCommand.Parameters.AddWithValue("@NewPrice", product.NewPrice);
        //                    productCommand.Parameters.AddWithValue("@OldPrice", product.OldPrice ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@Date", product.Date);
        //                    productCommand.Parameters.AddWithValue("@Description", product.Description ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@Handle", product.Handle ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@Title", product.Title ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@MenuItemId", product.MenuItemId ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@Note", product.Note ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@Material", product.Material ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@Care", product.Care ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@ModelHeightSize", product.ModelHeightSize ?? (object)DBNull.Value);
        //                    productCommand.Parameters.AddWithValue("@IsInStock", product.Is_In_Stock ?? (object)DBNull.Value);

        //                    await productCommand.ExecuteNonQueryAsync();
        //                }

        //                // Update primary image
        //                if (!string.IsNullOrEmpty(product.PrimaryImageUrl))
        //                {
        //                    var updatePrimaryImageQuery = @"
        //                UPDATE ProductImages
        //                SET ImageUrl = @ImageUrl
        //                WHERE ProductId = @ProductId AND ImageType = 'primary'";

        //                    using (var primaryImageCommand = new SqlCommand(updatePrimaryImageQuery, connection, transaction))
        //                    {
        //                        primaryImageCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
        //                        primaryImageCommand.Parameters.AddWithValue("@ImageUrl", product.PrimaryImageUrl);

        //                        await primaryImageCommand.ExecuteNonQueryAsync();
        //                    }
        //                }

        //                // Update hover image
        //                if (!string.IsNullOrEmpty(product.HoverImageUrl))
        //                {
        //                    var updateHoverImageQuery = @"
        //                UPDATE ProductImages
        //                SET ImageUrl = @ImageUrl
        //                WHERE ProductId = @ProductId AND ImageType = 'hover'";

        //                    using (var hoverImageCommand = new SqlCommand(updateHoverImageQuery, connection, transaction))
        //                    {
        //                        hoverImageCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
        //                        hoverImageCommand.Parameters.AddWithValue("@ImageUrl", product.HoverImageUrl);

        //                        await hoverImageCommand.ExecuteNonQueryAsync();
        //                    }
        //                }

        //                // Commit the transaction
        //                transaction.Commit();
        //                return true;
        //            }
        //            catch
        //            {
        //                // Rollback the transaction on error
        //                transaction.Rollback();
        //                throw;
        //            }
        //        }
        //    }
        //}

        public async Task<bool> UpdateProduct(ProductCategory product)
        {
            using (var connection = GetConnection())
            {
                await connection.OpenAsync();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // Update the Products table
                        var updateProductQuery = @"
                    UPDATE Products SET
                        Title = @Title,
                        Handle = @Handle,
                        MenuItemId = @MenuItemId,
                        ParentMenuItemId = @ParentMenuItemId,
                        NewPrice = @NewPrice,
                        OldPrice = @OldPrice,
                        Is_In_Stock = @IsInStock,
                        Description = @Description,
                        Date = @Date,
                        Note = @Note,
                        Material = @Material,
                        Care = @Care,
                        ModelHeightSize = @ModelHeightSize
                    WHERE ProductId = @ProductId";

                        using (var updateProductCommand = new SqlCommand(updateProductQuery, connection, transaction))
                        {
                            updateProductCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
                            updateProductCommand.Parameters.AddWithValue("@Title", product.Title ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@Handle", product.Handle ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@MenuItemId", product.MenuItemId);
                            updateProductCommand.Parameters.AddWithValue("@ParentMenuItemId", product.ParentMenuItemId);
                            updateProductCommand.Parameters.AddWithValue("@NewPrice", product.NewPrice);
                            updateProductCommand.Parameters.AddWithValue("@OldPrice", product.OldPrice ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@IsInStock", product.Is_In_Stock ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@Description", product.Description ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@Date", product.Date ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@Note", product.Note ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@Material", product.Material ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@Care", product.Care ?? (object)DBNull.Value);
                            updateProductCommand.Parameters.AddWithValue("@ModelHeightSize", product.ModelHeightSize ?? (object)DBNull.Value);

                            await updateProductCommand.ExecuteNonQueryAsync();
                        }

                        // Update or insert primary images
                        if (product.PrimaryImages != null && product.PrimaryImages.Any())
                        {
                            // Delete existing primary images
                            var deletePrimaryImagesQuery = @"
                        DELETE FROM ProductImages
                        WHERE ProductId = @ProductId AND ImageType = 'primary'";

                            using (var deletePrimaryImagesCommand = new SqlCommand(deletePrimaryImagesQuery, connection, transaction))
                            {
                                deletePrimaryImagesCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
                                await deletePrimaryImagesCommand.ExecuteNonQueryAsync();
                            }

                            // Insert new primary images
                            var insertPrimaryImageQuery = @"
                        INSERT INTO ProductImages (ProductId, ImageUrl, ImageType)
                        VALUES (@ProductId, @ImageUrl, 'primary')";

                            foreach (var imageUrl in product.PrimaryImages)
                            {
                                using (var insertPrimaryImageCommand = new SqlCommand(insertPrimaryImageQuery, connection, transaction))
                                {
                                    insertPrimaryImageCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
                                    insertPrimaryImageCommand.Parameters.AddWithValue("@ImageUrl", imageUrl);
                                    await insertPrimaryImageCommand.ExecuteNonQueryAsync();
                                }
                            }
                        }

                        // Update or insert hover images
                        if (product.HoverImages != null && product.HoverImages.Any())
                        {
                            // Delete existing hover images
                            var deleteHoverImagesQuery = @"
                        DELETE FROM ProductImages
                        WHERE ProductId = @ProductId AND ImageType = 'hover'";

                            using (var deleteHoverImagesCommand = new SqlCommand(deleteHoverImagesQuery, connection, transaction))
                            {
                                deleteHoverImagesCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
                                await deleteHoverImagesCommand.ExecuteNonQueryAsync();
                            }

                            // Insert new hover images
                            var insertHoverImageQuery = @"
                        INSERT INTO ProductImages (ProductId, ImageUrl, ImageType)
                        VALUES (@ProductId, @ImageUrl, 'hover')";

                            foreach (var imageUrl in product.HoverImages)
                            {
                                using (var insertHoverImageCommand = new SqlCommand(insertHoverImageQuery, connection, transaction))
                                {
                                    insertHoverImageCommand.Parameters.AddWithValue("@ProductId", product.ProductId);
                                    insertHoverImageCommand.Parameters.AddWithValue("@ImageUrl", imageUrl);
                                    await insertHoverImageCommand.ExecuteNonQueryAsync();
                                }
                            }
                        }

                        // Commit the transaction
                        transaction.Commit();
                        return true;
                    }
                    catch
                    {
                        // Rollback the transaction on error
                        transaction.Rollback();
                        throw;
                    }
                }
            }
        }


        //get all product

        public async Task<List<ProductCategory>> GetAllProducts()
        {
            var productCategories = new Dictionary<int, ProductCategory>();

            using (var connection = GetConnection())
            {
                // Updated SQL query with correct commas and formatting
                var query = @"
            SELECT 
                p.ProductId,
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock,
                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
                MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl
            FROM dbo.Products p
            LEFT JOIN dbo.ProductImages pi ON p.ProductId = pi.ProductId
            GROUP BY 
                p.ProductId, 
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
               
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock
            HAVING
                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
                OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL
            ORDER BY 
                p.Date DESC;";

                using (var command = new SqlCommand(query, connection))
                {
                    await connection.OpenAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

                            if (!productCategories.TryGetValue(productId, out var productCategory))
                            {
                                productCategory = new ProductCategory
                                {
                                    ProductId = productId,
                                    //Name = reader.GetString(reader.GetOrdinal("Name")),
                                    //Category = reader.GetString(reader.GetOrdinal("Category")),
                                    NewPrice = reader.IsDBNull(reader.GetOrdinal("NewPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                    //Available = reader.GetBoolean(reader.GetOrdinal("Available")),
                                    Date = reader.IsDBNull(reader.GetOrdinal("Date"))
                                                ? DateTime.MinValue
                                                : reader.GetDateTime(reader.GetOrdinal("Date")),
                                    //Size = reader.IsDBNull(reader.GetOrdinal("Size"))
                                    //            ? string.Empty
                                    //            : reader.GetString(reader.GetOrdinal("Size")),
                                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Description")),
                                    Handle = reader.IsDBNull(reader.GetOrdinal("Handle"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Handle")),
                                    Title = reader.IsDBNull(reader.GetOrdinal("Title"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Title")),
                                    //Color = reader.IsDBNull(reader.GetOrdinal("Color"))
                                    //            ? null
                                    //            : reader.GetString(reader.GetOrdinal("Color")),
                                    Is_In_Stock = reader.IsDBNull(reader.GetOrdinal("Is_In_Stock"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Is_In_Stock")),
                                    PrimaryImages = new List<string>(),
                                    HoverImages = new List<string>()
                                };

                                productCategories.Add(productId, productCategory);
                            }

                            var primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl"))
                                                    ? null
                                                    : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));
                            var hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl"))
                                                    ? null
                                                    : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

                            if (!string.IsNullOrEmpty(primaryImageUrl))
                                productCategory.PrimaryImages.Add(primaryImageUrl);

                            if (!string.IsNullOrEmpty(hoverImageUrl))
                                productCategory.HoverImages.Add(hoverImageUrl);
                        }
                    }
                }
            }

            return productCategories.Values.ToList();
        }



        public async Task<ProductCategory> GetProductById(int id)
        {
            using (var connection = GetConnection())
            {
                var query = @"
            SELECT 
                p.ProductId,
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock,
                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
                MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl
            FROM dbo.Products p
                
            LEFT JOIN
                dbo.ProductImages pi ON p.ProductId = pi.ProductId
            WHERE
                p.ProductId = @Id
            GROUP BY 
                p.ProductId,
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,

                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock;";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);

                    await connection.OpenAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var productCategory = new ProductCategory
                            {
                                ProductId = reader.GetInt32(reader.GetOrdinal("ProductId")),
                                //Name = reader.GetString(reader.GetOrdinal("Name")),
                                //Category = reader.GetString(reader.GetOrdinal("Category")),
                                NewPrice = reader.IsDBNull(reader.GetOrdinal("NewPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                //Available = reader.GetBoolean(reader.GetOrdinal("Available")),
                                Date = reader.IsDBNull(reader.GetOrdinal("Date"))
                                                ? DateTime.MinValue
                                                : reader.GetDateTime(reader.GetOrdinal("Date")),
                                //Size = reader.IsDBNull(reader.GetOrdinal("Size"))
                                //            ? string.Empty
                                //            : reader.GetString(reader.GetOrdinal("Size")),
                                Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Description")),
                                Handle = reader.IsDBNull(reader.GetOrdinal("Handle"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Handle")),
                                Title = reader.IsDBNull(reader.GetOrdinal("Title"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Title")),
                                //Color = reader.IsDBNull(reader.GetOrdinal("Color"))
                                //            ? null
                                //            : reader.GetString(reader.GetOrdinal("Color")),
                                Is_In_Stock = reader.IsDBNull(reader.GetOrdinal("Is_In_Stock"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Is_In_Stock")),
                                PrimaryImages = new List<string>(),
                                HoverImages = new List<string>()
                            };

                            var primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl")) ? null : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));
                            var hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl")) ? null : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

                            if (!string.IsNullOrEmpty(primaryImageUrl))
                                productCategory.PrimaryImages.Add(primaryImageUrl);

                            if (!string.IsNullOrEmpty(hoverImageUrl))
                                productCategory.HoverImages.Add(hoverImageUrl);

                            return productCategory;
                        }
                    }
                }
            }

            return null;
        }


        public async Task<List<ProductCategory>> GetProductsByCategory(string category)
        {
            var productCategories = new Dictionary<int, ProductCategory>();

            using (var connection = GetConnection())
            {
                var query = @"
                p.ProductId,
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock,
                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
                MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl
            FROM dbo.Products p
            LEFT JOIN dbo.ProductImages pi ON p.ProductId = pi.ProductId
            WHERE
                p.Title = @category
            GROUP BY 
                p.ProductId, 
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock
            HAVING
                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
                OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL;";

                using (var command = new SqlCommand(query, connection))
                {
                    // Add the category parameter
                    command.Parameters.AddWithValue("@category", category);

                    // Open the connection asynchronously
                    await connection.OpenAsync();

                    // Execute the command and process the results
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

                            // Check if the product already exists in the dictionary
                            if (!productCategories.TryGetValue(productId, out var productCategory))
                            {
                                productCategory = new ProductCategory
                                {

                                    ProductId = productId,
                                    //Name = reader.GetString(reader.GetOrdinal("Name")),
                                    //Category = reader.GetString(reader.GetOrdinal("Category")),
                                    NewPrice = reader.IsDBNull(reader.GetOrdinal("NewPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                    //Available = reader.GetBoolean(reader.GetOrdinal("Available")),
                                    Date = reader.IsDBNull(reader.GetOrdinal("Date"))
                                                ? DateTime.MinValue
                                                : reader.GetDateTime(reader.GetOrdinal("Date")),
                                    //Size = reader.IsDBNull(reader.GetOrdinal("Size"))
                                    //            ? string.Empty
                                    //            : reader.GetString(reader.GetOrdinal("Size")),
                                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Description")),
                                    Handle = reader.IsDBNull(reader.GetOrdinal("Handle"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Handle")),
                                    Title = reader.IsDBNull(reader.GetOrdinal("Title"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Title")),
                                    //Color = reader.IsDBNull(reader.GetOrdinal("Color"))
                                    //            ? null
                                    //            : reader.GetString(reader.GetOrdinal("Color")),
                                    Is_In_Stock = reader.IsDBNull(reader.GetOrdinal("Is_In_Stock"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Is_In_Stock")),
                                    PrimaryImages = new List<string>(),
                                    HoverImages = new List<string>()
                                };

                                productCategories.Add(productId, productCategory);
                            }

                            // Add image URLs to the appropriate collection
                            string primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));

                            string hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

                            if (!string.IsNullOrEmpty(primaryImageUrl))
                            {
                                productCategory.PrimaryImages.Add(primaryImageUrl);
                            }

                            if (!string.IsNullOrEmpty(hoverImageUrl))
                            {
                                productCategory.HoverImages.Add(hoverImageUrl);
                            }
                        }
                    }
                }
            }

            return productCategories.Values.ToList();
        }


//        public async Task<List<ProductCategory>> GetProductsByCategory(string category)
//{
//    var productCategories = new Dictionary<int, ProductCategory>();

//    using (var connection = GetConnection())
//    {
//        var query = @"
//        SELECT 
//            p.ProductId,
//            p.NewPrice,
//            p.OldPrice,
//            p.Date,
//            p.Description,
//            p.Handle,
//            p.Title,
//            p.Color,
//            p.MenuItemId,
//            p.ProductTypeId,
//            p.Available,
//            p.Size,
//            p.Category,
//            p.Name,
//            mi.Name AS MenuItemName,
//            pt.Name AS ProductTypeName,
//            MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
//            MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl
//        FROM
//            dbo.Products p
//        LEFT JOIN dbo.ProductImages pi ON p.ProductId = pi.ProductId
//        LEFT JOIN dbo.MenuItems mi ON p.MenuItemId = mi.MenuItemId
//        LEFT JOIN dbo.ProductTypes pt ON p.ProductTypeId = pt.ProductTypeId
//        WHERE
//            p.Category = @category
//        GROUP BY 
//            p.ProductId, p.NewPrice, p.OldPrice, p.Date, p.Description,
//            p.Handle, p.Title, p.Color, p.MenuItemId, p.ProductTypeId,
//            p.Available, p.Size, p.Category, p.Name, mi.Name, pt.Name
//        HAVING
//            MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
//            OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL;";

//        using (var command = new SqlCommand(query, connection))
//        {
//            command.Parameters.AddWithValue("@category", category);
//            await connection.OpenAsync();

//            using (var reader = await command.ExecuteReaderAsync())
//            {
//                while (await reader.ReadAsync())
//                {
//                    int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

//                    if (!productCategories.TryGetValue(productId, out var productCategory))
//                    {
//                        productCategory = new ProductCategory
//                        {
//                            ProductId = productId,
//                            NewPrice = reader.GetDecimal(reader.GetOrdinal("NewPrice")),
//                            OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
//                            Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? DateTime.MinValue : reader.GetDateTime(reader.GetOrdinal("Date")),
//                            Description = reader.GetString(reader.GetOrdinal("Description")),
//                            Handle = reader.IsDBNull(reader.GetOrdinal("Handle")) ? null : reader.GetString(reader.GetOrdinal("Handle")),
//                            Title = reader.IsDBNull(reader.GetOrdinal("Title")) ? null : reader.GetString(reader.GetOrdinal("Title")),
//                            Color = reader.IsDBNull(reader.GetOrdinal("Color")) ? null : reader.GetString(reader.GetOrdinal("Color")),
//                            MenuItemId = reader.IsDBNull(reader.GetOrdinal("MenuItemId")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("MenuItemId")),
//                            ProductTypeId = reader.IsDBNull(reader.GetOrdinal("ProductTypeId")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("ProductTypeId")),
//                            Available = reader.GetBoolean(reader.GetOrdinal("Available")),
//                            Size = reader.IsDBNull(reader.GetOrdinal("Size")) ? null : reader.GetString(reader.GetOrdinal("Size")),
//                            Category = reader.GetString(reader.GetOrdinal("Category")),
//                            Name = reader.GetString(reader.GetOrdinal("Name")),
//                            MenuItemName = reader.IsDBNull(reader.GetOrdinal("MenuItemName")) ? null : reader.GetString(reader.GetOrdinal("MenuItemName")),
//                            ProductTypeName = reader.IsDBNull(reader.GetOrdinal("ProductTypeName")) ? null : reader.GetString(reader.GetOrdinal("ProductTypeName")),
//                            PrimaryImages = new List<string>(),
//                            HoverImages = new List<string>()
//                        };

//                        productCategories.Add(productId, productCategory);
//                    }

//                    string primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl")) ? null : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));
//                    string hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl")) ? null : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

//                    if (!string.IsNullOrEmpty(primaryImageUrl))
//                        productCategory.PrimaryImages.Add(primaryImageUrl);

//                    if (!string.IsNullOrEmpty(hoverImageUrl))
//                        productCategory.HoverImages.Add(hoverImageUrl);
//                }
//            }
//        }
//    }

//    return productCategories.Values.ToList();
//}




        public async Task<List<ProductCategory>> GetMostRecentProducts()
        {
            var productCategories = new Dictionary<int, ProductCategory>();

            using (var connection = GetConnection())
            {
                var query = @"
              p.ProductId,
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock,
                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
                MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl
            FROM dbo.Products p
            LEFT JOIN dbo.ProductImages pi ON p.ProductId = pi.ProductId
            WHERE
                p.Date <= GETDATE()
            GROUP BY 
                 p.ProductId, 
                p.NewPrice,
                p.OldPrice,
                p.Date,
                p.Description,
                p.Handle,
                p.Title,
                p.MenuItemId,
                p.Note,
                p.Material,
                p.Care,
                p.ModelHeightSize,
                p.Is_In_Stock
            HAVING
                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
                OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL
            ORDER BY 
                p.Date DESC;";

                using (var command = new SqlCommand(query, connection))
                {
                    await connection.OpenAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

                            if (!productCategories.TryGetValue(productId, out var productCategory))
                            {
                                productCategory = new ProductCategory
                                {
                                    ProductId = productId,
                                    //Name = reader.GetString(reader.GetOrdinal("Name")),
                                    //Category = reader.GetString(reader.GetOrdinal("Category")),
                                    NewPrice = reader.IsDBNull(reader.GetOrdinal("NewPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("NewPrice")),
                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice"))
                                                ? 0
                                                : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
                                    //Available = reader.GetBoolean(reader.GetOrdinal("Available")),
                                    Date = reader.IsDBNull(reader.GetOrdinal("Date"))
                                                ? DateTime.MinValue
                                                : reader.GetDateTime(reader.GetOrdinal("Date")),
                                    //Size = reader.IsDBNull(reader.GetOrdinal("Size"))
                                    //            ? string.Empty
                                    //            : reader.GetString(reader.GetOrdinal("Size")),
                                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Description")),
                                    Handle = reader.IsDBNull(reader.GetOrdinal("Handle"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Handle")),
                                    Title = reader.IsDBNull(reader.GetOrdinal("Title"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Title")),
                                    //Color = reader.IsDBNull(reader.GetOrdinal("Color"))
                                    //            ? null
                                    //            : reader.GetString(reader.GetOrdinal("Color")),
                                    Is_In_Stock = reader.IsDBNull(reader.GetOrdinal("Is_In_Stock"))
                                                ? string.Empty
                                                : reader.GetString(reader.GetOrdinal("Is_In_Stock")),
                                    PrimaryImages = new List<string>(),
                                    HoverImages = new List<string>()
                                };

                                productCategories.Add(productId, productCategory);
                            }

                            var primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl")) ? null : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));
                            var hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl")) ? null : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

                            if (!string.IsNullOrEmpty(primaryImageUrl))
                                productCategory.PrimaryImages.Add(primaryImageUrl);

                            if (!string.IsNullOrEmpty(hoverImageUrl))
                                productCategory.HoverImages.Add(hoverImageUrl);
                        }
                    }
                }
            }

            return productCategories.Values.ToList();
        }




        public async Task<List<ProductImageResponse>> GetProductImagesAsync(int productId)
        {
            using (var connection = GetConnection()) // Assuming this returns SqlConnection
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ProductId", productId, DbType.Int32); // Match SQL Server parameter

                var images = await connection.QueryAsync<ProductImageResponse>(
                    "GetProductImagesByProductId",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return images.AsList();
            }
        }


        public async Task<bool> SaveCheckoutDataAsync(checkoutrequestdata request)
        {
            using (var connection = GetConnection())
            {
                try
                {
                    // Define parameters for the stored procedure
                    var parameters = new DynamicParameters();
                    parameters.Add("@UserId", request.UserId, DbType.Int32);
                    parameters.Add("@TotalAmount", request.TotalAmount, DbType.Decimal);
                    parameters.Add("@DeliveryMethod", request.DeliveryMethod, DbType.String);
                    parameters.Add("@AddressLine1", request.AddressLine1, DbType.String);
                    parameters.Add("@AddressLine2", request.AddressLine2, DbType.String);
                    parameters.Add("@City", request.City, DbType.String);
                    parameters.Add("@State", request.State, DbType.String);
                    parameters.Add("@PostalCode", request.PostalCode, DbType.String);
                    parameters.Add("@Country", request.Country, DbType.String);
                    parameters.Add("@Phone", request.Phone, DbType.String);
                    parameters.Add("@MarketingConsent", request.MarketingConsent, DbType.Boolean);



                    var cartItemsTable = CreateCartItemsDataTable(request.CartItems);
                    parameters.Add("@CartItems", cartItemsTable.AsTableValuedParameter("CartItemType"));


                    // Update the TotalAmount parameter with the calculated value
                    //parameters.Add("@CalculatedTotalAmount", totalAmount, DbType.Decimal);

                    // Execute the stored procedure
                    await connection.ExecuteAsync(
                        "SaveCheckoutData",
                        parameters,
                        commandType: CommandType.StoredProcedure);



                    //// Execute the stored procedure
                    //await connection.ExecuteAsync(
                    //    "SaveCheckoutData",
                    //    parameters,
                    //    commandType: CommandType.StoredProcedure);

                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error saving checkout data: {ex.Message}");
                    return false;
                }
            }
        }



        private DataTable CreateCartItemsDataTable(List<Cart> cartItems)
        {
            // Create a new DataTable with the same structure as CartItemType
            if (cartItems == null || !cartItems.Any())
            {
                throw new ArgumentException("Cart items list is null or empty.");
            }


            var columnsToInclude = new List<string> { "ProductId", "Quantity", "Price", "Date" };

            // Pass only the required columns
            return ToDataTable(cartItems, columnsToInclude);
        }



        public static DataTable ToDataTable<T>(IEnumerable<T> items, IEnumerable<string> columnsToInclude)
        {
            var dataTable = new DataTable();

            // Filter properties based on the required columns
            var properties = typeof(T).GetProperties()
                .Where(p => columnsToInclude.Contains(p.Name))
                .ToList();

            // Add columns to the DataTable
            foreach (var columnName in columnsToInclude)
            {
                var prop = properties.FirstOrDefault(p => p.Name == columnName);
                if (prop != null)
                {
                    dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
                }
            }

            foreach (var item in items)
            {
                //var row = dataTable.NewRow();
                DataRow row = dataTable.NewRow();
                foreach (var columnName in columnsToInclude)
                {
                    var prop = properties.FirstOrDefault(p => p.Name == columnName);
                    if (prop != null)
                    {
                        row[columnName] = prop.GetValue(item) ?? DBNull.Value;
                    }
                }
                try
                {
                    dataTable.Rows.Add(row); // Add explicitly cast row to match DataTable schema
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error adding row: {ex.Message}");
                }
            }


            return dataTable;

        }
        public static DataTable ToDataTable<T>(IEnumerable<T> items)
        {
            var dataTable = new DataTable(typeof(T).Name);

            // Create columns
            foreach (var prop in typeof(T).GetProperties())
            {
                dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            }

            // Populate rows
            foreach (var item in items)
            {
                var row = dataTable.NewRow();
                foreach (var prop in typeof(T).GetProperties())
                {
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                }
                dataTable.Rows.Add(row);
            }

            return dataTable;
        }





        // Delete Product
        public async Task<bool> DeleteProduct(int id)
        {
            using (var connection = GetConnection())
            {
                var command = new SqlCommand("DELETE FROM Products WHERE ProductId = @Id", connection);
                command.Parameters.AddWithValue("@Id", id);

                await connection.OpenAsync();
                var rowsAffected = await command.ExecuteNonQueryAsync();
                return rowsAffected > 0;
            }
        }







        public async Task<bool> ProceedWithTransactionAsync(int userId, decimal totalAmount, List<OrderItem> orderItems)
        {
            using (var connection = GetConnection())
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        // 1. Insert the Order
                        string insertOrderQuery = @"
                    INSERT INTO Orders (UserId, OrderDate, TotalAmount, Status)
                    VALUES (@UserId, GETDATE(), @TotalAmount, 'Completed');
                    SELECT CAST(SCOPE_IDENTITY() AS INT);";

                        int orderId = await connection.ExecuteScalarAsync<int>(
                            insertOrderQuery,
                            new { UserId = userId, TotalAmount = totalAmount },
                            transaction);

                        // 2. Insert Order Items and Update Stock
                        foreach (var item in orderItems)
                        {
                            // Insert order item
                            string insertOrderItemQuery = @"
                        INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
                        VALUES (@OrderId, @ProductId, @Quantity, @Price);";

                            await connection.ExecuteAsync(
                                insertOrderItemQuery,
                                new
                                {
                                    OrderId = orderId,
                                    ProductId = item.ProductId,
                                    Quantity = item.Quantity,
                                    Price = item.Price
                                },
                                transaction);


                        }

                        // 3. Clear the Cart
                        string clearCartQuery = "DELETE FROM Cart WHERE UserId = @UserId;";
                        await connection.ExecuteAsync(
                            clearCartQuery,
                            new { UserId = userId },
                            transaction);

                        // Commit the transaction
                        transaction.Commit();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        // Rollback the transaction on error
                        transaction.Rollback();
                        Console.WriteLine($"Transaction failed: {ex.Message}");
                        return false;
                    }
                }
            }
        }


        //order management
        public async Task<int> AddOrder(int userId, decimal totalAmount)
        {
            try
            {
                using (var connection = GetConnection())
                {
                    var command = new SqlCommand(@"
                    INSERT INTO Orders (UserId, OrderDate, Status, TotalAmount)
                    VALUES (@UserId, @OrderDate, @Status, @TotalAmount);
                    SELECT SCOPE_IDENTITY();", connection);

                    command.Parameters.AddWithValue("@UserId", userId);
                    command.Parameters.AddWithValue("@OrderDate", DateTime.Now);
                    command.Parameters.AddWithValue("@Status", "Pending");
                    command.Parameters.AddWithValue("@TotalAmount", totalAmount);

                    await connection.OpenAsync();
                    var result = await command.ExecuteScalarAsync();
                    return Convert.ToInt32(result);
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in AddOrder: {ex.Message}");
                throw; // Re-throw the exception to propagate to the controller
            }
        }


        public async Task<int> ClearCart(int userId)
        {
            using var connection = GetConnection();
            var command = new SqlCommand("DELETE FROM Cart WHERE UserId = @UserId", connection);
            command.Parameters.AddWithValue("@UserId", userId);

            await connection.OpenAsync();
            return await command.ExecuteNonQueryAsync(); // Returns the number of rows affected
        }




        //public async Task<int> AddOrderItem(int orderId, int productId, int quantity, decimal price)
        public async Task<int> AddOrderItem(OrderItem orderItem)
        {
            using (var connection = GetConnection())
            {
                var command = new SqlCommand(@"
            INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
            VALUES (@OrderId, @ProductId, @Quantity, @Price);", connection);

                command.Parameters.AddWithValue("@OrderId", orderItem.OrderId);
                command.Parameters.AddWithValue("@ProductId", orderItem.ProductId);
                command.Parameters.AddWithValue("@Quantity", orderItem.Quantity);
                command.Parameters.AddWithValue("@Price", orderItem.Price);

                await connection.OpenAsync();
                return await command.ExecuteNonQueryAsync();
            }
        }

        //cart management
        // Cart Management
        public async Task<int> AddCartItem(Cart cartItem)
        {
            using (var connection = GetConnection())
            {
                var command = new SqlCommand(@"
                    INSERT INTO CartI (UserId, ProductId, Quantity, Date)
                    VALUES (@UserId, @ProductId, @Quantity, @Date);
                    SELECT SCOPE_IDENTITY();", connection);

                command.Parameters.AddWithValue("@UserId", cartItem.UserId);
                command.Parameters.AddWithValue("@ProductId", cartItem.ProductId);
                command.Parameters.AddWithValue("@Quantity", cartItem.Quantity);
                command.Parameters.AddWithValue("@Date", DateTime.Now);

                await connection.OpenAsync();
                var result = await command.ExecuteScalarAsync();
                return Convert.ToInt32(result);
            }
        }

        public async Task<List<Cart>> GetCartItemsForUser(int userId)
        {
            var cartItems = new List<Cart>();
            using (var connection = GetConnection())
            {
                var command = new SqlCommand("SELECT * FROM Cart WHERE UserId = @UserId", connection);
                command.Parameters.AddWithValue("@UserId", userId);

                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        cartItems.Add(new Cart
                        {
                            Id = reader.GetInt32(0),
                            UserId = reader.GetInt32(1),
                            ProductId = reader.GetInt32(2),
                            Quantity = reader.GetInt32(3),
                            Date = reader.GetDateTime(4)
                        });
                    }
                }
            }
            return cartItems;
        }




        // Method to get Cart Items by date range
        public async Task<List<Cart>> GetCartItemsByDateRange(DateTime startDate, DateTime endDate)
        {
            var cartItems = new List<Cart>();

            using (var connection = GetConnection())
            {
                var command = new SqlCommand(
                    "SELECT CartId, UserId, ProductId, Quantity, Date FROM Cart WHERE Date BETWEEN @StartDate AND @EndDate",
                    connection
                );

                command.Parameters.AddWithValue("@StartDate", startDate);
                command.Parameters.AddWithValue("@EndDate", endDate);

                await connection.OpenAsync();
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        cartItems.Add(new Cart
                        {
                            Id = reader.GetInt32(0),
                            UserId = reader.GetInt32(1),
                            ProductId = reader.GetInt32(2),
                            Quantity = reader.GetInt32(3),
                            Date = reader.GetDateTime(4)
                        });
                    }
                }
            }

            return cartItems;
        }










        public async Task<List<SalesReport>> GetTotalSalesReport(DateTime startDate, DateTime endDate)
        {
            var salesReport = new List<SalesReport>();

            using (var connection = GetConnection()) // GetConnection should already be defined in your project.
            {
                var query = @"
     SELECT 
    CONVERT(VARCHAR, o.OrderDate, 103) AS [Date], -- Format as DD/MM/YYYY
    p.Title AS [Category],
    SUM(oi.Quantity) AS [TotalSalesCount]
    FROM 
    OrderItems oi
JOIN 
    Orders o ON oi.OrderId = o.OrderId
JOIN 
    Products p ON oi.ProductId = p.ProductId
WHERE 
    CAST(o.OrderDate AS DATE) BETWEEN CAST(@StartDate AS DATE) AND CAST(@EndDate AS DATE)
  
    AND o.Status = 'completed' -- Only consider completed orders
GROUP BY 
    CONVERT(VARCHAR, o.OrderDate, 103), 
    p.Title
ORDER BY 
    [Date], 
    [Category];

";
              

                var command = new SqlCommand(query, connection);

                // Add parameters for the query
                command.Parameters.AddWithValue("@StartDate", startDate);
                command.Parameters.AddWithValue("@EndDate", endDate);

                // Open database connection
                await connection.OpenAsync();

                // Execute the query and process results
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        //salesReport.Add(new SalesReport
                        //{
                        //    SaleDate = reader.GetDateTime(0), // Read DateTime directly
                        //    Category = reader.GetString(1),   // Read Category as string
                        //    TotalSales = reader.GetInt32(2)   // Read TotalSales as integer
                        //});
                        salesReport.Add(new SalesReport
                        {
                            SaleDate = DateTime.ParseExact(reader.GetString(0), "dd/MM/yyyy", null), // Explicit parsing
                            Category = reader.GetString(1),
                            TotalSales = reader.GetInt32(2)
                        });

                    }
                }
            }

            return salesReport;
        }









    }
}

//for my sql
//using System.Data;

//using System.Threading.Tasks;
//using ApiOnLamda.Model;
//using Microsoft.Extensions.Configuration;
//using System.Collections.Generic;
//using static System.Net.Mime.MediaTypeNames;
//using System.Globalization;
//using Dapper;
//using Google.Apis.Auth;


//using Dapper; // For Dapper functionality
//using MySqlConnector;
////using MySql.Data.MySqlClient;



       

        
//namespace ApiOnLamda.Data
//{
//    public class DatabaseHelper
//    {
//        private readonly IConfiguration _configuration;
//        private readonly string _connectionString;
//        private static MySqlConnection _connection;

//        public DatabaseHelper(IConfiguration configuration)
//        {
//            _configuration = configuration;
//            _connectionString = _configuration.GetConnectionString("DefaultConnection");
//        }

//        public MySqlConnection GetConnection()
//        {
//            return new  MySqlConnection(_connectionString);
//        }

//        public async Task<int> AddUser(User user)
//        {
//            using (var connection = GetConnection())
//            {
//                var query = "INSERT INTO users (Name, Email, Password, Date, Role) VALUES (@Name, @Email, @Password, @Date, @Role); SELECT LAST_INSERT_ID();";
//                await connection.OpenAsync();
//                return await connection.ExecuteScalarAsync<int>(query, user);
//            }
//        }

//        public async Task<User> GetUserByEmail(string Email)
//        {
//            using (var connection = GetConnection())
//            {
//                var query = "SELECT * FROM users WHERE Email = @Email";
//                await connection.OpenAsync();
//                return await connection.QueryFirstOrDefaultAsync<User>(query, new { Email });
//            }
//        }

//        public async Task<User> CreateUserFromGoogle(GoogleJsonWebSignature.Payload payload)
//        {
//            using (var connection = GetConnection())
//            {
//                var query = "SELECT * FROM users WHERE Email = @Email";
//                await connection.OpenAsync();
//                var user = await connection.QueryFirstOrDefaultAsync<User>(query, new { Email = payload.Email.Trim() });

//                if (user != null) return user;

//                var newUser = new User
//                {
//                    Name = $"{payload.GivenName} {payload.FamilyName}",
//                    Email = payload.Email,
//                    Password = "",
//                    Date = DateTime.Now,
//                    Role = "User"
//                };

//                newUser.Id = await AddUser(newUser);
//                return newUser;
//            }
//        }

//        public async Task<List<ProductCategory>> GetAllProductsWithImagesAsync()
//        {
//            if (_connection == null)
//            {
//                _connection = GetConnection();
//            }

//            // Ensure connection is open before use
//            if (_connection.State != ConnectionState.Open)
//            {
//                await _connection.OpenAsync();
//            }

//            var productCategories = new Dictionary<int, ProductCategory>();

            
//                var query = @"
//                SELECT 
//                    p.ProductId, p.Name, p.Category, p.NewPrice, p.OldPrice, 
//                    p.Available, p.Date, p.Size, p.Description,
//                    MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
//                    GROUP_CONCAT(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrls
//                FROM products p
//                LEFT JOIN productimages pi ON p.ProductId = pi.ProductId
//                GROUP BY p.ProductId";

//            //await connection.OpenAsync();
//            //var results = await connection.QueryAsync(query);
//            var results = await _connection.QueryAsync(query);

//            foreach (var row in results)
//                {
//                    int productId = row.ProductId;

//                    if (!productCategories.TryGetValue(productId, out var productCategory))
//                    {
//                        productCategory = new ProductCategory
//                        {
//                            ProductId = productId,
//                            Name = row.Name,
//                            Category = row.Category,
//                            NewPrice = row.NewPrice,
//                            OldPrice = row.OldPrice,
//                            Available = row.Available,
//                            Date = row.Date,
//                            Size = row.Size,
//                            Description = row.Description,
//                            PrimaryImages = new List<string>(),
//                            HoverImages = new List<string>()
//                        };

//                        productCategories.Add(productId, productCategory);
//                    }

//                    if (!string.IsNullOrEmpty(row.PrimaryImageUrl))
//                    {
//                        productCategory.PrimaryImages.Add(row.PrimaryImageUrl);
//                    }

//                    if (!string.IsNullOrEmpty(row.HoverImageUrls))
//                    {
//                        productCategory.HoverImages.AddRange(row.HoverImageUrls.Split(','));
//                    }
//                }
            
//            return productCategories.Values.ToList();
//        }

    



   



//            public async Task<List<ProductCategory>> GetTopSoldItemsPerCategory()
//            {
//            var productCategories = new Dictionary<int, ProductCategory>();

//            using (var connection = GetConnection()) // Ensure GetMySqlConnection() is implemented properly
//            {
//                var query = @"
//        SELECT 
//            p.ProductId,
//            p.Name,
//            p.Category,
//            p.NewPrice,
//            p.OldPrice,
//            p.Available,
//            p.Date,
//            p.Size,
//            p.Description,
//            MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
//            MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl,
//            COALESCE(SUM(oi.Quantity), 0) AS TotalSold
//        FROM products p
//        LEFT JOIN productimages pi ON p.ProductId = pi.ProductId
//        LEFT JOIN orderitems oi ON p.ProductId = oi.ProductId
//        LEFT JOIN orders o ON oi.OrderId = o.OrderId
//        WHERE (o.Status = 'Completed' OR o.Status IS NULL)
//        GROUP BY 
//            p.ProductId, p.Name, p.Category, p.NewPrice, p.OldPrice, 
//            p.Available, p.Date, p.Size, p.Description
//        HAVING 
//            MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
//            OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL
//        ORDER BY TotalSold DESC
//        LIMIT 5;";

//                using (var command = new MySqlCommand(query, connection))
//                {
//                    await connection.OpenAsync();

//                    using (var reader = await command.ExecuteReaderAsync())
//                    {
//                        while (await reader.ReadAsync())
//                        {
//                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

//                            if (!productCategories.TryGetValue(productId, out var productCategory))
//                            {
//                                productCategory = new ProductCategory
//                                {
//                                    ProductId = productId,
//                                    Name = reader.GetString(reader.GetOrdinal("Name")),
//                                    Category = reader.GetString(reader.GetOrdinal("Category")),
//                                    NewPrice = reader.GetDecimal(reader.GetOrdinal("NewPrice")),
//                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
//                                    Available = reader.GetBoolean(reader.GetOrdinal("Available")),
//                                    Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? DateTime.MinValue : reader.GetDateTime(reader.GetOrdinal("Date")),
//                                    Size = reader.GetString(reader.GetOrdinal("Size")),
//                                    Description = reader.GetString(reader.GetOrdinal("Description")),
//                                    PrimaryImages = new List<string>(),
//                                    HoverImages = new List<string>()
//                                };

//                                productCategories.Add(productId, productCategory);
//                            }

//                            string primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl")) ? null : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));
//                            string hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl")) ? null : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

//                            if (!string.IsNullOrEmpty(primaryImageUrl))
//                            {
//                                productCategory.PrimaryImages.Add(primaryImageUrl);
//                            }

//                            if (!string.IsNullOrEmpty(hoverImageUrl))
//                            {
//                                productCategory.HoverImages.Add(hoverImageUrl);
//                            }
//                        }
//                    }
//                }
//            }

//            return productCategories.Values.ToList();
//        }

//            //update product 
//            public async Task<bool> UpdateProduct(Product product)
//            {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns a MySqlConnection
//            {
//                var query = @"UPDATE products 
//                      SET Name = @Name, 
//                          Category = @Category, 
//                          NewPrice = @NewPrice, 
//                          OldPrice = @OldPrice, 
//                          Available = @Available, 
//                          Date = @Date, 
//                          Size = @Size, 
//                          Description = @Description 
//                      WHERE ProductId = @Id";

//                using (var command = new MySqlCommand(query, connection))
//                {
//                    command.Parameters.AddWithValue("@Id", product.Id);
//                    command.Parameters.AddWithValue("@Name", product.Name);
//                    command.Parameters.AddWithValue("@Category", product.Category);
//                    command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
//                    command.Parameters.AddWithValue("@OldPrice", product.OldPrice); // Handle nullable price
//                    command.Parameters.AddWithValue("@Available", product.Available);
//                    command.Parameters.AddWithValue("@Date", product.Date);
//                    command.Parameters.AddWithValue("@Size", product.Size);
//                    command.Parameters.AddWithValue("@Description", product.Description);

//                    await connection.OpenAsync();
//                    var rowsAffected = await command.ExecuteNonQueryAsync();
//                    return rowsAffected > 0;
//                }
//            }
//        }
//        //get all product

//        public async Task<List<Product>> GetAllProducts()
//        {
//            var products = new List<Product>();

//            using (var connection = GetConnection()) // Ensure GetConnection() returns a MySqlConnection
//            {
//                var query = @"SELECT ProductId, Name, Image, Category, NewPrice, OldPrice, Available, Date 
//                      FROM products 
//                      WHERE Image IS NOT NULL";

//                using (var command = new MySqlCommand(query, connection))
//                {
//                    await connection.OpenAsync();
//                    using (var reader = await command.ExecuteReaderAsync())
//                    {
//                        while (await reader.ReadAsync())
//                        {
//                            products.Add(new Product
//                            {
//                                Id = reader.GetInt32("ProductId"),
//                                Name = reader.GetString("Name"),
//                                // Image = reader.IsDBNull("Image") ? null : reader.GetString("Image"), // Uncomment if Image is needed
//                                Category = reader.GetString("Category"),
//                                NewPrice = reader.IsDBNull("NewPrice") ? 0 : reader.GetDecimal("NewPrice"),
//                                OldPrice = reader.IsDBNull("OldPrice") ? 0 : reader.GetDecimal("OldPrice"),
//                                Available = reader.GetBoolean("Available"),
//                                Date = reader.IsDBNull("Date") ? DateTime.MinValue : reader.GetDateTime("Date") // Handle NULL values
//                            });
//                        }
//                    }
//                }
//            }

//            return products;
//        }

//            public async Task<Product> GetProductById(int id)
//            {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns a MySqlConnection
//            {
//                var query = @"SELECT ProductId, Name, Image, Category, NewPrice, OldPrice, Available, Date 
//                      FROM products 
//                      WHERE ProductId = @Id";

//                using (var command = new MySqlCommand(query, connection))
//                {
//                    command.Parameters.AddWithValue("@Id", id);

//                    await connection.OpenAsync();
//                    using (var reader = await command.ExecuteReaderAsync())
//                    {
//                        if (await reader.ReadAsync())
//                        {
//                            return new Product
//                            {
//                                Id = reader.GetInt32("ProductId"),
//                                Name = reader.GetString("Name"),
//                                // Image = reader.IsDBNull("Image") ? null : reader.GetString("Image"), // Uncomment if needed
//                                Category = reader.GetString("Category"),
//                                NewPrice = reader.IsDBNull("NewPrice") ? 0 : reader.GetDecimal("NewPrice"),
//                                OldPrice = reader.IsDBNull("OldPrice") ? 0 : reader.GetDecimal("OldPrice"),
//                                Available = reader.GetBoolean("Available"),
//                                Date = reader.IsDBNull("Date") ? DateTime.MinValue : reader.GetDateTime("Date") // Handle NULL values
//                            };
//                        }
//                    }
//                }
//            }
//            return null; // Return null if no product is found
//        }

//            public async Task<List<ProductCategory>> GetProductsByCategory(string category)
//            {
//            var productCategories = new Dictionary<int, ProductCategory>();

//            using (var connection = GetConnection())
//            {
//                var query = @"
//        SELECT 
//            p.ProductId,
//            p.Name,
//            p.Category,
//            p.NewPrice,
//            p.OldPrice,
//            p.Available,
//            p.Date,
//            p.Size,
//            p.Description,
//            MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl ELSE NULL END) AS PrimaryImageUrl,
//            MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl ELSE NULL END) AS HoverImageUrl
//        FROM
//            products p
//        LEFT JOIN
//            productimages pi ON p.ProductId = pi.ProductId
//        WHERE
//            p.Category = @category
//        GROUP BY 
//            p.ProductId, p.Name, p.Category, p.NewPrice, p.OldPrice, 
//            p.Available, p.Date, p.Size, p.Description
//        HAVING 
//       PrimaryImageUrl IS NOT NULL OR HoverImageUrl IS NOT NULL;

//        ";

//                using (var command = new MySqlCommand(query, connection))
//                {
//                    command.Parameters.AddWithValue("@category", category);

//                    await connection.OpenAsync();
//                    using (var reader = await command.ExecuteReaderAsync())
//                    {
//                        while (await reader.ReadAsync())
//                        {
//                            int productId = reader.GetInt32("ProductId");

//                            if (!productCategories.TryGetValue(productId, out var productCategory))
//                            {
//                                productCategory = new ProductCategory
//                                {
//                                    ProductId = productId,
//                                    Name = reader.GetString("Name"),
//                                    Category = reader.GetString("Category"),
//                                    NewPrice = reader.GetDecimal("NewPrice"),
//                                    OldPrice = reader.IsDBNull("OldPrice") ? (decimal?)null : reader.GetDecimal("OldPrice"),
//                                    Available = reader.GetBoolean("Available"),
//                                    Date = reader.IsDBNull("Date") ? DateTime.MinValue : reader.GetDateTime("Date"),
//                                    Size = reader.GetString("Size"),
//                                    Description = reader.GetString("Description"),
//                                    PrimaryImages = new List<string>(),
//                                    HoverImages = new List<string>()
//                                };

//                                productCategories.Add(productId, productCategory);
//                            }

//                            string primaryImageUrl = reader.IsDBNull("PrimaryImageUrl") ? null : reader.GetString("PrimaryImageUrl");
//                            string hoverImageUrl = reader.IsDBNull("HoverImageUrl") ? null : reader.GetString("HoverImageUrl");

//                            if (!string.IsNullOrEmpty(primaryImageUrl))
//                            {
//                                productCategory.PrimaryImages.Add(primaryImageUrl);
//                            }

//                            if (!string.IsNullOrEmpty(hoverImageUrl))
//                            {
//                                productCategory.HoverImages.Add(hoverImageUrl);
//                            }
//                        }
//                    }
//                }
//            }
//            return productCategories.Values.ToList();
//        }



//        public async Task<List<ProductCategory>> GetMostRecentProducts()
//        {
//            var products = new Dictionary<int, ProductCategory>();

//            using (var connection = GetConnection()) // Ensure GetConnection() returns a MySqlConnection
//            {
//                var query = @"
//            SELECT 
//                p.ProductId,
//                p.Name,
//                p.Category,
//                p.NewPrice,
//                p.OldPrice,
//                p.Available,
//                p.Date,
//                p.Size,
//                p.Description,
//                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl ELSE NULL END) AS PrimaryImageUrl,
//                MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl ELSE NULL END) AS HoverImageUrl
//            FROM products p
//            LEFT JOIN productimages pi ON p.ProductId = pi.ProductId
//            WHERE p.Date <= NOW()
//            GROUP BY p.ProductId, p.Name, p.Category, p.NewPrice, p.OldPrice, p.Available, p.Date, p.Size, p.Description
//            HAVING 
//                (MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl ELSE NULL END) IS NOT NULL OR 
//                MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl ELSE NULL END) IS NOT NULL)
//            ORDER BY p.Date DESC;";

//                using (var command = new MySqlCommand(query, connection))
//                {
//                    await connection.OpenAsync();
//                    using (var reader = await command.ExecuteReaderAsync())
//                    {
//                        while (await reader.ReadAsync())
//                        {
//                            int productId = reader.GetInt32("ProductId");

//                            if (!products.TryGetValue(productId, out var product))
//                            {
//                                product = new ProductCategory
//                                {
//                                    ProductId = productId,
//                                    Name = reader.GetString("Name"),
//                                    Category = reader.GetString("Category"),
//                                    NewPrice = reader.IsDBNull("NewPrice") ? 0 : reader.GetDecimal("NewPrice"),
//                                    OldPrice = reader.IsDBNull("OldPrice") ? (decimal?)null : reader.GetDecimal("OldPrice"),
//                                    Available = reader.GetBoolean("Available"),
//                                    Date = reader.IsDBNull("Date") ? DateTime.MinValue : reader.GetDateTime("Date"),
//                                    Size = reader.GetString("Size"),
//                                    Description = reader.GetString("Description"),
//                                    PrimaryImages = new List<string>(),
//                                    HoverImages = new List<string>()
//                                };

//                                products.Add(productId, product);
//                            }

//                            string primaryImageUrl = reader.IsDBNull("PrimaryImageUrl") ? null : reader.GetString("PrimaryImageUrl");
//                            string hoverImageUrl = reader.IsDBNull("HoverImageUrl") ? null : reader.GetString("HoverImageUrl");

//                            if (!string.IsNullOrEmpty(primaryImageUrl))
//                            {
//                                product.PrimaryImages.Add(primaryImageUrl);
//                            }

//                            if (!string.IsNullOrEmpty(hoverImageUrl))
//                            {
//                                product.HoverImages.Add(hoverImageUrl);
//                            }
//                        }
//                    }
//                }
//            }
//            return products.Values.ToList();
//        }







        //    public async Task<List<ProductImageResponse>> GetProductImagesAsync(int productId)
        //    {

        //    using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
        //    {
        //        var parameters = new DynamicParameters();
        //        parameters.Add("@ProductId", productId, DbType.Int32);

        //        var images = await connection.QueryAsync<ProductImageResponse>(
        //            "GetProductImagesByProductId",
        //            parameters,
        //            commandType: CommandType.StoredProcedure
        //        );

        //        return images.AsList();
        //    }
        //}

//        public async Task<List<ProductImageResponse>> GetProductImagesAsync(int productId)
//        {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var parameters = new DynamicParameters();
//                parameters.Add("p_ProductId", productId, DbType.Int32); // Match the procedure parameter name

//                var images = await connection.QueryAsync<ProductImageResponse>(
//                    "GetProductImagesByProductId",
//                    parameters,
//                    commandType: CommandType.StoredProcedure
//                );

//                return images.AsList();
//            }
//        }



//        public async Task<bool> SaveCheckoutDataAsync(checkoutrequestdata request)
//            {
//                using (var connection = GetConnection())
//                {
//                    try
//                    {
//                        // Define parameters for the stored procedure
//                        var parameters = new DynamicParameters();
//                        parameters.Add("@UserId", request.UserId, DbType.Int32);
//                        parameters.Add("@TotalAmount", request.TotalAmount, DbType.Decimal);
//                        parameters.Add("@DeliveryMethod", request.DeliveryMethod, DbType.String);
//                        parameters.Add("@AddressLine1", request.AddressLine1, DbType.String);
//                        parameters.Add("@AddressLine2", request.AddressLine2, DbType.String);
//                        parameters.Add("@City", request.City, DbType.String);
//                        parameters.Add("@State", request.State, DbType.String);
//                        parameters.Add("@PostalCode", request.PostalCode, DbType.String);
//                        parameters.Add("@Country", request.Country, DbType.String);
//                        parameters.Add("@Phone", request.Phone, DbType.String);
//                        parameters.Add("@MarketingConsent", request.MarketingConsent, DbType.Boolean);



//                        var cartItemsTable = CreateCartItemsDataTable(request.CartItems);
//                        parameters.Add("@CartItems", cartItemsTable.AsTableValuedParameter("CartItemType"));


//                        // Update the TotalAmount parameter with the calculated value
//                        //parameters.Add("@CalculatedTotalAmount", totalAmount, DbType.Decimal);

//                        // Execute the stored procedure
//                        await connection.ExecuteAsync(
//                            "SaveCheckoutData",
//                            parameters,
//                            commandType: CommandType.StoredProcedure);



//                        //// Execute the stored procedure
//                        //await connection.ExecuteAsync(
//                        //    "SaveCheckoutData",
//                        //    parameters,
//                        //    commandType: CommandType.StoredProcedure);

//                        return true;
//                    }
//                    catch (Exception ex)
//                    {
//                        Console.WriteLine($"Error saving checkout data: {ex.Message}");
//                        return false;
//                    }
//                }
//            }



//            private DataTable CreateCartItemsDataTable(List<Cart> cartItems)
//            {
//                // Create a new DataTable with the same structure as CartItemType
//                if (cartItems == null || !cartItems.Any())
//                {
//                    throw new ArgumentException("Cart items list is null or empty.");
//                }


//                var columnsToInclude = new List<string> { "ProductId", "Quantity", "Price", "Date" };

//                // Pass only the required columns
//                return ToDataTable(cartItems, columnsToInclude);
//            }



//            public static DataTable ToDataTable<T>(IEnumerable<T> items, IEnumerable<string> columnsToInclude)
//            {
//                var dataTable = new DataTable();

//                // Filter properties based on the required columns
//                var properties = typeof(T).GetProperties()
//                    .Where(p => columnsToInclude.Contains(p.Name))
//                    .ToList();

//                // Add columns to the DataTable
//                foreach (var columnName in columnsToInclude)
//                {
//                    var prop = properties.FirstOrDefault(p => p.Name == columnName);
//                    if (prop != null)
//                    {
//                        dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
//                    }
//                }

//                foreach (var item in items)
//                {
//                    //var row = dataTable.NewRow();
//                    DataRow row = dataTable.NewRow();
//                    foreach (var columnName in columnsToInclude)
//                    {
//                        var prop = properties.FirstOrDefault(p => p.Name == columnName);
//                        if (prop != null)
//                        {
//                            row[columnName] = prop.GetValue(item) ?? DBNull.Value;
//                        }
//                    }
//                    try
//                    {
//                        dataTable.Rows.Add(row); // Add explicitly cast row to match DataTable schema
//                    }
//                    catch (Exception ex)
//                    {
//                        Console.WriteLine($"Error adding row: {ex.Message}");
//                    }
//                }


//                return dataTable;

//            }
//            public static DataTable ToDataTable<T>(IEnumerable<T> items)
//            {
//                var dataTable = new DataTable(typeof(T).Name);

//                // Create columns
//                foreach (var prop in typeof(T).GetProperties())
//                {
//                    dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
//                }

//                // Populate rows
//                foreach (var item in items)
//                {
//                    var row = dataTable.NewRow();
//                    foreach (var prop in typeof(T).GetProperties())
//                    {
//                        row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
//                    }
//                    dataTable.Rows.Add(row);
//                }

//                return dataTable;
//            }





//            // Delete Product
//            public async Task<bool> DeleteProduct(int id)
//            {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                try
//                {
//                    // Define the query for deleting the product
//                    var command = new MySqlCommand("DELETE FROM products WHERE ProductId = @Id", connection);
//                    command.Parameters.AddWithValue("@Id", id);

//                    await connection.OpenAsync();
//                    var rowsAffected = await command.ExecuteNonQueryAsync();

//                    return rowsAffected > 0; // Return true if product was deleted, false if not
//                }
//                catch (Exception ex)
//                {
//                    Console.WriteLine($"Error deleting product: {ex.Message}");
//                    return false;
//                }
//            }
//        }







//            public async Task<bool> ProceedWithTransactionAsync(int userId, decimal totalAmount, List<OrderItem> orderItems)
//            {
//                using (var connection = GetConnection())
//                {
//                    await connection.OpenAsync();
//                    using (var transaction = connection.BeginTransaction())
//                    {
//                        try
//                        {
//                            // 1. Insert the Order
//                            string insertOrderQuery = @"
//                    INSERT INTO orders (UserId, OrderDate, TotalAmount, Status)
//                    VALUES (@UserId, GETDATE(), @TotalAmount, 'Completed');
//                    SELECT CAST(SCOPE_IDENTITY() AS INT);";

//                            int orderId = await connection.ExecuteScalarAsync<int>(
//                                insertOrderQuery,
//                                new { UserId = userId, TotalAmount = totalAmount },
//                                transaction);

//                            // 2. Insert Order Items and Update Stock
//                            foreach (var item in orderItems)
//                            {
//                                // Insert order item
//                                string insertOrderItemQuery = @"
//                        INSERT INTO orderitems (OrderId, ProductId, Quantity, Price)
//                        VALUES (@OrderId, @ProductId, @Quantity, @Price);";

//                                await connection.ExecuteAsync(
//                                    insertOrderItemQuery,
//                                    new
//                                    {
//                                        OrderId = orderId,
//                                        ProductId = item.ProductId,
//                                        Quantity = item.Quantity,
//                                        Price = item.Price
//                                    },
//                                    transaction);


//                            }

//                            // 3. Clear the Cart
//                            string clearCartQuery = "DELETE FROM cart WHERE UserId = @UserId;";
//                            await connection.ExecuteAsync(
//                                clearCartQuery,
//                                new { UserId = userId },
//                                transaction);

//                            // Commit the transaction
//                            transaction.Commit();
//                            return true;
//                        }
//                        catch (Exception ex)
//                        {
//                            // Rollback the transaction on error
//                            transaction.Rollback();
//                            Console.WriteLine($"Transaction failed: {ex.Message}");
//                            return false;
//                        }
//                    }
//                }
//            }


//            //order management
//            public async Task<int> AddOrder(int userId, decimal totalAmount)
//            {
//            try
//            {
//                using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//                {
//                    var command = new MySqlCommand(@"
//            INSERT INTO orders (UserId, OrderDate, Status, TotalAmount)
//            VALUES (@UserId, @OrderDate, @Status, @TotalAmount);
//            SELECT LAST_INSERT_ID();", connection);

//                    command.Parameters.AddWithValue("@UserId", userId);
//                    command.Parameters.AddWithValue("@OrderDate", DateTime.Now);
//                    command.Parameters.AddWithValue("@Status", "Pending");
//                    command.Parameters.AddWithValue("@TotalAmount", totalAmount);

//                    await connection.OpenAsync();
//                    var result = await command.ExecuteScalarAsync();
//                    return Convert.ToInt32(result); // Returns the generated OrderId
//                }
//            }
//            catch (Exception ex)
//            {
//                // Log the exception
//                Console.WriteLine($"Error in AddOrder: {ex.Message}");
//                throw; // Re-throw the exception to propagate to the controller
//            }
//        }


//            public async Task<int> ClearCart(int userId)
//            {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var command = new MySqlCommand("DELETE FROM cart WHERE UserId = @UserId", connection);
//                command.Parameters.AddWithValue("@UserId", userId);

//                await connection.OpenAsync();
//                return await command.ExecuteNonQueryAsync(); // Returns the number of rows affected
//            } // Returns the number of rows affected
//        }




//            //public async Task<int> AddOrderItem(int orderId, int productId, int quantity, decimal price)
//            public async Task<int> AddOrderItem(OrderItem orderItem)
//            {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var command = new MySqlCommand(@"
//INSERT INTO orderitems (OrderId, ProductId, Quantity, Price)
//VALUES (@OrderId, @ProductId, @Quantity, @Price);", connection);

//                command.Parameters.AddWithValue("@OrderId", orderItem.OrderId);
//                command.Parameters.AddWithValue("@ProductId", orderItem.ProductId);
//                command.Parameters.AddWithValue("@Quantity", orderItem.Quantity);
//                command.Parameters.AddWithValue("@Price", orderItem.Price);

//                await connection.OpenAsync();
//                return await command.ExecuteNonQueryAsync(); // Returns the number of rows affected
//            }
//        }

//            //cart management
//            // Cart Management
//            public async Task<int> AddCartItem(Cart cartItem)
//            {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var command = new MySqlCommand(@"
//        INSERT INTO cartitem (UserId, ProductId, Quantity, Date)
//        VALUES (@UserId, @ProductId, @Quantity, @Date);
//        SELECT LAST_INSERT_ID();", connection);

//                command.Parameters.AddWithValue("@UserId", cartItem.UserId);
//                command.Parameters.AddWithValue("@ProductId", cartItem.ProductId);
//                command.Parameters.AddWithValue("@Quantity", cartItem.Quantity);
//                command.Parameters.AddWithValue("@Date", DateTime.Now);

//                await connection.OpenAsync();
//                var result = await command.ExecuteScalarAsync();
//                return Convert.ToInt32(result); // Returns the ID of the last inserted record
//            }
//        }

//            public async Task<List<Cart>> GetCartItemsForUser(int userId)
//            {
//            var cartItems = new List<Cart>();
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var command = new MySqlCommand("SELECT * FROM cartitem WHERE UserId = @UserId", connection); // Table name changed to CartI for MySQL
//                command.Parameters.AddWithValue("@UserId", userId);

//                await connection.OpenAsync();
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        cartItems.Add(new Cart
//                        {
//                            Id = reader.GetInt32(0),
//                            UserId = reader.GetInt32(1),
//                            ProductId = reader.GetInt32(2),
//                            Quantity = reader.GetInt32(3),
//                            Date = reader.GetDateTime(4)
//                        });
//                    }
//                }
//            }
//            return cartItems;
//        }




//            // Method to get Cart Items by date range
//            public async Task<List<Cart>> GetCartItemsByDateRange(DateTime startDate, DateTime endDate)
//            {
//            var cartItems = new List<Cart>();

//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var command = new MySqlCommand(
//                    "SELECT CartId, UserId, ProductId, Quantity, Date FROM cartitem WHERE Date BETWEEN @StartDate AND @EndDate", // Table name changed to CartI for MySQL
//                    connection
//                );

//                command.Parameters.AddWithValue("@StartDate", startDate);
//                command.Parameters.AddWithValue("@EndDate", endDate);

//                await connection.OpenAsync();
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        cartItems.Add(new Cart
//                        {
//                            Id = reader.GetInt32(0),
//                            UserId = reader.GetInt32(1),
//                            ProductId = reader.GetInt32(2),
//                            Quantity = reader.GetInt32(3),
//                            Date = reader.GetDateTime(4)
//                        });
//                    }
//                }
//            }

//            return cartItems;
//        }



//        public async Task InsertProductImage(int productId, string imageType, string imageUrl)
//        {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var command = new MySqlCommand("InsertProductImage", connection)
//                {
//                    CommandType = CommandType.StoredProcedure
//                };

//                command.Parameters.AddWithValue("@ProductId", productId);
//                command.Parameters.AddWithValue("@ImageType", imageType);
//                command.Parameters.AddWithValue("@ImageUrl", imageUrl);

//                await connection.OpenAsync();
//                await command.ExecuteNonQueryAsync();
//            }
//        }

//        public async Task<int> AddProduct(Product product)
//        {
//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var command = new MySqlCommand(@"
//            INSERT INTO products (Name, Image, Category, NewPrice, OldPrice, Available, Date, Size, Description)
//            VALUES (@Name, @Image, @Category, @NewPrice, @OldPrice, @Available, @Date, @Size, @Description);
//            SELECT LAST_INSERT_ID();", connection);

//                command.Parameters.AddWithValue("@Name", product.Name);
//                command.Parameters.AddWithValue("@Image", product.Image);
//                command.Parameters.AddWithValue("@Category", product.Category);
//                command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
//                command.Parameters.AddWithValue("@OldPrice", product.OldPrice);
//                command.Parameters.AddWithValue("@Available", product.Available);
//                command.Parameters.AddWithValue("@Date", product.Date);
//                command.Parameters.AddWithValue("@Size", product.Size);
//                command.Parameters.AddWithValue("@Description", product.Description);

//                await connection.OpenAsync();
//                var result = await command.ExecuteScalarAsync();
//                return Convert.ToInt32(result);
//            }
//        }







//        public async Task<List<SalesReport>> GetTotalSalesReport(DateTime startDate, DateTime endDate)
//        {
//            var salesReport = new List<SalesReport>();

//            using (var connection = GetConnection()) // Ensure GetConnection() returns MySqlConnection
//            {
//                var query = @"
//            SELECT 
//                DATE_FORMAT(o.OrderDate, '%d/%m/%Y') AS Date, -- Format as DD/MM/YYYY in MySQL
//                p.Category AS Category,
//                SUM(oi.Quantity) AS TotalSalesCount
//            FROM 
//                Orderitems oi
//            JOIN 
//                orders o ON oi.OrderId = o.OrderId
//            JOIN 
//                products p ON oi.ProductId = p.ProductId
//            WHERE 
//                o.OrderDate BETWEEN @StartDate AND @EndDate
//                AND o.Status = 'completed'
//            GROUP BY 
//                DATE_FORMAT(o.OrderDate, '%d/%m/%Y'), 
//                p.Category
//            ORDER BY 
//                Date, 
//                Category;
//        ";

//                var command = new MySqlCommand(query, connection);

//                // Add parameters for the query
//                command.Parameters.AddWithValue("@StartDate", startDate);
//                command.Parameters.AddWithValue("@EndDate", endDate);

//                // Open database connection
//                await connection.OpenAsync();

//                // Execute the query and process results
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        salesReport.Add(new SalesReport
//                        {
//                            SaleDate = DateTime.ParseExact(reader.GetString(0), "dd/MM/yyyy", null), // Explicit parsing for Date
//                            Category = reader.GetString(1),
//                            TotalSales = reader.GetInt32(2)
//                        });
//                    }
//                }
//            }

//            return salesReport;

//        }
//    }
//}

        // New method for creating a user from Google Sign-In payload
        //public async Task<User> CreateUserFromGoogle(GoogleJsonWebSignature.Payload payload)
        //{
        //    using (var connection = GetConnection())
        //    {
        //        // First, check if the user already exists in the database using the email from Google payload
        //        var command = new SqlCommand("SELECT * FROM Users WHERE Email = @Email", connection);
        //        command.Parameters.AddWithValue("@Email", payload.Email);

//        await connection.OpenAsync();
//        using (var reader = await command.ExecuteReaderAsync())
//        {
//            if (await reader.ReadAsync())
//            {
//                // If the user already exists, return the existing user
//                return new User
//                {
//                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
//                    Name = reader.GetString(reader.GetOrdinal("Name")),
//                    Email = reader.GetString(reader.GetOrdinal("Email")),
//                    Password = reader.GetString(reader.GetOrdinal("Password")), // You might want to handle password securely
//                    Date = reader.GetDateTime(reader.GetOrdinal("Date")),
//                    Role = reader.GetString(reader.GetOrdinal("Role"))
//                };
//            }
//            else
//            {
//                // If the user doesn't exist, create a new user in the database using the Google payload
//                var newUser = new User
//                {
//                    Name = payload.GivenName + " " + payload.FamilyName,
//                    Email = payload.Email,
//                    Password = "", // Since the user is signing in with Google, no password is needed
//                    Date = DateTime.Now,
//                    Role = "User" // Default role for new users (you can adjust as needed)
//                };

//                var userId = await AddUser(newUser);
//                newUser.Id = userId;
//                return newUser;
//            }
//        }
//    }
//}

// start product management
//        public async Task<int> AddProduct(Product product)
//        {
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand(@"
//    INSERT INTO Products (Name,Image, Category, NewPrice, OldPrice, Available, Date,Size, Description)
//    VALUES (@Name,@Image, @Category, @NewPrice, @OldPrice, @Available, @Date,@Size, @Description);
//    SELECT SCOPE_IDENTITY();", connection);

//                command.Parameters.AddWithValue("@Name", product.Name);
//                command.Parameters.AddWithValue("@Image", product.Image);
//                command.Parameters.AddWithValue("@Category", product.Category);
//                command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
//                command.Parameters.AddWithValue("@OldPrice", product.OldPrice);
//                command.Parameters.AddWithValue("@Available", product.Available);
//                command.Parameters.AddWithValue("@Date", product.Date);
//                command.Parameters.AddWithValue("@Size", product.Size);
//                command.Parameters.AddWithValue("@Description", product.Description);

//                await connection.OpenAsync();
//                var result = await command.ExecuteScalarAsync();
//                return Convert.ToInt32(result);
//            }
//        }


//        // Database helper method for inserting product images                                                                                




//        public async Task InsertProductImage(int productId, string imageType, string imageUrl)
//        {
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand("InsertProductImage", connection)
//                {
//                    CommandType = CommandType.StoredProcedure
//                };

//                command.Parameters.AddWithValue("@ProductId", productId);
//                command.Parameters.AddWithValue("@ImageType", imageType);
//                command.Parameters.AddWithValue("@ImageUrl", imageUrl);

//                await connection.OpenAsync();
//                await command.ExecuteNonQueryAsync();
//            }
//        }




//        public async Task<List<ProductCategory>> GetTopSoldItemsPerCategory()
//        {
//            var productCategories = new Dictionary<int, ProductCategory>();

//            using (var connection = GetConnection())
//            {
//                var query = @"
//    SELECT TOP 5 
//        p.ProductId,
//        p.Name,
//        p.Category,
//        p.NewPrice,
//        p.OldPrice,
//        p.Available,
//        p.Date,
//        p.Size,
//        p.Description,
//        MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
//        MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl,
//        SUM(oi.Quantity) AS TotalSold
//    FROM
//        dbo.Products p
//    LEFT JOIN
//        dbo.ProductImages pi ON p.ProductId = pi.ProductId
//    LEFT JOIN
//        dbo.OrderItems oi ON p.ProductId = oi.ProductId
//    LEFT JOIN
//        dbo.Orders o ON oi.OrderId = o.OrderId
//    WHERE
//      (o.Status = 'Completed' OR o.Status IS NULL)
//    GROUP BY 
//        p.ProductId, p.Name, p.Category, p.NewPrice, p.OldPrice, 
//        p.Available, p.Date, p.Size, p.Description
//    HAVING
//        MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
//        OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL
//    ORDER BY 
//        TotalSold DESC;";

//                using (var command = new SqlCommand(query, connection))
//                {


//                    // Open the connection asynchronously
//                    await connection.OpenAsync();

//                    // Execute the command and process the results
//                    using (var reader = await command.ExecuteReaderAsync())
//                    {
//                        while (await reader.ReadAsync())
//                        {
//                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

//                            // Check if the product already exists in the dictionary
//                            if (!productCategories.TryGetValue(productId, out var productCategory))
//                            {
//                                productCategory = new ProductCategory
//                                {
//                                    ProductId = productId,
//                                    Name = reader.GetString(reader.GetOrdinal("Name")),
//                                    Category = reader.GetString(reader.GetOrdinal("Category")),
//                                    NewPrice = reader.GetDecimal(reader.GetOrdinal("NewPrice")),
//                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
//                                    Available = reader.GetBoolean(reader.GetOrdinal("Available")),
//                                    Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? DateTime.MinValue : reader.GetDateTime(reader.GetOrdinal("Date")),
//                                    Size = reader.GetString(reader.GetOrdinal("Size")),
//                                    Description = reader.GetString(reader.GetOrdinal("Description")),
//                                    PrimaryImages = new List<string>(),
//                                    HoverImages = new List<string>()
//                                };

//                                productCategories.Add(productId, productCategory);
//                            }

//                            // Add image URLs to the appropriate collection
//                            string primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl"))
//                                ? null
//                                : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));

//                            string hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl"))
//                                ? null
//                                : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

//                            if (!string.IsNullOrEmpty(primaryImageUrl))
//                            {
//                                productCategory.PrimaryImages.Add(primaryImageUrl);
//                            }

//                            if (!string.IsNullOrEmpty(hoverImageUrl))
//                            {
//                                productCategory.HoverImages.Add(hoverImageUrl);
//                            }
//                        }
//                    }
//                }
//            }

//            return productCategories.Values.ToList();
//        }

//        //update product 
//        public async Task<bool> UpdateProduct(Product product)
//        {
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand("UPDATE Products SET Name = @Name, Image = @Image, Category = @Category, NewPrice = @NewPrice, OldPrice = @OldPrice, Available = @Available, Date = @Date,Size=@Size, Description=@Description WHERE ProductId = @Id", connection);
//                command.Parameters.AddWithValue("@Id", product.Id);
//                command.Parameters.AddWithValue("@Name", product.Name);
//                //command.Parameters.AddWithValue("@Image", product.Image);
//                command.Parameters.AddWithValue("@Category", product.Category);
//                command.Parameters.AddWithValue("@NewPrice", product.NewPrice);
//                command.Parameters.AddWithValue("@OldPrice", product.OldPrice);
//                command.Parameters.AddWithValue("@Available", product.Available);
//                command.Parameters.AddWithValue("@Date", product.Date);
//                command.Parameters.AddWithValue("@Size", product.Size);
//                command.Parameters.AddWithValue("@Description", product.Description);


//                await connection.OpenAsync();
//                var rowsAffected = await command.ExecuteNonQueryAsync();
//                return rowsAffected > 0;
//            }
//        }
//        //get all product

//        public async Task<List<Product>> GetAllProducts()
//        {
//            var products = new List<Product>();
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand("SELECT ProductId, Name, Image, Category, NewPrice, OldPrice, Available, Date FROM Products Where Image IS NOT NULL", connection);
//                await connection.OpenAsync();
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        products.Add(new Product
//                        {
//                            Id = reader.GetInt32(0),
//                            Name = reader.GetString(1),
//                            //Image = reader.IsDBNull(2) ? null : reader.GetString(2), // Handle NULL values for Image
//                            Category = reader.GetString(3),
//                            NewPrice = reader.IsDBNull(4) ? 0 : reader.GetDecimal(4), // Handle NULL values for NewPrice
//                            OldPrice = reader.IsDBNull(5) ? 0 : reader.GetDecimal(5), // Handle NULL values for OldPrice
//                            Available = reader.GetBoolean(6),
//                            Date = reader.IsDBNull(7) ? DateTime.MinValue : reader.GetDateTime(7) // Handle NULL values for 
//                        });
//                    }
//                }
//            }
//            return products;
//        }

//        public async Task<Product> GetProductById(int id)
//        {
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand("SELECT ProductId, Name, Image, Category, NewPrice, OldPrice, Available, Date FROM Products WHERE ProductId = @Id", connection);
//                command.Parameters.AddWithValue("@Id", id);

//                await connection.OpenAsync();
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    if (await reader.ReadAsync())
//                    {
//                        return new Product
//                        {
//                            Id = reader.GetInt32(0),
//                            Name = reader.GetString(1),
//                            //Image = reader.GetString(2),
//                            Category = reader.GetString(3),
//                            NewPrice = reader.GetDecimal(4),
//                            OldPrice = reader.GetDecimal(5),
//                            Available = reader.GetBoolean(6),
//                            Date = reader.GetDateTime(7)
//                        };
//                    }
//                }
//            }
//            return null;
//        }

//        public async Task<List<ProductCategory>> GetProductsByCategory(string category)
//        {
//            var productCategories = new Dictionary<int, ProductCategory>();

//            using (var connection = GetConnection())
//            {
//                var query = @"
//            SELECT 
//                p.ProductId,
//                p.Name,
//                p.Category,
//                p.NewPrice,
//                p.OldPrice,
//                p.Available,
//                p.Date,
//                p.Size,
//                p.Description,
//                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
//                MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl
//            FROM
//                dbo.Products p
//            LEFT JOIN
//                dbo.ProductImages pi
//            ON
//                p.ProductId = pi.ProductId
//            WHERE
//                p.Category = @category
//            GROUP BY 
//                p.ProductId, p.Name, p.Category, p.NewPrice, p.OldPrice, 
//                p.Available, p.Date, p.Size, p.Description
//            HAVING
//                MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
//                OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL;";

//                using (var command = new SqlCommand(query, connection))
//                {
//                    // Add the category parameter
//                    command.Parameters.AddWithValue("@category", category);

//                    // Open the connection asynchronously
//                    await connection.OpenAsync();

//                    // Execute the command and process the results
//                    using (var reader = await command.ExecuteReaderAsync())
//                    {
//                        while (await reader.ReadAsync())
//                        {
//                            int productId = reader.GetInt32(reader.GetOrdinal("ProductId"));

//                            // Check if the product already exists in the dictionary
//                            if (!productCategories.TryGetValue(productId, out var productCategory))
//                            {
//                                productCategory = new ProductCategory
//                                {
//                                    ProductId = productId,
//                                    Name = reader.GetString(reader.GetOrdinal("Name")),
//                                    Category = reader.GetString(reader.GetOrdinal("Category")),
//                                    NewPrice = reader.GetDecimal(reader.GetOrdinal("NewPrice")),
//                                    OldPrice = reader.IsDBNull(reader.GetOrdinal("OldPrice")) ? (decimal?)null : reader.GetDecimal(reader.GetOrdinal("OldPrice")),
//                                    Available = reader.GetBoolean(reader.GetOrdinal("Available")),
//                                    Date = reader.IsDBNull(reader.GetOrdinal("Date")) ? DateTime.MinValue : reader.GetDateTime(reader.GetOrdinal("Date")),
//                                    Size = reader.GetString(reader.GetOrdinal("Size")),
//                                    Description = reader.GetString(reader.GetOrdinal("Description")),
//                                    PrimaryImages = new List<string>(),
//                                    HoverImages = new List<string>()
//                                };

//                                productCategories.Add(productId, productCategory);
//                            }

//                            // Add image URLs to the appropriate collection
//                            string primaryImageUrl = reader.IsDBNull(reader.GetOrdinal("PrimaryImageUrl"))
//                                ? null
//                                : reader.GetString(reader.GetOrdinal("PrimaryImageUrl"));

//                            string hoverImageUrl = reader.IsDBNull(reader.GetOrdinal("HoverImageUrl"))
//                                ? null
//                                : reader.GetString(reader.GetOrdinal("HoverImageUrl"));

//                            if (!string.IsNullOrEmpty(primaryImageUrl))
//                            {
//                                productCategory.PrimaryImages.Add(primaryImageUrl);
//                            }

//                            if (!string.IsNullOrEmpty(hoverImageUrl))
//                            {
//                                productCategory.HoverImages.Add(hoverImageUrl);
//                            }
//                        }
//                    }
//                }
//            }

//            return productCategories.Values.ToList();
//        }



//        public async Task<List<Product>> GetMostRecentProducts()
//        {
//            var products = new List<Product>();

//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand(@"
//                SELECT ProductId, Name, Image, Category, NewPrice, OldPrice, Available, Date 
//                FROM Products 
//                WHERE Image IS NOT NULL AND Date <= GETDATE()
//                ORDER BY Date DESC;", connection);
//                await connection.OpenAsync();
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        products.Add(new Product
//                        {
//                            Id = reader.GetInt32(0),
//                            Name = reader.GetString(1),
//                            //Image = reader.IsDBNull(2) ? null : reader.GetString(2), // Handle NULL values for Image
//                            Category = reader.GetString(3),
//                            NewPrice = reader.IsDBNull(4) ? 0 : reader.GetDecimal(4), // Handle NULL values for NewPrice
//                            OldPrice = reader.IsDBNull(5) ? 0 : reader.GetDecimal(5), // Handle NULL values for OldPrice
//                            Available = reader.GetBoolean(6),
//                            Date = reader.IsDBNull(7) ? DateTime.MinValue : reader.GetDateTime(7) // Handle NULL values for 
//                        });
//                    }
//                }
//            }






//            return products;
//        }




//        public async Task<List<ProductImageResponse>> GetProductImagesAsync(int productId)
//        {
//            using (var connection = GetConnection()) // Assuming GetConnection() sets up your DB connection
//            {
//                var parameters = new DynamicParameters();
//                parameters.Add("@ProductId", productId, DbType.Int32);

//                var images = await connection.QueryAsync<ProductImageResponse>(
//                    "GetProductImagesByProductId",
//                    parameters,
//                    commandType: CommandType.StoredProcedure
//                );

//                return images.AsList();
//            }
//        }

//        public async Task<bool> SaveCheckoutDataAsync(checkoutrequestdata request)
//        {
//            using (var connection = GetConnection())
//            {
//                try
//                {
//                    // Define parameters for the stored procedure
//                    var parameters = new DynamicParameters();
//                    parameters.Add("@UserId", request.UserId, DbType.Int32);
//                    parameters.Add("@TotalAmount", request.TotalAmount, DbType.Decimal);
//                    parameters.Add("@DeliveryMethod", request.DeliveryMethod, DbType.String);
//                    parameters.Add("@AddressLine1", request.AddressLine1, DbType.String);
//                    parameters.Add("@AddressLine2", request.AddressLine2, DbType.String);
//                    parameters.Add("@City", request.City, DbType.String);
//                    parameters.Add("@State", request.State, DbType.String);
//                    parameters.Add("@PostalCode", request.PostalCode, DbType.String);
//                    parameters.Add("@Country", request.Country, DbType.String);
//                    parameters.Add("@Phone", request.Phone, DbType.String);
//                    parameters.Add("@MarketingConsent", request.MarketingConsent, DbType.Boolean);



//                    var cartItemsTable = CreateCartItemsDataTable(request.CartItems);
//                    parameters.Add("@CartItems", cartItemsTable.AsTableValuedParameter("CartItemType"));


//                    // Update the TotalAmount parameter with the calculated value
//                    //parameters.Add("@CalculatedTotalAmount", totalAmount, DbType.Decimal);

//                    // Execute the stored procedure
//                    await connection.ExecuteAsync(
//                        "SaveCheckoutData",
//                        parameters,
//                        commandType: CommandType.StoredProcedure);



//                    //// Execute the stored procedure
//                    //await connection.ExecuteAsync(
//                    //    "SaveCheckoutData",
//                    //    parameters,
//                    //    commandType: CommandType.StoredProcedure);

//                    return true;
//                }
//                catch (Exception ex)
//                {
//                    Console.WriteLine($"Error saving checkout data: {ex.Message}");
//                    return false;
//                }
//            }
//        }



//        private DataTable CreateCartItemsDataTable(List<Cart> cartItems)
//        {
//            // Create a new DataTable with the same structure as CartItemType
//            if (cartItems == null || !cartItems.Any())
//            {
//                throw new ArgumentException("Cart items list is null or empty.");
//            }


//            var columnsToInclude = new List<string> { "ProductId", "Quantity", "Price", "Date" };

//            // Pass only the required columns
//            return ToDataTable(cartItems, columnsToInclude);
//        }



//        public static DataTable ToDataTable<T>(IEnumerable<T> items, IEnumerable<string> columnsToInclude)
//        {
//            var dataTable = new DataTable();

//            // Filter properties based on the required columns
//            var properties = typeof(T).GetProperties()
//                .Where(p => columnsToInclude.Contains(p.Name))
//                .ToList();

//            // Add columns to the DataTable
//            foreach (var columnName in columnsToInclude)
//            {
//                var prop = properties.FirstOrDefault(p => p.Name == columnName);
//                if (prop != null)
//                {
//                    dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
//                }
//            }

//            foreach (var item in items)
//            {
//                //var row = dataTable.NewRow();
//                DataRow row = dataTable.NewRow();
//                foreach (var columnName in columnsToInclude)
//                {
//                    var prop = properties.FirstOrDefault(p => p.Name == columnName);
//                    if (prop != null)
//                    {
//                        row[columnName] = prop.GetValue(item) ?? DBNull.Value;
//                    }
//                }
//                try
//                {
//                    dataTable.Rows.Add(row); // Add explicitly cast row to match DataTable schema
//                }
//                catch (Exception ex)
//                {
//                    Console.WriteLine($"Error adding row: {ex.Message}");
//                }
//            }


//            return dataTable;

//        }
//        public static DataTable ToDataTable<T>(IEnumerable<T> items)
//        {
//            var dataTable = new DataTable(typeof(T).Name);

//            // Create columns
//            foreach (var prop in typeof(T).GetProperties())
//            {
//                dataTable.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
//            }

//            // Populate rows
//            foreach (var item in items)
//            {
//                var row = dataTable.NewRow();
//                foreach (var prop in typeof(T).GetProperties())
//                {
//                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
//                }
//                dataTable.Rows.Add(row);
//            }

//            return dataTable;
//        }





//        // Delete Product
//        public async Task<bool> DeleteProduct(int id)
//        {
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand("DELETE FROM Products WHERE ProductId = @Id", connection);
//                command.Parameters.AddWithValue("@Id", id);

//                await connection.OpenAsync();
//                var rowsAffected = await command.ExecuteNonQueryAsync();
//                return rowsAffected > 0;
//            }
//        }







//        public async Task<bool> ProceedWithTransactionAsync(int userId, decimal totalAmount, List<OrderItem> orderItems)
//        {
//            using (var connection = GetConnection())
//            {
//                await connection.OpenAsync();
//                using (var transaction = connection.BeginTransaction())
//                {
//                    try
//                    {
//                        // 1. Insert the Order
//                        string insertOrderQuery = @"
//                    INSERT INTO Orders (UserId, OrderDate, TotalAmount, Status)
//                    VALUES (@UserId, GETDATE(), @TotalAmount, 'Completed');
//                    SELECT CAST(SCOPE_IDENTITY() AS INT);";

//                        int orderId = await connection.ExecuteScalarAsync<int>(
//                            insertOrderQuery,
//                            new { UserId = userId, TotalAmount = totalAmount },
//                            transaction);

//                        // 2. Insert Order Items and Update Stock
//                        foreach (var item in orderItems)
//                        {
//                            // Insert order item
//                            string insertOrderItemQuery = @"
//                        INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
//                        VALUES (@OrderId, @ProductId, @Quantity, @Price);";

//                            await connection.ExecuteAsync(
//                                insertOrderItemQuery,
//                                new
//                                {
//                                    OrderId = orderId,
//                                    ProductId = item.ProductId,
//                                    Quantity = item.Quantity,
//                                    Price = item.Price
//                                },
//                                transaction);


//                        }

//                        // 3. Clear the Cart
//                        string clearCartQuery = "DELETE FROM Cart WHERE UserId = @UserId;";
//                        await connection.ExecuteAsync(
//                            clearCartQuery,
//                            new { UserId = userId },
//                            transaction);

//                        // Commit the transaction
//                        transaction.Commit();
//                        return true;
//                    }
//                    catch (Exception ex)
//                    {
//                        // Rollback the transaction on error
//                        transaction.Rollback();
//                        Console.WriteLine($"Transaction failed: {ex.Message}");
//                        return false;
//                    }
//                }
//            }
//        }


//        //order management
//        public async Task<int> AddOrder(int userId, decimal totalAmount)
//        {
//            try
//            {
//                using (var connection = GetConnection())
//                {
//                    var command = new SqlCommand(@"
//                    INSERT INTO Orders (UserId, OrderDate, Status, TotalAmount)
//                    VALUES (@UserId, @OrderDate, @Status, @TotalAmount);
//                    SELECT SCOPE_IDENTITY();", connection);

//                    command.Parameters.AddWithValue("@UserId", userId);
//                    command.Parameters.AddWithValue("@OrderDate", DateTime.Now);
//                    command.Parameters.AddWithValue("@Status", "Pending");
//                    command.Parameters.AddWithValue("@TotalAmount", totalAmount);

//                    await connection.OpenAsync();
//                    var result = await command.ExecuteScalarAsync();
//                    return Convert.ToInt32(result);
//                }
//            }
//            catch (Exception ex)
//            {
//                // Log the exception
//                Console.WriteLine($"Error in AddOrder: {ex.Message}");
//                throw; // Re-throw the exception to propagate to the controller
//            }
//        }


//        public async Task<int> ClearCart(int userId)
//        {
//            using var connection = GetConnection();
//            var command = new SqlCommand("DELETE FROM Cart WHERE UserId = @UserId", connection);
//            command.Parameters.AddWithValue("@UserId", userId);

//            await connection.OpenAsync();
//            return await command.ExecuteNonQueryAsync(); // Returns the number of rows affected
//        }




//        //public async Task<int> AddOrderItem(int orderId, int productId, int quantity, decimal price)
//        public async Task<int> AddOrderItem(OrderItem orderItem)
//        {
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand(@"
//            INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
//            VALUES (@OrderId, @ProductId, @Quantity, @Price);", connection);

//                command.Parameters.AddWithValue("@OrderId", orderItem.OrderId);
//                command.Parameters.AddWithValue("@ProductId", orderItem.ProductId);
//                command.Parameters.AddWithValue("@Quantity", orderItem.Quantity);
//                command.Parameters.AddWithValue("@Price", orderItem.Price);

//                await connection.OpenAsync();
//                return await command.ExecuteNonQueryAsync();
//            }
//        }

//        //cart management
//        // Cart Management
//        public async Task<int> AddCartItem(Cart cartItem)
//        {
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand(@"
//                    INSERT INTO CartI (UserId, ProductId, Quantity, Date)
//                    VALUES (@UserId, @ProductId, @Quantity, @Date);
//                    SELECT SCOPE_IDENTITY();", connection);

//                command.Parameters.AddWithValue("@UserId", cartItem.UserId);
//                command.Parameters.AddWithValue("@ProductId", cartItem.ProductId);
//                command.Parameters.AddWithValue("@Quantity", cartItem.Quantity);
//                command.Parameters.AddWithValue("@Date", DateTime.Now);

//                await connection.OpenAsync();
//                var result = await command.ExecuteScalarAsync();
//                return Convert.ToInt32(result);
//            }
//        }

//        public async Task<List<Cart>> GetCartItemsForUser(int userId)
//        {
//            var cartItems = new List<Cart>();
//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand("SELECT * FROM Cart WHERE UserId = @UserId", connection);
//                command.Parameters.AddWithValue("@UserId", userId);

//                await connection.OpenAsync();
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        cartItems.Add(new Cart
//                        {
//                            Id = reader.GetInt32(0),
//                            UserId = reader.GetInt32(1),
//                            ProductId = reader.GetInt32(2),
//                            Quantity = reader.GetInt32(3),
//                            Date = reader.GetDateTime(4)
//                        });
//                    }
//                }
//            }
//            return cartItems;
//        }




//            // Method to get Cart Items by date range
//        public async Task<List<Cart>> GetCartItemsByDateRange(DateTime startDate, DateTime endDate)
//        {
//            var cartItems = new List<Cart>();

//            using (var connection = GetConnection())
//            {
//                var command = new SqlCommand(
//                    "SELECT CartId, UserId, ProductId, Quantity, Date FROM Cart WHERE Date BETWEEN @StartDate AND @EndDate",
//                    connection
//                );

//                command.Parameters.AddWithValue("@StartDate", startDate);
//                command.Parameters.AddWithValue("@EndDate", endDate);

//                await connection.OpenAsync();
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        cartItems.Add(new Cart
//                        {
//                            Id = reader.GetInt32(0),
//                            UserId = reader.GetInt32(1),
//                            ProductId = reader.GetInt32(2),
//                            Quantity = reader.GetInt32(3),
//                            Date = reader.GetDateTime(4)
//                        });
//                    }
//                }
//            }

//            return cartItems;
//        }










//        public async Task<List<SalesReport>> GetTotalSalesReport(DateTime startDate, DateTime endDate)
//        {
//            var salesReport = new List<SalesReport>();

//            using (var connection = GetConnection()) // GetConnection should already be defined in your project.
//            {
//                var query = @"
//     SELECT 
//    CONVERT(VARCHAR, o.OrderDate, 103) AS [Date], -- Format as DD/MM/YYYY
//    p.Category AS [Category],
//    SUM(oi.Quantity) AS [TotalSalesCount]
//    FROM 
//    OrderItems oi
//JOIN 
//    Orders o ON oi.OrderId = o.OrderId
//JOIN 
//    Products p ON oi.ProductId = p.ProductId
//WHERE 
//    o.OrderDate BETWEEN @StartDate AND @EndDate -- Use parameters here
//    AND o.Status = 'completed' -- Only consider completed orders
//GROUP BY 
//    CONVERT(VARCHAR, o.OrderDate, 103), 
//    p.Category
//ORDER BY 
//    [Date], 
//    [Category];

//";

//                var command = new SqlCommand(query, connection);

//                // Add parameters for the query
//                command.Parameters.AddWithValue("@StartDate", startDate);
//                command.Parameters.AddWithValue("@EndDate", endDate);

//                // Open database connection
//                await connection.OpenAsync();

//                // Execute the query and process results
//                using (var reader = await command.ExecuteReaderAsync())
//                {
//                    while (await reader.ReadAsync())
//                    {
//                        //salesReport.Add(new SalesReport
//                        //{
//                        //    SaleDate = reader.GetDateTime(0), // Read DateTime directly
//                        //    Category = reader.GetString(1),   // Read Category as string
//                        //    TotalSales = reader.GetInt32(2)   // Read TotalSales as integer
//                        //});
//                        salesReport.Add(new SalesReport
//                        {
//                            SaleDate = DateTime.ParseExact(reader.GetString(0), "dd/MM/yyyy", null), // Explicit parsing
//                            Category = reader.GetString(1),
//                            TotalSales = reader.GetInt32(2)
//                        });

//                    }
//                }
//            }

//            return salesReport;
//        }









//    }
//}


