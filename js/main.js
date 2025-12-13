function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    var item = localStorage.getItem(key);
    if (!item) {
        return null;
    }
    return JSON.parse(item);
}

var booksData = [
    {
        id: 1,
        title: "The Silent Library",
        author: "Ava Brooks",
        genre: "mystery",
        pages: 320,
        image: "images/hero-books.jpg",
        synopsis: "A student discovers a hidden section in the university library where every book predicts a future event.",
        series: ["The Silent Library", "The Whispering Stacks"],
        ratings: [
            { reviewer: "Mia", value: "4.5/5", comment: "Creepy and clever." },
            { reviewer: "Liam", value: "4/5", comment: "Loved the twists." }
        ]
    },
    {
        id: 2,
        title: "Starlight Voyage",
        author: "Noah Reed",
        genre: "sci-fi",
        pages: 410,
        image: "images/hero-books.jpg",
        synopsis: "A crew of young explorers travel through a wormhole and must decide which universe to call home.",
        series: ["Starlight Voyage"],
        ratings: [
            { reviewer: "Zara", value: "5/5", comment: "Great sci-fi adventure." }
        ]
    },
    {
        id: 3,
        title: "Forest of Secrets",
        author: "Lena Hart",
        genre: "fantasy",
        pages: 280,
        image: "images/hero-books.jpg",
        synopsis: "A village guarded by a magical forest must face the truth behind an ancient curse.",
        series: ["Forest of Secrets", "River of Echoes", "Sky of Embers"],
        ratings: [
            { reviewer: "Ethan", value: "4/5", comment: "Beautiful worldbuilding." }
        ]
    },
    {
        id: 4,
        title: "Pages of Tomorrow",
        author: "Jay Patel",
        genre: "fiction",
        pages: 190,
        image: "images/hero-books.jpg",
        synopsis: "A young writer finds a notebook that writes back, challenging everything they believe about creativity.",
        series: ["Pages of Tomorrow"],
        ratings: [
            { reviewer: "Hana", value: "3.5/5", comment: "Short but inspiring." }
        ]
    },
    {
        id: 5,
        title: "Mindful Minutes",
        author: "Sara Wong",
        genre: "non-fiction",
        pages: 210,
        image: "images/hero-books.jpg",
        synopsis: "Simple daily habits to bring focus and calm to your busy student life.",
        series: ["Mindful Minutes"],
        ratings: [
            { reviewer: "Alex", value: "4/5", comment: "Very practical tips." }
        ]
    },
    {
        id: 6,
        title: "Shadow Codes",
        author: "Ravi Kumar",
        genre: "sci-fi",
        pages: 450,
        image: "images/hero-books.jpg",
        synopsis: "A group of programmers discover that their campus network is controlled by an AI hiding a secret.",
        series: ["Shadow Codes", "Ghost Protocol"],
        ratings: [
            { reviewer: "Nina", value: "4.5/5", comment: "Perfect for tech lovers." }
        ]
    }
];

var quotes = [
    { text: "A reader lives a thousand lives before he dies.", book: "George R.R. Martin" },
    { text: "So many books, so little time.", book: "Frank Zappa" },
    { text: "Today a reader, tomorrow a leader.", book: "Margaret Fuller" },
    { text: "Books are a uniquely portable magic.", book: "Stephen King" }
];

var authorsOfTheDay = [
    { name: "Jane Austen", bio: "Known for classic novels about love and society." },
    { name: "George Orwell", bio: "Wrote powerful stories about truth and control." },
    { name: "Agatha Christie", bio: "Famous for clever mystery novels." },
    { name: "Haruki Murakami", bio: "Blends everyday life with magical moments." },
    { name: "Chimamanda Ngozi Adichie", bio: "Explores identity, culture and power." }
];

document.addEventListener("DOMContentLoaded", function () {
    setupNavToggle();
    setupYearSpan();
    setupScrollReveal();
    registerServiceWorker();

    var bodyId = document.body.id;

    if (bodyId === "home-page") {
        initHomePage();
    } else if (bodyId === "books-page") {
        initBooksPage();
    } else if (bodyId === "tracker-page") {
        initTrackerPage();
    } else if (bodyId === "random-page") {
        initRandomPage();
    } else if (bodyId === "flow-page") {
        initFlowPage();
    } else if (bodyId === "feedback-page") {
        initFeedbackPage();
    }
});

