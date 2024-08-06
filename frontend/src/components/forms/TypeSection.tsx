import { useFormContext } from "react-hook-form"
import { hotelTypes } from "../../constants/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm"
import { cn } from "../../lib/cn";


const TypeSection = () => {
    const { register, watch, formState: {errors}} = useFormContext<HotelFormData>();

    const typeWatch = watch("type");
    
  return (
    <>
    <h1 className="text-3xl font-bold col-span-5">Types</h1>

    <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {
            hotelTypes.map((type) => (
                <label key={type} className={cn("flex items-center hover:bg-blue-300 justify-center gap-2 text-sm rounded-full px-4 py-2 cursor-pointer duration-300", typeWatch === type ? " bg-blue-300 font-semibold" : "bg-gray-200")}>
                    <input
                    type="radio"
                    value={type} {...register("type", { required: "This field is required" })} 
                    className="hidden"
                    />
                    <span>{type}</span>
                </label>
            ))
        }
        {
            errors.type && <span className="text-xs text-red-500">{errors.type.message}</span>
        }
    </section>

    </>
  )
}

export default TypeSection