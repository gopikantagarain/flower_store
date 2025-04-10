import React, { useState } from 'react';
import { BrowserProvider, parseEther } from 'ethers';
import picturesData from './data/pictures';
import PictureCard from './components/PictureCard';
import Cart from './components/Cart';

function App() {
  const [availablePictures, setAvailablePictures] = useState(picturesData);
  const [cart, setCart] = useState([]);
  const [walletAddress, setWalletAddress] = useState('');
  const [ethProvider, setEthProvider] = useState(null);

  const myWallet = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

  // Connect MetaMask Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setEthProvider(provider);
      } catch (err) {
        console.error('Connection error:', err);
        alert("Failed to connect wallet.");
      }
    } else {
      alert("Please install MetaMask.");
    }
  };

  // Add to cart
  const handleBuy = (picture) => {
    if (!cart.find((item) => item.id === picture.id)) {
      setCart([...cart, picture]);
    }
  };

  // Pay using ETH
  const handlePay = async () => {
    if (!ethProvider) {
      alert("Please connect your wallet first.");
      return;
    }

    const signer = await ethProvider.getSigner();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const ethAmount = totalPrice * 0.000001;

    try {
      const tx = await signer.sendTransaction({
        to: myWallet,
        value: parseEther(ethAmount.toString()),
      });

      await tx.wait();
      alert("Payment successful!");

      // Remove purchased pictures
      const boughtIds = cart.map((item) => item.id);
      const updated = availablePictures.filter(pic => !boughtIds.includes(pic.id));
      setAvailablePictures(updated);
      setCart([]);
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">🖼️ Picture Store</h1>
        {!walletAddress ? (
          <button
            onClick={connectWallet}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <p className="text-green-600 font-medium">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        )}
      </div>

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
