import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/orders/${id}`)
            .then(response => setOrder(response.data))
            .catch(error => setError(error.message));
    }, [id]);

    if (error) return <Alert variant='danger'>{error}</Alert>;
    if (!order) return <p>Loading...</p>;

    return (
        <div>
            <h3>Order Details</h3>
            <p>Order ID: {order.order_id}</p>
            <p>Date: {order.date}</p>
            <p>Products:</p>
            <ul>
                {order.products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default OrderDetails;
