import { useQuery } from "react-query";
import React, { useState } from "react";
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from "./../api/api-client";
import AppContainer from "../components/AppContainer";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/pagination/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";

const Search = () => {

    const search = useSearchContext();

    const [page, setPage] = useState(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
    }

    const {data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStar) => event.target.checked 
                                    ? [...prevStar, starRating]
                                    : prevStar.filter((star) => star !== starRating))
    }

  return (
    <AppContainer >
        <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5 my-12">
            <div className="rounded-lg bg-white border border-slate-300 h-fit sticky top-10">
                <div className="space-y-5 py-5">
                    <h2 className="text-lg font-semibold border-b border-slate-300 p-5">Filter By:</h2>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total || 0} Hotels found
                        {search.destination ? ` in ${search.destination}` : ``}
                    </span>
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
  )
}

export default Search