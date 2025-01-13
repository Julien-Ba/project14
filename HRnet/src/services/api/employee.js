import { API_CONFIG } from '../config';

const API_URL = API_CONFIG.BASE_URL;

export const employeeService = {
    getAllEmployees: async () => {
        try {
            const response = await fetch(`${API_URL}/employees`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to fetch employees',
            };
        }
    },

    getEmployee: async (id) => {
        try {
            const response = await fetch(`${API_URL}/employees/${id}`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to fetch employee details',
            };
        }
    },

    createEmployee: async (employeeData) => {
        try {
            const response = await fetch(`${API_URL}/employees`, {
                method: 'POST',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(employeeData),
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to create employee',
            };
        }
    },

    updateEmployee: async (id, employeeData) => {
        try {
            const response = await fetch(`${API_URL}/employees/${id}`, {
                method: 'PUT',
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify(employeeData),
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to update employee',
            };
        }
    },

    deleteEmployee: async (id) => {
        try {
            const response = await fetch(`${API_URL}/employees/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to delete employee',
            };
        }
    },
};
