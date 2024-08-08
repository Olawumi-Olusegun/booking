import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "./../api/api-client"
import { Star } from "lucide-react";
import AppContainer from "../components/AppContainer";
import GuestInfoForm from "../components/forms/GuestInfoForm/GuestInfoForm";

const HotelDetails = () => {

    const { hotelId } = useParams();

    const { data: hotel } = useQuery("getHotelById", () => apiClient.getHotelById(hotelId as string), {
        enabled: !!hotelId,
    });



    if(!hotel) {
        return null;
    }

  return (
    <>
    <AppContainer>
        <div className="space-y-6 my-12">
            <div className="">
                <span className="flex items-center gap-1.5">
                    { 
                        Array.from({ length: hotel?.starRating }).map((_, index) => (
                            <Star  key={index} className="text-yellow-400 fill-yellow-400 "  /> 
                        ))
                    }
                    <h1 className="text-3xl font-semibold text-neutral-600">{hotel.name}</h1>
                </span>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    hotel.imageUrls.map((imageUrl, index) => (
                        <div className="h-[300px] overflow-hidden rounded-md" key={`hotel-image-${index}`}>
                            <img 
                            src={imageUrl} 
                            alt={`hotel-image-${index}`} 
                            className="rounded-md w-full object-cover object-center"
                            />
                        </div>
                    ))
                }
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
                {
                    hotel.facilities.map((facility, index) => (
                        <div key={`facility-${index}`} className="border border-slate-300 rounded-md p-3">
                            {facility}
                        </div>
                    ))
                }
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2">
                <p className="whitespace-pre-line">{hotel.description}</p>
                <div className="h-fit">
                    <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id as string} />
                </div>
            </div>
        </div>
    </AppContainer>
    </>
  )
}

export default HotelDetails