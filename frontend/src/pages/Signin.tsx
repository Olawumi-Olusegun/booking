import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as apiClient from "./../api/api-client";
import { useAppContext } from "../context/AppContext";
import { Loader2 } from "lucide-react";


export type SignInFormData = {
    password: string;
    email: string;
}

const Signin = () => {

    const { showToast } = useAppContext();

    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors  } } = useForm<SignInFormData>();

    const navigate = useNavigate();
    const location = useLocation();

    const mutation = useMutation(apiClient.signin, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Signin successful", type: "success" });
            reset();
            navigate(location.state?.from.pathname || "/");
        },
        onError: (error: Error) => {
            console.log(error)
            showToast({ message: error.message, type: "error" });
        }
    });

    const handleSignIn = handleSubmit ((data) => {
        mutation.mutate(data)
    });


  return (
    <section className="flex flex-col mt-12 justify-center gap-5 w-full md:w-[80%] lg:w-[60%] mx-auto p-5">
        <h2 className="font-bold text-2xl text-neutral-700">Signin to your account!</h2>
        <form onSubmit={handleSignIn} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 col-span-2">
                    <label htmlFor="email" className="text-gray-700 text-sm font-semibold">Email:</label>
                    <input 
                    type="email" 
                    id="email" 
                    {...register("email", { required: "Email is required"})}
                    placeholder="johndoe@mail.com" 
                    className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
                    />
                {
                        errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>
                    }
            </div>

            <div className="flex flex-col gap-1.5 col-span-2">
                <label htmlFor="password" className="text-gray-700 text-sm font-semibold">Password:</label>
                <input 
                type="password" 
                id="password" 
                {...register("password", 
                    { required: "Password is required", 
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                placeholder="*********" 
                className="border focus-visible:outline-blue-600 rounded w-full py-1 px-2 font-normal placeholder:text-neutral-400" 
                />
                {
                    errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>
                }
            </div>
            

            <div className="flex items-center justify-between col-span-2 ">
                <Link to={"/sign-up"} className="text-blue-700 hover:underline duration-300">Don{"'"}t have an account?</Link>
               
               <button type="submit" disabled={mutation.isLoading} className="flex items-center gap-1.5 px-3 py-2 bg-blue-700 text-white hover:bg-blue-600 duration-300 rounded-md  ">
                {mutation.isLoading && <Loader2 className="w-4 h-4 animate-spin" />} 
                    <span>SignIn</span>
                </button>
            </div>
        </form>
    </section>
  )
}

export default Signin