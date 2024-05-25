import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
function NavigationBar() {
    return (
        // <nav className="clearfix">
        //     {/* <Link to='/add-customer/'>Add Customer</Link>
        //     <Link to='customer'>Customers</Link> */}
        //     <NavLink to="/" activeClassName="active">Home</NavLink>
        //     <NavLink to="/add-customer" activeClassName="active">Add Customer</NavLink>
        //     <NavLink to="/customers" activeClassName="active">Customers</NavLink>
        //     <NavLink to="/add-product" activeClassName="active">Add Product</NavLink>
        //     <NavLink to="/products" activeClassName="active">Products</NavLink>

        // </nav>
        <Navbar bg ="light" expand= "lg">
            <Navbar.Brand href="/ ">E-Commerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr--auto">
                    <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-customer" activeclassname="active">
                        Add Customer
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                        Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
                        Add Product
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                        Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders" activeclassname="active">
                        Add Order
                    </Nav.Link>
                    

                </Nav>
            </Navbar.Collapse>


        </Navbar>
    );
}

export default NavigationBar