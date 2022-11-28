import { loadStripe } from "@stripe/stripe-js";
import React from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51LriJGSB8OX1zXgAkbJm1NJvNQQRpxLG6TaviDZU43YJW1jc9yqlJ1XcoZVRnbFnaFzryIFR2Qouythj5gLEFgpP00FwWE7js6");

function StripeCheckoutComponent() {
  const handleClick = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
  

    // Call your backend to create the Checkout Session
    const response = await fetch(
      "http://localhost:4000/create-checkout-session",
      {
        method: "POST",
      }
    );
    console.log("response", response);

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div style={{ margin: "5%" }}>
      <img
        style={{ width: "20%", border: "1px gray solid" }}
        src="/images/tshirt.png"
      ></img>
      <h4>You have selected T-shirt</h4>
      <h4>Amount: 200 (INR)</h4>
      <p>Once click on pay, you will be redirected to our Payment gateway.</p>
      <button role="link" onClick={handleClick}>
        {" "}
        Click here to Pay
      </button>
    </div>
  );
}

export default StripeCheckoutComponent;