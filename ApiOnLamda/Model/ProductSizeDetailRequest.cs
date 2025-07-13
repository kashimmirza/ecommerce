namespace ApiOnLamda.Model
{
    public class ProductSizeDetailRequest
    {
        public string Category { get; set; } // Size Category Name (e.g., S, M)
        public decimal? Chest { get; set; }
        public decimal? FullLengthBack { get; set; }
        public decimal? FullLengthFront { get; set; }
        public decimal? PantWaistRelax { get; set; }
        public decimal? PantLength { get; set; }
    }
}
