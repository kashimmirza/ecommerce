/** @format */

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ListProduct.css";
// import cross_icon from "../Assets/cross_icon.png";

// const ListProduct = () => {
//  const [allproducts, setAllProducts] = useState([]);

//  // Function to fetch all products
//  const fetchInfo = async () => {
//   try {
//    const response = await axios.get(
//     //"https://ld3ujozidmopbmvu4dkft6hm3i0gpdrb.lambda-url.us-east-1.on.aws/api/product/all",
//     "https://localhost:7142/api/product/all",
//    );
//    console.log("response:", response);
//    setAllProducts(response.data);
//   } catch (error) {
//    console.error("Error fetching products:", error);
//   }
//  };

//  useEffect(() => {
//   fetchInfo();
//  }, []);

//  // Function to remove a product
//  const removeProduct = async (id) => {
//   try {
//    await axios.delete(
//     //`https://ld3ujozidmopbmvu4dkft6hm3i0gpdrb.lambda-url.us-east-1.on.aws/api/product/remove/${id}`,
//     `https://localhost:7142/api/Product/remove/${id}`,
//    );
//    // Refresh the list after removing a product
//    fetchInfo();
//   } catch (error) {
//    console.error("Error removing product:", error);
//   }
//  };

//  return (
//   <div className="listproduct">
//    <h1>All Products List</h1>
//    <div className="listproduct-format-main">
//     <p>Products</p>
//     <p>Title</p>
//     <p>Old Price</p>
//     <p>New Price</p>
//     <p>Category</p>
//     <p>Size</p>
//     <p>Description</p>
//     <p>update</p>
//     <p>Remove</p>
//    </div>
//    <div className="listproduct-allproducts">
//     <hr />
//     {allproducts.map((e) => (
//      <div key={e.id}>
//       <div className="listproduct-format">
//        <img className="listproduct-product-icon" src={e.image} alt={e.name} />
//        <p className="cartitems-product-title">{e.name}</p>
//        <p>${e.oldPrice}</p>
//        <p>${e.newPrice}</p>
//        <p>{e.category}</p>
//        <p>{e.Size}</p>
//        <p>{e.Description}</p>
//        <img
//         className="listproduct-remove-icon"
//         onClick={() => removeProduct(e.id)}
//         src={cross_icon}
//         alt="Remove"
//        />
//       </div>
//       <hr />
//      </div>
//     ))}
//    </div>
//   </div>
//  );
// };

// export default ListProduct;

//=========================grid style one==================
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//  Box,
//  Grid,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Button,
//  IconButton,
//  TextField,
//  Select,
//  MenuItem,
//  FormControl,
//  Checkbox,
//  FormGroup,
//  FormControlLabel,
//  Typography,
//  Menu,
// } from "@mui/material";
// import { Delete, Edit, Save, FilterList } from "@mui/icons-material";

// const ListProduct = () => {
//  const [allProducts, setAllProducts] = useState([]);
//  const [filteredProducts, setFilteredProducts] = useState([]);
//  const [editingRow, setEditingRow] = useState(null);
//  const [columnFilters, setColumnFilters] = useState({});
//  const [anchorEl, setAnchorEl] = useState(null);
//  const [activeColumn, setActiveColumn] = useState("");

//  // Fetch products from API
//  const fetchProducts = async () => {
//   try {
//    const response = await axios.get("https://localhost:7142/api/product/all");
//    setAllProducts(response.data);
//    setFilteredProducts(response.data); // Initialize filtered data
//   } catch (error) {
//    console.error("Error fetching products:", error);
//   }
//  };

//  // Filter by column values
//  const handleColumnFilter = (column, value) => {
//   setColumnFilters((prev) => ({ ...prev, [column]: value }));
//   const filtered = allProducts.filter((product) =>
//    Object.entries({ ...columnFilters, [column]: value }).every(
//     ([key, val]) => !val || product[key]?.toString() === val,
//    ),
//   );
//   setFilteredProducts(filtered);
//   setAnchorEl(null);
//  };

//  // Update a product
//  const updateProduct = async (updatedProduct) => {
//   try {
//    await axios.put("https://localhost:7142/api/Product/update", updatedProduct);
//    fetchProducts();
//    setEditingRow(null);
//   } catch (error) {
//    console.error("Error updating product:", error);
//   }
//  };

//  // Delete a product
//  const removeProduct = async (id) => {
//   try {
//    await axios.delete(`https://localhost:7142/api/Product/remove/${id}`);
//    fetchProducts();
//   } catch (error) {
//    console.error("Error removing product:", error);
//   }
//  };

//  useEffect(() => {
//   fetchProducts();
//  }, []);

//  return (
//   <Box sx={{ p: 3 }}>
//    <Typography variant="h4" gutterBottom>
//     Product Management
//    </Typography>

//    {/* Product Table */}
//    <TableContainer component={Paper}>
//     <Table>
//      <TableHead>
//       <TableRow>
//        {[
//         "Products",
//         "Title",
//         "Old Price",
//         "New Price",
//         "Category",
//         "Size",
//         "Description",
//         "Actions",
//        ].map((header) => (
//         <TableCell key={header}>
//          {header === "Products" || header === "Actions" ? (
//           header
//          ) : (
//           <Button
//            onClick={(e) => {
//             setActiveColumn(
//              header.toLowerCase().replace(" ", ""), // Match API fields
//             );
//             setAnchorEl(e.currentTarget);
//            }}
//            endIcon={<FilterList />}
//           >
//            {header}
//           </Button>
//          )}
//         </TableCell>
//        ))}
//       </TableRow>
//      </TableHead>
//      <TableBody>
//       {filteredProducts.map((product) => (
//        <TableRow key={product.id}>
//         <TableCell>
//          <img
//           src={product.image}
//           alt={product.name}
//           style={{ width: 50, height: 50 }}
//          />
//         </TableCell>
//         <TableCell>{product.name}</TableCell>
//         <TableCell>{`${product.oldPrice}`}</TableCell>
//         <TableCell>{`${product.newPrice}`}</TableCell>
//         <TableCell>{product.category}</TableCell>
//         <TableCell>{product.size}</TableCell>
//         <TableCell>{product.description}</TableCell>
//         <TableCell>
//          <IconButton
//           color="primary"
//           onClick={() =>
//            editingRow ? updateProduct(editingRow) : setEditingRow(product)
//           }
//          >
//           {editingRow === product.id ? <Save /> : <Edit />}
//          </IconButton>
//          <IconButton color="error" onClick={() => removeProduct(product.id)}>
//           <Delete />
//          </IconButton>
//         </TableCell>
//        </TableRow>
//       ))}
//      </TableBody>
//     </Table>
//    </TableContainer>

