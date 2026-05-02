import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const { price } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Author Market Listing",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000",
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    return Response.json({
      success: false,
      error: err.message || "Checkout error",
    });
  }
}
