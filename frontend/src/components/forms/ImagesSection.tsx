import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { cn } from "../../lib/cn";

const ImagesSection = () => {
    const { register, formState: {errors}} = useFormContext<HotelFormData>();

  return (
<>
    <h1 className="text-3xl font-bold col-span-5">Upload Images</h1>

    <section className="w-full grid grid-cols-1 gap-5">
        <label className={cn("flex gap-2 text-sm rounded-full px-4 py-2 cursor-pointer duration-300")}>
                <input 
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalImageLength = imageFiles.length;
                        if(totalImageLength === 0) {
                             return "At minimum of 1 image should be uploaded"
                        } else if(totalImageLength > 6 ) {
                            return "Total number of images should not be more than 6"
                        }
                        return true;
                    }
                 })}
                className="w-full text-gray-700 font-normal"
                />
                {/* <span></span> */}
        </label>
        {
            errors.imageFiles && <span className="text-xs text-red-500">{errors.imageFiles.message}</span>
        }
    </section>

    </>
  )
}

export default ImagesSection