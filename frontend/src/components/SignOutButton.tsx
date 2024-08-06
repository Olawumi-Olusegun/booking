import React from "react"
import { cn } from "../lib/cn"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "./../api/api-client";
import { useAppContext } from "../context/AppContext";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface SignOutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton = ({className, children, ...props}: SignOutButtonProps) => {

    const queryClient = useQueryClient();

    const { showToast } = useAppContext();

    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signout, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({ message: "Logged out", type: "success"})
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "success"})
        }
    })

  return (
    <>
        <button 
        onClick={() => mutation.mutate()}
        type="button"
        disabled={mutation.isLoading}
        className={cn("flex bg-white rounded items-center text-blue-600 px-6 py-2 font-bold hover:bg-gray-200 duration-300", className)} {...props}>
            { mutation.isLoading && <Loader2 className="h-4 w-4 animate-spin" /> }
            <span>Sign Out</span>
        </button>
    </>
  )
}

export default SignOutButton