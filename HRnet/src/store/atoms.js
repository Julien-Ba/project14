import { atom } from 'jotai';
import { departments } from '../data/departments';
import { states } from '../data/states';
import { employeeService } from '../services/api/employee';

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

const employeeList = await employeeService.getAllEmployees();
if (employeeList.success) {
    console.log('Employees found:', employeeList.data);
} else {
    console.error('Error:', employeeList.error);
}

export const employeeListAtom = atom(employeeList.data);
