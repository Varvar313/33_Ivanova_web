export function initPriceList() {
    const container = document.getElementById('price-content');
    if (!container) return;

    const priceData = [
        {
            title: "Анимация (1 персонаж)",
            price: "3.700₽/час",
            description: "1 любой персонаж, до 10 человек. В программе: интерактивная сюжетная программа, яркий реквизит для игр, веселые активные и логические игры, конкурсы, музыкальное сопровождение, зажигательные танцы с аниматором, торжественный вынос торта, фотосессия."
        },
        // Добавьте остальные услуги из вашего списка
    ];

    let html = '<h2>Прайс-лист услуг</h2>';
    priceData.forEach(item => {
        html += `
            <div class="price-item">
                <div class="price-title">${item.title} - ${item.price}</div>
                <div class="price-description">${item.description}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}