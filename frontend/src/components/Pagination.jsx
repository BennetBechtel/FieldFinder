const Pagination = ({ page, pages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-500">
        {pageNumbers.map((number) => (
          <li className={`px-2 py-1 ${page === number && "bg-gray-200"}`}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
