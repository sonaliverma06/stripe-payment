const express = require("express");
const app = express();

const secretKey = "sk_test_51LriJGSB8OX1zXgAkweaqKpV4cUmjoebIK8r7z16Fge6ShdogJsSLqaR0aTrqNSkuks5PCMeeT83W4IPBeZ7xHUo00m8HVIEHc";
const stripe = require("stripe")(secretKey);

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});


app.get("/", async (req, res) => {
  res.json("Welcome to backend.");
});


app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "T-shirt",
          },
       
          unit_amount: 40000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/stripepaymentsuccess",
    cancel_url: "http://localhost:3000/stripepaymentcancel",
  });

  console.log("session", session);

  res.json({ id: session.id });
});

app.post("/checkout", async (req, res) => {
  
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      // 
      // email:'sonali.badoliya@iflair.com',
      line_items: [
        {
          price: 'price_1M299nSB8OX1zXgAt7UlQKiJ',
          quantity: 1,
        },

       
      ],
     

      subscription_data: {
        //   trial_period_days:20
     
        
      },
      success_url:'http://localhost:3000/payment',
      cancel_url: `http://localhost:3000/stripepaymentcancel`,
    });
 
    res.json({session:session})
})

app.post("/checkout", async (req, res) => {
  // 
  const session = await Stripe.createCheckoutSession(
    'cus_Mj6Tzv3zxfVpOO',
    
  );
  res.send({ sessionId: session });
});

// stripe.subscriptions.update('sub_1M2uTjSB8OX1zXgApLv3u3K3', {cancel_at_period_end: true});
// const subscription = await stripe.subscriptions.retrieve('sub_1M2uTjSB8OX1zXgApLv3u3K3');
// stripe.subscriptions.update(subscription.id, {
//   cancel_at_period_end: false,
//   proration_behavior: 'create_prorations',
//   items: [{
//     id: subscription.items.data[0].id,
//     price: 'price_1M299nSB8OX1zXgAt7UlQKiJ',
//   }]
// });


app.listen(4000, () => console.log(`Listening on port ${4000}!`))