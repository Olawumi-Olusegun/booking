import { config } from "../constants";
import { SignInFormData } from "../pages/Signin";
import { SignUpFormData } from "../pages/Signup";


export const signup = async (formData: SignUpFormData) => {
    const response = await fetch(`${config.BASE_URL}/auth/sign-up`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message)
    }

    return responseBody;

}

export const signin = async (formData: SignInFormData) => {
    const response = await fetch(`${config.BASE_URL}/auth/sign-in`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message)
    }

    return responseBody;
}

export const signout = async () => {
    const response = await fetch(`${config.BASE_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message)
    }
    
    return responseBody;
}

export const validateToken = async () => {
    const response = await fetch(`${config.BASE_URL}/auth/validate-token`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message)
    }

}