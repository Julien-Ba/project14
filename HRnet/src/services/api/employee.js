import { API_CONFIG } from '../config';

const API_URL = API_CONFIG.BASE_URL;

const connectionError = {
    success: false,
    status: 500,
    message: 'Failed to connect with server',
    data: null,
};

const responseDetails = (response, data) => {
    return {
        status: response.status,
        success: response.ok,
        message: !response.ok ? data.message : null,
        data: response.ok ? data : null,
    };
};

export const employeeService = {
    getAllEmployees: async () => {
        try {
            const response = await fetch(`${API_URL}/employees`);
            const data = await response.json();
            return responseDetails(response, data);
        } catch {
            return connectionError;
        }
    },

    getEmployee: async (id) => {
        try {
            const response = await fetch(`${API_URL}/employees/${id}`);
            const data = await response.json();
            return responseDetails(response, data);
        } catch {
            return connectionError;
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
            return responseDetails(response, data);
        } catch {
            return connectionError;
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
            return responseDetails(response, data);
        } catch {
            return connectionError;
        }
    },

    deleteEmployee: async (id) => {
        try {
            const response = await fetch(`${API_URL}/employees/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return responseDetails(response, data);
        } catch {
            return connectionError;
        }
    },
};