//    {/* Dropdown for Column Filters */}
//    <Menu
//     anchorEl={anchorEl}
//     open={Boolean(anchorEl)}
//     onClose={() => setAnchorEl(null)}
//    >
//     {[...new Set(allProducts.map((product) => product[activeColumn]))].map(
//      (value) => (
//       <MenuItem
//        key={value}
//        onClick={() => handleColumnFilter(activeColumn, value)}
//       >
//        {value || "All"}
//       </MenuItem>
//      ),
//     )}
//    </Menu>
//   </Box>
//  );
// };

// export default ListProduct;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//  Box,
//  Grid,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Button,
//  IconButton,
//  TextField,
//  Select,
//  MenuItem,
//  FormControl,
//  InputLabel,
//  Checkbox,
//  FormGroup,
//  FormControlLabel,
//  Typography,
//  Menu,
// } from "@mui/material";
// import { Delete, Edit, Save, FilterList } from "@mui/icons-material";

// const ListProduct = () => {
//  const [allProducts, setAllProducts] = useState([]);
//  const [filteredProducts, setFilteredProducts] = useState([]);
//  const [editingRow, setEditingRow] = useState(null);
//  const [columnFilters, setColumnFilters] = useState({});
//  const [anchorEl, setAnchorEl] = useState(null);
//  const [activeColumn, setActiveColumn] = useState("");
//  const [searchFields, setSearchFields] = useState([]);
//  const [searchValues, setSearchValues] = useState({});

//  // Fetch products from API
//  const fetchProducts = async () => {
//   try {
//    const response = await axios.get("https://localhost:7142/api/product/all");
//    setAllProducts(response.data);
//    setFilteredProducts(response.data); // Initialize filtered data
//   } catch (error) {
//    console.error("Error fetching products:", error);
//   }
//  };

//  // Filter by column values
//  //  const handleColumnFilter = (column, value) => {
//  //   setColumnFilters((prev) => ({ ...prev, [column]: value }));
//  //   const filtered = allProducts.filter((product) =>
//  //    Object.entries({ ...columnFilters, [column]: value }).every(
//  //     ([key, val]) => !val || product[key]?.toString() === val,
//  //    ),
//  //   );

//  const handleColumnFilter = (column, value) => {
//   // Map displayed column names to actual API response keys
//   const columnMap = {
//    Title: "name",
//    Oldprice: "oldPrice", // Ensure oldPrice is included in your API response
//    NewPrice: "newPrice",
//    Category: "category",
//    Size: "size", // Ensure 'size' is part of your data model
//   };
//   const apiKey = columnMap[column] || column;
//   setColumnFilters((prev) => ({ ...prev, [apiKey]: value }));
//   // Filter data based on dropdown selection
//   const filtered = allProducts.filter((product) =>
//    Object.entries({ ...columnFilters, [apiKey]: value }).every(
//     ([key, val]) => !val || product[key]?.toString() === val,
//    ),
//   );
//   setFilteredProducts(filtered);
//   setAnchorEl(null);
//  };

//  // Handle search
//  const handleSearch = () => {
//   const searched = allProducts.filter((product) =>
//    searchFields.every((field) =>
//     product[field]
//      ?.toString()
//      .toLowerCase()
//      .includes(searchValues[field]?.toLowerCase() || ""),
//    ),
//   );
//   setFilteredProducts(searched);
//  };

//  // Update a product
//  const updateProduct = async (updatedProduct) => {
//   try {
//    await axios.put("https://localhost:7142/api/Product/update", updatedProduct);
//    fetchProducts();
//    setEditingRow(null);
//   } catch (error) {
//    console.error("Error updating product:", error);
//   }
//  };

//  // Delete a product
//  const removeProduct = async (id) => {
//   try {
//    await axios.delete(`https://localhost:7142/api/Product/remove/${id}`);
//    fetchProducts();
//   } catch (error) {
//    console.error("Error removing product:", error);
//   }
//  };

//  useEffect(() => {
//   fetchProducts();
//  }, []);

//  return (
//   <Box sx={{ p: 3 }}>
//    <Typography variant="h4" gutterBottom>
//     Product Management
//    </Typography>

//    {/* Search Section */}
//    <Box sx={{ mb: 3 }}>
//     <Typography variant="h6">Search Products</Typography>
//     <FormGroup row>
//      {["name", "category", "size", "oldPrice", "newPrice", "description"].map(
//       (field) => (
//        <FormControlLabel
//         key={field}
//         control={
//          <Checkbox
//           checked={searchFields.includes(field)}
//           onChange={(e) => {
//            const checked = e.target.checked;
//            setSearchFields((prev) =>
//             checked ? [...prev, field] : prev.filter((f) => f !== field),
//            );
//           }}
//          />
//         }
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//        />
//       ),
//      )}
//     </FormGroup>
//     <Grid container spacing={2}>
//      {searchFields.map((field) => (
//       <Grid item xs={12} sm={6} md={4} key={field}>
//        <TextField
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//         fullWidth
//         onChange={(e) =>
//          setSearchValues((prev) => ({
//           ...prev,
//           [field]: e.target.value,
//          }))
//         }
//        />
//       </Grid>
//      ))}
//     </Grid>
//     <Button
//      variant="contained"
//      sx={{ mt: 2 }}
//      startIcon={<FilterList />}
//      onClick={handleSearch}
//     >
//      Search
//     </Button>
//    </Box>

