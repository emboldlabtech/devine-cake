//View cards on scrolls
//View cards on scrolls
//View cards on scrolls


document.addEventListener("DOMContentLoaded", () => {
    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Apply a staggered delay based on the card's index
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, index * 300); // 300ms delay between each card
                } else {
                    // Remove the "show" class when scrolling up
                    entry.target.classList.remove("show");
                }
            });
        },
        {
            threshold: 0.2, // Adjust visibility threshold
        }
    );

    hiddenElements.forEach(el => observer.observe(el));
});




//Hidden Product Cards for More to work
//Hidden Product Cards for More to work
//Hidden Product Cards for More to work

document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.querySelector(".products-container");
    const productCards = productsContainer.querySelectorAll(".products-cards");
    const btnMore = document.querySelector(".btn-More");

    // Number of initial cards to display
    const initialVisible = 6;

    // Initially hide all cards after the first 6
    productCards.forEach((card, index) => {
        if (index >= initialVisible) {
            card.style.display = "none"; // Hide the card
        }
    });

    // Event listener to toggle between showing and hiding additional cards
    btnMore.addEventListener("click", (e) => {
        e.preventDefault();

        const hiddenCards = Array.from(productCards).filter(
            (card, index) => index >= initialVisible && card.style.display === "none"
        );

        if (hiddenCards.length > 0) {
            // If there are hidden cards, show them
            productCards.forEach((card) => {
                card.style.display = "block"; // Show hidden cards
                card.classList.add("hidden"); // Reapply hidden class for scroll effects
            });
            btnMore.innerHTML = "Show Default Cards"; // Change button text to "Hide Few"
        } else {
            // If all cards are shown, hide some
            productCards.forEach((card, index) => {
                if (index >= initialVisible) {
                    card.style.display = "none"; // Hide the card
                }
            });
            btnMore.innerHTML = "Show More"; // Change button text back to "Show More"
        }
    });
});




//Carousel trigger here
//Carousel trigger here
//Carousel trigger here
//Carousel trigger here



const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');

let scrollAmount = 0;
const cardWidth = cards[0].offsetWidth + 20; // Card width + margin
const visibleCards = Math.floor(document.querySelector('.wrapper').offsetWidth / cardWidth);

// Clone first and last few cards for infinite scrolling
const cloneCards = () => {
    const firstCards = Array.from(cards).slice(0, visibleCards);
    const lastCards = Array.from(cards).slice(-visibleCards);

    firstCards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });

    lastCards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.insertBefore(clone, carousel.firstChild);
    });
};

// Initialize the infinite carousel
const initializeCarousel = () => {
    cloneCards();
    scrollAmount = cardWidth * visibleCards;
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
};

const handleScroll = (direction) => {
    const maxScroll = cardWidth * (carousel.children.length - visibleCards * 2);

    if (direction === 'right') {
        scrollAmount += cardWidth;
        if (scrollAmount > maxScroll) {
            // Reset to the beginning clones
            scrollAmount = cardWidth * visibleCards;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${scrollAmount}px)`;
            setTimeout(() => (carousel.style.transition = 'transform 0.5s ease'));
        }
    } else if (direction === 'left') {
        scrollAmount -= cardWidth;
        if (scrollAmount < cardWidth * visibleCards) {
            // Reset to the end clones
            scrollAmount = maxScroll;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${scrollAmount}px)`;
            setTimeout(() => (carousel.style.transition = 'transform 0.5s ease'));
        }
    }

    carousel.style.transform = `translateX(-${scrollAmount}px)`;
};

leftArrow.addEventListener('click', () => handleScroll('left'));
rightArrow.addEventListener('click', () => handleScroll('right'));

// Initialize on page load
initializeCarousel();
