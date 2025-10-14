// Данные книг для каталога
const books = [
    {
        id: 1,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        price: 650,
        genre: "fiction",
        image: "📖"
    },
    {
        id: 2,
        title: "1984",
        author: "Джордж Оруэлл",
        price: 580,
        genre: "scifi",
        image: "📖"
    },
    {
        id: 3,
        title: "Преступление и наказание",
        author: "Фёдор Достоевский",
        price: 720,
        genre: "fiction",
        image: "📖"
    },
    {
        id: 4,
        title: "Маленький принц",
        author: "Антуан де Сент-Экзюпери",
        price: 450,
        genre: "fiction",
        image: "📖"
    },
    {
        id: 5,
        title: "Гарри Поттер и философский камень",
        author: "Дж. К. Роулинг",
        price: 890,
        genre: "fantasy",
        image: "📖"
    },
    {
        id: 6,
        title: "Властелин колец: Братство кольца",
        author: "Дж. Р. Р. Толкин",
        price: 950,
        genre: "fantasy",
        image: "📖"
    },
    {
        id: 7,
        title: "Убийство в Восточном экспрессе",
        author: "Агата Кристи",
        price: 520,
        genre: "detective",
        image: "📖"
    },
    {
        id: 8,
        title: "Гордость и предубеждение",
        author: "Джейн Остин",
        price: 480,
        genre: "romance",
        image: "📖"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка каталога книг если находимся на странице каталога
    if (document.getElementById('books-grid')) {
        loadBooks(books);
        setupFilters();
    }
    
    // Обработка формы входа
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Обработка формы регистрации
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Настройка активных ссылок в навигации
    setupActiveNavLinks();
});

// Загрузка книг в каталог
function loadBooks(booksToLoad) {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;
    
    booksGrid.innerHTML = '';
    
    booksToLoad.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-image">${book.image}</div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-price">${book.price} руб.</div>
                <button class="btn btn-buy" data-book-id="${book.id}">В корзину</button>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
    
    // Добавляем обработчики для кнопок "В корзину"
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            const book = books.find(b => b.id == bookId);
            if (book) {
                addToCart(book);
            }
        });
    });
}

// Настройка фильтров
function setupFilters() {
    const searchBox = document.querySelector('.search-box');
    const genreFilter = document.getElementById('genre-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (searchBox) {
        searchBox.addEventListener('input', filterBooks);
    }
    if (genreFilter) {
        genreFilter.addEventListener('change', filterBooks);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterBooks);
    }
}

// Фильтрация книг
function filterBooks() {
    const searchTerm = document.querySelector('.search-box').value.toLowerCase();
    const genre = document.getElementById('genre-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    
    const filteredBooks = books.filter(book => {
        // Поиск по названию и автору
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                            book.author.toLowerCase().includes(searchTerm);
        
        // Фильтр по жанру
        const matchesGenre = !genre || book.genre === genre;
        
        // Фильтр по цене
        let matchesPrice = true;
        if (priceRange) {
            if (priceRange === '0-500') {
                matchesPrice = book.price <= 500;
            } else if (priceRange === '500-1000') {
                matchesPrice = book.price > 500 && book.price <= 1000;
            } else if (priceRange === '1000+') {
                matchesPrice = book.price > 1000;
            }
        }
        
        return matchesSearch && matchesGenre && matchesPrice;
    });
    
    loadBooks(filteredBooks);
}

// Добавление в корзину
function addToCart(book) {
    // В реальном приложении здесь будет логика добавления в корзину
    // и сохранение в localStorage или отправка на сервер
    alert(`Книга "${book.title}" добавлена в корзину!`);
    
    // Можно добавить анимацию или уведомление
    const button = document.querySelector(`[data-book-id="${book.id}"]`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Добавлено!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }
}

// Обработка формы входа
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // В реальном приложении здесь будет проверка на сервере
    if (email && password) {
        alert('Вход выполнен успешно!');
        // Перенаправление на главную страницу
        window.location.href = 'index.html';
    } else {
        alert('Пожалуйста, заполните все поля');
    }
}

// Обработка формы регистрации
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    
    if (name && email && password) {
        alert('Регистрация завершена успешно
