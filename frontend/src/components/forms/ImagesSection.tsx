import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { cn } from "../../lib/cn";
import React from "react";

const ImagesSection = () => {

    const { register, watch, setValue, formState: {errors}} = useFormContext<HotelFormData>();

    const existingImageUrls = watch("imageUrls");

    const handleDeleteImage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        event.preventDefault();
        if(existingImageUrls) {
            const newImages = existingImageUrls.filter((url) => url !== imageUrl)
            setValue("imageUrls", newImages);
        }
    }

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
                        const totalImageLength = imageFiles.length + existingImageUrls?.length || 0;
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

        {
            existingImageUrls && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 my-5 ">
                    {
                        existingImageUrls.map((imageUrl, index) => (
                            <div key={`image_${index}`} className="relative group h-28 rounded-md overflow-hidden ">
                                <img src={imageUrl} className="min-h-full object-cover" />
                                <button onClick={(event) => handleDeleteImage(event, imageUrl)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white p-3 duration-300">Delete</button>
                            </div>
                        ))
                    }
                </div>
            )
        }        
    </section>

    </>
  )
}

export default ImagesSection