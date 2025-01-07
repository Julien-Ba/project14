import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'jotai';
import Home from './pages/home/Home';
import EmployeeList from './pages/employeeList/employeeList';

export default function App() {
    return (
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/employeeList' element={<EmployeeList />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}
