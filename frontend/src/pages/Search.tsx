import { useQuery } from "react-query";
import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from "./../api/api-client";
import AppContainer from "../components/AppContainer";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/pagination/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypes";
import FacilitiesFilter from "../components/FaciltiesFilter";
import PriceFilter from "../components/PriceFilter";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

const Search = () => {

    const search = useSearchContext();

    const [page, setPage] = useState(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>(undefined)
    const [sortOption, setSortOption] = useState<string | undefined>(undefined)

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectHotelTypes,
        facilities: selectedHotelFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    }

    const {data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStar) => event.target.checked 
                                    ? [...prevStar, starRating]
                                    : prevStar.filter((star) => star !== starRating))
    }

    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;
        setSelectedHotelTypes((prevHotelTypes) => event.target.checked 
                                    ? [...prevHotelTypes, hotelType]
                                    : prevHotelTypes.filter((hotelTypeItem) => hotelTypeItem !== hotelType))
    }

    const handleHotelFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelFacility = event.target.value;
        setSelectedHotelFacilities((prevHotelFacilities) => event.target.checked 
                                    ? [...prevHotelFacilities, hotelFacility]
                                    : prevHotelFacilities.filter((hotelTypeItem) => hotelTypeItem !== hotelFacility))
    }

    const handleSelectPriceChange = (value?: number) => {
        setSelectedPrice(value)
    }

    

  return (
    <>
       <Hero />
        <div className="w-full">
          <SearchBar />
        </div>
    
    <AppContainer>
        <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5 my-12">
            <div className="rounded-lg bg-white border border-slate-300 h-fit sticky top-10">
                <div className="space-y-5 py-5">
                    <h2 className="text-lg font-semibold border-b border-slate-300 p-5 pt-0">Filter By:</h2>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
                    <HotelTypesFilter selectedHotelTypes={selectHotelTypes} onChange={handleHotelTypeChange} />
                    <FacilitiesFilter selectedHotelFacilities={selectedHotelFacilities} onChange={handleHotelFacilityChange} />
                    <PriceFilter selectedPrice={selectedPrice} onChange={handleSelectPriceChange} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total || 0} Hotels found
                        {search.destination ? ` in ${search.destination}` : ``}
                    </span>
                    <select 
                    name="" id="" 
                    value={sortOption}
                    className="p-2 border rounded-md"
                    onChange={(event) => setSortOption(event.target.value)}>
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                        <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {
                    hotelData?.data.map((hotel) => <SearchResultCard key={hotel._id} hotel={hotel} /> )
                }

                <Pagination
                    page={hotelData?.pagination.page || 1} 
                    pages={hotelData?.pagination.pages || 1} 
                    onPageChange={(page) => setPage(page)} 
                />
            </div>
        </div>

    </AppContainer>
    </>
  )
}

export default Search