import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext"
import { Hotel } from "lucide-react";
import AppContainer from "./AppContainer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

    const search = useSearchContext();

    const navigate = useNavigate();

    const [destination, setDestination] = useState(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState(search.adultCount);
    const [childCount, setChildCount] = useState(search.childCount);
    const [hotelId] = useState(search.hotelId);

    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setFullYear(maxDate.getFullYear() + 1);


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount, hotelId);
        navigate("/search")
    }

    const handleClearSearchForm = () => { }


  return (
    <AppContainer>
        <form onSubmit={handleSubmit} className="-mt-14 translate-y-[14] p-3 bg-yellow-500 rounded-md shadow-sm grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 items-center gap-2">
            <div className="flex flex-row items-center flex-1 bg-white rounded p-2 gap-1.5">
                <Hotel size={25} />
                <input 
                value={destination} 
                onChange={(event) => setDestination(event.target.value)} 
                type="text" 
                placeholder="Search by city or country" className="w-full text-md focus:outline-none" 
                />
            </div>

            <div className="flex bg-white px-2 py-1 gap-2 rounded">
                <label htmlFor="adultCount" className="flex items-center w-full text-sm">
                    Adults:
                    <input 
                    type="number"
                    value={adultCount}
                    min={1} 
                    max={20} 
                    onChange={(event) => setAdultCount(parseInt(event.target.value))}
                    className="w-full p-1 focus:outline-none font-bold text-center" 
                    />
                </label>

                <label htmlFor="adultCount" className="flex items-center w-full text-sm">
                    Children:
                    <input 
                    type="number"
                    value={childCount}
                    min={0} 
                    max={20} 
                    onChange={(event) => setChildCount(parseInt(event.target.value))}
                    className="w-full p-1 focus:outline-none font-bold text-center" 
                    />
                </label>
                
            </div>
           
            <div className="flex bg-white px-2 rounded py-1 gap-2">
                <DatePicker 
                selected={checkIn} 
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
                onChange={(date) => setCheckIn(date as Date)} 
                className="min-w-full bg-white p-1 focus:outline-none"
                wrapperClassName="min-w-full"
                />
            </div>
            <div className="flex bg-white px-2 rounded py-1 gap-2">
                <DatePicker 
                selected={checkOut} 
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-out Date"
                onChange={(date) => setCheckOut(date as Date)} 
                className="min-w-full bg-white p-1 focus:outline-none"
                 wrapperClassName="min-w-full"
                />
            </div>

            <div className="flex gap-1">
                <button className="w-2/3 bg-blue-600 duration-300 rounded-md text-white h-full p-2 font-semibold  text-base hover:bg-blue-500">
                    Search
                </button>
                <button onClick={handleClearSearchForm} type="button" className="w-1/3 bg-red-600 duration-300 rounded-md text-white h-full p-2 font-semibold text-base hover:bg-red-500">
                    Clear
                </button>
            </div>
            
        </form>
    </AppContainer>
  )
}

export default SearchBar