//    {/* Product Table */}
//    <TableContainer component={Paper}>
//     <Table>
//      <TableHead>
//       <TableRow>
//        {[
//         "Products",
//         "Title",
//         "Old Price",
//         "New Price",
//         "Category",
//         "Size",
//         "Description",
//         "Actions",
//        ].map((header) => (
//         <TableCell key={header}>
//          {["Products", "Actions"].includes(header) ? (
//           header
//          ) : (
//           <Button
//            onClick={(e) => {
//             const columnMap = {
//              "Old Price": "oldPrice",
//              "New Price": "newPrice",
//              Title: "name",
//             };
//             setActiveColumn(columnMap[header] || header.toLowerCase());
//             setAnchorEl(e.currentTarget);
//            }}
//            endIcon={<FilterList />}
//           >
//            {header}
//           </Button>
//          )}
//         </TableCell>
//        ))}
//       </TableRow>
//      </TableHead>
//      <TableBody>
//       {filteredProducts.map((product) => (
//        <TableRow key={product.id}>
//         <TableCell>
//          <img
//           src={product.image}
//           alt={product.name}
//           style={{ width: 50, height: 50 }}
//          />
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            defaultValue={product.name}
//            onChange={(e) =>
//             setEditingRow((prev) => ({
//              ...prev,
//              name: e.target.value,
//             }))
//            }
//           />
//          ) : (
//           product.name
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            defaultValue={product.oldPrice}
//            onChange={(e) =>
//             setEditingRow((prev) => ({
//              ...prev,
//              oldPrice: e.target.value,
//             }))
//            }
//           />
//          ) : (
//           `${product.oldPrice}`
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            defaultValue={product.newPrice}
//            onChange={(e) =>
//             setEditingRow((prev) => ({
//              ...prev,
//              newPrice: e.target.value,
//             }))
//            }
//           />
//          ) : (
//           `${product.newPrice}`
//          )}
//         </TableCell>
//         <TableCell>{product.category}</TableCell>
//         <TableCell>{product.size}</TableCell>
//         <TableCell>{product.description}</TableCell>
//         <TableCell>
//          <IconButton
//           color="primary"
//           onClick={() =>
//            editingRow ? updateProduct(editingRow) : setEditingRow(product)
//           }
//          >
//           {editingRow === product.id ? <Save /> : <Edit />}
//          </IconButton>
//          <IconButton color="error" onClick={() => removeProduct(product.id)}>
//           <Delete />
//          </IconButton>
//         </TableCell>
//        </TableRow>
//       ))}
//      </TableBody>
//     </Table>
//    </TableContainer>

//    {/* Dropdown for Column Filters */}
//    <Menu
//     anchorEl={anchorEl}
//     open={Boolean(anchorEl)}
//     onClose={() => setAnchorEl(null)}
//    >
//     {[...new Set(allProducts.map((product) => product[activeColumn]))].map(
//      (value) => (
//       <MenuItem
//        key={value}
//        onClick={() => handleColumnFilter(activeColumn, value)}
//       >
//        {value || "All"}
//       </MenuItem>
//      ),
//     )}
//    </Menu>
//   </Box>
//  );
// };

// export default ListProduct;
//=======good one ======

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//  Box,
//  Grid,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Button,
//  IconButton,
//  TextField,
//  Select,
//  MenuItem,
//  FormControl,
//  InputLabel,
//  Checkbox,
//  FormGroup,
//  FormControlLabel,
//  Typography,
//  Menu,
// } from "@mui/material";
// import { Delete, Edit, Save, FilterList } from "@mui/icons-material";

// const ListProduct = () => {
//  const [allProducts, setAllProducts] = useState([]);
//  const [filteredProducts, setFilteredProducts] = useState([]);
//  const [editingRow, setEditingRow] = useState(null);
//  const [columnFilters, setColumnFilters] = useState({});
//  const [anchorEl, setAnchorEl] = useState(null);
//  const [activeColumn, setActiveColumn] = useState("");
//  const [searchFields, setSearchFields] = useState([]);
//  const [searchValues, setSearchValues] = useState({});
//  const [editedRow, setEditedRow] = useState({});

//  // Fetch products from API
//  const fetchProducts = async () => {
//   try {
//    const response = await axios.get("https://localhost:7142/api/product/all");
//    console.log("Fetched products:", response.data); // Log the fetched data
//    setAllProducts(response.data);
//    setFilteredProducts(response.data); // Initialize filtered data
//   } catch (error) {
//    console.error("Error fetching products:", error);
//   }
//  };

//  // Filter by column values
//  const handleColumnFilter = (column, value) => {
//   console.log("Column selected for filtering:", column);
//   console.log("Value selected for filtering:", value);

//   // Map displayed column names to actual API response keys
//   const columnMap = {
//    Title: "name",
//    Oldprice: "oldPrice", // Ensure oldPrice is included in your API response
//    NewPrice: "newPrice",
//    Category: "category",
//    Size: "size", // Ensure 'size' is part of your data model
//   };
//   const apiKey = columnMap[column] || column;
//   console.log("Mapped column to API key:", apiKey);

//   // Update column filters
//   setColumnFilters((prev) => ({ ...prev, [apiKey]: value }));
//   console.log("Updated column filters:", columnFilters);

//   // Filter data based on dropdown selection
//   const filtered = allProducts.filter((product) => {
//    const matches = Object.entries({ ...columnFilters, [apiKey]: value }).every(
//     ([key, val]) => {
//      console.log(
//       `Checking product[${key}] (${product[key]}) against value (${val})`,
//      );
//      return !val || product[key]?.toString() === val;
//     },
//    );
//    return matches;
//   });

//   console.log("Filtered products:", filtered);
//   setFilteredProducts(filtered);
//   setAnchorEl(null); // Close dropdown after applying filter
//  };

