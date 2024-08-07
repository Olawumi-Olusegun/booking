import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "./../api/api-client";
import { useAppContext } from "../context/AppContext";
import { Building, Currency, Map, Star } from "lucide-react";
import AppContainer from "../components/AppContainer";

const MyHotels = () => {
    const { showToast } = useAppContext();

    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: () => {
            showToast({ message: "Error fetching hotels", type: "error"})
        }
    });


    if(!hotelData) {
        return <div className="p-5 text-center">No hotel found</div>
    }

  return (
    <div className="space-y-5 my-12">
        <AppContainer>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-black/80">My Hotels</h1>
                <Link to={"/add-hotel"} className="flex bg-blue-600 rounded-md text-white text-xl font-bold p-2 px-3 duration-300 hover:bg-blue-500 ">Add Hotel</Link>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {
                    hotelData.map((hotel) => (
                        <div key={hotel._id} className="flex flex-col justify-between gap-5 border border-slate-300 rounded-lg p-8">
                            <h2 className="text-2xl font-bold">{hotel.name}</h2>
                            <p className="whitespace-pre-line line-clamp-3">{hotel.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1.5">
                                    <Map />
                                    {hotel.city}, {hotel.country}
                                </div>
                                <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1.5">
                                    <Building />
                                    {hotel.type}
                                </div>
                                <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1.5">
                                    <Currency />
                                    ${hotel.pricePerNight} per night
                                </div>
                                <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1.5">
                                    <Currency />
                                    {hotel.adultCount} adults, {hotel.childCount} children
                                </div>
                                <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-1.5">
                                    <Star />
                                    {hotel.starRating} Star Ratings
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Link to={`/edit-hotel/${hotel._id}`} className="flex bg-blue-600 rounded-md text-white text-xl font-bold p-2 px-3 duration-300 hover:bg-blue-500 ">View Details</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </AppContainer>
    </div>
  )
}

export default MyHotels