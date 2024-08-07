import React, { createContext, useContext, useState } from "react";


type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues: (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number, hotelId?: string) => void;
}

const SearchContext = createContext<SearchContext | undefined>(undefined);


export const SearchContextProvider = ({children}: {children: React.ReactNode}) => {

    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [hotelId, setHotelId] = useState("");
    

    const saveSearchValues = (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number, hotelId?: string,) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if(hotelId) {
            setHotelId(hotelId)
        }
    }


    return <SearchContext.Provider value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        saveSearchValues,
        hotelId,
    }}>
        {children}
    </SearchContext.Provider>
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
}