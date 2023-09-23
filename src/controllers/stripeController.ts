import { RequestHandler } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY!, {
    apiVersion: '2023-08-16',
});

type PaymentRequest = {
    purchase: { id: string; name: string; price: number };
    total_amount: number;
    shipping_fee: number;
};
type PaymentResponse = { clientSecret: string };
type PaymentHandler = RequestHandler<object, PaymentResponse, PaymentRequest>;

// TODO: ADD DATABASE INTEGRATION

const paymentController: PaymentHandler = async function (req, res) {
    const { purchase: _purchase, total_amount, shipping_fee } = req.body;

    const calculateOrderAmount = () => {
        return total_amount + shipping_fee;
    };

    const paymetnIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'inr',
    });

    res.status(StatusCodes.OK).json({
        clientSecret: paymetnIntent.client_secret!,
    });
};

export { paymentController };
