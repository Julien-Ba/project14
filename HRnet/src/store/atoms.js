import { atom } from 'jotai';
import { employees } from '../data/mockEmployeeList';
import { departments } from '../data/departments';
import { states } from '../data/states';

export const formDataAtom = atom({
    createEmployee: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: states[0].name,
        zipCode: '',
        department: departments[0],
    },
});

export const employeeListAtom = atom(employees);
