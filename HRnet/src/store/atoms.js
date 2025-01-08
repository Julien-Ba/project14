import { atom } from 'jotai';
import { employees } from '../data/mockEmployeeList';

export const formDataAtom = atom({
    createEmployee: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
        },
        department: '',
    },
});

export const employeeListAtom = atom(employees);
