function startGame() {
    const words = ["мир", "дружба", "жвачка"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    let guessedWord = "_".repeat(randomWord.length).split("");
    let attempts = 0;

    alert("Попробуй угодать слово по буквам!");

    while (true) {
        const currentState = guessedWord.join(" ");
        const letter = prompt(`Слово: ${currentState}\nВведите букву:`).toLowerCase();

        if (letter === null) {
            if (confirm("Вы уверены, что хотите выйти из игры?")) {
                alert("Игра завершена. Загаданное слово было: " + randomWord);
                break;
            } else {
                continue;
            }
        }

        if (letter.length !== 1 || !/[а-я]/.test(letter)) {
            alert("Пожалуйста, введите одну русскую букву!");
            continue;
        }
        attempts++;

        // Проверяем, есть ли такая буква в загаданном слове
        if (randomWord.includes(letter)) {
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === letter) {
                    guessedWord[i] = letter;
                }
            }
            alert(`Буква "${letter}" есть в слове!`);
        } else {
            alert(`Буквы "${letter}" нет в слове!`);
        }

        if (!guessedWord.includes("_")) {
            alert(`Поздравляю! Вы угадали слово "${randomWord}" за ${attempts} попыток!`);
            break;
        }
    }
}