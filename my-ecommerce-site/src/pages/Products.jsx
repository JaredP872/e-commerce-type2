import { useEffect, useState } from "react";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For displaying filtered products
  const [error, setError] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    type: "", // Samsung or iPhone
  });

  // Fetch products on component load
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Products:", data); // Debugging: Log product data
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products
      })
      .catch((err) => setError(err.message));
  }, []);

  // Filter products whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Apply filters to products
  const applyFilters = () => {
    const { minPrice, maxPrice, type } = filters;

    console.log("Applying Filters:", filters);

    const filtered = products.filter((product) => {
      const matchesPrice =
        (!minPrice || product.price >= parseFloat(minPrice)) &&
        (!maxPrice || product.price <= parseFloat(maxPrice));
      const matchesType =
        !type ||
        (product.type && product.type.toLowerCase() === type.toLowerCase());

      return matchesPrice && matchesType;
    });

    console.log("Filtered Products:", filtered); // Debug filtered results
    setFilteredProducts(filtered);
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>Loading products...</p>;

  return (
    <div className="products-page">
      <h1>Products</h1>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="iPhone">iPhone</option>
          <option value="Samsung">Samsung</option>
        </select>
      </div>

      {/* Products Section */}
      <div id="dataDisplay">
        {filteredProducts.map((product) => (
          <div className="Product-div" key={product.id}>
            {/* Make image clickable with a link */}
            <a
              href={product.amazon_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={product.image_url} alt={product.name} />
            </a>
            <h2 className="h2-products">{product.name}</h2>
            <p className="p-products">{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
