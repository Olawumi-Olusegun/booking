import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { Loader2 } from "lucide-react";

export type HotelFormData = {
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList,
  lastUpdated: Date;
  imageUrls: string[];
}

type ManageHotelFormProps = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
}

const ManageHotelForm = ({ onSave, isLoading }: ManageHotelFormProps) => {

  const formMethods = useForm<HotelFormData>();

  const { handleSubmit } = formMethods

  const handleFormSubmit = handleSubmit((formDataJson: HotelFormData) => {

    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    });

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);

  });

  return (
    <div className="w-full p-5 md:max-w-5xl mx-auto mb-12">
      <FormProvider {...formMethods}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">

            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestSection />
            <ImagesSection />

            <div className="flex items-center justify-end">
              <button disabled={isLoading} type="submit" className="flex items-center gap-1.5 px-6 py-2 bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500 text-white duration-300 rounded-md font-bold hover:bg-blue-500 ">
                {isLoading && <Loader2 className="animate-spin h-4 w-4" /> }
                <span> {isLoading ? "Saving..." : "Save"} </span>
              </button>
            </div>

        </form>
      </FormProvider>
    </div>
  )
}

export default ManageHotelForm