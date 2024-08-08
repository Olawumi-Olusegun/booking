import { hotelFacilities } from "../constants/hotel-options-config";

type FacilitiesFilterProps = {
    selectedHotelFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FacilitiesFilter = ({selectedHotelFacilities: selectedHotelTypes, onChange}: FacilitiesFilterProps) => {
  return (
    <div className="border-b border-slate-300 px-5 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
        {
            hotelFacilities.map((facility) => (
                <label key={facility} className="flex items-center space-x-2">
                    <input 
                    type="checkbox" 
                    className="rounded" 
                    value={facility}
                    onChange={onChange}
                    checked={selectedHotelTypes.includes(facility)}
                    />
                    <span>{facility}</span>
                </label>
            ))
        }
    </div>
  )
}

export default FacilitiesFilter