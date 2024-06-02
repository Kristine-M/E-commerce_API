import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
// import logo from './pictures/strawberry.png';
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

        
        <>

            <header id="banner">
                <center><p id="banner-name"><img src="pictures/bakery.png" alt="goodies" width='50px'/><b>Sugar Coated </b><img src="pictures/bakery.png" alt="goodies" width='50px'/></p></center>

                <div id="sign-out">
                <button id="out-button"> <a href="http://localhost:5173/signed-out" id="link"><img src="pictures/exit.png" alt="signout" width='30px'/></a></button>
                </div>

            </header>
            <Navbar bg ="light" expand= "lg">
                {/* <Navbar.Brand id= "shop_name" href="/ "><img src="pictures/strawberry.png" alt="strawberry" width="40px"/></Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr--auto">
                        <Nav.Link as={NavLink} to="/home" activeclassname="active">
                             <img src="pictures/bakery-shop.png" alt="home" width='30px'/>
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/add-customer" activeclassname="active">
                            Add Client
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                            Clients
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
        
        </>
    );
}

export default NavigationBar