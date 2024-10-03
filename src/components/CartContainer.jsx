import React from 'react';
import { NavLink } from 'react-router-dom';
// stylesheet
import "./stylesheets/cart.modules.css";
// redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../features/cartSlice';


const CartPage = () => {

    const cartItems = useSelector(state => state?.cart?.cartItems);
    const totalItems = useSelector((state) => state?.cart?.totalQuantity);
    const dispatch = useDispatch();


    const addItem = (product) => {
        // dispatch(addItemsToCart(product));
        const existingItem = cartItems[product?.id];
        const newQuantity = existingItem ? existingItem?.quantity + 1 : 1;

        if (newQuantity < 11) {
            dispatch(addItemsToCart({ ...product, quantity: newQuantity }));
        } else {
            alert("Limited Product / Item Quantity Max upto 10.");
        }
    };

    const removeItem = (product) => {
        dispatch(removeItemsFromCart(product?.id));
    };


    // calculate subtotal
    const subTotal = Object.values(cartItems).reduce((acc, item) => {
        return acc + (item?.price * item?.quantity);
    }, 0);


    return (
        <div className='cart-container'>
            {/* Cart Header */}
            <h2 className="cart-title">Your Cart ({totalItems} items)</h2>

            {/* Cart Table */}
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>

                {Object.keys(cartItems).length > 0 ? (
                    Object.values(cartItems).map(item => (

                        <tbody key={item?.id}>
                            <tr>
                                <td className="cart-item">
                                    <img src={item?.image} alt="Product Image" width='79px' height='88px' />
                                    <NavLink to={`/product-details/${item?.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <span className="item-title">{item?.title}</span>
                                    </NavLink>
                                </td>
                                <td className="cart-price"> {item?.price} </td>
                                <td className="cart-quantity">
                                    <button className="quantityBtn" onClick={() => removeItem(item)}>-</button>
                                    <span>{item?.quantity}</span>
                                    <button className="quantityBtn" onClick={() => addItem(item)}>+</button>
                                </td>
                                <td className="cart-total">${(item?.quantity * item?.price).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No items in the cart.</td>
                    </tr>
                )}
            </table>

            {/* sub-total */}
            <div className="total">
                <span>Grand Total: </span>
                <span>${subTotal.toFixed(2)}</span>
            </div>
        </div >
    );
};

export default CartPage;