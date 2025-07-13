

SELECT 
    s.name AS SchemaName,
    t.name AS TableName,
    c.name AS ColumnName,
    ty.name AS DataType,
    c.max_length,
    c.is_nullable,
    c.column_id
FROM 
    sys.tables t
INNER JOIN 
    sys.schemas s ON t.schema_id = s.schema_id
INNER JOIN 
    sys.columns c ON t.object_id = c.object_id
INNER JOIN 
    sys.types ty ON c.user_type_id = ty.user_type_id
WHERE 
    t.name = 'Products';

SELECT 
    s.name AS SchemaName,
    t.name AS TableName,
    c.name AS ColumnName,
    ty.name AS DataType,
    c.max_length,
    c.is_nullable,
    c.column_id
FROM 
    sys.tables t
INNER JOIN 
    sys.schemas s ON t.schema_id = s.schema_id
INNER JOIN 
    sys.columns c ON t.object_id = c.object_id
INNER JOIN 
    sys.types ty ON c.user_type_id = ty.user_type_id
WHERE 
    t.name = 'MenuItems';



Use anikafashionhouse2;
GO




CREATE PROCEDURE SaveCheckoutData
    @UserId INT,
    @TotalAmount DECIMAL(10, 2),
    @DeliveryMethod NVARCHAR(50),
    @AddressLine1 NVARCHAR(255) = NULL,
    @AddressLine2 NVARCHAR(255) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @PostalCode NVARCHAR(20) = NULL,
    @Country NVARCHAR(100) = NULL,
    @Phone NVARCHAR(20) = NULL,
    @MarketingConsent BIT = 0
AS
BEGIN
    -- Start transaction
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insert into Orders table
        INSERT INTO Orders (UserId, TotalAmount, DeliveryMethod)
        VALUES (@UserId, @TotalAmount, @DeliveryMethod);

        DECLARE @OrderId INT = SCOPE_IDENTITY(); -- Get the generated OrderId

        -- If the delivery method is 'Ship', insert into ShippingAddresses
        IF (@DeliveryMethod = 'Ship')
        BEGIN
            INSERT INTO ShippingAddresses (OrderId, AddressLine1, AddressLine2, City, State, PostalCode, Country, Phone)
            VALUES (@OrderId, @AddressLine1, @AddressLine2, @City, @State, @PostalCode, @Country, @Phone);
        END

        -- Update MarketingConsent in Users table
        UPDATE Users
        SET MarketingConsent = @MarketingConsent
        WHERE UserId = @UserId;

        -- Commit transaction
        COMMIT TRANSACTION;
    END TRY

    BEGIN CATCH
        -- Rollback transaction in case of error
        ROLLBACK TRANSACTION;

        -- Rethrow the error for debugging
        THROW;
    END CATCH
END
GO

Use anikafashionhouse2;
GO

CREATE PROCEDURE InsertProduct
    @Name NVARCHAR(100),
    @Category NVARCHAR(255),
    @NewPrice DECIMAL,
    @OldPrice DECIMAL = NULL,
    @Available BIT,
    @Date DATETIME = NULL,
    @Size NVARCHAR(255),
    @Description NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Products (Name, Category, NewPrice, OldPrice, Available, Date, Size, Description)
    VALUES (@Name, @Category, @NewPrice, @OldPrice, @Available, @Date, @Size, @Description);
    
    -- Return the generated ProductId
    SELECT SCOPE_IDENTITY();
END;
GO
USE anikafashionhouse2;
go
-- Alter procedure in a separate batch
CREATE PROCEDURE SaveCheckoutData
    @UserId INT,
    @TotalAmount DECIMAL(10, 2),
    @DeliveryMethod NVARCHAR(50),
    @AddressLine1 NVARCHAR(255) = NULL,
    @AddressLine2 NVARCHAR(255) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @PostalCode NVARCHAR(20) = NULL,
    @Country NVARCHAR(100) = NULL,
    @Phone NVARCHAR(20) = NULL,
    @MarketingConsent BIT = 0,
    @CartItems CartItemType READONLY
AS
BEGIN
    -- Start transaction
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insert into Orders table (including default values for Status and OrderDate)
        INSERT INTO Orders (UserId, TotalAmount, DeliveryMethod, Status, OrderDate)
        VALUES (@UserId, @TotalAmount, @DeliveryMethod, 'Pending', GETDATE());

        DECLARE @OrderId INT = SCOPE_IDENTITY(); -- Get the generated OrderId

        -- If the delivery method is 'Ship', insert into ShippingAddresses
        IF (@DeliveryMethod = 'Ship')
        BEGIN
            INSERT INTO ShippingAddresses (OrderId, AddressLine1, AddressLine2, City, State, PostalCode, Country, Phone)
            VALUES (@OrderId, @AddressLine1, @AddressLine2, @City, @State, @PostalCode, @Country, @Phone);
        END

        -- Insert each CartItem into OrderItems table
        INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
        SELECT @OrderId, ProductId, Quantity, Price
        FROM @CartItems;

        -- Update MarketingConsent in Users table
        UPDATE Users
        SET MarketingConsent = @MarketingConsent
        WHERE UserId = @UserId;

        -- Commit transaction
        COMMIT TRANSACTION;
    END TRY

    BEGIN CATCH
        -- Rollback transaction in case of error
        ROLLBACK TRANSACTION;

        -- Rethrow the error for debugging
        THROW;
    END CATCH
END


select * from Orders;



GO
CREATE PROCEDURE InsertProductImage
    @ProductId INT,
    @ImageType VARCHAR(50),
    @ImageUrl VARCHAR(255)
AS
BEGIN
    INSERT INTO ProductImages (ProductId, ImageType, ImageUrl)
    VALUES (@ProductId, @ImageType, @ImageUrl);
END;

GO

CREATE PROCEDURE UpdateProductDetails
    @ProductId INT,
    @Name NVARCHAR(100),
    @Category NVARCHAR(255),
    @NewPrice DECIMAL,
    @OldPrice DECIMAL,
    @Available BIT,
    @Date DATETIME,
    @Size NVARCHAR(255),
    @Description NVARCHAR(MAX)
AS
BEGIN
    UPDATE Products
    SET 
        Name = @Name,
        Category = @Category,
        NewPrice = @NewPrice,
        OldPrice = @OldPrice,
        Available = @Available,
        Date = @Date,
        Size = @Size,
        Description = @Description
    WHERE ProductId = @ProductId
END

GO

CREATE PROCEDURE UpdateProductImages
    @ProductId INT,
    @PrimaryImageUrl VARCHAR(255),
    @HoverImageUrl VARCHAR(255)
AS
BEGIN
    -- Update primary image URL if provided
    IF @PrimaryImageUrl IS NOT NULL
    BEGIN
        UPDATE ProductImages
        SET ImageUrl = @PrimaryImageUrl
        WHERE ProductId = @ProductId AND ImageType = 'primary'
    END

    -- Update hover image URL if provided
    IF @HoverImageUrl IS NOT NULL
    BEGIN
        UPDATE ProductImages
        SET ImageUrl = @HoverImageUrl
        WHERE ProductId = @ProductId AND ImageType = 'hover'
    END
END

