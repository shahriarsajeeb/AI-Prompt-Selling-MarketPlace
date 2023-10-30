"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// send stripe publishable key
export const stripePublishableKey = () => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  return publishableKey;
};

// send stripe payment intent
export const stripePaymentIntent = async ({ amount }: { amount: Number }) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      metadata: {
        company: "Becodemy",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent;
  } catch (error) {
    console.log(error);
  }
};
