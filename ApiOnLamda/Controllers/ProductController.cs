﻿
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ApiOnLamda.Data;
using ApiOnLamda.Model;


using System.Data;



//==========================================================================original code==========================


namespace ApiOnLamda.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class ProductController : ControllerBase
    //{
    //    private readonly DatabaseHelper _dbHelper;
    //    private readonly IWebHostEnvironment _env;
    //    private readonly IAmazonS3 _s3Client;

    //    private const string bucketName = "frontendbucke";
    //    private const string folderName = "Imagefolder/";
    //    private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast1;

    //    public ProductController(DatabaseHelper dbHelper, IWebHostEnvironment env)
    //    {
    //        _dbHelper = dbHelper;
    //        _env = env;
    //        _s3Client = new AmazonS3Client(bucketRegion);
    //    }

        //// Upload Image to S3 and add product
        //[HttpPost("add")]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> AddProduct([FromForm] IFormFile file, [FromForm] string name, [FromForm] string category,
        //                                            [FromForm] decimal newPrice, [FromForm] decimal oldPrice, [FromForm] bool available)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("No file uploaded.");
        //    }

        //    // Generate a unique file name
        //    var fileName = $"{folderName}product_{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";

        //    // Upload to S3
        //    string imageUrl;
        //    try
        //    {
        //        using (var stream = file.OpenReadStream())
        //        {
        //            var uploadRequest = new TransferUtilityUploadRequest
        //            {
        //                InputStream = stream,
        //                Key = fileName,
        //                BucketName = bucketName,
        //                CannedACL = S3CannedACL.PublicRead // Makes the file publicly accessible
        //            };

        //            var fileTransferUtility = new TransferUtility(_s3Client);
        //            await fileTransferUtility.UploadAsync(uploadRequest);
        //        }
        //        imageUrl = $"https://{bucketName}.s3.amazonaws.com/{fileName}";
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error uploading file: {ex.Message}");
        //    }

        //    // Create a new product object
        //    var product = new Product
        //    {
        //        Name = name,
        //        Image = imageUrl,
        //        Category = category,
        //        NewPrice = newPrice,
        //        OldPrice = oldPrice,
        //        Available = available,
        //        Date = DateTime.Now
        //    };

        //    // Store the product in the database
        //    int productId = await _dbHelper.AddProduct(product);
        //    return Ok(new { success = true, ProductId = productId, imageUrl });
        //}

        //[HttpPost("add")]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> AddProduct([FromForm] IFormFile file, [FromForm] string name, [FromForm] string category,
        //                                    [FromForm] decimal newPrice, [FromForm] decimal oldPrice, [FromForm] bool available)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("No file uploaded.");
        //    }

        //    // Generate a unique file name
        //    var fileName = $"{folderName}product_{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";
        //    string imageUrl;

        //    try
        //    {
        //        // Upload to S3
        //        using (var stream = file.OpenReadStream())
        //        {
        //            var uploadRequest = new TransferUtilityUploadRequest
        //            {
        //                InputStream = stream,
        //                Key = fileName,
        //                BucketName = bucketName,
        //                CannedACL = S3CannedACL.PublicRead
        //            };

        //            var fileTransferUtility = new TransferUtility(_s3Client);
        //            await fileTransferUtility.UploadAsync(uploadRequest);
        //        }
        //        imageUrl = $"https://{bucketName}.s3.amazonaws.com/{fileName}";
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error uploading file to S3: {ex.Message}");
        //    }

        //    // Save product in database
        //    try
        //    {
        //        var product = new Product
        //        {
        //            Name = name,
        //            Image = imageUrl,
        //            Category = category,
        //            NewPrice = newPrice,
        //            OldPrice = oldPrice,
        //            Available = available,
        //            Date = DateTime.Now
        //        };

        //        int productId = await _dbHelper.AddProduct(product);
        //        return Ok(new { success = true, ProductId = productId, imageUrl });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error saving product to database: {ex.Message}");
        //    }
        //}

        [Route("api/[controller]")]
        [ApiController]
        public class ProductController : ControllerBase
        {
            private readonly DatabaseHelper _dbHelper;
           
            private const string bucketName = "frontendbucke"; // Update with your S3 bucket name
            private const string folderName = "Imagefolder/";
            

            public ProductController(DatabaseHelper dbHelper)
            {
                _dbHelper = dbHelper;
              
            }

        // Upload Image to S3
        //[HttpPost("upload")]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> UploadImage(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("No file uploaded.");
        //    }

        //    var fileName = $"{folderName}product_{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";
        //    try
        //    {
        //        using (var stream = file.OpenReadStream())
        //        {
        //            var uploadRequest = new TransferUtilityUploadRequest
        //            {
        //                InputStream = stream,
        //                Key = fileName,
        //                BucketName = bucketName,
        //                CannedACL = S3CannedACL.PublicRead
        //            };

        //            var fileTransferUtility = new TransferUtility(_s3Client);
        //            await fileTransferUtility.UploadAsync(uploadRequest);
        //        }

        //        string imageUrl = $"https://{bucketName}.s3.amazonaws.com/{fileName}";
        //        return Ok(new { success = true, image_url = imageUrl });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error uploading image: {ex.Message}");
        //    }
        //}

        //latest working fine one
        //[HttpPost("upload")]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> UploadImage(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("No file uploaded.");
        //    }

        //    var fileName = $"{folderName}product_{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";
        //    try
        //    {
        //        using (var stream = file.OpenReadStream())
        //        {
        //            var uploadRequest = new TransferUtilityUploadRequest
        //            {
        //                InputStream = stream,
        //                Key = fileName,
        //                BucketName = bucketName,
        //                CannedACL = S3CannedACL.PublicRead
        //            };

        //            var fileTransferUtility = new TransferUtility(_s3Client);
        //            await fileTransferUtility.UploadAsync(uploadRequest);
        //        }

        //        string imageUrl = $"https://{bucketName}.s3.amazonaws.com/{fileName}";
        //        return Ok(new { success = true, image_url = imageUrl });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error uploading image: {ex.Message}");
        //    }
        //}

        //local db upload
//       [HttpPost("upload-images")]
//       [Consumes("multipart/form-data")]
//        public async Task<IActionResult> UploadImages([FromForm] UploadImagesRequest request, [FromServices] S3Service s3Service)

//        {
//            string folderName = Path.Combine("wwwroot", "upload");
//            if (!Directory.Exists(folderName))
//            {
//                Directory.CreateDirectory(folderName);
//            }

//            // Validate request parameters
//            if (request.PrimaryImage == null || request.PrimaryImage.Length == 0)
//            {
//                return BadRequest(new { success = false, message = "Primary image is required." });
//            }

//            if (request.HoverImages == null || !request.HoverImages.Any(h => h.Length > 0))
//            {
//                return BadRequest(new { success = false, message = "At least one valid hover image is required." });
//            }

//            if (request.ProductId <= 0)
//            {
//                return BadRequest(new { success = false, message = "Invalid product ID." });
//            }

//            try
//            {
//                // Validate file types and sizes
//                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".web", ".alf" }; // Extended file types
//                if (!allowedExtensions.Contains(Path.GetExtension(request.PrimaryImage.FileName).ToLower()))
//                {
//                    return BadRequest(new { success = false, message = "Invalid primary image file type." });
//                }

//                if (request.PrimaryImage.Length > 5 * 1024 * 1024) // 5 MB limit
//                {
//                    return BadRequest(new { success = false, message = "Primary image file size exceeds 5 MB." });
//                }

//                // Upload primary image
//                var primaryImageName = $"product_primary_{DateTime.UtcNow.Ticks}{Path.GetExtension(request.PrimaryImage.FileName)}";
//                var primaryImagePath = Path.Combine(folderName, primaryImageName);

//                using (var stream = new FileStream(primaryImagePath, FileMode.Create))
//                {
//                    await request.PrimaryImage.CopyToAsync(stream);
//                }

//                string primaryImageUrl = $"{Request.Scheme}://{Request.Host}/upload/{primaryImageName}";

//                // Save primary image to database
//                await _dbHelper.InsertProductImage(request.ProductId, "primary", primaryImageUrl);

//        // Upload hover images
//        var hoverImageUrls = new List<string>();
//                foreach (var hoverImage in request.HoverImages.Where(h => h.Length > 0))
//                {
//                    var extension = Path.GetExtension(hoverImage.FileName).ToLower();
//                    if (!allowedExtensions.Contains(extension))
//                    {
//                        continue; // Skip invalid file types
//                    }

//                    if (hoverImage.Length > 5 * 1024 * 1024) // 5 MB limit
//                    {
//                        continue; // Skip oversized files
//                    }

//                    var hoverImageName = $"product_hover_{Guid.NewGuid()}{extension}";
//        var hoverImagePath = Path.Combine(folderName, hoverImageName);

//                    using (var stream = new FileStream(hoverImagePath, FileMode.Create))
//                    {
//                        await hoverImage.CopyToAsync(stream);
//}

//string hoverImageUrl = $"{Request.Scheme}://{Request.Host}/upload/{hoverImageName}";
//hoverImageUrls.Add(hoverImageUrl);

//// Save hover image to database
//await _dbHelper.InsertProductImage(request.ProductId, "hover", hoverImageUrl);
//                }

//                // Return success response with image URLs
//                return Ok(new
//                {
//                    success = true,
//                    message = "Images uploaded successfully.",
//                    primaryImageUrl,
//                    hoverImageUrls
//                });
//            }
//            catch (Exception ex)
//            {
//                // Log the exception
//                return StatusCode(500, new { success = false, message = $"Error uploading images: {ex.Message}" });
//            }
//        }


        [HttpPost("upload-images")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImages([FromForm] UploadImagesRequest request)

        {
            string folderName = Path.Combine("wwwroot", "upload");
            if (!Directory.Exists(folderName))
            {
                Directory.CreateDirectory(folderName);
            }

            // Validate request parameters
            if (request.PrimaryImage == null || request.PrimaryImage.Length == 0)
            {
                return BadRequest(new { success = false, message = "Primary image is required." });
            }

            if (request.HoverImages == null || !request.HoverImages.Any(h => h.Length > 0))
            {
                return BadRequest(new { success = false, message = "At least one valid hover image is required." });
            }

            if (request.ProductId <= 0)
            {
                return BadRequest(new { success = false, message = "Invalid product ID." });
            }

            try
            {
                // Validate file types and sizes
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".web",".webp", ".alf" }; // Extended file types
                if (!allowedExtensions.Contains(Path.GetExtension(request.PrimaryImage.FileName).ToLower()))
                {
                    return BadRequest(new { success = false, message = "Invalid primary image file type." });
                }

                if (request.PrimaryImage.Length > 5 * 1024 * 1024) // 5 MB limit
                {
                    return BadRequest(new { success = false, message = "Primary image file size exceeds 5 MB." });
                }

                // Upload primary image
                var primaryImageName = $"product_primary_{DateTime.UtcNow.Ticks}{Path.GetExtension(request.PrimaryImage.FileName)}";
                var primaryImagePath = Path.Combine(folderName, primaryImageName);

                using (var stream = new FileStream(primaryImagePath, FileMode.Create))
                {
                    await request.PrimaryImage.CopyToAsync(stream);
                }

                string primaryImageUrl = $"{Request.Scheme}://{Request.Host}/upload/{primaryImageName}";

                // Save primary image to database
                await _dbHelper.InsertProductImage(request.ProductId, "primary", primaryImageUrl);

                // Upload hover images
                var hoverImageUrls = new List<string>();
                foreach (var hoverImage in request.HoverImages.Where(h => h.Length > 0))
                {
                    var extension = Path.GetExtension(hoverImage.FileName).ToLower();
                    if (!allowedExtensions.Contains(extension))
                    {
                        continue; // Skip invalid file types
                    }

                    if (hoverImage.Length > 5 * 1024 * 1024) // 5 MB limit
                    {
                        continue; // Skip oversized files
                    }

                    var hoverImageName = $"product_hover_{Guid.NewGuid()}{extension}";
                    var hoverImagePath = Path.Combine(folderName, hoverImageName);

                    using (var stream = new FileStream(hoverImagePath, FileMode.Create))
                    {
                        await hoverImage.CopyToAsync(stream);
                    }

                    string hoverImageUrl = $"{Request.Scheme}://{Request.Host}/upload/{hoverImageName}";
                    hoverImageUrls.Add(hoverImageUrl);

                    // Save hover image to database
                    await _dbHelper.InsertProductImage(request.ProductId, "hover", hoverImageUrl);
                }

                // Return success response with image URLs
                return Ok(new
                {
                    success = true,
                    message = "Images uploaded successfully.",
                    primaryImageUrl,
                    hoverImageUrls
                });
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { success = false, message = $"Error uploading images: {ex.Message}" });
            }
        }

        //    [HttpPost("upload-images")]
        //    [Consumes("multipart/form-data")]
        //    public async Task<IActionResult> UploadImages(
        //[FromForm] UploadImagesRequest request,
        //[FromServices] S3Service s3Service,
        //[FromServices] ILogger<ProductController> logger) // inject logger
        //    {
        //        try
        //        {
        //            logger.LogInformation("UploadImages endpoint called.");
        //            logger.LogInformation("PrimaryImage name: {0}, length: {1}", request.PrimaryImage?.FileName ?? "null", request.PrimaryImage?.Length ?? -1);

        //            if (request.PrimaryImage == null || request.PrimaryImage.Length == 0)
        //            {
        //                logger.LogWarning("Primary image is missing or empty.");
        //                return BadRequest(new { success = false, message = "Primary image is required." });
        //            }

        //            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        //            var primaryExtension = Path.GetExtension(request.PrimaryImage.FileName).ToLower();

        //            if (!allowedExtensions.Contains(primaryExtension))
        //            {
        //                logger.LogWarning("Invalid primary image file type: {Extension}", primaryExtension);
        //                return BadRequest(new { success = false, message = "Invalid primary image file type." });
        //            }

        //            // Upload primary image
        //            logger.LogInformation("Uploading primary image to S3...");
        //            string primaryImageUrl = await s3Service.UploadImageAsync(request.PrimaryImage);
        //            logger.LogInformation("Primary image uploaded to: {Url}", primaryImageUrl);

        //            await _dbHelper.InsertProductImage(request.ProductId, "primary", primaryImageUrl);

        //            // Upload hover images
        //            var hoverImageUrls = new List<string>();
        //            foreach (var hoverImage in request.HoverImages.Where(h => h.Length > 0))
        //            {
        //                var ext = Path.GetExtension(hoverImage.FileName).ToLower();
        //                if (!allowedExtensions.Contains(ext))
        //                {
        //                    logger.LogWarning("Skipping invalid hover image type: {FileName}", hoverImage.FileName);
        //                    continue;
        //                }

        //                logger.LogInformation("Uploading hover image: {FileName}", hoverImage.FileName);
        //                string hoverImageUrl = await s3Service.UploadImageAsync(hoverImage);
        //                logger.LogInformation("Hover image uploaded to: {Url}", hoverImageUrl);

        //                hoverImageUrls.Add(hoverImageUrl);
        //                await _dbHelper.InsertProductImage(request.ProductId, "hover", hoverImageUrl);
        //            }

        //            logger.LogInformation("Image upload completed successfully.");
        //            return Ok(new
        //            {
        //                success = true,
        //                message = "Images uploaded successfully.",
        //                primaryImageUrl,
        //                hoverImageUrls
        //            });
        //        }
        //        catch (Exception ex)
        //        {
        //            logger.LogError(ex, "Error occurred while uploading images.");
        //            return StatusCode(500, new { success = false, message = "An error occurred while uploading images." });
        //        }
        //    }









        //private async Task UploadToS3(IFormFile file, string fileName)
        //{
        //    using (var stream = file.OpenReadStream())
        //    {
        //        var uploadRequest = new TransferUtilityUploadRequest
        //        {
        //            InputStream = stream,
        //            Key = fileName,
        //            BucketName = bucketName,
        //            CannedACL = S3CannedACL.PublicRead
        //        };

        //        var fileTransferUtility = new TransferUtility(_s3Client);
        //        await fileTransferUtility.UploadAsync(uploadRequest);
        //    }
        //}

        //[HttpPost("upload")]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> UploadImage(IFormFile file)
        //{
        //    // Validate the uploaded file
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("No file uploaded.");
        //    }

        //    try
        //    {
        //        // Define the directory to save the uploaded file
        //        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

        //        // Create the directory if it doesn't exist
        //        if (!Directory.Exists(uploadsFolder))
        //        {
        //            Directory.CreateDirectory(uploadsFolder);
        //        }

        //        // Generate a unique file name
        //        var fileName = $"{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";
        //        var filePath = Path.Combine(uploadsFolder, fileName);

        //        // Save the file to the server
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        // Generate the public URL for the uploaded file
        //        var imageUrl = $"/uploads/{fileName}";
        //        return Ok(new { success = true, image_url = imageUrl });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception if needed and return a 500 error
        //        return StatusCode(500, $"Error uploading image: {ex.Message}");
        //    }
        //}

        //[HttpPost("upload")]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> UploadImage(IFormFile file, string image)
        //{
        //    if (file == null || file.Length == 0)
        //    {
        //        return BadRequest("No file uploaded.");
        //    }

        //    // Define the local directory to save the image
        //    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        //    if (!Directory.Exists(uploadsFolder))
        //    {
        //        Directory.CreateDirectory(uploadsFolder);
        //    }

        //    var fileName = $"{imageType}_{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";
        //    var filePath = Path.Combine(uploadsFolder, fileName);

        //    try
        //    {
        //        // Save the file locally
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);
        //        }

        //        // Generate the URL of the image based on the local storage path
        //        string imageUrl = $"/uploads/{fileName}";
        //        return Ok(new { success = true, image_url = imageUrl });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Error uploading image: {ex.Message}");
        //    }
        //}


        // Add Product
        [HttpPost("add")]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            try
            {
                // If product has both primary and hover images, the image URLs would be passed along with the product
                //if (string.IsNullOrEmpty(product))
                //{
                //    return BadRequest("Both primary and hover images are required.");
                //}

                // Assuming AddProduct saves the product data to the database
                List<ProductSizeDetailRequest> sizesForDb = product.Sizes.Select(s => new ProductSizeDetailRequest
                {
                    Category = s.Category,
                    Chest = s.Chest,
                    FullLengthBack = s.FullLengthBack,
                    FullLengthFront = s.FullLengthFront,
                    PantWaistRelax = s.PantWaistRelax,
                    PantLength = s.PantLength
                }).ToList();

                var product1 = new Product
                {

                    Title = product.Title,
                    Handle = product.Handle,
                    Date = product.Date,
                    MenuItemId = product.MenuItemId,
                    NewPrice = product.NewPrice,
                    OldPrice = product.OldPrice,
                    Is_In_Stock = product.Is_In_Stock,
                    Description = product.Description,
                    Note = product.Note,
                    Material = product.Material,
                    Care = product.Care,
                    ModelHeightSize = product.ModelHeightSize,
                    Colors = product.Colors,
                    Sizes = sizesForDb // Pass the correctly mapped list
                };
                int productId = await _dbHelper.AddProduct(product1);
                return Ok(new { success = true, ProductId = productId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving product to database: {ex.Message}");
            }
        }


        [HttpGet("GetProductImages/{productId}")]
        public async Task<IActionResult> GetProductImages(int productId)
        {
            try
            {
                // Fetch product images using the DatabaseHelper
                var images = await _dbHelper.GetProductImagesAsync(productId);

                if (images == null || images.Count == 0)
                {
                    return NotFound("No images found for the specified product.");
                }

                return Ok(images);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("available-colors")]
        public async Task<IActionResult> GetAvailableColors()
        {
            try
            {
                var colors = await _dbHelper.GetAvailableColorsAsync();
                return Ok(colors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("add-color")]
        public async Task<IActionResult> AddNewColor([FromBody] AddColorRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.ColorValue))
            {
                return BadRequest("Color value cannot be empty.");
            }

            try
            {
                // Check if the color already exists (optional, but good practice)
                var existingColor = await _dbHelper.GetColorByValueAsync(request.ColorValue);
                if (existingColor != null)
                {
                    return Conflict($"Color '{request.ColorValue}' already exists.");
                }

                await _dbHelper.InsertColorAsync(request.ColorValue);
                return Ok(new { message = $"Color '{request.ColorValue}' added successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("GetProductImages")]
        public async Task<IActionResult> GetProductImages()
        
        {
            try
            {
                // Fetch all product images using the DatabaseHelper
                var images = await _dbHelper.GetAllProductsWithImagesAsync();

                if (images == null || images.Count == 0)
                {
                    return NotFound("No product images found.");
                }

                return Ok(images);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }





        [HttpGet("recent")]
        public async Task<IActionResult> GetMostRecentProducts()
        {
            try
            {
                var products = await _dbHelper.GetMostRecentProducts();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching recent products: {ex.Message}");
            }
        }






        [HttpGet("category/{Category}")]
        public async Task<IActionResult> GetProductsByCategory(string category)
        {
            var products = await _dbHelper.GetProductsByCategory(category);
            return Ok(products);
        }

        // Get All Products
        [HttpGet("all")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _dbHelper.GetAllProducts();
            return Ok(products);
        }

        // Get Product By ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _dbHelper.GetProductById(id);
            return product != null ? Ok(product) : NotFound("Product not found.");
        }




        
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductCategory product)
        {
            // Fetch the existing product from the database by ProductId
            var existingProduct = await _dbHelper.GetProductById(product.ProductId);

            if (existingProduct == null)
            {
                return NotFound("Product not found.");
            }

            // Update product details
            existingProduct.Title = product.Title;
            existingProduct.Handle = product.Handle;
            existingProduct.NewPrice = product.NewPrice;
            existingProduct.OldPrice = product.OldPrice;
            existingProduct.MenuItemId = product.MenuItemId;
            existingProduct.Is_In_Stock = product.Is_In_Stock;
            existingProduct.Date = product.Date;
           
            existingProduct.Description = product.Description;
            existingProduct.Note = product.Note;
            existingProduct.Care = product.Care;
            existingProduct.ModelHeightSize = product.ModelHeightSize;



            // You can also update Image and TotalSold if needed
            //existingProduct.Image = product.Image;  // If you want to update the image field
            existingProduct.TotalSold = product.TotalSold;  // If you want to update total sold

            // Call the method to update the product in the Products table
            bool isUpdated = await _dbHelper.UpdateProduct(existingProduct);

            if (!isUpdated)
            {
                return StatusCode(500, "Error updating product.");
            }

            // Update product images (primary and hover) in the ProductImages table
            if (product.PrimaryImages.Any())
            {
                foreach (var imageUrl in product.PrimaryImages)
                {
                    await _dbHelper.InsertProductImage(existingProduct.ProductId, "primary", imageUrl);
                }
            }

            if (product.HoverImages.Any())
            {
                foreach (var imageUrl in product.HoverImages)
                {
                    await _dbHelper.InsertProductImage(existingProduct.ProductId, "hover", imageUrl);
                }
            }

            return Ok(new { Message = "Product updated successfully." });
        }



        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveProduct(int id)
        {
            bool result = await _dbHelper.DeleteProduct(id);
            return result ? Ok(new { success = true }) : NotFound(new { success = false });
        }


        

        //// Get total sales category-wise between a date range
        //[HttpGet("sales-category-wise")]
        //public async Task<IActionResult> GetTotalSalesByCategory([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        //{
        //    if (startDate > endDate)
        //    {
        //        return BadRequest("Start date should be earlier than end date.");
        //    }

        //    // Fetch cart items within the specified date range
        //    var cartItems = await _dbHelper.GetCartItemsByDateRange(startDate, endDate);
        //    if (cartItems == null || !cartItems.Any())
        //    {
        //        return NotFound("No sales found in the specified date range.");
        //    }

        //    // Fetch all products
        //    var products = await _dbHelper.GetAllProducts();

        //    // Join cart items with products to get category information
        //    var categoryWiseSales = cartItems
        //        .Join(products,
        //              cart => cart.ProductId,
        //              product => product.Id,
        //              (cart, product) => new
        //              {
        //                  product.Category,
        //                  TotalPrice = product.NewPrice * cart.Quantity
        //              })
        //        .GroupBy(x => x.Category)
        //        .Select(g => new
        //        {
        //            Category = g.Key,
        //            TotalSales = g.Sum(x => x.TotalPrice)
        //        })
        //        .ToList();

        //    return Ok(categoryWiseSales);
        //}

        // Update Product with new image
        //[HttpPut("update")]
        //public async Task<IActionResult> UpdateProduct([FromForm] int id, [FromForm] IFormFile? file, [FromForm] string name, [FromForm] string category,
        //                                              [FromForm] decimal newPrice, [FromForm] decimal oldPrice, [FromForm] bool available)
        //{
        //    var product = await _dbHelper.GetProductById(id);
        //    if (product == null)
        //    {
        //        return NotFound("Product not found.");
        //    }

        //    // Update image if a new file is uploaded
        //    if (file != null && file.Length > 0)
        //    {
        //        var fileName = $"{folderName}product_{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";
        //        using (var stream = file.OpenReadStream())
        //        {
        //            var uploadRequest = new TransferUtilityUploadRequest
        //            {
        //                InputStream = stream,
        //                Key = fileName,
        //                BucketName = bucketName,
        //                CannedACL = S3CannedACL.PublicRead
        //            };

        //            var fileTransferUtility = new TransferUtility(_s3Client);
        //            await fileTransferUtility.UploadAsync(uploadRequest);
        //        }
        //        product.Image = $"https://{bucketName}.s3.amazonaws.com/{fileName}";
        //    }

        //    // Update other fields
        //    product.Name = name;
        //    product.Category = category;
        //    product.NewPrice = newPrice;
        //    product.OldPrice = oldPrice;
        //    product.Available = available;

        //    bool isUpdated = await _dbHelper.UpdateProduct(product);
        //    return isUpdated ? Ok(new { Message = "Product updated successfully." }) : StatusCode(500, "Error updating product.");
        //}
    }
}

//namespace ApiOnLamda.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProductController : ControllerBase
//    {
//        private readonly DatabaseHelper _dbHelper;
//        private readonly IWebHostEnvironment _env;

//        public ProductController(DatabaseHelper dbHelper, IWebHostEnvironment env)
//        {
//            _dbHelper = dbHelper;
//            _env = env;
//        }

//        // Upload Image
//        [HttpPost("upload")]
//        public IActionResult UploadImage([FromForm] IFormFile file)
//        {
//            if (file == null || file.Length == 0)
//            {
//                return BadRequest("No file uploaded.");
//            }

//            var fileName = $"product_{DateTime.Now.Ticks}{Path.GetExtension(file.FileName)}";
//            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "upload", fileName);

//            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!); // Ensures directory exists

//            using (var stream = new FileStream(filePath, FileMode.Create))
//            {
//                file.CopyTo(stream);
//            }

//            var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
//            return Ok(new { success = true, image_url = imageUrl });
//        }

//        //Add Product
//        [HttpPost("add")]
//        public async Task<IActionResult> AddProduct([FromBody] Product product)
//        {
//            if (product == null)
//            {
//                return BadRequest("Invalid product data.");
//            }

//            int productId = await _dbHelper.AddProduct(product);
//            return Ok(new { success = true, ProductId = productId, product });
//        }

//        // Get All Products
//        [HttpGet("all")]
//        public async Task<IActionResult> GetAllProducts()
//        {
//            var products = await _dbHelper.GetAllProducts();
//            return Ok(products);
//        }

//        // Get Product By ID
//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetProductById(int id)
//        {
//            var product = await _dbHelper.GetProductById(id);
//            if (product == null)
//            {
//                return NotFound("Product not found.");
//            }

//            return Ok(product);
//        }

//        // Update Product
//        [HttpPut("update")]
//        public async Task<IActionResult> UpdateProduct([FromBody] Product product)
//        {
//            if (product == null || product.Id == 0)
//            {
//                return BadRequest("Invalid product data.");
//            }

//            bool isUpdated = await _dbHelper.UpdateProduct(product);
//            if (!isUpdated)
//            {
//                return NotFound("Product not found or update failed.");
//            }

//            return Ok(new { Message = "Product updated successfully." });
//        }

//        // Remove Product
//        [HttpDelete("remove/{id}")]
//        public async Task<IActionResult> RemoveProduct(int id)
//        {
//            bool result = await _dbHelper.DeleteProduct(id);
//            return result ? Ok(new { success = true }) : NotFound(new { success = false });
//        }

//        // Get Products By Category
//        [HttpGet("category/{category}")]
//        public async Task<IActionResult> GetProductsByCategory(string category)
//        {
//            var products = await _dbHelper.GetProductsByCategory(category);
//            return Ok(products);
//        }
//    }
//}


//=====================================



//using System;
//using Microsoft.AspNetCore.Mvc;
//using System.Collections.Generic;
//using Ecommerce_backend.Model;
//using Ecommerce_backend.Data;

////[Route("api/[controller]/[action]")]
//[Route("api/[controller]")]
//[ApiController]
//public class ProductController : ControllerBase
//{
//    private readonly DatabaseHelper _dbHelper;

//    //public ProductController(DatabaseHelper dbHelper)
//    //{
//    //    _dbHelper = dbHelper;
//    //}



//        private readonly IWebHostEnvironment _env;

//        public ProductController(DatabaseHelper dbHelper, IWebHostEnvironment env)
//        {
//            _dbHelper = dbHelper;
//            _env = env;
//        }

//        // Upload Image
//       // [HttpPost("upload")]
//       // public IActionResult UploadImage(IFormFile file)
//       // {
//       //     if (file == null || file.Length == 0) return BadRequest("No file uploaded.");

//       //     var fileName = $"product_{DateTime.Now.Ticks}{Path.GetExtension(file.FileName)}";
//       // // var path = Path.Combine(_env.WebRootPath, "images", fileName);
//       // var path = Path.Combine(Directory.GetCurrentDirectory(), "upload", fileName);
//       ////var uploadFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "upload");

//       // using (var stream = new FileStream(path, FileMode.Create))
//       //     {
//       //         file.CopyTo(stream);
//       //     }

//       //     var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
//       //     return Ok(new { success = true, image_url = imageUrl });
//       // }


