// Clock functionality

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const easternTime = new Date(now.toLocaleString('en-US', {
        timeZone: 'America/New_York'
    }));
    
    const hours = String(easternTime.getHours()).padStart(2, '0');
    const minutes = String(easternTime.getMinutes()).padStart(2, '0');
    const seconds = String(easternTime.getSeconds()).padStart(2, '0');
    
    // Get day name, day number, and month
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = dayNames[easternTime.getDay()];
    const dayNumber = easternTime.getDate();
    const monthName = monthNames[easternTime.getMonth()];
    
    clockElement.textContent = `${dayName} ${monthName} ${dayNumber} ${hours}:${minutes}:${seconds} EST`;
}

// Initialize clock
updateClock();
setInterval(updateClock, 1000);

