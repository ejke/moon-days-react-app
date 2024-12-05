export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ['P', 'E', 'T', 'K', 'N', 'R', 'L'];
    const months = [
        'jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni',
        'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day}.${month} ${year}`;
};

export const formatTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}Z`); // Using a fixed date to parse the time
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};