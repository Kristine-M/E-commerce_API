import axios from 'axios';
import { func } from 'prop-types';
import { Component } from "react";
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Modal, ListGroup} from 'react-bootstrap';
// import axios from 'axios';


class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
            error: null
        };
    }

    componentDidMount(){
        //fetching data from API
        this.fetchCustomers();
        
    }

    fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
        .then(response => {
            this.setState({customers: response.data});
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            this.setState({error: 'Error fetching customers. Please Try again Later.'});
        });
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id });
        this.props.onCustomerSelect(id);
    }
    
    deleteCustomer = (customerId) => {
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(response => {
                this.fetchCustomers();
            })
            .catch(error => {
                console.error('Error deleting customer:', error)
                this.setState({error: 'Error deleting customers. Please Try again Later.'});
            });
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.selectCustomerId !== this.state.selectedCustomerId){
            console.log(`New customer selected: ID ${this.state.selectedCustomerId}`);
        }
    }

    componentWillUnmount() {
        console.log('CustomerList component is being unmounted');
    }

    

    render() {
        const { customers, error } = this.state;

        return (
            // <div className="customer-list">
            //     <h3>Customers</h3>
            //     <ul>
            //         {customers.map(customer => (
            //             <li key={customer.id} onClick={() => this.selectCustomer(customer.id)}>
            //                 {customer.name}
            //                 <button onClick={() => this.deleteCustomer(customer.id)}>Delete</button>
            //             </li>
            //         ))}
            //     </ul>
            // </div>
            <Container id='client-list'>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h3 className='mt-3 mb-3 text-center' id="label">Clients</h3>
                <ListGroup>
                    {customers.map(customer => (
                        <ListGroup.Item key={customer.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                            <Link to={`/edit-customer/${customer.id}`} className='text-primary'>{customer.name}</Link>
                            <Button variant='danger' size='sm' onClick={() => this.deleteCustomer(customer.id)}>Delete</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

CustomerList.propTypes = {
    onCustomerSelect: func
}

export default CustomerList;