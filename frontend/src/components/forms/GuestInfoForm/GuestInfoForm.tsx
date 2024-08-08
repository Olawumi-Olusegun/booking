import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../../context/SearchContext";
import { useAppContext } from "../../../context/AppContext";
import { Loader2 } from "lucide-react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

type GuestInfoFormProps = {
    hotelId: string;
    pricePerNight: number;
}

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
}

const GuestInfoForm = ({hotelId, pricePerNight}: GuestInfoFormProps) => {

    const search = useSearchContext();
    const {isLoggedIn} = useAppContext();

    const navigate = useNavigate();
    const location = useLocation();

    const mutation = useMutation({});

    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        }
    });
   

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const handleSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate("/sign-in", { state: { from: location }});
    }

    const handleOnSubmitClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    }


  return (
    <div className="flex flex-col p-4 bg-blue-100 gap-4 rounded">
        <h3 className="text-md font-bold">${pricePerNight}</h3>
        <form onSubmit={isLoggedIn ? handleSubmit(handleOnSubmitClick) : handleSubmit(handleSignInClick) } className="w-full grid grid-cols-1 gap-4 items-center">
            <div className="w-full">
            <DatePicker
                required
                selected={checkIn} 
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-in Date"
                onChange={(date) => setValue("checkIn", date as Date)} 
                className="w-full bg-white p-1 focus:outline-none"
                 wrapperClassName="min-w-full"
                />
            </div>
            <div className="w-full">
            <DatePicker
                required
                selected={checkOut} 
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                placeholderText="Check-out Date"
                onChange={(date) => setValue("checkOut", date as Date)} 
                className="min-w-full bg-white p-1 focus:outline-none"
                 wrapperClassName="min-w-full"
                />
            </div>

            <div className="flex bg-white px-2 py-1 gap-2">
                <label htmlFor="adultCount" className="flex items-center w-full">
                    Adults:
                    <input 
                    type="number"
                    min={1} 
                    max={20}
                    {...register("adultCount", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "There must be at least one adult"
                        },
                        valueAsNumber: true
                    })}
                    className="w-full p-1 focus:outline-none font-bold text-center" 
                    />
                </label>

                <label htmlFor="adultCount" className="flex items-center w-full">
                    Children:
                    <input 
                    type="number"
                    min={0} 
                    max={20} 
                    {...register("childCount", {
                        valueAsNumber: true
                    })}
                    className="w-full p-1 focus:outline-none font-bold text-center" 
                    />
                </label>

                {
                    errors.adultCount && <span className="text-xs text-red-500">{errors.adultCount.message}</span>
                }
                
            </div>

            {
                isLoggedIn ? (
                    <button disabled={mutation.isLoading} className="flex items-center justify-center gap-1.5 px-6 py-2 bg-blue-700 text-white hover:bg-blue-600 duration-300 rounded-md">
                        Book Now
                    </button>
                )
                : (
                    <button type="submit" disabled={mutation.isLoading} className="flex items-center justify-center gap-1.5 px-6 py-2 bg-blue-700 text-white hover:bg-blue-600 duration-300 rounded-md  ">
                    {mutation.isLoading && <Loader2 className="w-4 h-4 animate-spin" />} 
                        <span>Sign in to Book</span>
                    </button>
                )
            }

        </form>
    </div>
  )
}

export default GuestInfoForm