namespace ApiOnLamda.Model
{
    public class MenuItem
    {
        public int MenuItemId { get; set; }
        public string title { get; set; }
        public int? ParentMenuItemId { get; set; }
        public string href { get; set; }
        public string handle { get; set; }
        public string target { get; set; }
        public string rel { get; set; }
        public string ariaDescribedby { get; set; }
        public Label label { get; set; }
        public Image image { get; set; }
        public List<MenuItem> children { get; set; }
    }
}
