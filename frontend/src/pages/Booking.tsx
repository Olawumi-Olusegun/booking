
import { useQuery } from "react-query";
import * as apiClient from "./../api/api-client";
import BookingForm from "../components/forms/BookingForm/BookingForm";
import AppContainer from "../components/AppContainer";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";


const Booking = () => {

    const search = useSearchContext();
    const { stripePromise } = useAppContext();
    const { hotelId } = useParams();

    const [numberOfNights, setNumberOfNights] = useState(0);

    useEffect(() => {
        if(search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkIn.getTime() - search.checkOut.getTime()) / (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights))
        }
    }, [search.checkIn, search.checkOut])

    const { data: hotel } = useQuery("getHotelById", () => apiClient.getHotelById(hotelId as string), {
        enabled: !!hotelId
    });

    const { data: paymentIntentData } = useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelId as string, numberOfNights as number), {
        enabled: !!hotelId && numberOfNights > 0,
    });

    const { data: currentUser } = useQuery("fetchCurrentlyLoggedInUser", apiClient.fetchCurrentlyLoggedInUser);




    if(!hotel) {
        return null;
    }
    
  return (
    <>
    <AppContainer>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5 my-12">
            <div className="w-full">
                <BookingDetailSummary
                checkIn={search.checkIn} 
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
                />
            </div>
            {
                currentUser && paymentIntentData && (
                    <div className="w-full">
                        <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret: paymentIntentData.clientSecret,
                        }}
                        >
                            <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} /> 
                        </Elements>
                    </div>
                )
            }
        </div>
    </AppContainer>
    </>
  )
}

export default Booking