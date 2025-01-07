import { atom } from 'jotai';
import { employees } from '../data/mockEmployeeList';

export const employeeListAtom = atom(employees);
