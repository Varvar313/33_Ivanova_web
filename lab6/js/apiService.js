export function initCats() {
    const container = document.getElementById('cats-content');
    if (!container) return;

    container.addEventListener('click', async (e) => {
        if (e.target.id === 'load-more-cats') {
            await loadCats();
        }
    });

    async function loadCats() {
        try {
            container.innerHTML = '<div class="loading">Загрузка котиков...</div>';
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const cats = await response.json();
            renderCats(cats);
        } catch (error) {
            container.innerHTML = `<div class="error">Ошибка: ${error.message}</div>`;
        }
    }

    function renderCats(cats) {
        let html = '<h2>Наши пушистые друзья</h2>';
        cats.forEach(cat => {
            html += `
                <div class="api-item">
                    <img src="${cat.url}" alt="Кошка" style="max-width: 100%; height: auto; border-radius: 5px;">
                </div>
            `;
        });
        html += '<button id="load-more-cats">Загрузить еще котиков</button>';
        container.innerHTML = html;
    }

    // Первоначальная загрузка
    loadCats();
}