function setupNavToggle() {
    var navToggle = document.getElementById("navToggle");
    var mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", function () {
            mainNav.classList.toggle("open");
        });
    }
}

function setupYearSpan() {
    var span = document.getElementById("yearSpan");
    if (span) {
        span.textContent = new Date().getFullYear();
    }
}

function setupScrollReveal() {
    var elements = document.querySelectorAll(".reveal");

    function handleScroll() {
        var windowHeight = window.innerHeight;
        var i;
        for (i = 0; i < elements.length; i++) {
            var rect = elements[i].getBoundingClientRect();
            if (rect.top < windowHeight - 60) {
                elements[i].classList.add("visible");
            }
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("service-worker.js");
        });
    }
}

function initHomePage() {
    var quoteText = document.getElementById("quoteText");
    var quoteBook = document.getElementById("quoteBook");
    var index = 0;

    function showQuote(i) {
        if (!quoteText || !quoteBook) {
            return;
        }
        var q = quotes[i];
        quoteText.textContent = '"' + q.text + '"';
        quoteBook.textContent = "— " + q.book;
    }

    showQuote(index);
    setInterval(function () {
        index = (index + 1) % quotes.length;
        showQuote(index);
    }, 5000);

    var today = new Date();
    var authorIndex = today.getDate() % authorsOfTheDay.length;
    var author = authorsOfTheDay[authorIndex];

    var authorName = document.getElementById("authorName");
    var authorBio = document.getElementById("authorBio");

    if (authorName && authorBio) {
        authorName.textContent = author.name;
        authorBio.textContent = author.bio;
    }

    var newsletterForm = document.getElementById("newsletterForm");
    var newsletterEmail = document.getElementById("newsletterEmail");
    var newsletterMessage = document.getElementById("newsletterMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (newsletterEmail.value.trim() === "") {
                newsletterMessage.textContent = "Please enter your email.";
                return;
            }
            var email = newsletterEmail.value.trim();
            var stored = getFromLocalStorage("newsletterEmails") || [];
            stored.push(email);
            saveToLocalStorage("newsletterEmails", stored);
            newsletterMessage.textContent = "Thank you for subscribing!";
            newsletterForm.reset();
        });
    }
}

function initBooksPage() {
    var grid = document.getElementById("bookGrid");
    var searchInput = document.getElementById("searchInput");
    var genreFilter = document.getElementById("genreFilter");
    var clearBtn = document.getElementById("clearFilters");

    function matchesFilters(book, searchValue, genreValue) {
        var matchesGenre = genreValue === "all" || book.genre === genreValue;
        var lower = searchValue.toLowerCase();
        var matchesSearch =
            book.title.toLowerCase().indexOf(lower) !== -1 ||
            book.author.toLowerCase().indexOf(lower) !== -1;
        return matchesGenre && (searchValue === "" || matchesSearch);
    }

   function renderBooks() {
    if (!grid) {
        return;
    }
    var searchValue = searchInput.value.trim();
    var genreValue = genreFilter.value;

    grid.innerHTML = "";

    var i;
    for (i = 0; i < booksData.length; i++) {
        var book = booksData[i];
        if (!matchesFilters(book, searchValue, genreValue)) {
            continue;
        }

        var card = document.createElement("div");
        card.className = "book-card";
        card.setAttribute("data-id", book.id);

        // TITLE
        var title = document.createElement("h3");
        title.textContent = book.title;

        // AUTHOR
        var author = document.createElement("p");
        author.textContent = "By " + book.author;

        // GENRE
        var genre = document.createElement("p");
        genre.textContent = "Genre: " + book.genre;

        // Append text elements only (no image)
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(genre);

        card.addEventListener("click", function () {
            var id = parseInt(this.getAttribute("data-id"), 10);
            openBookModal(id);
        });

        grid.appendChild(card);
    }

    if (grid.innerHTML === "") {
        grid.textContent = "No books match your search.";
    }
}


    if (searchInput) {
        searchInput.addEventListener("input", renderBooks);
    }

    if (genreFilter) {
        genreFilter.addEventListener("change", renderBooks);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            searchInput.value = "";
            genreFilter.value = "all";
            renderBooks();
        });
    }

    renderBooks();
    setupBookModal();
}

