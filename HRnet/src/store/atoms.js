import { atom } from 'jotai';
import { employees } from '../data/mockEmployeeList';
import { departments } from '../data/departments';
import { states } from '../data/states';

const privateDefaultFormData = {
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
};

export const defaultFormDataAtom = atom(privateDefaultFormData);
export const formDataAtom = atom({ ...privateDefaultFormData });
export const formErrorAtom = atom({});

export const employeeListAtom = atom(employees);