//  // Handle search
//  const handleSearch = () => {
//   console.log("Search values:", searchValues);
//   const searched = allProducts.filter((product) =>
//    searchFields.every((field) =>
//     product[field]
//      ?.toString()
//      .toLowerCase()
//      .includes(searchValues[field]?.toLowerCase() || ""),
//    ),
//   );
//   console.log("Search results:", searched);
//   setFilteredProducts(searched);
//  };
//  const handleEdit = (product) => {
//   setEditingRow(product.id);
//   setEditedRow({ ...product });
//  };
//  // Update a product
//  const updateProduct = async (updatedProduct) => {
//   try {
//    console.log("Updating product:", updatedProduct);
//    await axios.put("https://localhost:7142/api/Product/update", updatedProduct);
//    fetchProducts(); // Re-fetch products after update
//    setEditingRow(null); // Stop editing
//   } catch (error) {
//    console.error("Error updating product:", error);
//   }
//  };
//  //  const handleEdit = (product) => {
//  //   setEditingRow(product.id);
//  //   setEditedRow({ ...product });
//  //  };
//  const handleCancel = () => {
//   setEditingRow(null);
//   setEditedRow({});
//  };

//  // Delete a product
//  const removeProduct = async (id) => {
//   try {
//    console.log("Deleting product with ID:", id);
//    await axios.delete(`https://localhost:7142/api/Product/remove/${id}`);
//    fetchProducts(); // Re-fetch products after deletion
//   } catch (error) {
//    console.error("Error removing product:", error);
//   }
//  };

//  useEffect(() => {
//   fetchProducts();
//  }, []);

//  return (
//   <Box sx={{ p: 3 }}>
//    <Typography variant="h4" gutterBottom>
//     Product Management
//    </Typography>

//    {/* Search Section */}
//    <Box sx={{ mb: 3 }}>
//     <Typography variant="h6">Search Products</Typography>
//     <FormGroup row>
//      {["name", "category", "size", "oldPrice", "newPrice", "description"].map(
//       (field) => (
//        <FormControlLabel
//         key={field}
//         control={
//          <Checkbox
//           checked={searchFields.includes(field)}
//           onChange={(e) => {
//            const checked = e.target.checked;
//            setSearchFields((prev) =>
//             checked ? [...prev, field] : prev.filter((f) => f !== field),
//            );
//           }}
//          />
//         }
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//        />
//       ),
//      )}
//     </FormGroup>
//     <Grid container spacing={2}>
//      {searchFields.map((field) => (
//       <Grid item xs={12} sm={6} md={4} key={field}>
//        <TextField
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//         fullWidth
//         onChange={(e) =>
//          setSearchValues((prev) => ({
//           ...prev,
//           [field]: e.target.value,
//          }))
//         }
//        />
//       </Grid>
//      ))}
//     </Grid>
//     <Button
//      variant="contained"
//      sx={{ mt: 2 }}
//      startIcon={<FilterList />}
//      onClick={handleSearch}
//     >
//      Search
//     </Button>
//    </Box>

//    {/* Product Table */}
//    <TableContainer component={Paper}>
//     <Table>
//      <TableHead>
//       <TableRow>
//        {[
//         "Products",
//         "Title",
//         "Old Price",
//         "New Price",
//         "Category",
//         "Size",
//         "Description",
//         "Actions",
//        ].map((header) => (
//         <TableCell key={header}>
//          {["Products", "Actions"].includes(header) ? (
//           header
//          ) : (
//           <Button
//            onClick={(e) => {
//             const columnMap = {
//              "Old Price": "oldPrice",
//              "New Price": "newPrice",
//              Title: "name",
//             };
//             setActiveColumn(columnMap[header] || header.toLowerCase());
//             setAnchorEl(e.currentTarget);
//            }}
//            endIcon={<FilterList />}
//           >
//            {header}
//           </Button>
//          )}
//         </TableCell>
//        ))}
//       </TableRow>
//      </TableHead>
//      <TableBody>
//       {filteredProducts.map((product) => (
//        <TableRow key={product.id}>
//         <TableCell>
//          <img
//           src={product.image}
//           alt={product.name}
//           style={{ width: 50, height: 50 }}
//          />
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            defaultValue={product.name}
//            onChange={(e) =>
//             setEditingRow((prev) => ({
//              ...prev,
//              name: e.target.value,
//             }))
//            }
//           />
//          ) : (
//           product.name
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            defaultValue={product.oldPrice}
//            onChange={(e) =>
//             setEditingRow((prev) => ({
//              ...prev,
//              oldPrice: e.target.value,
//             }))
//            }
//           />
//          ) : (
//           `${product.oldPrice}`
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            defaultValue={product.newPrice}
//            onChange={(e) =>
//             setEditingRow((prev) => ({
//              ...prev,
//              newPrice: e.target.value,
//             }))
//            }
//           />
//          ) : (
//           `${product.newPrice}`
//          )}
//         </TableCell>
//         <TableCell>{product.category}</TableCell>
//         <TableCell>{product.size}</TableCell>
//         <TableCell>{product.description}</TableCell>
//         <TableCell>
//          <IconButton
//           color="primary"
//           onClick={() =>
//            editingRow ? updateProduct(editingRow) : setEditingRow(product)
//           }
//          >
//           {editingRow === product.id ? <Save /> : <Edit />}
//          </IconButton>
//          <IconButton color="error" onClick={() => removeProduct(product.id)}>
//           <Delete />
//          </IconButton>
//         </TableCell>
//        </TableRow>
//       ))}
//      </TableBody>

//      <Menu
//       anchorEl={anchorEl}
//       open={Boolean(anchorEl)}
//       onClose={() => setAnchorEl(null)}
//      >
//       {[...new Set(allProducts.map((product) => product[activeColumn]))].map(
//        (value, index) => (
//         <MenuItem
//          key={`${activeColumn}-${value}-${index}`}
//          onClick={() => handleColumnFilter(activeColumn, value)}
//         >
//          {value || "All"}
//         </MenuItem>
//        ),
//       )}
//      </Menu>
//     </Table>
//    </TableContainer>
//   </Box>
//  );
// };

