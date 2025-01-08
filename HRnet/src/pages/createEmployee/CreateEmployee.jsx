import './createEmployee.scss';
import { Link } from 'react-router-dom';
import CreateEmployeeForm from './CreateEmployeeForm';

export default function CreateEmployee() {
    return (
        <main className='create-employee'>
            <header className='create-employee__header'>
                <h1 className='create-employee__header-title'>HRnet</h1>
                <Link
                    to={'/employeeList'}
                    className='create-employee__header-link'
                >
                    View Current Employees
                </Link>
            </header>
            <CreateEmployeeForm />
        </main>
    );
}
