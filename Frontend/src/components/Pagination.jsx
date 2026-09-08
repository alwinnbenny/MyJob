import { ChevronLeft } from "lucide-react"

export const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    return(
    <div className="flex items-center justify-center gap-3 mt-8">
{/* Previous */}
        <button onClick={()=> setCurrentPage(currentPage - 1)}
            disabled = {currentPage === 1 }
            className ="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center
                   hover:bg-blue-600 hover:text-white transition
                   disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-400 cursor-pointer">
        <ChevronLeft size ={20}/>

 </button>
 {/* Page Numbers */}

 {Array.from({length : totalPages},(_,index) =>{
    const page = index + 1;
 }

 )}
    </div>
    )
}