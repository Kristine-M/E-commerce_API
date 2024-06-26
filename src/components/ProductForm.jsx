import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { object, func } from 'prop-types';
import axios from 'axios';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';

//deosnt update after every letter typed
const ProductForm = () => {
    // const [name, setName] = useState('');
    // const [price, setPrice] = useState('');
    const [product, setProduct] = useState({ name: '', price: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError]  = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (id) {

            axios.get(`http://127.0.0.1:5000/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => setErrorMessage(error.message));
            
        }

    }, [id]);

    const validateForm = () => {
       
        let errors = {};
        if (!product.name) errors.name = 'Product name is required';
        if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number';
        setError(errors)
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try{
            if (id){
                await axios.put(`http://127.0.0.1:5000/products/${id}`, product);
                
            }else {
                await axios.post(`http://127.0.0.1:5000/products`, product);
            }
            setShowSuccessModal(true)
        } catch (error) {
            setErrorMessage(error.message);

        } finally {
            setSubmitting(false);
        }

       
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleClose = () => {
        setShowSuccessModal(false);
        setProduct({ name: '', price: '' });
        setSubmitting(false);
        navigate('/products');
    };

    if (isSubmitting) return <p>Submitting product data...</p>
    // if (error) return <p>Error submitting product data: {error}</p>;

    return (
        <>
            <Form onSubmit={handleSubmit} id='product_form'>
                <h3 id="label">{id ? 'Edit' : 'Add'} Product <img src="pictures/list.png" alt="form" width='50px'/></h3>
                {/* {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>} */}
                <Form.Group controlId='productName'>
                    <Form.Label id='short-input'>Name:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        value={product.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        id='short-input'
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group controlId='productPrice'>
                    <Form.Label id='short-input'>Price:</Form.Label>
                    <Form.Control
                        type='number'
                        name='price'
                        value={product.price}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        id='short-input'
                    />
                    <Form.Control.Feedback type='invalid'>
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Button id='button' type='submit' disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : "Submit"}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>

                <Modal.Body>Product has been successfully {id ?  'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        
        </>
     
    );
};

ProductForm.propTypes = {
    selectedProduct: object,
    onProductUpdated: func
}
export default ProductForm;