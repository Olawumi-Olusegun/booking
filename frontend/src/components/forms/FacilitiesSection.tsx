import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { cn } from "../../lib/cn";
import { hotelFacilities } from "../../constants/hotel-options-config";


const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
<>
    <h1 className="text-3xl font-bold col-span-5">Facilities</h1>

    <section className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {
            hotelFacilities.map((facility) => (
                <label key={facility} className={cn("flex items-center  gap-1 text-sm rounded-full cursor-pointer duration-300",)}>
                    <input 
                    type="checkbox" 
                    value={facility} {...register("facilities", { 
                        validate: (facilities) => {
                            if(facilities.length > 0) {
                                return true;
                            } else {
                                return "At least one facility is required"
                            }
                        }
                     })} 
                    className=""
                    />
                    <span>{facility}</span>
                </label>
            ))
        }
        {  errors.facilities && <span className="text-xs text-red-500 col-span-5">{errors.facilities.message}</span>
        }
    </section>
    </>
  )
}

export default FacilitiesSection