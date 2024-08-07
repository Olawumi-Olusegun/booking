import { cn } from "../../lib/cn";

type PaginationProps = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({page, pages, onPageChange}: PaginationProps) => {
    const pageNumber = [];
    
    for(let i = 1; i < pages; i++) {
        pageNumber.push(i)
    }

  return (
    <div className="w-full">
        <ul className="flex items-center justify-center  gap-1.5 w-full">
            {
                pageNumber.map((num) => (
                    <li
                    key={num} 
                    className={cn(`min-w-10 min-h-10 hover:bg-slate-100 duration-300 flex items-center justify-center rounded-full text-black/80 border border-slate-300 `, page === num ? "bg-gray-200" : "")}>
                        <button className="rounded-full w-full h-full px-2 py-1" onClick={() => onPageChange(num)}>{num}</button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Pagination