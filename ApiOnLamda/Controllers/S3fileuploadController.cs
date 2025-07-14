using Microsoft.AspNetCore.Http;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using Amazon.S3.Model;

namespace ApiOnLamda.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class S3fileuploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;

        public S3fileuploadController(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFileAsync([FromForm] IFormFile file,
    [FromForm] string bucketName,
    [FromForm] string? prefix)
        {
            var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
            if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");

            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{file.FileName}",
                InputStream = file.OpenReadStream()
            };

            request.Metadata.Add("Content-Type", file.ContentType);


            await _s3Client.PutObjectAsync(request);
            return Ok($"File {prefix}/{file.FileName} uploaded to s3 successfully!");

        }
    }
}
