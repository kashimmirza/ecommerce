namespace ApiOnLamda.Model
{
    public class MenuItemRaw
    {
        public int MenuItemId { get; set; }
        public string Title { get; set; }
        public string Handle { get; set; }
        public int? ParentMenuItemId { get; set; }
        public string Link { get; set; }
        public string LabelText { get; set; }
        public string LabelColor { get; set; }
        public string ImageSrc { get; set; }
        public string ImageStyle { get; set; } // Store as JSON string in DB
        public string ImageAlt { get; set; }
        public string Target { get; set; }
        public string Rel { get; set; }
        public string AriaDescribedBy { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
