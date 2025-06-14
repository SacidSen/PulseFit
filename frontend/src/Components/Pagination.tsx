type PaginationProps = {
    totalPosts: number;
    postsPerPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
  };
  
  export default function Pagination({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
  }: PaginationProps) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
  
    let start = currentPage - half;
    let end = currentPage + half;
  
    if (start < 1) {
      start = 1;
      end = maxVisible;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisible + 1;
      if (start < 1) start = 1;
    }
  
    const visiblePages = pageNumbers.slice(start - 1, end);
  
    return (
      <div className="w-full flex justify-center mt-4 gap-2 flex-wrap">
        {/* Prev button */}
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          &lt;
        </button>
  
        {/* Page buttons */}
        {visiblePages.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              page === currentPage ? "bg-red-700 text-white" : "bg-gray-300 cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
  
        {/* Next button */}
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
        >
          &gt;
        </button>
      </div>
    );
  }
  