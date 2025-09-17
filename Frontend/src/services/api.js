import axios from 'axios';

// API base URL from environment variables (fallback to your deployed backend)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://newfile-jun9.onrender.com/api';

// Axios instance configured with base URL and headers
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set Authorization token header
export function setAuthToken(token) {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }
}

// Initialize auth header from persisted user in localStorage
try {
    const raw = localStorage.getItem('gt_user');
    if (raw) {
        const user = JSON.parse(raw);
        if (user?.token) setAuthToken(user.token);
    }
} catch { }

// Auth API endpoints
export const authApi = {
    register: (name, email, password) =>
        api.post('/auth/register', { name, email, password }),

    login: (email, password) =>
        api.post('/auth/login', { email, password }),

    registerWithPhone: (name, phone, password) =>
        api.post('/auth/register-phone', { name, phone, password }),

    loginWithPhone: (phone, password) =>
        api.post('/auth/login-phone', { phone, password }),

    verifyOtp: (phone, otp) =>
        api.post('/auth/verify-otp', { phone, otp }),
};

// Menu API endpoints
export const menuApi = {
    list: () =>
        api.get('/menu'),

    add: (data) =>
        api.post('/menu', data), // Admin only
};

// Reservation API endpoints
export const reservationApi = {
    create: (data) =>
        api.post('/reservations', data),

    list: () =>
        api.get('/reservations'),

    verifyOtp: (reservationId, otp) =>
        api.post('/reservations/verify-otp', { reservationId, otp }),

    resendOtp: (reservationId) =>
        api.post('/reservations/resend-otp', { reservationId }),

    updateStatus: (reservationId, status) =>
        api.patch(`/reservations/${reservationId}`, { status }),
};

// Orders API endpoints
export const ordersApi = {
    create: (payload) =>
        api.post('/orders', payload),

    mine: () =>
        api.get('/orders/me'),

    recent: () =>
        api.get('/orders/recent'), // Admin only

    verifyOtp: (orderId, otp) =>
        api.post('/orders/verify-otp', { orderId, otp }),
};
