export function initCalendar() {
    const container = document.getElementById('schedule-content');
    if (!container) return;

    container.innerHTML = `
        <h2>Расписание праздников</h2>
        <div class="calendar-container">
            <p>Календарь будет здесь</p>
            <button id="add-event">Добавить мероприятие</button>
        </div>
    `;

    document.getElementById('add-event')?.addEventListener('click', () => {
        alert('Функция добавления мероприятия будет реализована позже');
    });
}