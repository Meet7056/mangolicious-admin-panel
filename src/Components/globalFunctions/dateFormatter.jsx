export const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
  
    const date = new Date(dateStr);
  
    const pad = (num) => String(num).padStart(2, '0');
  
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are 0-indexed
    const year = date.getFullYear().toString().slice(2); // Get last 2 digits
  
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };
  