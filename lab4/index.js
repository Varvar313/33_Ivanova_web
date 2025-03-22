document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Функция для переключения темы
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        // Сохраняем выбранную тему в cookie
        const isDarkTheme = body.classList.contains('dark-theme');
        setCookie('theme', isDarkTheme ? 'dark' : 'light', 7); // Сохраняем на 7 дней
    });

    // При загрузке страницы проверяем сохранённую тему
    const savedTheme = getCookie('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    // Остальной код для отзывов
    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');

    function loadReviews() {
        const reviews = JSON.parse(getCookie('reviews') || '[]');
        reviewsList.innerHTML = '';
        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <strong>${review.name}</strong>
                <p>${review.text}</p>
                ${review.image ? `<img src="${review.image}" alt="Изображение отзыва">` : ''}
            `;
            reviewsList.appendChild(reviewItem);
        });
    }

    function saveReview(name, text, image) {
        const reviews = JSON.parse(getCookie('reviews') || '[]');
        reviews.push({ name, text, image });
        setCookie('reviews', JSON.stringify(reviews), 7); // Сохраняем на 7 дней
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('review-name').value;
        const text = document.getElementById('review-text').value;
        const imageInput = document.getElementById('review-image');
        const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;

        if (name && text) {
            saveReview(name, text, image);
            loadReviews();
            reviewForm.reset();
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    });

    loadReviews();
});