import Home from '../pages/home/Home';
import EmployeeList from '../pages/employeeList/employeeList';

export const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'listEmployee',
        element: <EmployeeList />,
    },
];
