import React from 'react';

const PictureCard = ({ picture, onBuy }) => {
  return (
    <div className="border p-2 rounded shadow w-[220px] text-center">
      <img src={picture.src} alt={picture.title} className="mb-2" />
      <h3 className="text-lg font-semibold">{picture.title}</h3>
      <p className="mb-2">Price: ${picture.price}</p>
      <button
        onClick={() => onBuy(picture)}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Buy
      </button>
    </div>
  );
};

export default PictureCard;