import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if(!stripeSecretKey){
    throw new Error('Stripe secret key is not defined in environment variables')
}

const stripe = new Stripe(stripeSecretKey)

export async function POST(request: NextRequest){

    const body = await request.json()

    const session = await stripe.checkout.sessions.create({
        success_url: "http://localhost:3000/success",
        line_items:[
            {
                price_data:{
                    currency: 'usd',
                    product_data:{
                        name: body.name,
                        images:[body.image]
                    },
                    unit_amount: body.price
                },
                quantity: 1
            }
        ],
        metadata:{
            productId: body.id
        },
        mode: 'payment'
    })
    
    return NextResponse.json(session)
}
