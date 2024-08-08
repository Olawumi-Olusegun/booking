
import { Star } from 'lucide-react';
import { HotelType } from '../types'
import { Link } from 'react-router-dom';

type SearchResultCardProps = {
    hotel: HotelType;
}

const SearchResultCard = ({hotel}:SearchResultCardProps) => {
  return (
    <>
        <div className='grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8 '>
            <div className="w-full h-[300px]">
                <img 
                src={hotel.imageUrls[0]} 
                alt={hotel.name} 
                className='h-full w-full object-cover object-center rounded-md' 
                />
            </div>
            <div className="grid grid-rows-[auto_2fr_auto]">
                <div className="w-full">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center">
                            {
                            Array.from({ length: hotel.starRating}).map((_, index) => (
                                <Star key={`star_${index}`} className='fill-yellow-400 text-yellow-400 h-4 w-4' />
                            ))
                            }
                        </span>
                        <span className='text-sm'>{hotel.type}</span>
                    </div>
                    <Link 
                        to={`/detail/${hotel._id}`} 
                        className="text-2xl font-semibold cursor-pointe text-black/80">
                        {hotel.name}
                    </Link>
                </div>
                <div className="w-full flex flex-col">
                    <div className="line-clamp-4 text-neutral-600 my-2 ">{hotel.description}</div>
                    <span className="font-bold mt-auto py-5">${hotel.pricePerNight} per night</span>
                </div>

                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex gap-1 items-center">
                        {
                            hotel.facilities.slice(0, 3).map((facility, index) => (
                                <span key={`facility-${index}`} className="bg-slate-200 text-neutral-600 p-2 rounded-md text-xs whitespace-nowrap ">
                                    {facility}
                                </span>
                            ))
                        }
                        <span className="text-sm text-neutral-600">
                            {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3 } more`}
                        </span>
                    </div>

                    

                    <div className="flex flex-col items-end gap-3">
                        
                        
                        <Link 
                        to={`/detail/${hotel._id}`} 
                        className="bg-blue-600 hover:bg-blue-500 text-white h-full p-1.5 px-3 rounded-md duration-300 font-semibold text-base max-w-fit"
                        >
                            View More
                        </Link>

                    </div>

                </div>
            </div>
        </div>


    
    </>
  )
}

export default SearchResultCard