function setupBookModal() {
    var modal = document.getElementById("bookModal");
    var closeBtn = document.getElementById("modalClose");

    if (!modal) {
        return;
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

function openBookModal(id) {
    var modal = document.getElementById("bookModal");
    var modalTitle = document.getElementById("modalTitle");
    var modalAuthor = document.getElementById("modalAuthor");
    var modalSynopsis = document.getElementById("modalSynopsis");
    var modalSeriesList = document.getElementById("modalSeriesList");
    var modalRatingsBody = document.getElementById("modalRatingsBody");

    var i;
    var book = null;
    for (i = 0; i < booksData.length; i++) {
        if (booksData[i].id === id) {
            book = booksData[i];
            break;
        }
    }

    if (!book || !modal) {
        return;
    }

    modalTitle.textContent = book.title;
    modalAuthor.textContent = "By " + book.author;
    modalSynopsis.textContent = book.synopsis;

    modalSeriesList.innerHTML = "";
    for (i = 0; i < book.series.length; i++) {
        var li = document.createElement("li");
        li.textContent = book.series[i];
        modalSeriesList.appendChild(li);
    }

    modalRatingsBody.innerHTML = "";
    for (i = 0; i < book.ratings.length; i++) {
        var row = document.createElement("tr");

        var tdReviewer = document.createElement("td");
        tdReviewer.textContent = book.ratings[i].reviewer;

        var tdRating = document.createElement("td");
        tdRating.textContent = book.ratings[i].value;

        var tdComment = document.createElement("td");
        tdComment.textContent = book.ratings[i].comment;

        row.appendChild(tdReviewer);
        row.appendChild(tdRating);
        row.appendChild(tdComment);

        modalRatingsBody.appendChild(row);
    }

    modal.style.display = "flex";
}

function initRandomPage() {
    var genreSelect = document.getElementById("randomGenre");
    var lengthSelect = document.getElementById("randomLength");
    var pickBtn = document.getElementById("pickBookBtn");
    var againBtn = document.getElementById("pickAgainBtn");
    var title = document.getElementById("randomTitle");
    var author = document.getElementById("randomAuthor");
    var genreText = document.getElementById("randomGenreText");
    var saveBtn = document.getElementById("saveToListBtn");
    var message = document.getElementById("randomMessage");
    var list = document.getElementById("readingList");

    function getLengthLabel(pages) {
        if (pages < 200) {
            return "short";
        } else if (pages <= 400) {
            return "medium";
        }
        return "long";
    }

    function filterBooks() {
        var chosenGenre = genreSelect.value;
        var chosenLength = lengthSelect.value;
        var result = [];
        var i;

        for (i = 0; i < booksData.length; i++) {
            var book = booksData[i];
            if (chosenGenre !== "any" && book.genre !== chosenGenre) {
                continue;
            }
            var length = getLengthLabel(book.pages);
            if (chosenLength !== "any" && length !== chosenLength) {
                continue;
            }
            result.push(book);
        }

        return result;
    }

    function chooseBook() {
        var options = filterBooks();
        if (options.length === 0) {
            title.textContent = "No books match that combination.";
            author.textContent = "";
            genreText.textContent = "";
            return null;
        }
        var index = Math.floor(Math.random() * options.length);
        var book = options[index];
        title.textContent = book.title;
        author.textContent = "By " + book.author;
        genreText.textContent = "Genre: " + book.genre + " | Pages: " + book.pages;
        title.classList.add("visible");
        author.classList.add("visible");
        genreText.classList.add("visible");
        return book;
    }

    var currentBook = null;

    if (pickBtn) {
        pickBtn.addEventListener("click", function () {
            currentBook = chooseBook();
            message.textContent = "";
        });
    }

    if (againBtn) {
        againBtn.addEventListener("click", function () {
            currentBook = chooseBook();
            message.textContent = "Picked a new book for you.";
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            if (!currentBook) {
                message.textContent = "Pick a book first.";
                return;
            }
            var listData = getFromLocalStorage("readingList") || [];
            listData.push(currentBook.title + " by " + currentBook.author);
            saveToLocalStorage("readingList", listData);
            message.textContent = "Saved to your reading list.";
            renderReadingList();
        });
    }

    function renderReadingList() {
        if (!list) {
            return;
        }
        list.innerHTML = "";
        var listData = getFromLocalStorage("readingList") || [];
        var i;
        for (i = 0; i < listData.length; i++) {
            var li = document.createElement("li");
            li.textContent = listData[i];
            list.appendChild(li);
        }
    }

    renderReadingList();
}

