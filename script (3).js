
const books = [
    {
        id: 1,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        price: 650,
        category: "fiction",
        rating: 4.8,
        reviews: 127
    },
    {
        id: 2,
        title: "1984",
        author: "Джордж Оруэлл",
        price: 580,
        category: "scifi",
        rating: 4.7,
        reviews: 89
    },
    {
        id: 3,
        title: "Преступление и наказание",
        author: "Фёдор Достоевский",
        price: 720,
        category: "fiction",
        rating: 4.9,
        reviews: 156
    },
    {
        id: 4,
        title: "Маленький принц",
        author: "Антуан де Сент-Экзюпери",
        price: 450,
        category: "fiction",
        rating: 4.8,
        reviews: 203
    },
    {
        id: 5,
        title: "Если все кошки в мире исчезнут",
        author: "Гэнки Кавамура",
        price: 890,
        category: "fantasy",
        rating: 4.9,
        reviews: 345
    },
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка каталога книг
    if (document.querySelector('.catalog-grid')) {
        loadCatalogBooks();
        setupCatalogFilters();
    }
    
    // Обработка форм
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Обработка кнопок "В корзину"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-cart')) {
            e.preventDefault();
            const bookCard = e.target.closest('.book-card');
            const bookTitle = bookCard.querySelector('h4').textContent;
            addToCart(bookTitle);
        }
    });
});

// Загрузка книг в каталог
function loadCatalogBooks(booksToLoad = books) {
    const booksGrid = document.querySelector('.catalog-grid');
    if (!booksGrid) return;
    
    booksGrid.innerHTML = '';
    
    booksToLoad.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-image">📖</div>
            <div class="book-info">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
                <div class="rating">
                    <span>★ ${book.rating}</span>
                    <span>(${book.reviews} отзывов)</span>
                </div>
                <div class="price">${book.price} ₽</div>
                <button class="btn btn-cart">В корзину</button>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
}

// Настройка фильтров каталога
function setupCatalogFilters() {
    const categoryTags = document.querySelectorAll('.category-tag');
    const sortSelect = document.querySelector('.filter-select');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            categoryTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterBooks();
        });
    });
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortBooks);
    }
}

// Фильтрация книг
function filterBooks() {
    const activeCategory = document.querySelector('.category-tag.active').textContent;
    
    if (activeCategory === 'Все книги') {
        loadCatalogBooks(books);
    } else {
        const filteredBooks = books.filter(book => {
            const categoryMap = {
                'Художественная литература': 'fiction',
                'Фэнтези': 'fantasy',
                'Детективы': 'detective',
                'Научная фантастика': 'scifi',
                'Романы': 'romance',
                'Бизнес-литература': 'business'
            };
            return book.category === categoryMap[activeCategory];
        });
        loadCatalogBooks(filteredBooks);
    }
}

// Сортировка книг
function sortBooks() {
    const sortBy = document.querySelector('.filter-select').value;
    let sortedBooks = [...books];
    
    switch (sortBy) {
        case 'По цене (возрастание)':
            sortedBooks.sort((a, b) => a.price - b.price);
            break;
        case 'По цене (убывание)':
            sortedBooks.sort((a, b) => b.price - a.price);
            break;
        case 'По названию':
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            // По популярности (рейтинг + отзывы)
            sortedBooks.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews));
    }
    
    loadCatalogBooks(sortedBooks);
}

// Добавление в корзину
function addToCart(bookTitle) {
    // В реальном приложении здесь будет логика добавления в корзину
    alert(`Книга "${bookTitle}" добавлена в корзину!`);
    
    // Можно добавить анимацию
    const event = new CustomEvent('cartUpdate', { detail: { book: bookTitle } });
    document.dispatchEvent(event);
}

// Обработка входа
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        alert('Вход выполнен успешно!');
        // В реальном приложении здесь будет перенаправление
        window.location.href = 'index.html';
    } else {
        alert('Пожалуйста, заполните все поля');
    }
}

// Обработка регистрации
function handleRegister(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    const agreement = document.querySelector('#registerForm input[type="checkbox"]').checked;
    
    if (!agreement) {
        alert('Пожалуйста, примите условия соглашения');
        return;
    }
    
    if (password !== confirm) {
        alert('Пароли не совпадают!');
        return;
    }
    
    if (email && password) {
        alert('Регистрация завершена успешно!');
        window.location.href = 'login.html';
    }
}
