const cardData = [
    {
        tab: "AA",
        tabLeft: "-1px",
        libraryName: "Newport Public Library.",
        address: "300 Spring St, Newport, RI 02840.",
        anecdote: "Was in the midst of recovering from an all-nighter so maybe didn't process this visit much, but I do remember a very very cute kids area. Also asked at the front desk for a reccomendation on where to get clam chowder, had delicious clam chowder from The Red Parrot Restaurant as a result! Realized later we had actually meant to go to the Redwood Library and Athenaeum, the oldest still operating lending library in the US. No wonder it looked so modern.",
        date: "2026\nMay 20"
    }
  ];

// handles filling cards and stack movement!

const stack = document.getElementById('stack');
function buildCard(data) {
    const card = document.createElement('div');
    card.className = 'card';
  
    const tab = document.createElement('div');
    if (data.tab !== undefined) {
        tab.className = 'tab';
        tab.textContent = data.tab;
        if (data.tabLeft !== undefined) {
            tab.style.left = data.tabLeft;
        }
        card.appendChild(tab);
    }
  
    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = data.date;
    card.appendChild(date);

    const content = document.createElement('div');
    content.className = 'content';

    const name = document.createElement('p');
    name.className = 'library-name';
    name.textContent = data.libraryName;
    content.appendChild(name);

    const anecdote = document.createElement('p');
    anecdote.className = 'anecdote';
    anecdote.textContent = data.anecdote;
    content.appendChild(anecdote);

    const address = document.createElement('p');
    address.className = 'address';
    address.textContent = data.address;
    content.appendChild(address);

    card.appendChild(content);

    return card;
  }
  
  cardData.forEach(data => {
    stack.appendChild(buildCard(data));
  });

const OFFSET = 5; // pixels each card behind shifts upward

function layoutCards() {
  const cards = stack.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.transform = `translateY(${-i * OFFSET}px)`;
    card.style.zIndex = cards.length - i;
  });
}

const nextBtn = document.querySelector('.nav a:last-child');
nextBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const cards = stack.querySelectorAll('.card');
  stack.appendChild(cards[0]); // move front card to the back
  layoutCards();
});

const prevBtn = document.querySelector('.nav a:first-child');
prevBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const cards = stack.querySelectorAll('.card');
  stack.insertBefore(cards[cards.length - 1], cards[0]); // move back card to the front
  layoutCards();
});

layoutCards();
