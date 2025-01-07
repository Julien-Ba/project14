import './employeeList.scss';
import { Link } from 'react-router-dom';

export default function EmployeeList() {
    return (
        <main className='employee-list'>
            <h1 className='employee-list__title'>Current Employees</h1>
            <table className='employee-list__table' id='employee-table'></table>
            <Link className='employee-list__link' to='/'>
                Home
            </Link>
        </main>
    );
}
