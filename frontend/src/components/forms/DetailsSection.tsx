import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";


const DetailsSection = () => {

    const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        <h1 className="text-2xl font-bold mb-3 col-span-2">Add Hotel</h1>
        <div className="flex flex-col gap-1.5 col-span-2">
           <label htmlFor="name" className="text-gray-700 text-sm font-semibold">Name:</label>
                <input 
                type="text" 
                id="name" 
                {...register("name", { required: "Name is required"})}
                placeholder="" 
                className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
                />
            {
                errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>
            }
        </div>

        <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                <label htmlFor="city" className="text-gray-700 text-sm font-semibold">City:</label>
                <input
                type="text"
                id="city"
                {...register("city", { required: "City is required"})}
                placeholder=""
                className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400"
                />
            {
                errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>
            }
        </div>

        <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                    <label htmlFor="country" className="text-gray-700 text-sm font-semibold">Country:</label>
                    <input 
                    type="text" 
                    id="country" 
                    {...register("country", { required: "Country is required"})}
                    placeholder="" 
                    className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
                    />
                {
                    errors.country && <span className="text-xs text-red-500">{errors.country.message}</span>
                }
        </div>

        <div className="flex flex-col gap-1.5 col-span-2">
                    <label htmlFor="description" className="text-gray-700 text-sm font-semibold">Description:</label>
                    <textarea 
                    id="description" 
                    {...register("description", { required: "Description is required"})}
                    placeholder="" 
                    rows={10}
                    className="border resize-y focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
                    />
                {
                    errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>
                }
        </div>

        <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                    <label htmlFor="pricePerNight" className="text-gray-700 text-sm font-semibold">Price Per Night:</label>
                    <input 
                    type="number" 
                    min={1}
                    id="pricePerNight" 
                    {...register("pricePerNight", { required: "Price Per Night is required"})}
                    placeholder="" 
                    className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
                    />
                {
                    errors.pricePerNight && <span className="text-xs text-red-500">{errors.pricePerNight.message}</span>
                }
        </div>

        <div className="flex flex-col gap-1.5 col-span-2 md:col-span-1">
                    <label htmlFor="starRating" className="text-gray-700 text-sm font-semibold">Star Rating:</label>
                    
                    <select 
                    id="starRating"
                    {...register("starRating", { required: "Star Rating is required"})}
                    className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" >
                      <option value={""} className="text-sm font-bold">Select Rating</option>
                      {
                        [1,2,3,4,5].map((num) => (
                            <option key={num} value={num} className="text-sm font-semibold">{num}</option>
                        ))
                      }
                    </select>
                {
                    errors.starRating && <span className="text-xs text-red-500">{errors.starRating.message}</span>
                }
        </div>
    </div>
  )
}

export default DetailsSection