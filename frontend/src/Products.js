import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });
  const apiUrl = 'http://127.0.0.1:8000/api/products/';

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setProducts(data);
  };

  // Add or Update Product
  const saveProduct = async (e) => {
    e.preventDefault();
    const method = currentProduct ? 'PUT' : 'POST';
    const url = currentProduct ? `${apiUrl}${currentProduct.id}` : apiUrl;

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    resetForm();
    fetchProducts();
  };

  // Delete Product
  const deleteProduct = async (id) => {
    await fetch(`${apiUrl}${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  // Open Modal for Add/Edit
  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({ name: product.name, price: product.price, description: product.description, image: product.image });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  // Reset Form
  const resetForm = () => {
    setCurrentProduct(null);
    setFormData({ name: '', price: '', description: '', image: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => openModal()}>
        Add Product
      </button>

      {isModalOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-300 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded">
            <form onSubmit={saveProduct}>
              <input className="border p-2 m-2" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Name" required />
              <input className="border p-2 m-2" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" required />
              <textarea className="border p-2 m-2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required></textarea>
              <input className="border p-2 m-2" type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="Image URL" required />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Save</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={resetForm}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between border-b p-2">
            <span>{product.name}</span>
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded m-1" onClick={() => openModal(product)}>Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-1" onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
