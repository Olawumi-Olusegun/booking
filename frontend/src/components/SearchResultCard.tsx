
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
                className='h-full w-full object-cover object-center' 
                />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div className="w-full">
                    <div className="flex items-center">
                        <span className="flex">
                            {
                            Array.from({ length: hotel.starRating}).map((_, index) => (
                                <Star key={`star_${index}`} className='fill-yellow-400' />
                            ))
                            }
                        </span>
                        <span className='ml-1 text-sm'>{hotel.type}</span>
                    </div>
                    <Link 
                        to={`/detail/${hotel._id}`} 
                        className="text-2xl font-bold cursor-pointer">
                        {hotel.name}
                    </Link>
                </div>
                <div className="w-full">
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>
                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex gap-1 items-center">
                        {
                            hotel.facilities.slice(0, 3).map((facility, index) => (
                                <span key={`facility-${index}`} className="bg-slate-200 p-2 rounded-md text-xs whitespace-nowrap ">
                                    {facility}
                                </span>
                            ))
                        }
                        <span className="text-sm">
                            {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3 } more`}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <span className="font-bold">${hotel.pricePerNight} per night</span>
                        <Link 
                        to={`/detail/${hotel._id}`} 
                        className="bg-blue-600 hover:bg-blue-500 text-white h-full p-1.5 px-3 rounded-md duration-300 font-semibold text-lg max-w-fit"
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