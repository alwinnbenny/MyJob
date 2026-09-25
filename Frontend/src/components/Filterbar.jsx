import { X, ChevronDown, Grid2X2, List } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const FilterBar = () => {
 const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort") || "latest";

  const handleSortChange = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <div className="w-full bg-white py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          {/* <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700">
            <span>Design</span>
            <button className="cursor-pointer">
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700">
            <span>New York</span>
            <button className="cursor-pointer">
              <X size={16} />
            </button>
          </div> */}
        </div>

        <div className="flex items-center gap-3">

        
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="appearance-none h-10 pl-4 pr-10 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white shadow-sm cursor-pointer
                          focus:outline-none focus:ring-2 focus:ring-[#0A65CC]/20
                           transition-all duration-200"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ChevronDown size={15} className="text-gray-400" />
              </div>
            </div>
          </div>

         
          {/* <div className="flex items-center justify-between w-44 h-12 px-4 border border-gray-300 rounded-md cursor-pointer">
            <span className="text-gray-600">12 per page</span>
            <ChevronDown size={18} className="text-gray-500" />
          </div>

         
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-12">
            <button className="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
              <Grid2X2 size={18} />
            </button>

            <button className="w-12 h-full flex items-center justify-center bg-gray-100 text-gray-900 cursor-pointer">
              <List size={18} />
            </button>
          </div> */}

        </div>
      </div>
    </div>
  );
};