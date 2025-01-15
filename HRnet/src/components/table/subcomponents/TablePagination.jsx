import './tablePagination.scss';
import PropTypes from 'prop-types';

export default function TablePagination({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
}) {
    function renderPageCount() {
        if (totalPages > 1)
            return (
                <>
                    {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, totalItems)} of
                </>
            );
    }

    return (
        <div className='table__pagination'>
            <div className='table__pagination-info'>
                Showing {renderPageCount()} {totalItems} results
            </div>
            <div className='table__pagination-controls'>
                <button
                    onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className='table__pagination-button'
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className='table__pagination-button'
                >
                    Next
                </button>
            </div>
        </div>
    );
}

TablePagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};
