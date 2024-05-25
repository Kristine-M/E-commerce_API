import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Modal } from 'react-bootstrap';

const PlaceOrderForm = () => {
    const [order, setOrder] = useState({ date: '', customer_id: '', products: [] });
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        // Fetch customers
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => setCustomers(response.data))
            .catch(error => setError(error.message));
        
        // Fetch products
        axios.get('http://127.0.0.1:5000/products')
            .then(response => setProducts(response.data))
            .catch(error => setError(error.message));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/orders', order);
            setShowSuccessModal(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({ date: '', customer_id: '', products: [] });
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h3>Place a New Order</h3>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form.Group controlId='orderDate'>
                    <Form.Label>Order Date:</Form.Label>
                    <Form.Control type='date' name='date' value={order.date} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId='customerId'>
                    <Form.Label>Customer:</Form.Label>
                    <Form.Control as='select' name='customer_id' value={order.customer_id} onChange={handleChange} required>
                        <option value=''>Select Customer</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='products'>
                    <Form.Label>Products:</Form.Label>
                    <Form.Control as='select' multiple name='products' value={order.products} onChange={handleChange} required>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>Place Order</Button>
            </Form>
            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order placed successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PlaceOrderForm;
