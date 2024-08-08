import { BookingFormData } from "../components/forms/BookingForm/BookingForm";
import { config } from "../constants";
import { SignInFormData } from "../pages/Signin";
import { SignUpFormData } from "../pages/Signup";
import { HotelSearchResponse, HotelType, PaymentIntentResponse, UserType } from "../types";

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
}

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

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    
    const queryParams = new URLSearchParams();

    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
    
    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));

    searchParams.types?.forEach((type) => queryParams.append("types", type));

    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(`${config.BASE_URL}/hotels/search?${queryParams}`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}


export const getHotelById = async (hotelId: string): Promise<HotelType> => {
    
    const response = await fetch(`${config.BASE_URL}/hotels/${hotelId}`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody.hotel;
}

export const fetchCurrentlyLoggedInUser = async (): Promise<UserType> => {
    
    const response = await fetch(`${config.BASE_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody.user;
}

export const createPaymentIntent = async (hotelId: string, numberOfNights: number): Promise<PaymentIntentResponse>  => {
    const response = await fetch(`${config.BASE_URL}/hotels/${hotelId}/bookings/payment-intent`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({numberOfNights}),
        headers: {
            "Content-Type": "application/json",
        }
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const createBooking = async (formData: BookingFormData)  => {
    
    const response = await fetch(`${config.BASE_URL}/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        }
    });

    const responseBody = await response.json();

    if(!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}
