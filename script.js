// handles shifting upward of cards to look like stack!

const OFFSET = 10;

const stack = document.getElementById('stack');
const cards = stack.querySelectorAll('.card');

cards.forEach((card, i) => {
  card.style.transform = `translateY(${-i * OFFSET}px)`;
  card.style.zIndex = cards.length - i;
});
