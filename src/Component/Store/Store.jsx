import React, { useState } from 'react';
import './Store.css'; // For styling
import Pen from '../../Assets/Store/pen.jpg';
import Cup from '../../Assets/Store/cup.jpg';
import Diary from '../../Assets/Store/diary.jpg';
import Tshirt from '../../Assets/Store/tshirt.jpg';
import Jacket from '../../Assets/Store/jacket.jpg';
import Combo from '../../Assets/Store/combo.jpg';
import Wallet from '../../Assets/Store/wallet.jpg';
import KeyKichen from '../../Assets/Store/keyKitchen.jpg';
import Bag from '../../Assets/Store/bag.jpg';
import Modal from './Modal'; // Import Modal Component

// Products data
const productsData = [
    {
        id: 1,
        name: 'Pen',
        price: 70,
        image: [Pen],
        description: 'Fantastic Pen with logo of CA on it',
    },
    {
        id: 2,
        name: 'Keychain',
        price: 85,
        image: [KeyKichen],
        description: 'Keychain with logo of CA and your name',
    },
    {
        id: 3,
        name: 'Cup',
        price: 85,
        image: [Cup],
        description: 'Cup with printed CA quote',
    },
    {
        id: 4,
        name: 'Diary',
        price: 100,
        image: [Diary],
        description: 'Diary with logo of CA and your name',
    },
    {
        id: 5,
        name: 'Wallet',
        price: 100,
        image: [Wallet],
        description: 'Wallet with logo of CA and your name',
    },
    {
        id: 6,
        name: 'T-shirt',
        price: 120,
        image: [Tshirt],
        description: 'Tshirt with printed CA quote',
    },
    {
        id: 7,
        name: 'Bag',
        price: 100,
        image: [Bag],
        description: 'Fantastic Bag with logo of CA on it',
    },
    {
        id: 8,
        name: 'Jacket',
        price: 140,
        image: [Jacket],
        description: 'Fantastic Jacket with logo of CA on it',
    },
];

const Store = () => {
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="shopping-page">
            <h1>Shopping Page</h1>
            <div className="products-container">
                {productsData.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => openModal(product)}
                    >
                        <img src={product.image[0]} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>
                            <span>&#8377;</span>
                            {product.price}
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent modal from opening when clicking buy
                                addToCart(product);
                            }}
                        >
                            Buy now
                        </button>
                    </div>
                ))}
            </div>

            {showModal && selectedProduct && (
                <Modal
                    product={selectedProduct}
                    onClose={closeModal}
                    addToCart={addToCart}
                />
            )}
        </div>
    );
};

export default Store;
