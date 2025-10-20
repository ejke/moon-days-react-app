import axios from 'axios';

const WEB_API_BASE_URL = 'https://isabelblackwell.pythonanywhere.com';
const LOCAL_API_BASE_URL = 'http://127.0.0.1:5000';

// NOTE: Change ONLY this
const API_BASE_URL = WEB_API_BASE_URL;

export const fetchMoonDayData = async (date) => {
    const formattedDate = formatDate(date);
    try {
        const response = await axios.get(`${API_BASE_URL}/moon-day-data?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching moon day data:", error);
        throw error;
    }
};

export const fetchMoonDayPreviewData = async (date) => {
    const formattedDate = formatDate(date);
    try {
        const response = await axios.get(`${API_BASE_URL}/moon-data?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching moon day data:", error);
        throw error;
    }
};

export const fetchMoonMonthData = async (year, month) => {
    // Format date as YYYY-MM-DD, using first day of the month
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-01`;
    try {
        const response = await axios.get(`${API_BASE_URL}/moon-month?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching moon month data:", error);
        throw error;
    }
};

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};