import { atom } from 'jotai';

export const defaultFormDataAtom = atom({});
export const formDataAtom = atom({});
export const formErrorAtom = atom({});

/*
// example of how to set default values to a form
import { departments } from '@data/departments';
import { states } from '@data/states';

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
*/
