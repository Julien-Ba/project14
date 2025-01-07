import './home.scss';
import { Link } from 'react-router-dom';
import { departments } from '../../data/departments';
import { states } from '../../data/states';

export default function Home() {
    return (
        <main className='home'>
            <header className='home__header'>
                <h1 className='home__header-title'>HRnet</h1>
                <Link to={'/employeeList'} className='home__header-link'>
                    View Current Employees
                </Link>
            </header>
            <div className='employee-form'>
                <h2 className='employee-form__title'>Create Employee</h2>
                <form
                    className='employee-form__form'
                    action='#'
                    id='create-employee'
                >
                    <div className='employee-form__field'>
                        <label
                            className='employee-form__label'
                            htmlFor='first-name'
                        >
                            First Name
                        </label>
                        <input
                            className='employee-form__input'
                            type='text'
                            id='first-name'
                        />
                    </div>

                    <div className='employee-form__field'>
                        <label
                            className='employee-form__label'
                            htmlFor='last-name'
                        >
                            Last Name
                        </label>
                        <input
                            className='employee-form__input'
                            type='text'
                            id='last-name'
                        />
                    </div>

                    <div className='employee-form__field'>
                        <label
                            className='employee-form__label'
                            htmlFor='date-of-birth'
                        >
                            Date of Birth
                        </label>
                        <input
                            className='employee-form__input'
                            id='date-of-birth'
                            type='text'
                        />
                    </div>

                    <div className='employee-form__field'>
                        <label
                            className='employee-form__label'
                            htmlFor='start-date'
                        >
                            Start Date
                        </label>
                        <input
                            className='employee-form__input'
                            id='start-date'
                            type='text'
                        />
                    </div>

                    <fieldset className='employee-form__fieldset'>
                        <legend className='employee-form__legend'>
                            Address
                        </legend>

                        <div className='employee-form__field'>
                            <label
                                className='employee-form__label'
                                htmlFor='street'
                            >
                                Street
                            </label>
                            <input
                                className='employee-form__input'
                                id='street'
                                type='text'
                            />
                        </div>

                        <div className='employee-form__field'>
                            <label
                                className='employee-form__label'
                                htmlFor='city'
                            >
                                City
                            </label>
                            <input
                                className='employee-form__input'
                                id='city'
                                type='text'
                            />
                        </div>

                        <div className='employee-form__field'>
                            <label
                                className='employee-form__label'
                                htmlFor='state'
                            >
                                State
                            </label>
                            <select
                                className='employee-form__select'
                                name='state'
                                id='state'
                            >
                                {states.map((state) => (
                                    <option
                                        className='employee-form__option'
                                        key={state.abbreviation}
                                    >
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='employee-form__field'>
                            <label
                                className='employee-form__label'
                                htmlFor='zip-code'
                            >
                                Zip Code
                            </label>
                            <input
                                className='employee-form__input'
                                id='zip-code'
                                type='number'
                            />
                        </div>
                    </fieldset>

                    <div className='employee-form__field'>
                        <label
                            className='employee-form__label'
                            htmlFor='department'
                        >
                            Department
                        </label>
                        <select
                            className='employee-form__select'
                            name='department'
                            id='department'
                        >
                            {departments.map((department) => (
                                <option
                                    className='employee-form__option'
                                    key={department}
                                >
                                    {department}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className='employee-form__submit'>Save</button>
                </form>
            </div>
        </main>
    );
}
