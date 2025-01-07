import './employeeList.scss';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { employeeListAtom } from '../../store/atoms';

export default function EmployeeList() {
    const employeeList = useAtomValue(employeeListAtom);

    const columns = [
        { title: 'First Name', key: 'firstName' },
        { title: 'Last Name', key: 'lastName' },
        { title: 'Start Date', key: 'startDate' },
        { title: 'Department', key: 'department' },
        { title: 'Date of Birth', key: 'dateOfBirth' },
        { title: 'Street', key: 'street' },
        { title: 'City', key: 'city' },
        { title: 'State', key: 'state' },
        { title: 'Zip Code', key: 'zipCode' },
    ];

    return (
        <main className='employee-list'>
            <h1 className='employee-list__title'>Current Employees</h1>
            <table className='employee-list__table'>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map((employee, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.key}>{employee[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className='employee-list__link' to='/'>
                Home
            </Link>
        </main>
    );
}
