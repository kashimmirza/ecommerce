using Microsoft.AspNetCore.Mvc;

namespace ApiOnLamda.Model
{
    public class UploadImagesRequest
    {
        [FromForm(Name = "PrimaryImage")]
        public IFormFile PrimaryImage { get; set; }
        [FromForm(Name = "HoverImages")]
        public List<IFormFile> HoverImages { get; set; }= new();
        [FromForm(Name = "ProductId")]
        public int ProductId { get; set; }
    }
}
