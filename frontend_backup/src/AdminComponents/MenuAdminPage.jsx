/** @format */

import React, { useState, useEffect, useCallback } from "react";

// --- Utility function to build the hierarchical menu data ---
const buildMenuHierarchy = (menuItemsRaw, parentId = null) => {
 return menuItemsRaw
  .filter((item) => item.ParentMenuItemId === parentId)
  .sort((a, b) => (a.DisplayOrder || 0) - (b.DisplayOrder || 0)) // Sort by display order
  .map((item) => ({
   menuItemId: item.MenuItemId,
   title: item.Title,
   href: item.Link,
   handle: item.Handle,
   labelText: item.LabelText,
   labelColor: item.LabelColor,
   imageSrc: item.ImageSrc,
   imageStyle: item.ImageStyle,
   imageAlt: item.ImageAlt,
   target: item.Target,
   rel: item.Rel,
   ariaDescribedBy: item.AriaDescribedBy,
   children: buildMenuHierarchy(menuItemsRaw, item.MenuItemId),
  }));
};

// --- API Service (Conceptual) ---
const API_BASE_URL = "https://localhost:7142/api"; // Make sure this matches your ASP.NET Core API URL

const fetchMenuItems = async () => {
 try {
  const response = await fetch(`${API_BASE_URL}/menuitems`); // Fetches the FLAT list
  if (!response.ok) {
   const errorText = await response.text();
   throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  return data;
 } catch (error) {
  console.error("Error fetching menu items:", error);
  throw error; // Re-throw to be caught by the calling component
 }
};

const createMenuItem = async (menuItemData) => {
 try {
  const response = await fetch(`${API_BASE_URL}/menuitems`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(menuItemData),
  });

  if (!response.ok) {
   // If it's a conflict, parse the specific message from the backend
   if (response.status === 409) {
    const errorMessage = await response.text(); // Get the conflict message
    throw new Error(errorMessage); // Throw it to be caught by the frontend form
   }
   const errorText = await response.text();
   throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  return data; // Returns the newly created menu item with its ID
 } catch (error) {
  console.error("Error creating menu item:", error);
  throw error; // Re-throw to be caught by the calling component
 }
};

const updateMenuItem = async (id, menuItemData) => {
 try {
  const response = await fetch(`${API_BASE_URL}/menuitems/${id}`, {
   method: "PUT",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(menuItemData),
  });
  if (!response.ok) {
   const errorText = await response.text();
   throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
  return true; // Often, PUT requests don't return content, just success status.
 } catch (error) {
  console.error(`Error updating menu item ${id}:`, error);
  throw error; // Re-throw to be caught by the calling component
 }
};

const deleteMenuItem = async (id) => {
 try {
  const response = await fetch(`${API_BASE_URL}/menuitems/${id}`, {
   method: "DELETE",
  });
  if (!response.ok) {
   const errorText = await response.text(); // Get the specific error message (e.g., has children/products)
   throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
  return true;
 } catch (error) {
  console.error(`Error deleting menu item ${id}:`, error);
  throw error; // Re-throw to be caught by the calling component
 }
};

// --- MenuItemForm Component ---
const MenuItemForm = ({
 onSubmit,
 initialData, // initialData can be null, we handle it internally
 availableParents = [],
}) => {
 // Initialize formData ensuring initialData is always an object or defaults to an empty one
 const [formData, setFormData] = useState({
  title: "",
  handle: "",
  link: "",
  parentMenuItemId: null,
  labelText: "",
  labelColor: "",
  imageSrc: "",
  imageStyle: "",
  imageAlt: "",
  target: "",
  rel: "",
  ariaDescribedBy: "",
  displayOrder: 0,
  ...(initialData || {}), // This is the crucial fix: spread initialData or an empty object
 });

 useEffect(() => {
  // Reset form data when initialData changes (e.g., when editing a different item)
  setFormData({
   title: "",
   handle: "",
   link: "",
   parentMenuItemId: null,
   labelText: "",
   labelColor: "",
   imageSrc: "",
   imageStyle: "",
   imageAlt: "",
   target: "",
   rel: "",
   ariaDescribedBy: "",
   displayOrder: 0,
   ...(initialData || {}), // Apply the same logic here
  });
 }, [initialData]);

 const handleChange = (e) => {
  const { name, value, type } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]:
    type === "number"
     ? value === ""
       ? null
       : parseInt(value, 10)
     : value === ""
     ? null
     : value,
  }));
 };

 const handleParentChange = (e) => {
  const value = e.target.value;
  setFormData((prev) => ({
   ...prev,
   parentMenuItemId: value === "" ? null : parseInt(value, 10),
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(formData);
 };

 return (
  <form
   onSubmit={handleSubmit}
   className="bg-white p-6 rounded-lg shadow-md mb-6"
  >
   <h2 className="text-xl font-semibold mb-4">
    {/* Use optional chaining to safely check for menuItemId */}
    {initialData?.menuItemId ? "Edit Menu Item" : "Add New Menu Item"}
   </h2>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
     <label htmlFor="title" className="block text-sm font-medium text-gray-700">
      Title <span className="text-red-500">*</span>
     </label>
     <input
      type="text"
      id="title"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label
      htmlFor="handle"
      className="block text-sm font-medium text-gray-700"
     >
      Handle
     </label>
     <input
      type="text"
      id="handle"
      name="handle"
      value={formData.handle || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label htmlFor="link" className="block text-sm font-medium text-gray-700">
      Link (href)
     </label>
     <input
      type="text"
      id="link"
      name="link"
      value={formData.link || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label
      htmlFor="parentMenuItemId"
      className="block text-sm font-medium text-gray-700"
     >
      Parent Menu Item
     </label>
     <select
      id="parentMenuItemId"
      name="parentMenuItemId"
      value={formData.parentMenuItemId || ""}
      onChange={handleParentChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     >
      <option value="">(No Parent)</option>
      {availableParents
       .filter((p) => p.MenuItemId !== initialData?.menuItemId) // Cannot be its own parent for editing, use optional chaining
       .map((parent) => (
        <option key={parent.MenuItemId} value={parent.MenuItemId}>
         {parent.Title}
        </option>
       ))}
     </select>
    </div>
    <div>
     <label
      htmlFor="displayOrder"
      className="block text-sm font-medium text-gray-700"
     >
      Display Order
     </label>
     <input
      type="number"
      id="displayOrder"
      name="displayOrder"
      value={formData.displayOrder || 0}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    {/* Label & Tag fields */}
    <div>
     <label
      htmlFor="labelText"
      className="block text-sm font-medium text-gray-700"
     >
      Label Text (e.g., NEW)
     </label>
     <input
      type="text"
      id="labelText"
      name="labelText"
      value={formData.labelText || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label
      htmlFor="labelColor"
      className="block text-sm font-medium text-gray-700"
     >
      Label Color (Hex Code)
     </label>
     <input
      type="text"
      id="labelColor"
      name="labelColor"
      value={formData.labelColor || ""}
      onChange={handleChange}
      placeholder="#CE3241"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    {/* Image fields */}
    <div>
     <label
      htmlFor="imageSrc"
      className="block text-sm font-medium text-gray-700"
     >
      Image Source (URL)
     </label>
     <input
      type="text"
      id="imageSrc"
      name="imageSrc"
      value={formData.imageSrc || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label
      htmlFor="imageAlt"
      className="block text-sm font-medium text-gray-700"
     >
      Image Alt Text
     </label>
     <input
      type="text"
      id="imageAlt"
      name="imageAlt"
      value={formData.imageAlt || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label
      htmlFor="imageStyle"
      className="block text-sm font-medium text-gray-700"
     >
      Image Style (JSON String)
     </label>
     <input
      type="text"
      id="imageStyle"
      name="imageStyle"
      value={formData.imageStyle || ""}
      onChange={handleChange}
      placeholder='{"height": "24px", "width": "auto"}'
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    {/* Other link attributes */}
    <div>
     <label
      htmlFor="target"
      className="block text-sm font-medium text-gray-700"
     >
      Link Target
     </label>
     <input
      type="text"
      id="target"
      name="target"
      value={formData.target || ""}
      onChange={handleChange}
      placeholder="_blank, _self, etc."
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label htmlFor="rel" className="block text-sm font-medium text-gray-700">
      Link Rel
     </label>
     <input
      type="text"
      id="rel"
      name="rel"
      value={formData.rel || ""}
      onChange={handleChange}
      placeholder="noopener, noreferrer"
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label
      htmlFor="ariaDescribedBy"
      className="block text-sm font-medium text-gray-700"
     >
      Aria Described By
     </label>
     <input
      type="text"
      id="ariaDescribedBy"
      name="ariaDescribedBy"
      value={formData.ariaDescribedBy || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
   </div>

   <div className="mt-6 flex justify-end space-x-3">
    <button
     type="submit"
     className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
     {initialData?.menuItemId ? "Update Menu Item" : "Add Menu Item"}
    </button>
   </div>
  </form>
 );
};

// --- MenuItemNode (for tree display) ---
const MenuItemNode = ({ item, level = 0, onEdit, onDelete }) => {
 const paddingLeft = `${level * 20}px`; // Indent based on level

 return (
  <li className="mb-2">
   <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200">
    <div style={{ paddingLeft }} className="flex-1 flex items-center">
     {item.children && item.children.length > 0 && (
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-4 w-4 mr-1 text-gray-500 transform rotate-90" // Add rotation for "arrow"
       viewBox="0 0 20 20"
       fill="currentColor"
      >
       <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
       />
      </svg>
     )}
     <span className="font-medium text-gray-800">
      {item.title}{" "}
      <span className="text-gray-500 text-xs">(ID: {item.menuItemId})</span>
     </span>
     {item.labelText && (
      <span
       className="ml-2 px-2 py-0.5 text-xs font-bold text-white rounded"
       style={{ backgroundColor: item.labelColor || "#CE3241" }}
      >
       {item.labelText}
      </span>
     )}
    </div>
    <div className="space-x-2">
     <button
      onClick={() => onEdit(item)}
      className="text-blue-600 hover:text-blue-900 text-sm"
     >
      Edit
     </button>
     <button
      onClick={() => onDelete(item.menuItemId)}
      className="text-red-600 hover:text-red-900 text-sm"
     >
      Delete
     </button>
    </div>
   </div>
   {item.children && item.children.length > 0 && (
    <ul className="mt-2">
     {item.children.map((child) => (
      <MenuItemNode
       key={child.menuItemId}
       item={child}
       level={level + 1}
       onEdit={onEdit}
       onDelete={onDelete}
      />
     ))}
    </ul>
   )}
  </li>
 );
};

// --- MenuAdminPage Component (Main) ---
const MenuAdminPage = () => {
 const [menuItemsRaw, setMenuItemsRaw] = useState([]); // Flat list from DB for parent selection
 const [menuHierarchy, setMenuHierarchy] = useState([]); // Nested structure for display
 const [editingMenuItem, setEditingMenuItem] = useState(null); // Item being edited, or null for new
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [successMessage, setSuccessMessage] = useState(null);

 const loadMenuItems = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
   const data = await fetchMenuItems(); // Fetch flat data
   setMenuItemsRaw(data);
   setMenuHierarchy(buildMenuHierarchy(data)); // Build hierarchy from flat data
  } catch (err) {
   setError(`Failed to load menu items: ${err.message}`);
   console.error(err);
  } finally {
   setLoading(false);
  }
 }, []);

 useEffect(() => {
  loadMenuItems();
 }, [loadMenuItems]);

 // Clear messages after a delay
 useEffect(() => {
  if (error || successMessage) {
   const timer = setTimeout(() => {
    setError(null);
    setSuccessMessage(null);
   }, 5000); // Clear after 5 seconds
   return () => clearTimeout(timer);
  }
 }, [error, successMessage]);

 const handleFormSubmit = async (formData) => {
  setLoading(true);
  setError(null);
  setSuccessMessage(null);
  try {
   if (formData.menuItemId) {
    // Update existing item
    await updateMenuItem(formData.menuItemId, formData);
    setSuccessMessage("Menu item updated successfully!");
   } else {
    // Create new item
    await createMenuItem(formData);
    setSuccessMessage("Menu item added successfully!");
   }
   setEditingMenuItem(null); // Clear form after successful operation
   await loadMenuItems(); // Refresh data
  } catch (err) {
   // Catch specific error messages from the API
   setError(`Operation failed: ${err.message}`);
   console.error("Form submission error:", err);
  } finally {
   setLoading(false);
  }
 };

 const handleEdit = (item) => {
  // When editing, ensure we pass the raw data format to the form
  setEditingMenuItem({
   MenuItemId: item.menuItemId,
   Title: item.title,
   Handle: item.handle,
   ParentMenuItemId: item.parentMenuItemId,
   Link: item.href, // Map href back to Link for MenuItemRaw
   LabelText: item.labelText,
   LabelColor: item.labelColor,
   ImageSrc: item.imageSrc,
   ImageStyle: item.imageStyle,
   ImageAlt: item.imageAlt,
   Target: item.target,
   Rel: item.rel,
   AriaDescribedBy: item.ariaDescribedBy,
   // DisplayOrder would need to be fetched separately if not part of the initial hierarchy build
   // For simplicity, we'll assume it's part of the rawMenuItems and can be found.
   DisplayOrder:
    menuItemsRaw.find((mi) => mi.MenuItemId === item.menuItemId)
     ?.DisplayOrder || 0,
  });
 };

 const handleDelete = async (id) => {
  if (
   window.confirm(
    "Are you sure you want to delete this menu item? This will also remove any children and break product links if allowed by backend.",
   )
  ) {
   setLoading(true);
   setError(null);
   setSuccessMessage(null);
   try {
    await deleteMenuItem(id);
    setSuccessMessage("Menu item deleted successfully!");
    await loadMenuItems(); // Refresh data
   } catch (err) {
    setError(`Deletion failed: ${err.message}`);
    console.error("Deletion error:", err);
   } finally {
    setLoading(false);
   }
  }
 };

 return (
  <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
   <h1 className="text-3xl font-bold text-gray-800 mb-8">
    Menu Item Admin Panel
   </h1>

   {loading && (
    <div className="flex items-center justify-center py-4 text-blue-600">
     <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
     >
      <circle
       className="opacity-25"
       cx="12"
       cy="12"
       r="10"
       stroke="currentColor"
       strokeWidth="4"
      ></circle>
      <path
       className="opacity-75"
       fill="currentColor"
       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
     </svg>
     Loading...
    </div>
   )}

   {error && (
    <div
     className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-fade-in-down"
     role="alert"
    >
     <strong className="font-bold">Error!</strong>
     <span className="block sm:inline ml-2">{error}</span>
    </div>
   )}

   {successMessage && (
    <div
     className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 animate-fade-in-down"
     role="alert"
    >
     <strong className="font-bold">Success!</strong>
     <span className="block sm:inline ml-2">{successMessage}</span>
    </div>
   )}

   {/* Menu Item Form */}
   <MenuItemForm
    onSubmit={handleFormSubmit}
    initialData={editingMenuItem}
    availableParents={menuItemsRaw} // Pass raw data for parent selection
   />
   {editingMenuItem && (
    <button
     onClick={() => setEditingMenuItem(null)}
     className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
     Cancel Edit
    </button>
   )}

   {/* Existing Menu Items Display */}
   <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <h2 className="text-xl font-semibold mb-4">Existing Menu Items</h2>
    {menuHierarchy.length === 0 && !loading && !error ? (
     <p className="text-gray-500">No menu items found. Start by adding one!</p>
    ) : (
     <ul className="space-y-2">
      {menuHierarchy.map((item) => (
       <MenuItemNode
        key={item.menuItemId}
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
       />
      ))}
     </ul>
    )}
   </div>

   {/* Relationship to ProductTable Explanation */}
   <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-md">
    <h3 className="font-semibold text-lg mb-2">
     How Menu Items Relate to Products
    </h3>
    <p className="text-sm">
     The `MenuItemId` in the `Products` table ({`dbo.Products.MenuItemId`}) acts
     as a **foreign key** linking a product to a specific menu category. When a
     product is added, you would typically select the most granular menu
     category (e.g., "Casual Kameez" or "Western Tops") that it belongs to. This
     `MenuItemId` is then stored with the product data.
    </p>
    <p className="mt-2 text-sm">
     For example, if a product is a "Casual Kameez", its `MenuItemId` would
     correspond to the `MenuItemId` of the "Casual Kameez" menu item in your
     `MenuItems` table. When a user navigates to
     `/collections/women/ethnic/all-kameez/casual` (which is the `href` for
     "Casual Kameez"), your frontend would send a request to your backend to
     fetch products where `MenuItemId` matches the ID of "Casual Kameez".
    </p>
    <p className="mt-2 text-sm">
     **Implication for Admin:** When adding/editing a product, the product form
     should have a dropdown or similar input allowing the admin to select one of
     these `MenuItemId`s from your `MenuItems` table.
    </p>
   </div>
  </div>
 );
};

export default MenuAdminPage;
