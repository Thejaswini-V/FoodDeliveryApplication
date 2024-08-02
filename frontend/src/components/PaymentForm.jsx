import React, { useState } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios'
import "./Stripe.css";

export default function PaymentForm() {
    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "black",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "black" },
                "::placeholder": { color: "black" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "black"
            }
        }
    }
    
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if(!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: 10000,
                    id
                })

                if(response.data.success){
                    console.log("Successful Payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        }else {
            console.log(error.message)
        }
    }
    return (
        
        <>
            {!success ? 
            <form onSubmit={handleSubmit}>
                <fieldset className='FormGroup'>
                    <div className="FormRow">
                        <CardNumberElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <fieldset className='FormGroup'>
                    <div className="FormRow">
                        <CardExpiryElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <fieldset className='FormGroup'>
                    <div className="FormRow">
                        <CardCvcElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button>Pay</button>
            </form>
            :
            <div className="payment-success">
                <h2>Payment successful</h2>
                <h3 className='Thank-you'>Thank you for your patronage</h3>
            </div>
        }
        </>
      )
}
