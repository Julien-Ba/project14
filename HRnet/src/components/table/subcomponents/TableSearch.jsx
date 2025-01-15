import './tableSearch.scss';
import PropTypes from 'prop-types';
import { Search } from './icons';

export default function TableSearch({ searchTerm, onSearchChange }) {
    return (
        <div className='table__search'>
            <input
                type='text'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className='table__search-input'
            />
            <Search className='table__search-icon' />
        </div>
    );
}

TableSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};
