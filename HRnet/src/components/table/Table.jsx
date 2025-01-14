import './table.scss';
import PropTypes from 'prop-types';
import { convertString } from 'str-case-converter';

export default function Table({ name, data }) {
    const columns = Object.keys(data[0]);

    return (
        <table className={`${convertString.toKebab(name)}__table`}>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column}>{convertString.toTitle(column)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column}>{entry[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};
