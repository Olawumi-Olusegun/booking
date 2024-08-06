import { useMutation } from 'react-query'
import ManageHotelForm from '../components/forms/ManageHotelForm'
import { useAppContext } from '../context/AppContext';
import * as apiClient from "./../api/api-client";


const AddHotels = () => {

  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel,{
    onSuccess(data, variables, context) {
      console.log(data, variables, context)
      if(data) {
        showToast({ message: "Hotel saved", type: "success" });
      }
    },
    onError(error: Error) {
      showToast({ message: error.message, type: "error" });
    }
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
}

export default AddHotels