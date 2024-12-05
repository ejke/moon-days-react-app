import axios from 'axios';

const API_BASE_URL = 'https://isabelblackwell.pythonanywhere.com';
const LOCAL_API_BASE_URL = 'http://127.0.0.1:5000';

export const fetchMoonDayData = async (date) => {
    console.log('date', date)
    const formattedDate = formatDate(date);
    console.log('formattedDate', formattedDate)
    try {
        const response = await axios.get(`${API_BASE_URL}/moon-day-data?date=${formattedDate}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching moon day data:", error);
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