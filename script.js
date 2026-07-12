// handles stack movement!

const OFFSET = 5; // pixels each card behind shifts upward

const stack = document.getElementById('stack');
const nextBtn = document.querySelector('.nav a:last-child');
const prevBtn = document.querySelector('.nav a:first-child');

function layoutCards() {
  const cards = stack.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.transform = `translateY(${-i * OFFSET}px)`;
    card.style.zIndex = cards.length - i;
  });
}

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const cards = stack.querySelectorAll('.card');
  stack.appendChild(cards[0]); // move front card to the back
  layoutCards();
});

prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const cards = stack.querySelectorAll('.card');
  stack.insertBefore(cards[cards.length - 1], cards[0]); // move back card to the front
  layoutCards();
});

layoutCards();
