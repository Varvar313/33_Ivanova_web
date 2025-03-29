// API для котиков
export async function initCats() {
    const container = document.getElementById('cats-content');
    if (!container) return;

    container.innerHTML = '<div class="loading">Загрузка котиков...</div>';
    
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
        const cats = await response.json();
        renderCats(cats);
    } catch (error) {
        container.innerHTML = `<div class="error">Ошибка загрузки котиков: ${error.message}</div>`;
    }

    function renderCats(cats) {
        let html = '<h2>Наши пушистые друзья</h2><div class="cats-grid">';
        cats.forEach(cat => {
            html += `
                <div class="api-item">
                    <img src="${cat.url}" alt="Кошка" style="max-width: 100%; height: 200px; object-fit: cover; border-radius: 5px;">
                    <button class="delete-btn" data-id="${cat.id}">Удалить</button>
                </div>
            `;
        });
        html += '</div><button id="load-more-cats">Загрузить еще котиков</button>';
        container.innerHTML = html;

        // Обработчик для кнопки загрузки
        document.getElementById('load-more-cats')?.addEventListener('click', initCats);
    }
}

export async function fetchRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки цитаты:', error);
        return null;
    }
}