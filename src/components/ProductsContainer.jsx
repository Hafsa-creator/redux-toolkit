import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./stylesheets/products.css";
// redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../features/cartSlice';


const ProductsContainer = () => {

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);


    const addItem = (product) => {
        // dispatch(addItemsToCart(product));
        const existingItem = cartItems[product.id];
        const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

        if (newQuantity <= 10) {
            dispatch(addItemsToCart({ ...product, quantity: newQuantity }));
        } else {
            alert("Limited Product / Item Quantity Max upto 10.");
        }
    };
    
    const removeItem = (product) => {
        dispatch(removeItemsFromCart(product.id));
    };


    // fetch products
    const displayProducts = () => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        displayProducts();
    }, []);


    return (
        <div className="container">
            {products.map((item) => (
                <div className="card" key={item.id}>

                    <div className="image">
                        <img src={item.image} alt="Product" />
                    </div>

                    <div className="details">
                        <h3>{item.title}</h3> <br />
                        <h4>Price: ${item.price}</h4>
                    </div>

                    <div className="add-item">
                        <button onClick={() => removeItem(item)}>-</button>
                        <p>{cartItems[item.id] ? cartItems[item.id].quantity : 0}</p>
                        <button onClick={() => addItem(item)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsContainer;
