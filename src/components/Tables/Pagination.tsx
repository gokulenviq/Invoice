
const Pagination = ({ invoicesPerPage, totalInvoices, paginate }: { invoicesPerPage: number, totalInvoices: number, paginate: (pageNumber: number) => void }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalInvoices / invoicesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className="mx-1 px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-200"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
