import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const endpointsSecret = process.env.STRIPE_WEBHOOK_SECRET

if(!stripeSecretKey){
    throw new Error('Stripe secret key is not defined in environment variables')
}

if(!endpointsSecret) {
    throw new Error('Stripe webhook secret is not defined in environment variables')
}

const stripe = new Stripe(stripeSecretKey)
const webhookSecret = endpointsSecret


export async function POST(request: NextRequest){
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('Stripe-Signature')
    let event

    if( !signature ) return

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 400})
    }

    switch(event.type){
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object
            // Guardar en una base de datos
            console.log('consultando producto con id', checkoutSessionCompleted.metadata);
            

            // Enviar un correo
            console.log({checkoutSessionCompleted});
            break
        default:
            console.log(`Event no manejado ${event.type}`);
            
        }
        

    return NextResponse.json('Recibiendo webhook')
}