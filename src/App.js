import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import StripeCheckoutComponent from './StripeCheckoutComponent';
import StripePaymentSuccess from './StripePaymentSuccess';
import StripePaymentCancel from './StripePaymentCancel';
import Payment from './Payment';



function App() {
  return (
    <div className="App">
 <Router>
      <Routes>
        <Route path="/stripecheckoutcomponent" element={<StripeCheckoutComponent />} />
        <Route path="/stripepaymentsuccess" element={<StripePaymentSuccess />} />
        <Route path="/stripepaymentcancel" element={<StripePaymentCancel />} />
        <Route path="/" element={<Payment />} />
      
      
       
      </Routes>
 </Router>


     


    </div>
  );
}

export default App;