// export default ListProduct;

//=======================latest trial one=================
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
 Box,
 Grid,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
 Button,
 IconButton,
 TextField,
 Select,
 MenuItem,
 FormControl,
 InputLabel,
 Checkbox,
 FormGroup,
 FormControlLabel,
 Typography,
 Menu,
} from "@mui/material";
import { Delete, Edit, Save, FilterList, Cancel } from "@mui/icons-material";

const ListProduct = () => {
 const [allProducts, setAllProducts] = useState([]);
 const [filteredProducts, setFilteredProducts] = useState([]);
 const [editingRow, setEditingRow] = useState(null);
 const [columnFilters, setColumnFilters] = useState({});
 const [anchorEl, setAnchorEl] = useState(null);
 const [activeColumn, setActiveColumn] = useState("");
 const [searchFields, setSearchFields] = useState([]);
 const [searchValues, setSearchValues] = useState({});
 const [editedRow, setEditedRow] = useState({});

 // Fetch products from API
 const fetchProducts = async () => {
  try {
   const response = await axios.get(
    "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Product/all",
   );
   console.log("Fetched products in list product in admin:", response.data); // Log the fetched data
   setAllProducts(response.data);
   setFilteredProducts(response.data); // Initialize filtered data
  } catch (error) {
   console.error("Error fetching products:", error);
  }
 };

 useEffect(() => {
  fetchProducts();
 }, []);

 // Filter by column values
 const handleColumnFilter = (column, value) => {
  console.log("Column selected for filtering:", column);
  console.log("Value selected for filtering:", value);

  // Map displayed column names to actual API response keys
  const columnMap = {
   Title: "name",
   Oldprice: "oldPrice", // Ensure oldPrice is included in your API response
   NewPrice: "newPrice",
   Category: "category",
   Size: "size", // Ensure 'size' is part of your data model
  };
  const apiKey = columnMap[column] || column;
  console.log("Mapped column to API key:", apiKey);

  // Update column filters
  setColumnFilters((prev) => ({ ...prev, [apiKey]: value }));
  console.log("Updated column filters:", columnFilters);

  // Filter data based on dropdown selection
  const filtered = allProducts.filter((product) => {
   const matches = Object.entries({ ...columnFilters, [apiKey]: value }).every(
    ([key, val]) => {
     console.log(
      `Checking product[${key}] (${product[key]}) against value (${val})`,
     );
     return !val || product[key]?.toString() === val;
    },
   );
   return matches;
  });

  console.log("Filtered products:", filtered);
  setFilteredProducts(filtered);
  setAnchorEl(null); // Close dropdown after applying filter
 };

 // Handle search
 const handleSearch = () => {
  console.log("Search values:", searchValues);
  const searched = allProducts.filter((product) =>
   searchFields.every((field) =>
    product[field]
     ?.toString()
     .toLowerCase()
     .includes(searchValues[field]?.toLowerCase() || ""),
   ),
  );
  console.log("Search results:", searched);
  setFilteredProducts(searched);
 };
 const handleEdit = (product) => {
  setEditingRow(product.productId);
  setEditedRow({ ...product });
 };
 // Update a product
 const updateProduct = async (updatedProduct) => {
  try {
   console.log("Updating product:", updatedProduct);
   await axios.put(
    "https://76vgxe9gag.execute-api.us-east-1.amazonaws.com/api/Product/update",
    updatedProduct,
   );
   fetchProducts(); // Re-fetch products after update
   setEditingRow(null); // Stop editing
  } catch (error) {
   console.error("Error updating product:", error);
  }
 };
 //  const handleEdit = (product) => {
 //   setEditingRow(product.id);
 //   setEditedRow({ ...product });
 //  };
 const handleCancel = () => {
  setEditingRow(null);
  setEditedRow({});
 };

 // Delete a product
 const removeProduct = async (id) => {
  try {
   console.log("Deleting product with ID:", id);
   await axios.delete(`https://localhost:7142/api/Product/remove/${id}`);
   fetchProducts(); // Re-fetch products after deletion
  } catch (error) {
   console.error("Error removing product:", error);
  }
 };

 //  useEffect(() => {
 //   fetchProducts();
 //  }, []);

 return (
  <Box sx={{ p: 3 }}>
   <Typography variant="h4" gutterBottom>
    Product Management
   </Typography>

   {/* Search Section */}
   <Box sx={{ mb: 3 }}>
    <Typography variant="h6">Search Products</Typography>
    <FormGroup row>
     {["name", "category", "size", "oldPrice", "newPrice", "description"].map(
      (field) => (
       <FormControlLabel
        key={field}
        control={
         <Checkbox
          checked={searchFields.includes(field)}
          onChange={(e) => {
           const checked = e.target.checked;
           setSearchFields((prev) =>
            checked ? [...prev, field] : prev.filter((f) => f !== field),
           );
          }}
         />
        }
        label={field.charAt(0).toUpperCase() + field.slice(1)}
       />
      ),
     )}
    </FormGroup>
    <Grid container spacing={2}>
     {searchFields.map((field) => (
      <Grid item xs={12} sm={6} md={4} key={field}>
       <TextField
        label={field.charAt(0).toUpperCase() + field.slice(1)}
        fullWidth
        onChange={(e) =>
         setSearchValues((prev) => ({
          ...prev,
          [field]: e.target.value,
         }))
        }
       />
      </Grid>
     ))}
    </Grid>
    <Button
     variant="contained"
     sx={{ mt: 2 }}
     startIcon={<FilterList />}
     onClick={handleSearch}
    >
     Search
    </Button>
   </Box>

   {/* Product Table */}
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow>
       {[
        "Products",
        "Title",
        "Old Price",
        "New Price",
        "Category",
        "Size",
        "Description",
        "Actions",
       ].map((header) => (
        <TableCell key={header}>
         {["Products", "Actions"].includes(header) ? (
          header
         ) : (
          <Button
           onClick={(e) => {
            const columnMap = {
             "Old Price": "oldPrice",
             "New Price": "newPrice",
             Title: "name",
            };
            setActiveColumn(columnMap[header] || header.toLowerCase());
            setAnchorEl(e.currentTarget);
           }}
           endIcon={<FilterList />}
          >
           {header}
          </Button>
         )}
        </TableCell>
       ))}
      </TableRow>
     </TableHead>
     <TableBody>
      {filteredProducts.map((product) => (
       <TableRow key={product.productId}>
        <TableCell>
         <img
          src={
           product.primaryImages && product.primaryImages.length > 0
            ? product.primaryImages[0]
            : "https://via.placeholder.com/50"
          } // fallback if no image
          alt={product.name}
          style={{ width: 50, height: 50 }}
         />
        </TableCell>
        <TableCell>
         {editingRow === product.productId ? (
          <TextField
           value={editedRow.name || ""}
           onChange={(e) =>
            setEditingRow((prev) => ({
             ...prev,
             name: e.target.value,
            }))
           }
          />
         ) : (
          product.name
         )}
        </TableCell>
        <TableCell>
         {editingRow === product.productId ? (
          <TextField
           value={editedRow.oldPrice || ""}
           onChange={(e) =>
            setEditingRow((prev) => ({
             ...prev,
             oldPrice: e.target.value,
            }))
           }
          />
         ) : (
          // `${product.oldPrice}`
          product.oldPrice
         )}
        </TableCell>
        <TableCell>
         {editingRow === product.productId ? (
          <TextField
           value={editedRow.newPrice || ""}
           onChange={(e) =>
            setEditedRow((prev) => ({ ...prev, newPrice: e.target.value }))
           }
          />
         ) : (
          //`${product.newPrice}`
          product.newPrice
         )}
        </TableCell>
        <TableCell>
         {editingRow === product.productId ? (
          <TextField
           value={editedRow.category || ""}
           onChange={(e) =>
            setEditedRow((prev) => ({ ...prev, category: e.target.value }))
           }
          />
         ) : (
          product.category
         )}
        </TableCell>
        <TableCell>
         {editingRow === product.productId ? (
          <TextField
           value={editedRow.size || ""}
           onChange={(e) =>
            setEditedRow((prev) => ({ ...prev, size: e.target.value }))
           }
          />
         ) : (
          product.size
         )}
        </TableCell>
        <TableCell>
         {editingRow === product.productId ? (
          <TextField
           value={editedRow.description || ""}
           onChange={(e) =>
            setEditedRow((prev) => ({ ...prev, description: e.target.value }))
           }
          />
         ) : (
          product.description
         )}
        </TableCell>
        <TableCell>
         {editingRow === product.productId ? (
          <>
           <IconButton color="primary" onClick={updateProduct}>
            <Save />
           </IconButton>
           <IconButton color="error" onClick={handleCancel}>
            <Cancel />
           </IconButton>
          </>
         ) : (
          <>
           <IconButton color="primary" onClick={() => handleEdit(product)}>
            <Edit />
           </IconButton>
           <IconButton
            color="error"
            onClick={() => removeProduct(product.productId)}
           >
            <Delete />
           </IconButton>
          </>
         )}
        </TableCell>
       </TableRow>
      ))}
     </TableBody>
    </Table>
   </TableContainer>
  </Box>
 );
};

