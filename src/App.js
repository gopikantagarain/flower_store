import React, { useState } from 'react';
import picturesData from './data/pictures';
import PictureCard from './components/PictureCard';
import Cart from './components/Cart';

function App() {
  const [availablePictures, setAvailablePictures] = useState(picturesData);
  const [cart, setCart] = useState([]);

  const handleBuy = (picture) => {
    if (!cart.find((item) => item.id === picture.id)) {
      setCart([...cart, picture]);
    }
  };

  const handlePay = () => {
    const boughtIds = cart.map((item) => item.id);
    const remaining = availablePictures.filter((pic) => !boughtIds.includes(pic.id));
    setAvailablePictures(remaining);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">🖼️ Picture Store</h1>

      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {availablePictures.map((pic) => (
            <PictureCard key={pic.id} picture={pic} onBuy={handleBuy} />
          ))}
        </div>

        <Cart cartItems={cart} onPay={handlePay} />
      </div>
    </div>
  );
}

export default App;
