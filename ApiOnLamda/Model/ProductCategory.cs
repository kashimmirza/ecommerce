namespace ApiOnLamda.Model
{
    public class ProductCategory
    {
        // Fields from Products table
        // Fields from Products table
        //public int ProductId { get; set; }

        //    public string Category { get; set; }
        //    public decimal NewPrice { get; set; }
        //    public decimal? OldPrice { get; set; }
        //    public bool Available { get; set; }
        //    public DateTime Date { get; set; }
        //    public string Size { get; set; }
        //    public string Description { get; set; }
        //    public string Handle { get; set; }
        //    public string Title { get; set; }
        //    public string? Color { get; set; } // Nullable
        //    public string Is_In_Stock { get; set; } // VARCHAR(5), assuming "true"/"false" or simi
        //    public string? Image { get; set; }
        //    public int TotalSold { get; set; }

        //    // Image collections
        //    public List<string> PrimaryImages { get; set; } = new List<string>();
        //    public List<string> HoverImages { get; set; } = new List<string>();

        public int ProductId { get; set; }

        public string Title { get; set; } // Renamed from 'Name' to 'Title' to match frontend
        public string Handle { get; set; }
        public int MenuItemId;
        public int ParentMenuItemId { get; set; } // Changed from string to int to match likely database type
        public decimal NewPrice { get; set; }
        public decimal? OldPrice { get; set; }
        public string Is_In_Stock { get; set; } // Keep as string to match "yes", "no", "preorder"
        public string Description { get; set; }
        public DateTime? Date { get; set; }
        public string Note { get; set; } // Added to match frontend 'note'
        public string Material { get; set; } // Added to match frontend 'material'
        public string Care { get; set; } // Added to match frontend 'care'
        public string? ModelHeightSize { get; set; } // Added to match frontend 'modelHeightSize', nullable
                                                     // public string Size { get; set; } // Removed as size details are in the Sizes collection
                                                     // public string? Color { get; set; } // Removed as colors are in the Colors collection
                                                     // public DateTime? Date { get; set; } // You might still need this, but it's not explicitly in the frontend state

        public List<ProductSizeDetailRequest> Sizes { get; set; } // Changed to a more specific 'ProductSizeDetail' type
        public List<ProductColor> Colors { get; set; } = new List<ProductColor>(); // Keep as List<string> to store selected colors
                                                                                   // public string Category { get; set; } // Category will likely be derived from MenuItemId

        public int TotalSold { get; set; }

        //    // Image collections
        public List<string> PrimaryImages { get; set; } = new List<string>();
        public List<string> HoverImages { get; set; } = new List<string>();

        //    // Image collections
        //    public List<string> PrimaryImages { get; set; } = new List<string>();
        //    public List<string> HoverImages { get; set; } = new List<string>();

    }

}
