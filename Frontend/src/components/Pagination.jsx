import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      {/* Previous */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center
                   hover:bg-blue-600 hover:text-white transition
                   disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-400 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      {/* Page Numbers */}

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition cursor-pointer
              ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* next page */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center
                   hover:bg-blue-600 hover:text-white transition
                   disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-400 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
