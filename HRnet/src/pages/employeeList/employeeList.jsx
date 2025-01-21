import './employeeList.scss';
import { Link } from 'react-router-dom';
import { employeeService } from '../../services/api/employee';
import Table from 'react-simple-table-component';
import { useEffect, useState } from 'react';

export default function EmployeeList() {
    const [employeeList, setEmployeeList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                setIsLoading(true);
                const result = await employeeService.getAllEmployees();
                setEmployeeList(result.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchEmployees();
    }, []);

    const trimmedEmployeeList = employeeList
        ? employeeList.map(({ _id, __v, ...rest }) => rest)
        : [];

    return (
        <main className='employee-list'>
            <h1 className='employee-list__title'>Current Employees</h1>
            {isLoading ? (
                <div style={{ height: '668px' }}>
                    <p>Loading...</p>
                </div>
            ) : (
                <Table name={'employee_list'} data={trimmedEmployeeList} />
            )}
            <Link className='employee-list__link' to='/'>
                Home
            </Link>
        </main>
    );
}
