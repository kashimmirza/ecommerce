namespace ApiOnLamda.Model
{
    public class Product
    {
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

    }

}