export default ListProduct;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//  Box,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Button,
//  IconButton,
//  TextField,
//  Select,
//  MenuItem,
//  FormControl,
//  Typography,
// } from "@mui/material";
// import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

// const ListProduct = () => {
//  const [allProducts, setAllProducts] = useState([]);
//  const [filteredProducts, setFilteredProducts] = useState([]);
//  const [editingRow, setEditingRow] = useState(null);
//  const [columnFilters, setColumnFilters] = useState({});
//  const [editedRow, setEditedRow] = useState({});

//  // Fetch products from API
//  const fetchProducts = async () => {
//   try {
//    const response = await axios.get("https://localhost:7142/api/product/all");
//    setAllProducts(response.data);
//    setFilteredProducts(response.data);
//   } catch (error) {
//    console.error("Error fetching products:", error);
//   }
//  };

//  useEffect(() => {
//   fetchProducts();
//  }, []);

//  // Handle column filtering
//  const handleFilterChange = (column, value) => {
//   setColumnFilters((prev) => ({ ...prev, [column]: value }));
//   const filtered = allProducts.filter((product) => {
//    return Object.entries({ ...columnFilters, [column]: value }).every(
//     ([key, val]) => !val || product[key]?.toString() === val,
//    );
//   });
//   setFilteredProducts(filtered);
//  };

//  // Start editing a row
//  const handleEdit = (product) => {
//   setEditingRow(product.id);
//   setEditedRow({ ...product });
//  };

//  // Save changes to the database
//  const handleSave = async () => {
//   try {
//    await axios.put("https://localhost:7142/api/Product/update", editedRow);
//    fetchProducts();
//    setEditingRow(null);
//   } catch (error) {
//    console.error("Error saving product:", error);
//   }
//  };

//  // Cancel editing
//  const handleCancel = () => {
//   setEditingRow(null);
//   setEditedRow({});
//  };

//  // Delete a row
//  const handleDelete = async (id) => {
//   try {
//    await axios.delete(`https://localhost:7142/api/Product/remove/${id}`);
//    fetchProducts();
//   } catch (error) {
//    console.error("Error deleting product:", error);
//   }
//  };

//  return (
//   <Box sx={{ p: 3 }}>
//    <Typography variant="h4" gutterBottom>
//     Product Management
//    </Typography>

