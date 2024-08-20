import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const endpointsSecret = process.env.STRIPE_WEBHOOK_SECRET

if(!stripeSecretKey){
    throw new Error('Stripe secret key is not defined in environment variables')
}

const stripe = new Stripe(stripeSecretKey)

export async function POST(request: NextRequest){
    const body = await request.text()
    const headersList = headers()
    const sig = headersList.get('stripe-signature')

    if(!endpointsSecret) {
        throw new Error('Stripe endpointSecret is not defined in environment variables')
    }

    if(!sig){
        throw new Error('Sinature undefided')
    }

    let event
    
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointsSecret)
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.mensaje}, {status: 400})
    }

    switch(event.type){
        case "checkout.session.completed":
            const checkoutSessionCompleted = event.data.object
            //* Guardar en base de datos

            //* Enviar un correo
            console.log({checkoutSessionCompleted})
            break;
        default:
            console.log(`Evento no manejado ${event.type}`);
    }
    
    return NextResponse.json(null, {status: 200})
}