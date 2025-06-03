import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, currPage, prevPage, nextPage, totalEntries, indices }) => {

  return (
    <div>
      <div className="flex items-center justify-between text-[1em] mt-[10px] pt-[10px]">
        <p>Showing {indices.start+1} - {indices.end+1} out of {totalEntries} results</p>
        <div className="rounded-lg text-center">
          {/* <p className="text-gray-600 mb-4">Current Page: {currentPage}</p> */}

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevPage}
              disabled={currPage+1 === 1}
              className={`p-1 transition cursor-pointer ${
                currPage+1 === 1
                  ? "bg-gray-300"
                  : "bg-black hover:opacity-80 text-white"
              }`}
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-gray-700">
              {currPage+1} / {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currPage+1 === totalPages}
              className={`p-1 transition cursor-pointer ${
                currPage+1 === totalPages
                  ? "bg-gray-300"
                  : "bg-black hover:opacity-80 text-white"
              }`}
              title="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
