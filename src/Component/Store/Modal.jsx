import React, { useState } from 'react';
import './Modal.css'; // For Modal-specific styling

const Modal = ({ product, onClose, addToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.image.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.image.length - 1 : prevIndex - 1
        );
    };

    // Close modal if user clicks on the overlay (outside modal content)
    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay-product') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay-product" onClick={handleOverlayClick}>
            <div className="modal-content-product">
                <div className="modal-image-container-product">
                    <button className="prev-arrow-product" onClick={handlePrevImage}>
                        &#10094;
                    </button>
                    <img
                        src={product.image[currentImageIndex]}
                        alt={product.name}
                        className="modal-image-product"
                    />
                    <button className="next-arrow-product" onClick={handleNextImage}>
                        &#10095;
                    </button>
                </div>
                <div className="modal-info-product">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>
                        Price: <span>&#8377;</span>
                        {product.price}
                    </p>
                    <button onClick={() => addToCart(product)}>Buy now</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
