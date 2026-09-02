import { useEffect, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Classic Sneakers",
    price: 2499,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 2,
    name: "Minimal Watch",
    price: 1899,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  },
  {
    id: 3,
    name: "Canvas Backpack",
    price: 1599,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    id: 5,
    name: "Cotton T-Shirt",
    price: 799,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
  },
  {
    id: 7,
    name: "Running Shoes",
    price: 2799,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    id: 8,
    name: "Travel Backpack",
    price: 2199,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopnest-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    localStorage.setItem("shopnest-cart", JSON.stringify(cart));
  }, [cart]);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  function addToCart(product) {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function proceedToCheckout() {
    setShowCart(false);
    setShowCheckout(true);
  }

  function placeOrder(event) {
    event.preventDefault();

    setShowCheckout(false);
    setOrderPlaced(true);
    setCart([]);
  }

  function continueShopping() {
    setOrderPlaced(false);
    setShowCart(false);
    setShowCheckout(false);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = cartTotal >= 2000 ? 0 : 99;
  const finalTotal = cartTotal + deliveryCharge;

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          Shop<span>Nest</span>
        </div>

        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
        >
          🛒 Cart
          <span>{cartCount}</span>
        </button>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="small-title">WELCOME TO SHOPNEST</p>

          <h1>
            Find something
            <br />
            you'll love.
          </h1>

          <p className="hero-text">
            Discover simple, stylish and useful products
            for your everyday life.
          </p>

          <a href="#products" className="shop-button">
            Shop Now →
          </a>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section" id="products">
        <div className="section-heading">
          <div>
            <p className="small-title">OUR COLLECTION</p>
            <h2>Popular Products</h2>
          </div>

          <p>{filteredProducts.length} products</p>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item ? "active-category" : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="product-info">
                  <p className="category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <strong>
                      ₹{product.price.toLocaleString("en-IN")}
                    </strong>

                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <h3>No products found 😕</h3>
              <p>Try another search or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CART */}
      {showCart && (
        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >
          <div
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <h2>Your Cart</h2>

              <button
                className="close-button"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something you like!</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        <p>
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="total">
                    <span>Total</span>

                    <strong>
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {showCheckout && (
        <div className="checkout-overlay">
          <div className="checkout-panel">
            <div className="checkout-header">
              <div>
                <p className="small-title">
                  SHOPNEST CHECKOUT
                </p>
                <h2>Delivery Details</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowCheckout(false)}
              >
                ✕
              </button>
            </div>

            <div className="checkout-content">
              <form
                className="checkout-form"
                onSubmit={placeOrder}
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  required
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={customer.email}
                  onChange={handleCustomerChange}
                  required
                />

                <textarea
                  name="address"
                  placeholder="Full Address"
                  value={customer.address}
                  onChange={handleCustomerChange}
                  required
                />

                <div className="form-row">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={customer.city}
                    onChange={handleCustomerChange}
                    required
                  />

                  <input
                    name="state"
                    type="text"
                    placeholder="State"
                    value={customer.state}
                    onChange={handleCustomerChange}
                    required
                  />
                </div>

                <input
                  name="pincode"
                  type="text"
                  placeholder="PIN Code"
                  value={customer.pincode}
                  onChange={handleCustomerChange}
                  required
                />

                <div className="payment-box">
                  <h3>Payment Method</h3>

                  <label>
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                    />
                    Cash on Delivery
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="payment"
                    />
                    UPI / Card (Demo)
                  </label>
                </div>

                <button
                  type="submit"
                  className="place-order-button"
                >
                  Place Order →
                </button>
              </form>

              {/* ORDER SUMMARY */}
              <div className="order-summary">
                <h3>Order Summary</h3>

                {cart.map((item) => (
                  <div
                    className="summary-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}

                <hr />

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="summary-row">
                  <span>Delivery</span>

                  <span>
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="summary-total">
                  <span>Total</span>

                  <strong>
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {orderPlaced && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="success-icon">✓</div>

            <h2>Order Placed Successfully!</h2>

            <p>
              Thank you for shopping with ShopNest.
            </p>

            <p>
              Your order will be delivered to:
              <br />
              <strong>{customer.address}</strong>
              <br />
              {customer.city}, {customer.state} -{" "}
              {customer.pincode}
            </p>

            <button
              className="checkout-button"
              onClick={continueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;