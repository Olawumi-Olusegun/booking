import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";


const GuestSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
  return (
<>
    <h1 className="text-3xl font-bold col-span-5">Guest</h1>

    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-200 rounded-md px-5 py-8">
    
        <div className="flex flex-col gap-1.5">
            <label htmlFor="adultCount" className="text-gray-700 text-sm font-semibold">Adults:</label>
            <input 
            type="number"
            min={1}
            id="adultCount" 
            {...register("adultCount", { required: "Adult count is required"})}
            placeholder="" 
            className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
            />
        {
            errors.adultCount && <span className="text-xs text-red-500">{errors.adultCount.message}</span>
        }
        </div>
    
        <div className="flex flex-col gap-1.5">
            <label htmlFor="childCount" className="text-gray-700 text-sm font-semibold">Children:</label>
            <input 
            type="number" 
            id="childCount" 
            min={0}
            {...register("childCount", { required: "Child count is required"})}
            placeholder="" 
            className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
            />
        {
            errors.childCount && <span className="text-xs text-red-500">{errors.childCount.message}</span>
        }
        </div>
    </section>
    </>
  )
}

export default GuestSection