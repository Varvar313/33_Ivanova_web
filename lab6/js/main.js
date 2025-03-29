import { HeaderBlock, ContactInfoBlock, TextBlock, ListBlock, buildPage } from './blocks.js';
import { initPriceList } from './priceList.js';
import { initCalendar } from './calendar.js';
import { initCats } from './apiService.js';

class App {
    static init() {
        // Инициализация резюме
        const header = new HeaderBlock("Иванова Варвара", "Аниматор детских праздников");
        const contactInfo = new ContactInfoBlock("barbaraivanova2345@gmail.com", "+7 (977) 370-41-50");
        const aboutMe = new TextBlock("О себе", "Опыт работы с детьми более 5 лет. Специализация на детских праздниках и мероприятиях.");
        const skills = new ListBlock("Навыки", [
            "Взаимодействие с детьми разных возрастов",
            "Работа с детьми с особенностями развития",
            "Организация игр и конкурсов",
            "Работа с реквизитом"
        ]);
        const experience = new ListBlock("Опыт работы", [
            "Аниматор детских праздников (2021–2025)",
            "Организатор мастер-классов (2020–2021)"
        ]);

        buildPage([header, contactInfo, aboutMe, skills, experience], 'resume-section');

        // Инициализация разделов
        initPriceList();
        initCalendar();
        initCats();

        // Обработка навигации
        this.setupNavigation();
    }

    static setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.content-section');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;

                // Обновляем UI
                navLinks.forEach(item => item.classList.remove('active'));
                sections.forEach(sec => sec.classList.remove('active-section'));

                link.classList.add('active');
                document.getElementById(`${section === 'resume' ? 'resume-section' : `${section}-content`}`)
                    .classList.add('active-section');
            });
        });

        // Активируем первую вкладку по умолчанию
        document.querySelector('.nav-link').click();
    }
}

document.addEventListener('DOMContentLoaded', () => App.init());