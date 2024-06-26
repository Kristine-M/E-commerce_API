import { number } from 'prop-types';
import { useState, useEffect } from "react";
import axios from 'axios';
import { array, func} from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ListGroup, Row, Col } from 'react-bootstrap';

const ProductList = ({ orderId }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        } catch(error) {
            console.error('Error fetching products', error)
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    useEffect(() => {  
        fetchProducts()   
    }, []);

    return(

        <Container id='product_list'>
            <h3 id="label">Products</h3>
            <Row className='justify-content-center'>
                {products.map((product, index) => (
                        <Col key={product.id} id='grid-col' md={3} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                            <div>
                                <img src="pictures/bakery.png" alt="goodies" width="180px"/>
                                <br />
                                {product.name} <br />Price: ${product.price.toFixed(2)}
                                <div>
                                    <Button variant='primary' onClick={() => navigate(`/edit-product/${product.id}`)} className='me-2'>Edit</Button>
                                    <Button variant='danger' onClick={() => deleteProduct(product.id)}>Delete</Button>
                                </div>
                            </div>
                        </Col>
                ))}
            </Row>
        </Container>

        // <Container>
        //     <Row>
        //         <Col>
        //         <h3>Products</h3>
        //         <ListGroup>
        //             {products.map(product => (
        //                 <ListGroup.Item key={product.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
        //                     {product.name} (ID: {product.id})
        //                     <div>
        //                         <Button variant='primary' onClick={() => navigate(`/edit-product/${product.id}`)} className='me-2'>Edit</Button>
        //                         <Button variant='danger' onClick={() => deleteProduct(product.id)}>Delete</Button>
        //                     </div>
        //                 </ListGroup.Item>
        //             ))}
        //         </ListGroup>
        //         </Col>
        //     </Row>
        // </Container>



        // <div className='product-list'>
        //     <h3>Products</h3>
        //     <ul>
        //         {products.map(product => (
        //             <li key={product.id}>
        //                 {product.name} (ID: {product.id})
        //                 <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
        //                 <button onClick={() => deleteProduct(product.id)}>Delete</button>

        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

ProductList.propTypes = {
    products: array,
    orderId: number
}

export default ProductList;