//    {/* Product Table */}
//    <TableContainer component={Paper}>
//     <Table>
//      <TableHead>
//       <TableRow>
//        {["Title", "Old Price", "New Price", "Category", "Actions"].map(
//         (header) => (
//          <TableCell key={header}>
//           {header !== "Actions" ? (
//            <FormControl fullWidth>
//             <Select
//              value={columnFilters[header.toLowerCase()] || ""}
//              onChange={(e) =>
//               handleFilterChange(header.toLowerCase(), e.target.value)
//              }
//              displayEmpty
//             >
//              <MenuItem value="">All</MenuItem>
//              {[...new Set(allProducts.map((p) => p[header.toLowerCase()]))].map(
//               (value) => (
//                <MenuItem key={value} value={value}>
//                 {value}
//                </MenuItem>
//               ),
//              )}
//             </Select>
//            </FormControl>
//           ) : (
//            header
//           )}
//          </TableCell>
//         ),
//        )}
//       </TableRow>
//      </TableHead>
//      <TableBody>
//       {filteredProducts.map((product) => (
//        <TableRow key={product.id}>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            value={editedRow.name || ""}
//            onChange={(e) =>
//             setEditedRow((prev) => ({ ...prev, name: e.target.value }))
//            }
//           />
//          ) : (
//           product.name
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            value={editedRow.oldPrice || ""}
//            onChange={(e) =>
//             setEditedRow((prev) => ({ ...prev, oldPrice: e.target.value }))
//            }
//           />
//          ) : (
//           product.oldPrice
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            value={editedRow.newPrice || ""}
//            onChange={(e) =>
//             setEditedRow((prev) => ({ ...prev, newPrice: e.target.value }))
//            }
//           />
//          ) : (
//           product.newPrice
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <TextField
//            value={editedRow.category || ""}
//            onChange={(e) =>
//             setEditedRow((prev) => ({ ...prev, category: e.target.value }))
//            }
//           />
//          ) : (
//           product.category
//          )}
//         </TableCell>
//         <TableCell>
//          {editingRow === product.id ? (
//           <>
//            <IconButton color="primary" onClick={handleSave}>
//             <Save />
//            </IconButton>
//            <IconButton color="error" onClick={handleCancel}>
//             <Cancel />
//            </IconButton>
//           </>
//          ) : (
//           <>
//            <IconButton color="primary" onClick={() => handleEdit(product)}>
//             <Edit />
//            </IconButton>
//            <IconButton color="error" onClick={() => handleDelete(product.id)}>
//             <Delete />
//            </IconButton>
//           </>
//          )}
//         </TableCell>
//        </TableRow>
//       ))}
//      </TableBody>
//     </Table>
//    </TableContainer>
//   </Box>
//  );
// };

// export default ListProduct;

//================================trial one=========================
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//  Box,
//  Grid,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Button,
//  IconButton,
//  TextField,
//  Checkbox,
//  FormGroup,
//  FormControlLabel,
//  Typography,
//  Menu,
//  MenuItem,
// } from "@mui/material";
// import {
//  Delete,
//  Edit,
//  Save,
//  FilterList,
//  CheckCircle,
// } from "@mui/icons-material";

// const ListProduct = () => {
//  const [allProducts, setAllProducts] = useState([]);
//  const [filteredProducts, setFilteredProducts] = useState([]);
//  const [editingRow, setEditingRow] = useState(null);
//  const [columnFilters, setColumnFilters] = useState({});
//  const [anchorEl, setAnchorEl] = useState(null);
//  const [activeColumn, setActiveColumn] = useState("");
//  const [searchFields, setSearchFields] = useState([]);
//  const [searchValues, setSearchValues] = useState({});
//  const [image, setImage] = useState(null); // State for storing image file

//  // Fetch products from API
//  const fetchProducts = async () => {
//   try {
//    const response = await axios.get("https://localhost:7142/api/product/all");
//    console.log("Fetched products:", response.data);
//    setAllProducts(response.data);
//    setFilteredProducts(response.data);
//   } catch (error) {
//    console.error("Error fetching products:", error);
//   }
//  };

//  // Handle image change (selecting file)
//  const handleImageChange = (file) => {
//   if (file) {
//    setImage(file); // Store the selected image file in the state
//   }
//  };

//  // Upload image to the server
//  const uploadImage = async () => {
//   if (!image) {
//    console.log("No image selected");
//    return;
//   }

//   const formData = new FormData();
//   formData.append("file", image);

//   try {
//    const uploadResponse = await axios.post(
//     "https://localhost:7142/api/Product/upload",
//     formData,
//     { headers: { "Content-Type": "multipart/form-data" } },
//    );
//    const dataObj = uploadResponse.data;
//    console.log("Image uploaded successfully:", dataObj);
//    // Optionally update product info with new image URL or handle it
//   } catch (error) {
//    console.error("Error uploading image:", error);
//   }
//  };

//  // Filter by column values
//  const handleColumnFilter = (column, value) => {
//   console.log("Column selected for filtering:", column);
//   console.log("Value selected for filtering:", value);

//   const columnMap = {
//    Title: "name",
//    Oldprice: "oldPrice",
//    NewPrice: "newPrice",
//    Category: "category",
//    Size: "size",
//   };

//   const apiKey = columnMap[column] || column;
//   console.log("Mapped column to API key:", apiKey);

//   setColumnFilters((prev) => ({ ...prev, [apiKey]: value }));
//   console.log("Updated column filters:", columnFilters);

//   const filtered = allProducts.filter((product) => {
//    const matches = Object.entries({ ...columnFilters, [apiKey]: value }).every(
//     ([key, val]) => {
//      console.log(
//       `Checking product[${key}] (${product[key]}) against value (${val})`,
//      );
//      const isNumericField = ["oldPrice", "newPrice"].includes(key);
//      if (isNumericField) {
//       const productValue = parseFloat(product[key]);
//       const filterValue = parseFloat(val);
//       console.log(
//        `Comparing numeric values: product[${key}] = ${productValue}, filter value = ${filterValue}`,
//       );
//       return !val || productValue === filterValue;
//      }
//      const normalizedValue = val?.toString().trim();
//      return !val || product[key]?.toString().trim() === normalizedValue;
//     },
//    );
//    return matches;
//   });

