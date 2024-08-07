import React from 'react'
import { useMutation, useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import * as apiClient from "./../api/api-client";
import ManageHotelForm from '../components/forms/ManageHotelForm';
import { useAppContext } from '../context/AppContext';

const EditHotel = () => {

    const {hotelId } = useParams();

    const { showToast } = useAppContext();

    if(!hotelId) {
        return <Navigate to={"/my-hotels"} />
    }

    const {data: hotel} = useQuery("fetchMyHotelById", () => apiClient.fetchMyHotelById(hotelId || ""), {
        enabled: !!hotelId,
    });

    const {mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
            showToast({ message: "Hotel updated", type: "success" });
        },
        onError: (error: Error) => {
          showToast({ message: error.message, type: "error" });
        }
      })

      const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
      }


  return (
    <div className='my-12 '>
        <ManageHotelForm isLoading={isLoading} hotel={hotel} onSave={handleSave}  />
    </div>
  )
}

export default EditHotel