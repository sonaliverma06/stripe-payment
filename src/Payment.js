
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import React,{useEffect} from 'react'

const stripePromise = loadStripe("pk_test_51LriJGSB8OX1zXgAkbJm1NJvNQQRpxLG6TaviDZU43YJW1jc9yqlJ1XcoZVRnbFnaFzryIFR2Qouythj5gLEFgpP00FwWE7js6");

export default function Payment() {

 


useEffect(() => {


 
}, [])


async function onPayment(){
 
    const stripe = await stripePromise;


    axios.post('http://localhost:4000/checkout').then((res) => {
      console.log('res',res)
      window.location.href = res?.data?.session?.url
      
    }).catch((err) => {
      console.log('err',err)
    })
 
  }
  return (
    
    <div  className='sub'>
          <div className="description">
        <h3>Starter plan</h3>
        <h5>$1.00 / month</h5>
      </div>
      <button className='but' type="submit" onClick={() => onPayment()}>Checkout</button>

      <div>
           <a href='https://billing.stripe.com/p/login/test_6oEdTMfH21QDgPC6oo'> <button className='butt'> cancel subscription
      
           </button></a>
           </div>
  
    </div>
  )
}

