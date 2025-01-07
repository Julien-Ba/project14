import './home.scss';
import { Link } from 'react-router-dom';
import { departments } from '../../data/departments';
import { states } from '../../data/states';

export default function Home() {
    return (
        <main className='home'>
            <header>
                <h1 className='title'>HRnet</h1>
                <Link to={'/employeeList'}>View Current Employees</Link>
            </header>
            <div className='form-container'>
                <h2>Create Employee</h2>
                <form action='#' id='create-employee'>
                    <label htmlFor='first-name'>First Name</label>
                    <input type='text' id='first-name' />

                    <label htmlFor='last-name'>Last Name</label>
                    <input type='text' id='last-name' />

                    <label htmlFor='date-of-birth'>Date of Birth</label>
                    <input id='date-of-birth' type='text' />

                    <label htmlFor='start-date'>Start Date</label>
                    <input id='start-date' type='text' />

                    <fieldset className='address'>
                        <legend>Address</legend>

                        <label htmlFor='street'>Street</label>
                        <input id='street' type='text' />

                        <label htmlFor='city'>City</label>
                        <input id='city' type='text' />

                        <label htmlFor='state'>State</label>
                        <select name='state' id='state'>
                            {states.map((state) => (
                                <option key={state.abbreviation}>
                                    {state.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor='zip-code'>Zip Code</label>
                        <input id='zip-code' type='number' />
                    </fieldset>

                    <label htmlFor='department'>Department</label>
                    <select name='department' id='department'>
                        {departments.map((department) => (
                            <option key={department}>{department}</option>
                        ))}
                    </select>
                </form>
            </div>
        </main>
    );
}
