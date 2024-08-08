
type PriceFilterProps = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
}

const PriceFilter = ({selectedPrice, onChange}: PriceFilterProps) => {
  return (
    <div className="border-b border-slate-300 px-5 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
        <select 
        value={selectedPrice} 
        onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}
        className="p-2 border rounded-md w-full"
        >
            <option value="">Select Max Price</option>
            {
                [50, 100, 200, 300, 500].map((price) => (
                    <option key={price} value={price}>{price}</option>
                ))
            }
        </select>
    </div>
  )
}

export default PriceFilter