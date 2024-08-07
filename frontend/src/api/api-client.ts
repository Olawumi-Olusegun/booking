import { config } from "../constants";
import { SignInFormData } from "../pages/Signin";
import { SignUpFormData } from "../pages/Signup";
import { HotelType } from "../types";

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
        throw new Error(responseBody.message);
    }

    return responseBody;
}


export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${config.BASE_URL}/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });


    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${config.BASE_URL}/my-hotels`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody.hotels;
}

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${config.BASE_URL}/my-hotels/${hotelId}`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody.hotel;
}

export const updateMyHotelById = async (hotelFormData: FormData): Promise<HotelType> => {
    
    const hotelId = hotelFormData.get("hotelId");

    const response = await fetch(`${config.BASE_URL}/my-hotels/${hotelId}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData,
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody.hotel;
}