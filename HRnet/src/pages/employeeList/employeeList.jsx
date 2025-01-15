import './employeeList.scss';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { employeeListAtom } from '../../store/atoms';
import Table from '../../components/table/Table';

export default function EmployeeList() {
    const employeeList = useAtomValue(employeeListAtom);
    const trimmedEmployeeList = employeeList
        ? employeeList.map(({ _id, __v, ...rest }) => rest)
        : [];

    return (
        <main className='employee-list'>
            <h1 className='employee-list__title'>Current Employees</h1>
            <Table name={'employee_list'} data={trimmedEmployeeList} />
            <Link className='employee-list__link' to='/'>
                Home
            </Link>
        </main>
    );
}
