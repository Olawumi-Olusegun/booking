import { hotelTypes } from "../constants/hotel-options-config";

type HotelTypesFilterProps = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypesFilter = ({selectedHotelTypes, onChange}: HotelTypesFilterProps) => {
  return (
    <div className="border-b border-slate-300 px-5 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
        {
            hotelTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                    <input 
                    type="checkbox" 
                    className="rounded" 
                    value={type}
                    onChange={onChange}
                    checked={selectedHotelTypes.includes(type)}
                    />
                    <span>{type}</span>
                </label>
            ))
        }
    </div>
  )
}

export default HotelTypesFilter