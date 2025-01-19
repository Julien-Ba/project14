import './app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'jotai';
import CreateEmployee from './pages/createEmployee/CreateEmployee';
import EmployeeList from './pages/employeeList/employeeList';

export default function App() {
    return (
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<CreateEmployee />} />
                    <Route path='/employeeList' element={<EmployeeList />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
