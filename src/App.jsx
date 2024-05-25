// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { Routes, Route } from 'react-router-dom';
// import { Component } from "react";
import './AppStyle.css';
import CustomerList from "./components/CustomerList";
import OrderList from "./components/OrderList";
import ProductList from "./components/ProductList";
// import CustomerForm from "./components/CustomerForm";
import CustomerFormWrapper from './components/CustomerFormWrapper';
import ProductForm from "./components/ProductForm";
import NavigationBar from './components/NavigationBar';
import HomePage from './components/HomePage';
import PlaceOrderForm from './components/PlaceOrderForm';
import OrderDetails from './components/OrderDetails';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div className='app-container'>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
          <Route path='/add-customer/' element={<CustomerFormWrapper />} />
          <Route path='/edit-customer/:id' element={<CustomerFormWrapper />} />
          <Route path='/customers' element={<CustomerList />} />
          <Route path='/add-product' element={<ProductForm />} />
          <Route path='/edit-product/:id' element={<ProductForm />} />
          <Route path='/Products' element={<ProductList />} />
          <Route path='/orders' element={<PlaceOrderForm />} />
          <Route path='/orders/:id' element={<OrderDetails />} />


      </Routes>
    </div>
  )
}


// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       selectedCustomerId: null,
//       selectedOrderId: null
//     };
//   }
//   handleCustomerSelect = (customerId) => {
//     this.setState({ selectedCustomerId: customerId});
//   }

//   updateCustomerList = () => {
//     this.CustomerListRef.fetchCustomers();

//   };


//   handleOrderSelect = (orderId) => {
//     this.setState({ selectedOrderId: orderId});
//   }
//   render() {
//     const { selectedCustomerId, selectedOrderId } = this.state

//     return (
//       <div className="app-container">
//         <h1>Our Customers</h1>
//         <CustomerForm customerId={selectedCustomerId} onUpdateCustomerList={this.updateCustomerList}/>
//         <CustomerList ref={ref => this.CustomerListRef = ref} onCustomerSelect={this.handleCustomerSelect} />
//         <ProductForm />
//         {/* <CustomerList onCustomerSelect={this.handleCustomerSelect} /> */}
//         {selectedCustomerId && (
//           <OrderList
//             customerId={selectedCustomerId}
//             onOrderSelect={this.handleOrderSelect}
//           />
//         )}
//         {selectedOrderId && (
//           <ProductList orderId={selectedOrderId} />
//         )}        
//       </div>
//     );
//   }
// }
export default App