GO
CREATE PROCEDURE GetAllProducts
AS
BEGIN
    SELECT 
        p.ProductId, 
        p.Name, 
        piPrimary.ImageUrl AS PrimaryImage, 
        piHover.ImageUrl AS HoverImage,
        p.Category, 
        p.NewPrice, 
        p.OldPrice, 
        p.Available, 
        p.Date, 
        p.Size, 
        p.Description
    FROM 
        Products p
    LEFT JOIN ProductImages piPrimary ON p.ProductId = piPrimary.ProductId AND piPrimary.ImageType = 'primary'
    LEFT JOIN ProductImages piHover ON p.ProductId = piHover.ProductId AND piHover.ImageType = 'hover'
END

GO
CREATE PROCEDURE GetProductById
    @ProductId INT
AS
BEGIN
    BEGIN TRANSACTION
    BEGIN TRY
        SELECT 
            p.ProductId, 
            p.Name, 
            piPrimary.ImageUrl AS PrimaryImage, 
            piHover.ImageUrl AS HoverImage,
            p.Category, 
            p.NewPrice, 
            p.OldPrice, 
            p.Available, 
            p.Date, 
            p.Size, 
            p.Description
        FROM 
            Products p
        LEFT JOIN ProductImages piPrimary ON p.ProductId = piPrimary.ProductId AND piPrimary.ImageType = 'primary'
        LEFT JOIN ProductImages piHover ON p.ProductId = piHover.ProductId AND piHover.ImageType = 'hover'
        WHERE p.ProductId = @ProductId

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION
        THROW;
    END CATCH
END

GO
SELECT OBJECT_ID('SaveCheckoutData'), OBJECT_ID('InsertProduct'), OBJECT_ID('InsertProductImage');
GO

Use anikafashionhouse2;
GO

ALTER PROCEDURE GetMostRecentProducts
AS
BEGIN
    BEGIN TRANSACTION
    BEGIN TRY
        -- Log that the process has started
        --INSERT INTO LogEntries (LogLevel, Message, LogDate)
        --VALUES ('INFO', 'Started fetching most recent products.', GETDATE());

        -- Fetch top 5 most recent products along with their images
        SELECT TOP 5
            p.ProductId,
            p.Name,
            piPrimary.ImageUrl AS PrimaryImage,
            piHover.ImageUrl AS HoverImage,
            p.Category,
            p.NewPrice,
            p.OldPrice,
            p.Available,
            p.Date,
            p.Size,
            p.Description
        FROM Products p
        LEFT JOIN ProductImages piPrimary ON p.ProductId = piPrimary.ProductId AND piPrimary.ImageType = 'primary'
        LEFT JOIN ProductImages piHover ON p.ProductId = piHover.ProductId AND piHover.ImageType = 'hover'
        WHERE p.Date <= GETDATE()
        ORDER BY p.Date DESC;

        -- Log success
        --INSERT INTO LogEntries (LogLevel, Message, LogDate)
        --VALUES ('INFO', 'Successfully fetched most recent products.', GETDATE());

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback in case of any error
        ROLLBACK TRANSACTION;

        -- Log the error details
        --INSERT INTO LogEntries (LogLevel, Message, ExceptionMessage, LogDate)
       -- VALUES ('ERROR', 'Error occurred in GetMostRecentProducts.', ERROR_MESSAGE(), GETDATE());

        -- Rethrow the error to propagate it to the caller
        THROW;
    END CATCH
END
GO
CREATE PROCEDURE GetTopSoldItemsPerCategory
AS
BEGIN
    BEGIN TRANSACTION
    BEGIN TRY
        -- Fetch top 5 sold items per category with images
        SELECT TOP 5
            p.ProductId,
            p.Name,
            piPrimary.ImageUrl AS PrimaryImage,
            piHover.ImageUrl AS HoverImage,
            p.NewPrice,
            p.OldPrice,
            p.Category,
            p.Available,
            p.Size,
            p.Date,
            p.Description,
            SUM(oi.Quantity) AS TotalSold
        FROM OrderItems oi
        JOIN Products p ON oi.ProductId = p.ProductId
        JOIN Orders o ON oi.OrderId = o.OrderId
        LEFT JOIN ProductImages piPrimary ON p.ProductId = piPrimary.ProductId AND piPrimary.ImageType = 'primary'
        LEFT JOIN ProductImages piHover ON p.ProductId = piHover.ProductId AND piHover.ImageType = 'hover'
        WHERE o.Status = 'completed'
        GROUP BY 
            p.ProductId,
            p.Name,
            piPrimary.ImageUrl,
            piHover.ImageUrl,
            p.NewPrice,
            p.OldPrice,
            p.Available,
            p.Size,
            p.Date,
            p.Description,
            p.Category
        ORDER BY 
            p.Category, TotalSold DESC;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback transaction on error
        ROLLBACK TRANSACTION;

        -- Log or handle error as needed
        THROW;
    END CATCH
END;


go 
EXEC GetMostRecentProducts;


ALTER TABLE [dbo].[anikafashionhouse2].[Products]
ADD Image NVARCHAR(255);


USE anikafashionhouse2
select * from [dbo].[anikafashionhouse2].[Orders];


use  [anikafashionhouse2]

SELECT TOP (1000) [MenuItemId]
      ,[Title]
      ,[Handle]
      ,[ParentMenuItemId]
      ,[Link]
      ,[LabelText]
      ,[LabelColor]
      ,[ImageSrc]
      ,[ImageStyle]
      ,[ImageAlt]
      ,[Target]
      ,[Rel]
      ,[AriaDescribedBy]
      ,[DisplayOrder]
  FROM [anikafashionhouse2].[dbo].[MenuItems]

  SET FOREIGN_KEY_CHECKS=0;

  SELECT * FROM MenuItems
WHERE ParentMenuItemId IS NULL;

ALTER TABLE Products
ADD
    Note NVARCHAR(MAX) NULL,
    Material NVARCHAR(MAX) NULL,
    Care NVARCHAR(MAX) NULL,
    ModelHeightSize NVARCHAR(MAX) NULL;


SELECT ParentMenuItemId   MenuItemId, Title FROM [anikafashionhouse2].[dbo].[MenuItems]

SELECT MenuItemId, ParentMenuItemId, Title, Handle, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy FROM [anikafashionhouse2].[dbo].[MenuItems] ORDER BY DisplayOrder

  -- Top-level menu items (no parent)
INSERT INTO MenuItems (Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder)
VALUES
('NEW IN', 'newest-products', NULL, '/collections/newest-products', NULL, NULL, NULL, NULL, NULL, '_self', NULL, NULL, 1),
('SUMMER', 'summer', NULL, '/collections/summer', 'NEW', '#CE3241', NULL, NULL, NULL, '_self', NULL, NULL, 2),
('BLACK', 'black', NULL, '/collections/black', 'NEW', '#CE3241', 'https://cdn.shopify.com/s/files/1/0585/0077/6131/files/Black_black_logo.svg?v=1741852879', '{"height":"1.6rem"}', 'Blucheez | Black Logo', '_blank', 'noopener', 'a11y-new-window-message', 3),
('BELWARI', 'belwari', NULL, '/collections/belwari', NULL, NULL, 'https://cdn.shopify.com/s/files/1/0585/0077/6131/files/Belwari_Logo_Gold.svg?v=1703618271', '{"height":"1.8rem"}', 'Belwari Logo', '_blank', 'noopener', 'a11y-new-window-message', 4),
('MEN', 'mens-clothing', NULL, '/', NULL, NULL, NULL, NULL, NULL, '_self', NULL, NULL, 5);

