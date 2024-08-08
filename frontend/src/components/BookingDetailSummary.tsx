import { HotelType } from "../types";

type BookingDetailSummaryProps = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType;
}

const BookingDetailSummary = ({checkIn, checkOut, adultCount, childCount, numberOfNights, hotel}: BookingDetailSummaryProps) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
        
        <h2 className="text-2xl font-semibold my-2">Your Booking Details</h2>
        
        <div className="border-b py-2 space-x-1">
            <strong>Location:</strong>
            <div>{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
        </div>
        
        <div className="flex items-center justify-between">
            <strong>Check-In:</strong>
            <div className="">{checkIn.toDateString()}</div>
        </div>

        <div className="flex items-center justify-between">
            <strong>Check-Out:</strong>
            <div className="">{checkOut.toDateString()}</div>
        </div>

        <div className="border-y py-2">
            <strong>Total length of stay:</strong>
            <div className="">{numberOfNights} {`night${numberOfNights > 1 ? "s" : ""}`} </div>
        </div>

        <div className="border-y py-2">
            <strong>Guests:</strong>
            <div className="">
                {adultCount} {`adult${adultCount > 1 ? "s" : ""}`}, {" "} 
                {childCount} {`${childCount > 1 ? "children" : "child"}`} 
            </div>
        </div>

    </div>
  )
}

export default BookingDetailSummary