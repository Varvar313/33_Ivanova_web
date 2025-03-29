export class Block {
    constructor(content) {
        this.content = content;
    }

    toHTML() {
        return `<div class="block">${this.content}</div>`;
    }
}

export class HeaderBlock extends Block {
    constructor(name, position) {
        super('');
        this.name = name;
        this.position = position;
    }

    toHTML() {
        return `
            <h1>${this.name}</h1>
            <h2>${this.position}</h2>
        `;
    }
}

export class ContactInfoBlock extends Block {
    constructor(email, phone) {
        super('');
        this.email = email;
        this.phone = phone;
    }

    toHTML() {
        return `
            <div class="contact-info">
                <p>Email: ${this.email}</p>
                <p>Телефон: ${this.phone}</p>
            </div>
        `;
    }
}

export class TextBlock extends Block {
    constructor(title, content) {
        super('');
        this.title = title;
        this.content = content;
    }

    toHTML() {
        return `
            <h2>${this.title}</h2>
            <p>${this.content}</p>
        `;
    }
}

export class ListBlock extends Block {
    constructor(title, items) {
        super('');
        this.title = title;
        this.items = items;
    }

    toHTML() {
        const listItems = this.items.map(item => `<li>${item}</li>`).join('');
        return `
            <h2>${this.title}</h2>
            <ul>${listItems}</ul>
        `;
    }
}

export function buildPage(blocks, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Контейнер с id ${containerId} не найден`);
        return;
    }

    container.innerHTML = blocks.map(block => block.toHTML()).join('');
}