import { useForm } from "react-hook-form";
import { PaymentIntentResponse, UserType } from "../../../types"
import { CardElement, useElements, useStripe, } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../../context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "./../../../api/api-client";
import { useAppContext } from "../../../context/AppContext";
import { Loader2 } from "lucide-react";

export type BookingFormProps = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse
}

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string;
    hotelId: string;
    paymentIntentId: string;
    totalCost: number,
}

const BookingForm = ({currentUser, paymentIntent}: BookingFormProps) => {

    const stripe = useStripe();
    const elements = useElements();

    const { hotelId } = useParams();

    const { showToast } = useAppContext();

    const search = useSearchContext();

    const {mutate: bookingMutation, isLoading } = useMutation(apiClient.createBooking, {
        onSuccess: () => {
            showToast({ message: "Booking saved", type: "success" })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "error" })
        }
    })

    const { register, handleSubmit, } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName || "",
            lastName: currentUser.lastName || "",
            email: currentUser.email || "",
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId,
        }
    });

    const handleOnSubmit = async (formData: BookingFormData) => {
        
        if(!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
            }
        });

        if(result.paymentIntent?.status === "succeeded") {
            bookingMutation({...formData, paymentIntentId: result.paymentIntent.id })
        }
    }

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
        <h2 className="text-2xl font-semibold my-2">Confirm Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
                <label htmlFor="firstName" className="text-gray-700 text-sm font-semibold flex-1">Firstname</label>
                <input
                type="text"
                readOnly
                disabled
                {...register("firstName")}
                className="border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal duration-300 focus-visible:outline-blue-500 focus-visible:ring-blue-500" 
                />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="lastName" className="text-gray-700 text-sm font-semibold flex-1">Lastname</label>
                <input
                type="text" 
                readOnly
                disabled
                {...register("lastName")}
                className="border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal duration-300 focus-visible:outline-blue-500 focus-visible:ring-blue-500" 
                />
            </div>
            <div className="flex flex-col gap-3 col-span-2">
                <label htmlFor="email" className="text-gray-700 text-sm font-semibold flex-1">Email</label>
                <input 
                type="text" 
                readOnly 
                disabled
                {...register("email")}
                className="border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal duration-300 focus-visible:outline-blue-500 focus-visible:ring-blue-500" 
                />
            </div>

        </div>

        <div className="space-y-2 my-5">
            <h2 className="text-xl font-semibold">Your Price Summary</h2>
            
            <div className="bg-blue-200 p-4 rounded-md ">
                <div className="flex items-center gap-2">
                    <strong>Total Cost:</strong>
                    <div className="">${paymentIntent.totalCost.toFixed(2)}</div>
                </div>
            </div>
            <div className="text-xs">Includes taxes and charges</div>
        </div>

         <div className="space-y-2">
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
         </div>

         <div className="flex justify-end my-5">
            <button type="submit" disabled={isLoading} className="flex disabled:bg-gray-400 disabled:cursor-not-allowed items-center justify-center gap-1.5 px-3 py-2 bg-blue-700 text-white hover:bg-blue-600 duration-300 rounded-md">
                    {isLoading && <Loader2 className="h-4 w-4" />}  
                    <span> {isLoading ? "Saving..." : "Confirm Booking"} </span>
            </button>
         </div>

    </form>
  )
}

export default BookingForm