import './employeeList.scss';
import { Link } from 'react-router-dom';
import { employeeService } from '@services/api/employee';
import Table from 'react-simple-table-component';
import { useEffect, useState } from 'react';

export default function EmployeeList() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [employeeList, setEmployeeList] = useState(null);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const result = await employeeService.getAllEmployees();
                setEmployeeList(result.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        setIsLoading(true);
        fetchEmployees();
    }, []);

    const trimmedEmployeeList = employeeList
        ? employeeList.map(({ _id, __v, ...rest }) => rest)
        : [];

    return (
        <main className='employee-list'>
            <h1 className='employee-list__title'>Current Employees</h1>
            {isLoading ? (
                error ? (
                    <p>Error!</p>
                ) : (
                    <div style={{ height: '668px' }}>
                        <p>Loading...</p>
                    </div>
                )
            ) : (
                <Table name={'employee_list'} data={trimmedEmployeeList} />
            )}
            <Link className='employee-list__link' to='/'>
                Home
            </Link>
        </main>
    );
}
