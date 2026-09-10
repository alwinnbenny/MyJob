import { X, ChevronDown, Grid2X2, List } from "lucide-react";

export const FilterBar = () => {
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

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center justify-between w-44 h-12 px-4 border border-gray-300 rounded-md cursor-pointer">
            <span className="text-gray-600">Latest</span>
            <ChevronDown size={18} className="text-gray-500" />
          </div>

         
          <div className="flex items-center justify-between w-44 h-12 px-4 border border-gray-300 rounded-md cursor-pointer">
            <span className="text-gray-600">12 per page</span>
            <ChevronDown size={18} className="text-gray-500" />
          </div>

          {/* Grid */}
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-12">
            <button className="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
              <Grid2X2 size={18} />
            </button>

            <button className="w-12 h-full flex items-center justify-center bg-gray-100 text-gray-900 cursor-pointer">
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};