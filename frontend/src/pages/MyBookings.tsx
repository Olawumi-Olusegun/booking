import { useQuery } from "react-query"
import * as apiClient from "./../api/api-client"
import AppContainer from "../components/AppContainer"

const MyBookings = () => {

    const { data: hotels, isLoading } = useQuery("fetchMyBookings", apiClient.fetchMyBookings)

    console.log(hotels)

    if(isLoading) {
        return <div className="p-6 text-center">
            <span>Loading...</span>
        </div>
    }

    if(!hotels || hotels.length === 0) {
        return <div className="p-6 text-center">
            <span>No bookigs found</span>
        </div>
    }

  return (
    <>
        <AppContainer>
            <div className="space-y-5 my-12">
                <h2 className="text-2xl font-bold text-neutral-700">My Bookings</h2>
                {
                    hotels.map((hotel) => (
                        <div key={hotel._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-md p-6 gap-5">
                            <div className="lg:w-full lg:h-[250px] rounded-md">
                                <img 
                                src={hotel.imageUrls[0]} 
                                alt={`hotel-image-${hotel._id}`}
                                className="object-cover object-center w-full h-full rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                                <div className="text-2xl font-bold">
                                    {hotel.name}
                                    <div className="text-xs font-normal">
                                        {hotel.city}, {hotel.country}
                                    </div>
                                </div>
                                    {hotel.bookings.map((booking) => (
                                        <div key={booking._id} className="">
                                            <div className="flex items-center gap-1.5">
                                                <strong>Dates:</strong>
                                                <span>
                                                    {new Date(booking.checkIn).toDateString()} - {" "} 
                                                    {new Date(booking.checkOut).toDateString()} 
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <strong>Guest:</strong>
                                                <span>
                                                    {booking.adultCount} {`adult${booking.adultCount > 1 ? "s": ""}`} -  {" "}
                                                    {booking.childCount} {` ${booking.childCount > 1 ? "children": "child"}`}
                                                </span>
                                            </div>
                                        </div>
                                    )) }
                            </div>
                        </div>
                    ))
                }
            </div>
        </AppContainer>
    </>
  )
}

export default MyBookings