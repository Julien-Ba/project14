import './table.scss';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { convertString } from 'str-case-converter';
import { ChevronDown } from './subcomponents/icons';
import TablePagination from './subcomponents/TablePagination';
import TableSearch from './subcomponents/TableSearch';

export default function Table({ name, data }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const columns = Object.keys(data[0] || {});

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.key === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: column, direction });
    };

    const filteredAndSortedData = useMemo(() => {
        let processedData = [...data];

        if (searchTerm) {
            processedData = processedData.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (sortConfig.key) {
            processedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return processedData;
    }, [data, searchTerm, sortConfig]);

    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className={`table table__container ${convertString.toKebab(name)}__table`}>
            <TableSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <table className='table__table'>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                onClick={() => handleSort(column)}
                                className='table__table__header-cell'
                            >
                                <div className='table__table__header-cell-content'>
                                    <span>{convertString.toTitle(column)}</span>
                                    {sortConfig.key === column && (
                                        <ChevronDown
                                            className='table__table__header-cell-icon'
                                            rotate={sortConfig.direction === 'asc' ? true : false}
                                        />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((entry, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td key={column}>{entry[column]}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className='table__empty'>
                                <div className='table__empty-message'>No results found</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredAndSortedData.length}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

Table.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};
