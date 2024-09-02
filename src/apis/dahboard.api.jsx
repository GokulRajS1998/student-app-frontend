import axiosInstance from "../axiosInstance";

export const getStudentInfo = async (params) => {
    try {
        const response = await axiosInstance.get('/students/students', { params });
        return response;
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
};

export const addStudent = async (data) => {
    try {
        const response = await axiosInstance.post('/students/add', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('Error making POST request to add student:', error);
        throw error;
    }
};

export const editStudent = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/students/edit/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        console.error('Error making PUT request to edit student:', error);
        throw error;
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await axiosInstance.delete(`/students/delete/${id}`);
        return response;
    } catch (error) {
        console.error('Error making DELETE request to delete student:', error);
        throw error;
    }
};
