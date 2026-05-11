import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
try {
const { priceId } = await req.json();

if (!priceId) {
return NextResponse.json(
{ error: "Missing priceId" },
{ status: 400 }
);
}

const session = await stripe.checkout.sessions.create({
mode: "payment",
line_items: [
{
price: priceId,
quantity: 1,
},
],
success_url: "http://localhost:3000/success",
cancel_url: "http://localhost:3000",
});

return NextResponse.json({ url: session.url });
} catch (err: any) {
console.log(err);

return NextResponse.json(
{ error: err.message || "Stripe checkout failed" },
{ status: 500 }
);
}
}