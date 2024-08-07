
type StarRatingFilterProps = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StarRatingFilter = ({selectedStars, onChange}: StarRatingFilterProps) => {
  return (
    <div className="border-b border-slate-300 px-5 pb-5">
        <h4 className="text-md font-semibold mb-2">Property Rating</h4>
        {
            ["5", "4", "3", "2", "1"].map((star) => (
                <label key={star} className="flex items-center space-x-2">
                    <input 
                    type="checkbox" 
                    className="rounded" 
                    value={star}
                    onChange={onChange}
                    checked={selectedStars.includes(star)}
                    />
                    <span>{star} Stars</span>
                </label>
            ))
        }
    </div>
  )
}

export default StarRatingFilter