SELECT MenuItemId as Id, Title FROM MenuItems WHERE Title IN ('SUMMER', 'BLACK', 'MEN', 'BELWARI', 'NEW IN','WOMEN');
-- Children of SUMMER (ParentMenuItemId = 2)
INSERT INTO MenuItems (Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder)
VALUES
('View All', 'summer-852', 852, '/collections/summer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Men''s', 'mens-summer-collection-852', 852, '/collections/mens-summer-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Women''s', 'womens-summer-collection-852', 852, '/collections/womens-summer-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3);



IF NOT EXISTS (SELECT 1 FROM MenuItems WHERE Handle = 'black')
BEGIN
    INSERT INTO MenuItems (Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder)
    VALUES ('View All', 'black', 853, '/collections/black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Men''s Black', 'mens-black', 853, '/collections/mens-black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Women''s Black', 'womens-black', 853, '/collections/womens-black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3)

END
ELSE
BEGIN
    INSERT INTO MenuItems (Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder)
    VALUES ('View All', 'black', 853, '/collections/black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Men''s Black', 'mens-black', 853, '/collections/mens-black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Women''s Black', 'womens-black', 853, '/collections/womens-black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3)
END


IF NOT EXISTS (SELECT 1 FROM MenuItems WHERE Handle = 'black')
BEGIN
    INSERT INTO MenuItems (Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder)
    VALUES ('View All', 'black', 853, '/collections/black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1)
END

-- Insert 'mens-black' if it doesn't exist
IF NOT EXISTS (SELECT 1 FROM MenuItems WHERE Handle = 'mens-black')
BEGIN
    INSERT INTO MenuItems (Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder)
    VALUES ('Men''s Black', 'mens-black', 853, '/collections/mens-black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2)
END


ALTER TABLE Products
DROP COLUMN Available


SELECT dc.name AS ConstraintName
FROM sys.default_constraints dc
INNER JOIN sys.columns c ON c.default_object_id = dc.object_id
WHERE c.object_id = OBJECT_ID('Products') AND c.name = 'Is_In_Stock';

ALTER TABLE Products DROP CONSTRAINT DF__Products__Is_In___607251E5;


ALTER TABLE Products DROP COLUMN Is_In_Stock;

ALTER TABLE Products
ADD Is_In_Stock BIT NOT NULL DEFAULT 0;

ALTER TABLE Products
ADD
    Is_In_Stock NVARCHAR(MAX) NULL
   



ALTER TABLE Products DROP COLUMN ;







  INSERT INTO MenuItems (Title, Handle, ParentMenuItemId, Link, LabelText, LabelColor, ImageSrc, ImageStyle, ImageAlt, Target, Rel, AriaDescribedBy, DisplayOrder)
VALUES
('NEW IN', 'newest-products', NULL, '/collections/newest-products', NULL, NULL, NULL, NULL, NULL, '_self', NULL, NULL, 1),
('SUMMER', 'summer', NULL, '/collections/summer', 'NEW', '#CE3241', NULL, NULL, NULL, '_self', NULL, NULL, 2),
('View All', 'summer', 2, '/collections/summer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Men''s', 'mens-summer-collection', 2, '/collections/mens-summer-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Women''s', 'womens-summer-collection', 2, '/collections/womens-summer-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('BLACK', 'black', NULL, '/collections/black', 'NEW', '#CE3241', 'https://cdn.shopify.com/s/files/1/0585/0077/6131/files/Black_black_logo.svg?v=1741852879', '{"height":"1.6rem"}', 'Blucheez | Black Logo', '_blank', 'noopener', 'a11y-new-window-message', 3),
('View All', 'black', 4, '/collections/black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Men''s Black', 'mens-black', 4, '/collections/mens-black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Women''s Black', 'womens-black', 4, '/collections/womens-black', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('BELWARI', 'belwari', NULL, '/collections/belwari', NULL, NULL, 'https://cdn.shopify.com/s/files/1/0585/0077/6131/files/Belwari_Logo_Gold.svg?v=1703618271', '{"height":"1.8rem"}', 'Belwari Logo', '_blank', 'noopener', 'a11y-new-window-message', 4),
('MEN', 'mens-clothing', NULL, '/', NULL, NULL, NULL, NULL, NULL, '_self', NULL, NULL, 5),
('View All', 'mens-wear', 6, '/collections/mens-wear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Panjabi', 'mens-panjabi', 6, '/collections/mens-panjabi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('View All', 'mens-panjabi-View All', 13, '/collections/mens-panjabi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Essential Panjabi', 'essential-panjabi-collection', 13, '/collections/essential-panjabi-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Elegant Panjabi', 'elegant-panjabi-collection', 13, '/collections/elegant-panjabi-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Exclusive Panjabi', 'exclusive-panjabi-collection', 13, '/collections/exclusive-panjabi-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Kabli', 'mens-kabli-panjabi', 13, '/collections/mens-kabli-panjabi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('Kids Panjabi', 'kids-panjabi', 13, '/collections/kids-panjabi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('Waistcoat', 'mens-waistcoats', 6, '/collections/mens-waistcoats', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Pajama', 'mens-pajama-collection', 6, '/collections/mens-pajama-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Shirt', 'mens-shirt', 6, '/collections/mens-shirt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('View All', 'mens-shirt-View All', 17, '/collections/mens-shirt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Formal Shirt', 'mens-formal-shirts', 17, '/collections/mens-formal-shirts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Premium Shirt', 'mens-premium-shirts', 17, '/collections/mens-premium-shirts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Casual Shirt', 'mens-casual-shirts', 17, '/collections/mens-casual-shirts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Polo Shirt', 'polo-shirt', 6, '/collections/polo-shirt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('T-shirt', 'mens-tshirt', 6, '/collections/mens-tshirt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7),
('Pants', 'mens-pant', 6, '/collections/mens-pant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8),
('View All', 'mens-pant-View All', 23, '/collections/mens-pant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Formal Pant', 'formal-pants', 23, '/collections/formal-pants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Casual Pant', 'casual-pants', 23, '/collections/casual-pants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Jeans', 'denim-jeans-pant', 23, '/collections/denim-jeans-pant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Joggers & Cargo', 'mens-jogger-pants', 23, '/collections/mens-jogger-pants', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('Shorts', 'mens-shorts-pant', 23, '/collections/mens-shorts-pant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('Relaxed Wear', 'mens-relaxed-trouser', 23, '/collections/mens-relaxed-trouser', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7),
('Blazer & Suit', 'mens-blazer', 6, '/collections/mens-blazer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 9),
('Winter Wear', 'mens-winter-wear', 6, '/collections/mens-winter-wear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10),
('View All', 'mens-winter-wear-View All', 31, '/collections/mens-winter-wear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Sweatshirt & Sweater', 'mens-sweatshirt-sweater', 31, '/collections/mens-sweatshirt-sweater', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Hoodie', 'mens-hoodies', 31, '/collections/mens-hoodies', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Jacket', 'mens-jackets-1', 31, '/collections/mens-jackets-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Overshirt & Hooded Shirt', 'overshirt', 31, '/collections/overshirt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('Plus Size', 'plus-size', 6, '/collections/plus-size', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11),
('View All', 'plus-size-View All', 37, '/collections/plus-size', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Panjabi +', 'extra-large-panjabi', 37, '/collections/extra-large-panjabi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Blazer +', 'mens-blazer-1', 37, '/collections/mens-blazer-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Casual Shirt +', 'mens-casual-shirts-1', 37, '/collections/mens-casual-shirts-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Polo Shirt +', 'polo-shirt-1', 37, '/collections/polo-shirt-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('T-shirt +', 't-shirt-1', 37, '/collections/t-shirt-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('Boxer +', 'mens-boxer-1', 37, '/collections/mens-boxer-1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7),
('Men''s Accessories', 'mens-accessories', 6, '#', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12),
('Tie', 'mens-tie', 45, '/collections/mens-tie', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Cap', 'mens-cap', 45, '/collections/mens-cap', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Boxer', 'mens-boxer', 45, '/collections/mens-boxer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Pocket Square', 'pocket-square', 45, '/collections/pocket-square', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('WOMEN', 'womens-clothing', NULL, '/', NULL, NULL, NULL, NULL, NULL, '_self', NULL, NULL, 6),
('View All', 'womens-wear', 50, '/collections/womens-wear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Ethnic', 'ethnic', 50, '#', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('All Kameez', 'kameez-collection', 51, '/collections/kameez-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('One Pcs Kurti', 'kurti-collection', 51, '/collections/kurti-collection', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Two Pcs Set', 'elegant-salwar-kameez', 51, '/collections/elegant-salwar-kameez', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Three Pcs Set', 'exclusive-salwar-kameez', 51, '/collections/exclusive-salwar-kameez', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Saree', 'saree', 51, '/collections/saree', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('Blouse', 'blouse', 51, '/collections/blouse', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('Western', 'western', 50, '#', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Western Tops', 'western-tops', 58, '/collections/western-tops', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Co-ords', 'womens-co-ord-sets', 58, '/collections/womens-co-ord-sets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Long Dress', 'long-dress', 58, '/collections/long-dress', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('T-Shirts', 'womens-tee-shirts', 58, '/collections/womens-tee-shirts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Skirt', 'skirt', 58, '/collections/skirt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('Outerwear', 'outerwear', 58, '/collections/outerwear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('Fusion Wear', 'ethnic-fusion-wear', 50, '/collections/ethnic-fusion-wear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Pants', 'womens-pant', 50, '/collections/womens-pant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('View All', 'womens-pant-View All', 65, '/collections/womens-pant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Women''s Jeans', 'women-jeans-pant', 65, '/collections/women-jeans-pant', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Women''s Pajama', 'womens-pajama', 65, '/collections/womens-pajama', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Women''s Trouser', 'womens-trouser', 65, '/collections/womens-trouser', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Winter Wear', 'womens-winter-wear', 50, '/collections/womens-winter-wear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('View All', 'womens-winter-wear-View All', 70, '/collections/womens-winter-wear', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Sweatshirts & Sweaters', 'womens-sweatshirts', 70, '/collections/womens-sweatshirts', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Women''s Jackets', 'womens-jackets', 70, '/collections/womens-jackets', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Jewellery', 'jewellery-Womens', 50, '/collections/jewellery', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7),
('Earrings', 'earrings', 74, '/collections/earrings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('ACCESSORIES', 'accessories', NULL, '/collections/accessories', NULL, NULL, NULL, NULL, NULL, '_self', NULL, NULL, 7),
('View All', 'accessories-View All', 76, '/collections/accessories', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Jewellery', 'jewellery', 76, '/collections/jewellery', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2),
('Earrings', 'earrings-womens', 78, '/collections/earrings', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
('Tie', 'mens-tie-viewall', 76, '/collections/mens-tie', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3),
('Cap', 'mens-cap-viewall', 76, '/collections/mens-cap', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4),
('Belt', 'belt', 76, '/collections/belt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5),
('Boxer', 'mens-boxer-viewall', 76, '/collections/mens-boxer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
('Pocket Square', 'pocket-square-viewall', 76, '/collections/pocket-square', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7),
('Backpack', 'bags', 76, '/collections/bags', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8),
('Face Mask', 'face-mask', 76, '/collections/face-mask', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 9),
('Gift Voucher', 'blucheez-gift-voucher', 76, '/products/blucheez-gift-voucher', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10),
('Blucheez Gift Box', 'blucheez-gift-box', 76, '/products/blucheez-gift-box', NULL, NULL, NULL, NULL, NULL, NULL,NULL, NULL, 10)



---LATEST ANIKAFASHION ALL SQL QUERY EVEN WITH THE DATABASE SCHEMA---

SELECT * FROM sys.sql_logins WHERE name = 'admin';
USE master;
GO
GRANT CONNECT SQL TO [admin];
-- Create the database
CREATE DATABASE anikafashionhouse3;
GO

USE anikafashionhouse3;
GO

-- Table: users
CREATE TABLE users (
    UserId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(100) NOT NULL,
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Role VARCHAR(255) NOT NULL,
    MarketingConsent BIT DEFAULT 0
);

-- Table: products
CREATE TABLE products (
    ProductId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Image VARCHAR(255) NOT NULL,
    Category VARCHAR(255) NOT NULL,
    NewPrice DECIMAL(10,2) NOT NULL,
    OldPrice DECIMAL(10,2),
    Available BIT DEFAULT 1,
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Size VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL
);

-- Table: cart
CREATE TABLE cart (
    CartId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    Date DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_cart_User FOREIGN KEY (UserId) REFERENCES users(UserId),
    CONSTRAINT FK_cart_Product FOREIGN KEY (ProductId) REFERENCES products(ProductId)
);

-- Table: orders
CREATE TABLE orders (
    OrderId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2) NOT NULL,
    DeliveryMethod VARCHAR(50) DEFAULT 'Pickup',
    UserId INT NOT NULL,

    CONSTRAINT FK_orders_User FOREIGN KEY (UserId) REFERENCES users(UserId)
);

-- Table: orderitems
CREATE TABLE orderitems (
    OrderItemId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,

    CONSTRAINT FK_orderitems_Order FOREIGN KEY (OrderId) REFERENCES orders(OrderId),
    CONSTRAINT FK_orderitems_Product FOREIGN KEY (ProductId) REFERENCES products(ProductId)
);

-- Table: productimages
CREATE TABLE productimages (
    ImageId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    ProductId INT NOT NULL,
    ImageUrl VARCHAR(255) NOT NULL,
    ImageType VARCHAR(10) CHECK (ImageType IN ('primary', 'hover')) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_productimages_Product FOREIGN KEY (ProductId) REFERENCES products(ProductId)
);

-- Table: shippingaddresses
CREATE TABLE shippingaddresses (
    ShippingAddressId INT NOT NULL PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL,
    AddressLine1 VARCHAR(255) NOT NULL,
    AddressLine2 VARCHAR(255),
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100) NOT NULL,
    PostalCode VARCHAR(20) NOT NULL,
    Country VARCHAR(100) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_shippingaddresses_Order FOREIGN KEY (OrderId) REFERENCES orders(OrderId)
);


INSERT INTO users (Name, Email, Password, Role, MarketingConsent)
VALUES 
('Abul Kashim', 'kashim@example.com', 'pass123', 'Customer', 1),
('Nusrat Jahan', 'nusrat@example.com', 'pass456', 'Customer', 0),
('Admin User', 'admin@example.com', 'admin123', 'Admin', 1);


INSERT INTO products (Name, Image, Category, NewPrice, OldPrice, Available, Size, Description)
VALUES
('Blue Denim Jacket', 'denim.jpg', 'Jackets', 1999.99, 2499.99, 1, 'M', 'Stylish blue denim jacket for all seasons.'),
('White Cotton T-Shirt', 'tshirt.jpg', 'Tops', 499.99, NULL, 1, 'L', '100% pure cotton comfortable white t-shirt.'),
('Black Sneakers', 'sneakers.jpg', 'Shoes', 2999.00, 3499.00, 1, '42', 'Trendy black sneakers with rubber soles.');

INSERT INTO cart (UserId, ProductId, Quantity)
VALUES 
(1, 1, 2),
(1, 3, 1),
(2, 2, 3);


INSERT INTO orders (UserId, TotalAmount)
VALUES
(1, 6999.98),
(2, 1499.97);

INSERT INTO orderitems (OrderId, ProductId, Quantity, Price)
VALUES
(1, 1, 2, 1999.99),
(1, 3, 1, 2999.00),
(2, 2, 3, 499.99);


INSERT INTO productimages (ProductId, ImageUrl, ImageType)
VALUES
(1, 'denim_front.jpg', 'primary'),
(1, 'denim_back.jpg', 'hover'),
(2, 'tshirt_main.jpg', 'primary'),
(3, 'sneakers_top.jpg', 'primary'),
(3, 'sneakers_side.jpg', 'hover');


INSERT INTO shippingaddresses (OrderId, AddressLine1, AddressLine2, City, State, PostalCode, Country, Phone)
VALUES
(1, '325/B Airport', 'Near Bus Stand', 'Dhaka', 'Dhaka', '1230', 'Bangladesh', '+8801782669276'),
(2, '45 Lake View Road', NULL, 'Chittagong', 'Chattogram', '4000', 'Bangladesh', '+8801750001111');


CREATE DATABASE anikafashionhouse4;


-- STEP 1: Set target database name
-- View logical file names first (run this separately)
RESTORE FILELISTONLY 
FROM DISK = 'D:\ApiOnLamda\database\anikafashionhouse2.bak';
GO

-- Then use the names from above in this section:
RESTORE DATABASE anikafashionhouse4
FROM DISK = 'D:\ApiOnLamda\database\anikafashionhouse2.bak'
WITH 
    MOVE 'LogicalDataName' TO 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\anikafashionhouse4.mdf',
    MOVE 'LogicalLogName' TO 'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\anikafashionhouse4_log.ldf',
    STATS = 5;
GO


CREATE DATABASE anikafashionhouse2;
GO

USE anikafashionhouse2;
GO


-- Users table
CREATE TABLE Users (
    UserId INT PRIMARY KEY,
    Name NVARCHAR(100),
    Email NVARCHAR(255) UNIQUE,
    MarketingConsent BIT
);

-- Products table (without Image field)
CREATE TABLE Products (
    ProductId INT PRIMARY KEY,
    Name NVARCHAR(100),
    Category NVARCHAR(100),
    NewPrice DECIMAL(10, 2),
    OldPrice DECIMAL(10, 2),
    Available BIT,
    Date DATETIME,
    Size NVARCHAR(50),
    Description NVARCHAR(MAX)
);

ALTER TABLE Products DROP COLUMN ProductId;

ALTER TABLE Products ADD ProductId INT IDENTITY(1,1) PRIMARY KEY;


-- ProductImages table
CREATE TABLE ProductImages (
    ImageId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    ImageUrl NVARCHAR(255) NOT NULL,
    ImageType NVARCHAR(20) NOT NULL CHECK (ImageType IN ('primary', 'hover')),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE
);

-- Orders table
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY,
    UserId INT,
    TotalAmount DECIMAL(10, 2),
    DeliveryMethod NVARCHAR(50),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- OrderItems table
CREATE TABLE OrderItems (
    OrderItemId INT PRIMARY KEY,
    OrderId INT,
    ProductId INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- Cart table
CREATE TABLE Cart (
    CartId INT PRIMARY KEY,
    UserId INT,
    ProductId INT,
    Quantity INT,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- ShippingAddresses table
CREATE TABLE ShippingAddresses (
    ShippingAddressId INT PRIMARY KEY,
    OrderId INT,
    AddressLine1 NVARCHAR(255),
    AddressLine2 NVARCHAR(255),
    City NVARCHAR(100),
    State NVARCHAR(100),
    PostalCode NVARCHAR(20),
    Country NVARCHAR(100),
    Phone NVARCHAR(20),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);

CREATE TABLE Products_New (
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100),
    Category NVARCHAR(100),
    NewPrice DECIMAL(10, 2),
    OldPrice DECIMAL(10, 2),
    Available BIT,
    Date DATETIME,
    Size NVARCHAR(50),
    Description NVARCHAR(MAX)
);

SET IDENTITY_INSERT Products_New ON;

INSERT INTO Products_New (ProductId, Name, Category, NewPrice, OldPrice, Available, Date, Size, Description)
SELECT ProductId, Name, Category, NewPrice, OldPrice, Available, Date, Size, Description
FROM Products;

SET IDENTITY_INSERT Products_New OFF;


-- Drop FK from Cart
ALTER TABLE Cart DROP CONSTRAINT FK__Cart__ProductId__47DBAE45;

-- Drop FK from OrderItem
ALTER TABLE OrderItem DROP CONSTRAINT FK__OrderItem__Produ__440B1D61;

-- Drop FK from ProductImage
ALTER TABLE ProductImage DROP CONSTRAINT FK__ProductIm__Produ__3D5E1FD2;


DROP TABLE Products;



EXEC sp_rename 'Products_New', 'Products';


-- Recreate FK in Cart
ALTER TABLE Cart
ADD CONSTRAINT FK_Cart_ProductId
FOREIGN KEY (ProductId) REFERENCES Products(ProductId);

-- Recreate FK in OrderItem
ALTER TABLE OrderItem
ADD CONSTRAINT FK_OrderItem_ProductId
FOREIGN KEY (ProductId) REFERENCES Products(ProductId);

-- Recreate FK in ProductImage
ALTER TABLE ProductImage
ADD CONSTRAINT FK_ProductImage_ProductId
FOREIGN KEY (ProductId) REFERENCES Products(ProductId);

--updated schema  details

-- Adjusted Schema for a Real-Life E-commerce Scenario

-- 1. Users Table (Customer/User Information)
-- Renamed to Customers for clarity in e-commerce context, though 'Users' is fine.
CREATE TABLE Customers (
    CustomerId INT IDENTITY(1,1) PRIMARY KEY, -- Use IDENTITY for auto-incrementing PK
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100),
    Email NVARCHAR(255) UNIQUE NOT NULL, -- Email should be mandatory
    PasswordHash NVARCHAR(255) NOT NULL, -- Store hashed password, never plain
    PhoneNumber NVARCHAR(20),             -- Added phone number for contact
    MarketingConsent BIT DEFAULT 0,       -- Default to no consent
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- 2. Addresses Table (for reusable addresses, not just shipping for an order)
-- Allows a user to have multiple addresses (shipping, billing, saved addresses)
CREATE TABLE Addresses (
    AddressId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL,              -- Link to Customer
    AddressLine1 NVARCHAR(255) NOT NULL,
    AddressLine2 NVARCHAR(255),
    City NVARCHAR(100) NOT NULL,
    StateProvince NVARCHAR(100),          -- More general than 'State'
    PostalCode NVARCHAR(20) NOT NULL,
    Country NVARCHAR(100) NOT NULL,
    IsDefaultShipping BIT DEFAULT 0,
    IsDefaultBilling BIT DEFAULT 0,
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId) ON DELETE CASCADE
);

-- 3. Products Table
-- Added better naming conventions and removed the ALTER TABLE part for cleaner script.
CREATE TABLE Products (
    ProductId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,          -- Increased length for product names
    Description NVARCHAR(MAX),
    Category NVARCHAR(100),
    Brand NVARCHAR(100),                  -- Added brand
    BasePrice DECIMAL(10, 2) NOT NULL,    -- Renamed NewPrice to BasePrice for clarity
    DiscountPrice DECIMAL(10, 2),         -- OldPrice becomes DiscountPrice (can be NULL)
    SKU NVARCHAR(50) UNIQUE,              -- Stock Keeping Unit for unique product identification
    Weight DECIMAL(10, 2),                -- Added weight for shipping calculations
    AvailabilityStatus NVARCHAR(50) NOT NULL CHECK (AvailabilityStatus IN ('In Stock', 'Out of Stock', 'Pre-order', 'Discontinued')),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- 4. ProductVariants Table (If products have variations like Size, Color)
-- This allows a product like "T-Shirt" to have variants like "Red-Small", "Blue-Large"
CREATE TABLE ProductVariants (
    VariantId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT NOT NULL,
    VariantName NVARCHAR(255),            -- e.g., "Color: Red, Size: M"
    SKU NVARCHAR(50) UNIQUE,              -- Unique SKU for each variant
    PriceAdjustment DECIMAL(10, 2) DEFAULT 0, -- Adjustment to base product price
    StockQuantity INT NOT NULL DEFAULT 0,     -- Stock for this specific variant
    ImageUrl NVARCHAR(255),                   -- Primary image for this variant
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE
);

-- 5. ProductImages Table (For multiple images per product, possibly per variant)
-- Now links to Products OR ProductVariants
CREATE TABLE ProductImages (
    ImageId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId INT,                      -- Can be NULL if linked via VariantId
    VariantId INT,                      -- Can be NULL if linked via ProductId
    ImageUrl NVARCHAR(255) NOT NULL,
    AltText NVARCHAR(255),              -- Added for accessibility and SEO
    IsPrimary BIT DEFAULT 0,            -- Is this the main image for the product/variant?
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId) ON DELETE CASCADE,
    -- Ensure at least one of ProductId or VariantId is provided
    CONSTRAINT CHK_ProductImages_ProductIdOrVariantId CHECK (ProductId IS NOT NULL OR VariantId IS NOT NULL)
);

-- 6. Orders Table (More detailed Order Status)
CREATE TABLE Orders (
    OrderId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    OrderStatus NVARCHAR(50) NOT NULL CHECK (OrderStatus IN ('Pending Payment', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded', 'Returned')),
    TotalAmount DECIMAL(10, 2) NOT NULL,      -- Final amount charged to customer
    Subtotal DECIMAL(10, 2),                  -- Sum of item prices before tax/shipping/discounts
    ShippingCost DECIMAL(10, 2) DEFAULT 0,
    TaxAmount DECIMAL(10, 2) DEFAULT 0,
    DiscountAmount DECIMAL(10, 2) DEFAULT 0,
    ShippingAddressId INT,                    -- Link to specific Shipping Address
    BillingAddressId INT,                     -- Link to specific Billing Address (can be same as shipping)
    DeliveryMethod NVARCHAR(50),              -- e.g., 'Standard Shipping', 'Express', 'Pickup'
    TrackingNumber NVARCHAR(100),             -- For shipment tracking
    Notes NVARCHAR(MAX),                      -- Any customer notes or internal notes
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId),
    FOREIGN KEY (ShippingAddressId) REFERENCES Addresses(AddressId),
    FOREIGN KEY (BillingAddressId) REFERENCES Addresses(AddressId)
);

-- 7. OrderItems Table (Now uses ProductVariants if applicable, captures price at time of order)
CREATE TABLE OrderItems (
    OrderItemId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,                 -- Original Product ID
    VariantId INT,                          -- If a specific variant was ordered
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10, 2) NOT NULL,      -- Price *at the time of order* (important for historical accuracy)
    ItemTotal DECIMAL(10, 2) NOT NULL,      -- Quantity * UnitPrice
    Notes NVARCHAR(MAX),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId), -- Keeps a reference to the base product
    FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId)
);

-- 8. Payments Table (Handles payment details and status)
CREATE TABLE Payments (
    PaymentId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL CHECK (PaymentMethod IN ('Credit Card', 'Debit Card', 'Cash on Delivery', 'Bank Transfer', 'PayPal', 'Stripe')),
    Amount DECIMAL(10, 2) NOT NULL,
    TransactionId NVARCHAR(255) UNIQUE,    -- ID from payment gateway (e.g., Stripe charge ID)
    PaymentStatus NVARCHAR(50) NOT NULL CHECK (PaymentStatus IN ('Pending', 'Authorized', 'Captured', 'Failed', 'Refunded', 'Cancelled')),
    PaymentGatewayResponse NVARCHAR(MAX),  -- Raw response from gateway for debugging
    PaymentDate DATETIME DEFAULT GETDATE(),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE
);

-- 9. PaymentDetails (to store specific details for each payment method)
-- This table is more flexible than having CardPayment/CashPayment as separate tables that inherit.
-- Instead, it stores the details related to a specific Payment transaction.
-- This structure is often preferred in real-world scenarios for flexibility.

CREATE TABLE PaymentDetails (
    PaymentDetailId INT IDENTITY(1,1) PRIMARY KEY,
    PaymentId INT NOT NULL UNIQUE, -- One-to-one relationship with Payments
    -- Card Details (if PaymentMethod is 'Credit Card' or 'Debit Card')
    CardType NVARCHAR(50),                 -- e.g., 'Visa', 'MasterCard'
    Last4Digits NVARCHAR(4),               -- Last 4 digits of card for reference
    CardBrand NVARCHAR(50),                -- e.g., 'Visa', 'Mastercard'
    -- (Never store full card numbers, CVVs, or expiry dates directly in your DB unless PCI compliant)
    -- For real systems, use tokenization and a PCI-compliant payment gateway.
    -- Cash Details (if PaymentMethod is 'Cash on Delivery')
    CashReceived DECIMAL(10, 2),
    ChangeGiven DECIMAL(10, 2),
    -- Bank Transfer Details (if PaymentMethod is 'Bank Transfer')
    BankName NVARCHAR(100),
    AccountNumberLast4 NVARCHAR(4),
    ReferenceCode NVARCHAR(100),

    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId) ON DELETE CASCADE
);

-- 10. Cart Table (Shopping Cart)
-- Use a composite primary key to allow a user to add multiple products to their cart.
CREATE TABLE Carts ( -- Renamed to Carts as it's typically plural
    CartId INT IDENTITY(1,1) PRIMARY KEY, -- A unique ID for the cart itself
    CustomerId INT NOT NULL UNIQUE,       -- Each customer has one active cart
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId) ON DELETE CASCADE
);

-- 11. CartItems Table (Items within the Cart)
CREATE TABLE CartItems (
    CartItemId INT IDENTITY(1,1) PRIMARY KEY,
    CartId INT NOT NULL,
    ProductId INT NOT NULL,                 -- Reference to base Product
    VariantId INT,                          -- Reference to specific ProductVariant
    Quantity INT NOT NULL CHECK (Quantity > 0),
    AddedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CartId) REFERENCES Carts(CartId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
    FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId),
    -- Ensure only one entry per product/variant in a given cart
    UNIQUE (CartId, ProductId, VariantId)
);


-- Drop existing ALTER TABLE and INSERT statements if starting fresh.
-- If these were migration scripts, they would be handled differently.
-- The provided ALTER TABLE/INSERT/DROP/RENAME section looks like a migration
-- step to add IDENTITY to Products. This would be part of a deployment script,
-- not the final schema definition.


CREATE PROCEDURE GetMostRecentProducts  
AS  
BEGIN  
    SELECT TOP 5 
        ProductId,
        Name,
        Category,
        NewPrice,
        OldPrice,
        Available,
        Date,
        Size,
        Description
    FROM Products
    WHERE Date <= GETDATE()
    ORDER BY Date DESC;
END;
GO



CREATE PROCEDURE SaveCheckoutData
    @UserId INT,
    @TotalAmount DECIMAL(10, 2),
    @DeliveryMethod NVARCHAR(50),
    @AddressLine1 NVARCHAR(255) = NULL,
    @AddressLine2 NVARCHAR(255) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @PostalCode NVARCHAR(20) = NULL,
    @Country NVARCHAR(100) = NULL,
    @Phone NVARCHAR(20) = NULL,
    @MarketingConsent BIT = 0
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Orders (UserId, TotalAmount, DeliveryMethod)
        VALUES (@UserId, @TotalAmount, @DeliveryMethod);

        DECLARE @OrderId INT = SCOPE_IDENTITY();

        IF (@DeliveryMethod = 'Ship')
        BEGIN
            INSERT INTO ShippingAddresses (OrderId, AddressLine1, AddressLine2, City, State, PostalCode, Country, Phone)
            VALUES (@OrderId, @AddressLine1, @AddressLine2, @City, @State, @PostalCode, @Country, @Phone);
        END

        UPDATE Users
        SET MarketingConsent = @MarketingConsent
        WHERE UserId = @UserId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

-- Drop the existing database if it exists
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'anikafashionhouse2')
BEGIN
    DROP DATABASE anikafashionhouse2;
END
GO

-- Create a new database
CREATE DATABASE anikafashionhouse;
GO

USE anikafashionhouse;
GO

-- Users table with auto-generated UserId
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,   -- Auto-incremented primary key
    Name NVARCHAR(100),
    Email NVARCHAR(255) UNIQUE,
    MarketingConsent BIT
);


-- Add Password column
ALTER TABLE Users
ADD Password NVARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE Users
ADD MarketingConsent BIT;

-- Add Date column with default to current date
ALTER TABLE Users
ADD Date DATETIME NOT NULL DEFAULT GETDATE();

-- Add Role column
ALTER TABLE Users
ADD Role NVARCHAR(50) NOT NULL DEFAULT 'User';

select * from Users;

-- (Optional) If you want to remove MarketingConsent
 ALTER TABLE Users
DROP COLUMN MarketingConsent;
 Products table with auto-generated ProductId
CREATE TABLE Products (
    ProductId INT IDENTITY(1,1) PRIMARY KEY,   -- Auto-incremented primary key
    Name NVARCHAR(100),
    Category NVARCHAR(100),
    NewPrice DECIMAL(10, 2),
    OldPrice DECIMAL(10, 2),
    Available BIT,
    Date DATETIME,
    Size NVARCHAR(50),
    Description NVARCHAR(MAX)
);

-- ProductImages table with auto-generated ImageId and foreign key to Products
CREATE TABLE ProductImages (
    ImageId INT IDENTITY(1,1) PRIMARY KEY,   -- Auto-incremented primary key
    ProductId INT NOT NULL,
    ImageUrl NVARCHAR(255) NOT NULL,
    ImageType NVARCHAR(20) NOT NULL CHECK (ImageType IN ('primary', 'hover')),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE
);

-- Orders table with auto-generated OrderId and foreign key to Users
CREATE TABLE Orders (
    OrderId INT IDENTITY(1,1) PRIMARY KEY,   -- Auto-incremented primary key
    UserId INT,
    TotalAmount DECIMAL(10, 2),
    DeliveryMethod NVARCHAR(50),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

ALTER TABLE Orders
ADD Status NVARCHAR(50) NOT NULL DEFAULT 'Pending';

ALTER TABLE Orders
ADD 
    OrderDate DATETIME NOT NULL DEFAULT GETDATE();


-- OrderItems table with auto-generated OrderItemId and foreign keys to Orders and Products
CREATE TABLE OrderItems (
    OrderItemId INT IDENTITY(1,1) PRIMARY KEY,   -- Auto-incremented primary key
    OrderId INT,
    ProductId INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- Cart table with auto-generated CartId and foreign keys to Users and Products
CREATE TABLE Cart (
    CartId INT IDENTITY(1,1) PRIMARY KEY,   -- Auto-incremented primary key
    UserId INT,
    ProductId INT,
    Quantity INT,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- ShippingAddresses table with auto-generated ShippingAddressId and foreign key to Orders
CREATE TABLE ShippingAddresses (
    ShippingAddressId INT IDENTITY(1,1) PRIMARY KEY,   -- Auto-incremented primary key
    OrderId INT,
    AddressLine1 NVARCHAR(255),
    AddressLine2 NVARCHAR(255),
    City NVARCHAR(100),
    State NVARCHAR(100),
    PostalCode NVARCHAR(20),
    Country NVARCHAR(100),
    Phone NVARCHAR(20),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);

ALTER TABLE ShippingAddresses
ADD CreatedAt DATETIME DEFAULT GETDATE();

ALTER TABLE Orders
ADD DeliveryMethod NVARCHAR(50) DEFAULT 'Pickup'; -- Default to 'Pickup'

ALTER TABLE Users
ADD MarketingConsent BIT DEFAULT 0; -- Default to 'No Consent'

ALTER TABLE Orders
ADD CONSTRAINT DF_Orders_DeliveryMethod
DEFAULT 'Pickup' FOR DeliveryMethod;


ALTER TABLE Users
ADD CONSTRAINT DF_Users_MarketingConsent
DEFAULT 0 FOR MarketingConsent;




CREATE TABLE ShippingAddresses (
    ShippingAddressId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT NOT NULL FOREIGN KEY REFERENCES Orders(OrderId),
    AddressLine1 NVARCHAR(255) NOT NULL,
    AddressLine2 NVARCHAR(255),
    City NVARCHAR(100) NOT NULL,
    State NVARCHAR(100) NOT NULL,
    PostalCode NVARCHAR(20) NOT NULL,
    Country NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TYPE CartItemType AS TABLE
(
    ProductId INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    [Date] DATETIME
);


-- Create a stored procedure to get most recent products
CREATE PROCEDURE GetMostRecentProducts  
AS  
BEGIN  
    SELECT TOP 5 
        ProductId,
        Name,
        Category,
        NewPrice,
        OldPrice,
        Available,
        Date,
        Size,
        Description
    FROM Products
    WHERE Date <= GETDATE()
    ORDER BY Date DESC;
END;
GO

-- Create a stored procedure to save checkout data with transaction
CREATE PROCEDURE SaveCheckoutData
    @UserId INT,
    @TotalAmount DECIMAL(10, 2),
    @DeliveryMethod NVARCHAR(50),
    @AddressLine1 NVARCHAR(255) = NULL,
    @AddressLine2 NVARCHAR(255) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @PostalCode NVARCHAR(20) = NULL,
    @Country NVARCHAR(100) = NULL,
    @Phone NVARCHAR(20) = NULL,
    @MarketingConsent BIT = 0
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Insert into Orders table
        INSERT INTO Orders (UserId, TotalAmount, DeliveryMethod)
        VALUES (@UserId, @TotalAmount, @DeliveryMethod);

        DECLARE @OrderId INT = SCOPE_IDENTITY(); -- Get the newly inserted OrderId

        -- If delivery method is 'Ship', insert shipping address
        IF (@DeliveryMethod = 'Ship')
        BEGIN
            INSERT INTO ShippingAddresses (OrderId, AddressLine1, AddressLine2, City, State, PostalCode, Country, Phone)
            VALUES (@OrderId, @AddressLine1, @AddressLine2, @City, @State, @PostalCode, @Country, @Phone);
        END

        -- Update user's marketing consent
        UPDATE Users
        SET MarketingConsent = @MarketingConsent
        WHERE UserId = @UserId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO

CREATE PROCEDURE InsertProductImage
    @ProductId INT,
    @ImageUrl NVARCHAR(255),
    @ImageType NVARCHAR(20)
AS
BEGIN
    -- Validate the ImageType
    IF @ImageType NOT IN ('primary', 'hover')
    BEGIN
        -- Throw an error if ImageType is not 'primary' or 'hover'
        THROW 50001, 'Invalid ImageType. Must be ''primary'' or ''hover''.', 1;
    END

    -- Insert the image record into ProductImages table
    INSERT INTO ProductImages (ProductId, ImageUrl, ImageType)
    VALUES (@ProductId, @ImageUrl, @ImageType);
END;
GO


CREATE PROCEDURE GetProductImagesByProductId
    @ProductId INT
AS
BEGIN
    SELECT 
        ImageType, 
        ProductId, 
        ImageUrl
    FROM 
        ProductImages
    WHERE 
        ProductId = @ProductId;
END;


SELECT 
    p.ProductId,
    p.Name,
    p.Category,
    p.NewPrice,
    p.OldPrice,
    p.Available,
    p.Date,
    p.Size,
    p.Description,
    MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) AS PrimaryImageUrl,
    MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) AS HoverImageUrl
FROM
    dbo.Products p
LEFT JOIN
    dbo.ProductImages pi
ON
    p.ProductId = pi.ProductId
WHERE
    p.Category = 'Men'
GROUP BY 
    p.ProductId, p.Name, p.Category, p.NewPrice, p.OldPrice, 
    p.Available, p.Date, p.Size, p.Description
HAVING
    MAX(CASE WHEN pi.ImageType = 'primary' THEN pi.ImageUrl END) IS NOT NULL
    OR MAX(CASE WHEN pi.ImageType = 'hover' THEN pi.ImageUrl END) IS NOT NULL


	select * from Products



	ALTER PROCEDURE SaveCheckoutData
    @UserId INT,
    @TotalAmount DECIMAL(10, 2),
    @DeliveryMethod NVARCHAR(50),
    @AddressLine1 NVARCHAR(255) = NULL,
    @AddressLine2 NVARCHAR(255) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @PostalCode NVARCHAR(20) = NULL,
    @Country NVARCHAR(100) = NULL,
    @Phone NVARCHAR(20) = NULL,
    @MarketingConsent BIT = 0,
    @CartItems CartItemType READONLY
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Insert into Orders table with Status set to 'Completed' and OrderDate as current date
        INSERT INTO Orders (
            UserId, TotalAmount, DeliveryMethod, OrderDate, Status
        )
        VALUES (
            @UserId, @TotalAmount, @DeliveryMethod, GETDATE(), 'Completed'
        );

        DECLARE @OrderId INT = SCOPE_IDENTITY();

        -- Insert shipping address if needed (when DeliveryMethod = 'Ship')
        IF (@DeliveryMethod = 'Ship')
        BEGIN
            INSERT INTO ShippingAddresses (
                OrderId, AddressLine1, AddressLine2, City, State, PostalCode, Country, Phone
            )
            VALUES (
                @OrderId, @AddressLine1, @AddressLine2, @City, @State, @PostalCode, @Country, @Phone
            );
        END

        -- Insert cart items into the OrderItems table
        INSERT INTO OrderItems (
            OrderId, ProductId, Quantity, Price, ItemDate
        )
        SELECT 
            @OrderId, ProductId, Quantity, Price, [Date]
        FROM @CartItems;

        -- Update user's marketing consent status
        UPDATE Users
        SET MarketingConsent = @MarketingConsent
        WHERE UserId = @UserId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO


 Alter PROCEDURE SaveCheckoutData
    @UserId INT,
    @TotalAmount DECIMAL(10, 2),
    @DeliveryMethod NVARCHAR(50),
    @AddressLine1 NVARCHAR(255) = NULL,
    @AddressLine2 NVARCHAR(255) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @PostalCode NVARCHAR(20) = NULL,
    @Country NVARCHAR(100) = NULL,
    @Phone NVARCHAR(20) = NULL,
    @MarketingConsent BIT = 0,
    @CartItems CartItemType READONLY
AS
BEGIN
    -- Start transaction
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insert into Orders table (including default values for Status and OrderDate)
        INSERT INTO Orders (UserId, TotalAmount, DeliveryMethod, Status, OrderDate)
        VALUES (@UserId, @TotalAmount, @DeliveryMethod, 'Completed', GETDATE());

        DECLARE @OrderId INT = SCOPE_IDENTITY(); -- Get the generated OrderId

        -- If the delivery method is 'Ship', insert into ShippingAddresses
        IF (@DeliveryMethod = 'Ship')
        BEGIN
            INSERT INTO ShippingAddresses (OrderId, AddressLine1, AddressLine2, City, State, PostalCode, Country, Phone)
            VALUES (@OrderId, @AddressLine1, @AddressLine2, @City, @State, @PostalCode, @Country, @Phone);
        END

        -- Insert each CartItem into OrderItems table
        INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price)
        SELECT @OrderId, ProductId, Quantity, Price
        FROM @CartItems;

        -- Update MarketingConsent in Users table
        UPDATE Users
        SET MarketingConsent = @MarketingConsent
        WHERE UserId = @UserId;

        -- Commit transaction
        COMMIT TRANSACTION;
    END TRY

    BEGIN CATCH
        -- Rollback transaction in case of error
        ROLLBACK TRANSACTION;

        -- Rethrow the error for debugging
        THROW;
    END CATCH
END











