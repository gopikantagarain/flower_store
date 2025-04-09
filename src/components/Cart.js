import React from 'react';

const Cart = ({ cartItems, onPay }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="mb-3">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <p className="font-semibold">Total: ${total}</p>
      {cartItems.length > 0 && (
        <button
          onClick={onPay}
          className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Pay
        </button>
      )}
    </div>
  );
};

export default Cart;