//   console.log("Filtered products:", filtered);
//   setFilteredProducts(filtered);
//   setAnchorEl(null); // Close dropdown after applying filter
//  };
//  const getUniqueValues = (column) => {
//   const uniqueValues = new Set(allProducts.map((product) => product[column]));
//   return Array.from(uniqueValues);
//  };

//  // Handle search
//  const handleSearch = () => {
//   console.log("Search values:", searchValues);
//   const searched = allProducts.filter((product) =>
//    searchFields.every((field) =>
//     product[field]
//      ?.toString()
//      .toLowerCase()
//      .includes(searchValues[field]?.toLowerCase() || ""),
//    ),
//   );
//   console.log("Search results:", searched);
//   setFilteredProducts(searched);
//  };

//  // Update a product
//  const updateProduct = async () => {
//   if (!editingRow) return;

//   try {
//    const response = await axios.put(
//     "https://localhost:7142/api/Product/update",
//     editingRow,
//    );
//    console.log("editingRow:", response, editingRow);

//    const response2 = fetchProducts(); // Re-fetch products after update
//    console.log("response2:", response2);
//    setEditingRow(null); // Exit edit mode
//   } catch (error) {
//    console.error("Error updating product:", error);
//   }
//  };

//  // Delete a product
//  const removeProduct = async (id) => {
//   try {
//    console.log("Deleting product with ID:", id);
//    await axios.delete(`https://localhost:7142/api/Product/remove/${id}`);
//    fetchProducts(); // Re-fetch products after deletion
//   } catch (error) {
//    console.error("Error removing product:", error);
//   }
//  };

//  useEffect(() => {
//   fetchProducts();
//  }, []);

//  return (
//   <Box sx={{ p: 3 }}>
//    <Typography variant="h4" gutterBottom>
//     Product Management
//    </Typography>

//    {/* Search Section */}
//    <Box sx={{ mb: 3 }}>
//     <Typography variant="h6">Search Products</Typography>
//     <FormGroup row>
//      {["name", "category", "size", "oldPrice", "newPrice", "description"].map(
//       (field) => (
//        <FormControlLabel
//         key={field}
//         control={
//          <Checkbox
//           checked={searchFields.includes(field)}
//           onChange={(e) => {
//            const checked = e.target.checked;
//            setSearchFields((prev) =>
//             checked ? [...prev, field] : prev.filter((f) => f !== field),
//            );
//           }}
//          />
//         }
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//        />
//       ),
//      )}
//     </FormGroup>
//     <Grid container spacing={2}>
//      {searchFields.map((field) => (
//       <Grid item xs={12} sm={6} md={4} key={field}>
//        <TextField
//         label={field.charAt(0).toUpperCase() + field.slice(1)}
//         fullWidth
//         onChange={(e) =>
//          setSearchValues((prev) => ({
//           ...prev,
//           [field]: e.target.value,
//          }))
//         }
//        />
//       </Grid>
//      ))}
//     </Grid>
//     <Button
//      variant="contained"
//      sx={{ mt: 2 }}
//      startIcon={<FilterList />}
//      onClick={handleSearch}
//     >
//      Search
//     </Button>
//    </Box>

//    {/* Product Table */}
//    <TableContainer component={Paper}>
//     <Table>
//      <TableHead>
//       <TableRow>
//        {[
//         "Products",
//         "Title",
//         "Old Price",
//         "New Price",
//         "Category",
//         "Size",
//         "Description",
//         "Actions",
//        ].map((header) => (
//         <TableCell key={header}>
//          {["Products", "Actions"].includes(header) ? (
//           header
//          ) : (
//           <>
//            <Button
//             onClick={(e) => {
//              const columnMap = {
//               "Old Price": "oldPrice",
//               "New Price": "newPrice",
//               Title: "name",
//               Category: "category",
//               Size: "size",
//              };
//              setActiveColumn(columnMap[header] || header.toLowerCase());
//              setAnchorEl(e.currentTarget);
//             }}
//             endIcon={<FilterList />}
//            >
//             {header}
//            </Button>
//            <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl) && activeColumn === header}
//             onClose={() => setAnchorEl(null)}
//            >
//             {getUniqueValues(header)?.map((value) => (
//              <MenuItem
//               key={value}
//               onClick={() => handleColumnFilter(header, value)}
//              >
//               {value || "N/A"}
//              </MenuItem>
//             ))}
//            </Menu>
//           </>
//          )}
//         </TableCell>
//        ))}
//       </TableRow>
//      </TableHead>
//      <TableBody>
//       {filteredProducts.map((product) => (
//        <TableRow key={product.id}>
//         {[
//          "name",
//          "oldPrice",
//          "newPrice",
//          "category",
//          "size",
//          "description",
//         ].map((field) => (
//          <TableCell key={field}>
//           {editingRow && editingRow.id === product.id ? (
//            <TextField
//             defaultValue={product[field]}
//             fullWidth
//             onChange={(e) =>
//              setEditingRow((prev) => ({
//               ...prev,
//               [field]: e.target.value,
//              }))
//             }
//            />
//           ) : (
//            product[field]
//           )}
//          </TableCell>
//         ))}
//         <TableCell>
//          {editingRow && editingRow.id === product.id ? (
//           <>
//            <Button
//             variant="contained"
//             color="primary"
//             size="small"
//             startIcon={<CheckCircle />}
//             onClick={updateProduct}
//            >
//             Confirm
//            </Button>
//            <Button
//             variant="outlined"
//             color="secondary"
//             size="small"
//             sx={{ ml: 1 }}
//             onClick={() => setEditingRow(null)}
//            >
//             Cancel
//            </Button>
//           </>
//          ) : (
//           <>
//            <IconButton onClick={() => setEditingRow(product)}>
//             <Edit />
//            </IconButton>
//            <IconButton onClick={() => removeProduct(product.id)}>
//             <Delete />
//            </IconButton>
//           </>
//          )}
//         </TableCell>
//        </TableRow>
//       ))}
//      </TableBody>
//     </Table>
//    </TableContainer>
//   </Box>
//  );
// };

// export default ListProduct;
