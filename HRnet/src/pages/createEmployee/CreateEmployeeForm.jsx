import { departments } from '@data/departments';
import { states } from '@data/states';
import Form from '@components/form/Form';
import submitEmployeeCreation from './createEmployeeFormSubmit';

export default function CreateEmployeeForm() {
    const employeeFields = [
        { name: 'first_name' },
        { name: 'last_name' },
        { name: 'date_of_birth', type: 'date' },
        { name: 'start_date', type: 'date' },
        {
            name: 'address',
            type: 'fieldset',
            fields: [
                { name: 'street' },
                { name: 'city' },
                {
                    name: 'state',
                    type: 'select',
                    options: states,
                },
                { name: 'zip_code', type: 'number' },
            ],
        },
        {
            name: 'department',
            type: 'select',
            options: departments,
        },
    ];

    return (
        <Form name='create_employee' fields={employeeFields} onSubmit={submitEmployeeCreation} />
    );
}
