document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDarkTheme = body.classList.contains('dark-theme');
        setCookie('theme', isDarkTheme ? 'dark' : 'light', 7); 
    });

    const savedTheme = getCookie('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    const reviewsList = document.getElementById('reviews-list');
    const reviewForm = document.getElementById('review-form');

    function loadReviews() {
        const reviewsCookie = getCookie('reviews');
        let reviews = [];

        try {
            reviews = JSON.parse(reviewsCookie || '[]');
        } catch (error) {
            console.error('Ошибка при разборе отзывов из cookie:', error);
            setCookie('reviews', JSON.stringify([]), 7);
        }

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
        const reviewsCookie = getCookie('reviews');
        let reviews = [];

        try {
            reviews = JSON.parse(reviewsCookie || '[]');
        } catch (error) {
            console.error('Ошибка при разборе отзывов из cookie:', error);
            reviews = [];
        }

        reviews.push({ name, text, image });

        setCookie('reviews', JSON.stringify(reviews), 7);
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