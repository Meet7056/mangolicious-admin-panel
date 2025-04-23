import axios from "axios";

const API_URL = "https://mangoliciousfood.com/api";
const tokennn = "b1084070-aaa1-4fd3-8a6e-b2852344c577"

export const handleLogin = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/adminlogin/`, payload);

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const getAdminDashboard = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/admin_dashboard/?view=monthly`, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

// admins

export const addAdmin = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/addadmin/`, payload, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const updateAdmin = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(`${API_URL}/updateadmin/`, payload, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const getAdminList = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/viewadmin/`, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const getSingleAdmin = async ({ payload }) => {
    try {
        const token = localStorage.getItem("token")

        const response = await axios.get(`${API_URL}/get_admin_user/`, {
            data: payload,
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const deleteAdmin = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/deleteadmin/`, {
            headers: {
                token,
            },
            data: payload,
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);
        return error;
    }
};


export const addProducts = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/add_mango/`, payload, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}


export const updateProducts = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(`${API_URL}/update_mango/`, payload, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const addFlashsale = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${API_URL}/add_flash_sale/`, payload, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const updateFlashsale = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(`${API_URL}/update_flash_sale/`, payload, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const getFlashList = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/view_flash_sale/`, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const getMangoes = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/get_mango/`, {
            headers: {
                token,
            },
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);

        return error;
    }
}

export const deleteMangoes = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/delete_flash_sale/`, {
            headers: {
                token,
            },
            data: payload,
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);
        return error;
    }
};

export const deleteFlashsale = async (payload) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${API_URL}/delete_flash_sale/`, {
            headers: {
                token,
            },
            data: payload,
        });

        return response.data;
    } catch (error) {
        console.error("API error:", error.response?.data?.message || error.message);
        return error;
    }
};

export const getOrderHistory = async () => {
    try {
        const token = localStorage.getItem("token"); // Optional: use stored token
        const response = await axios.get(`${API_URL}/order_history_admin/`, {
            headers: {
                token: token
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching order history:", error.response?.data || error.message);
        return { error: error.response?.data || error.message };
    }
};

export const updateOrderStaus = async (payload) => {
    try {
        const token = localStorage.getItem("token"); // Optional: use stored token
        const response = await axios.post(
            `${API_URL}/update_order_status/`,
            payload,
            {
                headers: {
                    token: token, // use your actual token here
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data
    } catch (error) {
        console.error('Error approving order:', error);
        return error
    }
};