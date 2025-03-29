export function initCalendar() {
    const container = document.getElementById('schedule-content');
    if (!container) return;

    // Генерация календаря на текущий месяц
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    
    container.innerHTML = `
        <h2>Расписание мероприятий</h2>
        <div class="calendar-container">
            <table class="calendar">
                <thead>
                    <tr>
                        <th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th>
                    </tr>
                </thead>
                <tbody id="calendar-body"></tbody>
            </table>
        </div>
    `;

    generateCalendar(month, year);
    markBusyDays();

    function generateCalendar(month, year) {
        const calendarBody = document.getElementById('calendar-body');
        const firstDay = new Date(year, month, 1).getDay() || 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let date = 1;
        let html = '';
        
        for (let i = 0; i < 6; i++) {
            html += '<tr>';
            
            for (let j = 1; j <= 7; j++) {
                if (i === 0 && j < firstDay) {
                    html += '<td></td>';
                } else if (date > daysInMonth) {
                    html += '<td></td>';
                } else {
                    const isToday = new Date().getDate() === date && 
                                    new Date().getMonth() === month && 
                                    new Date().getFullYear() === year;
                    const dateStr = `${date}.${month+1}.${year}`;
                    html += `<td class="${isToday ? 'current-day' : ''}" data-date="${dateStr}">
                                <div class="calendar-day">${date}</div>
                             </td>`;
                    date++;
                }
            }
            
            html += '</tr>';
            if (date > daysInMonth) break;
        }
        
        calendarBody.innerHTML = html;
    }

    function markBusyDays() {
        // Пример отмеченных дней (можно заменить на данные из API)
        const busyDays = [
            { day: 5, month: now.getMonth() + 1, year: now.getFullYear(), event: "День рождения" },
            { day: 12, month: now.getMonth() + 1, year: now.getFullYear(), event: "Выпускной" },
            { day: 20, month: now.getMonth() + 1, year: now.getFullYear(), event: "Корпоратив" }
        ];

        busyDays.forEach(day => {
            const cell = document.querySelector(`[data-date="${day.day}.${day.month}.${day.year}"]`);
            if (cell) {
                cell.innerHTML += `<div class="calendar-event">${day.event}</div>`;
                cell.style.backgroundColor = '#fff0f0';
            }
        });
    }
}