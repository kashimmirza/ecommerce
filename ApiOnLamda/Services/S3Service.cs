using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;
using Amazon.S3.Util; // Import this namespace

//bool bucketExists = await AmazonS3Util.DoesS3BucketExistV2Async(s3Client, "my-bucket-name");


//public class S3Service
//{
//    private readonly IAmazonS3 _s3Client;
//    private readonly string _bucketName;

//    public S3Service(IAmazonS3 s3Client, IConfiguration configuration)
//    {
//        _s3Client = s3Client;
//        _bucketName = configuration["AWS:BucketName"];
//    }

//    public async Task<string> UploadImageAsync(IFormFile file)
//    {
//        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

//        using (var stream = file.OpenReadStream())
//        {
//            var uploadRequest = new TransferUtilityUploadRequest
//            {
//                InputStream = stream,
//                Key = fileName,
//                BucketName = _bucketName,
//                //CannedACL = S3CannedACL.PublicRead // Make publicly accessible
//            };

//            var fileTransferUtility = new TransferUtility(_s3Client);
//            await fileTransferUtility.UploadAsync(uploadRequest);
//        }

//        return $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
//    }
//}

public class S3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;

    public S3Service(IAmazonS3 s3Client, IConfiguration configuration)
    {
        _s3Client = s3Client;
        _bucketName = configuration["AWS:BucketName"];
    }

    public async Task<string> UploadImageAsync(IFormFile file, string? prefix = null)
    {
        if (file == null || file.Length == 0)
            throw new ArgumentException("File is missing or empty.");

        // Generate a unique file name
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var objectKey = string.IsNullOrEmpty(prefix) ? fileName : $"{prefix.TrimEnd('/')}/{fileName}";

        // Check if the bucket exists
        //var bucketExists = await _s3Client.DoesS3BucketExistAsync(_bucketName); await AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, _bucketName);

        var bucketExists =  await AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, _bucketName);


        if (!bucketExists)
            throw new InvalidOperationException($"Bucket {_bucketName} does not exist.");

        // Create the S3 request
        var request = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = objectKey,
            InputStream = file.OpenReadStream(),
            ContentType = file.ContentType
        };

        // Upload the file
        await _s3Client.PutObjectAsync(request);

        // Return the uploaded file's URL
        return $"https://{_bucketName}.s3.amazonaws.com/{objectKey}";
    }

    

}
