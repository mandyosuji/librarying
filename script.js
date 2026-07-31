const stack = document.getElementById('stack');
function buildCard(data) {
    const card = document.createElement('div');
    card.className = 'card';
  
    const tab = document.createElement('div');
    if (data.tab) {
        tab.className = 'tab';
        tab.textContent = data.tab;
        if (data.tabLeft !== undefined) {
            tab.style.left = data.tabLeft;
        }
        tab.style.cursor = 'pointer';
        tab.addEventListener('click', () => {
            const cards = Array.from(stack.children);
            const index = cards.indexOf(card);
            for (let i = 0; i < index; i++) {
                stack.appendChild(stack.firstElementChild);
            }
            layoutCards();
        });
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
    name.innerHTML = `${data.libraryName}.`;
    content.appendChild(name);
    
    const details = document.createElement('div');
    details.className = 'details';
    
    const anecdote = document.createElement('p');
    anecdote.className = 'anecdote';
    anecdote.innerHTML = data.anecdote;
    details.appendChild(anecdote);
    
    const address = document.createElement('p');
    address.className = 'address';
    address.textContent = `${data.address}.`;
    details.appendChild(address);
    
    content.appendChild(details);
    card.appendChild(content);

    return card;
  }

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

// get library data!
const SHEET_ID = '1I3ZyuhpGo3Sf0B7YBrqEeGOVVxyp8qwqp58jJ3VUkV8';
const SHEET_NAME = 'libraries';
const url = `https://docs.google.com/spreadsheets/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`)
  .then(res => res.text())
  .then(text => {
    // Google wraps the JSON in a JS function call — strip that off
    const json = JSON.parse(text.substring(47, text.length - 2));

    const cardData = json.table.rows.map(row => {
      const cells = row.c;
      return {
        tab: cells[0]?.v || undefined,
        tabLeft: cells[1]?.v ?? undefined,
        libraryName: cells[2]?.v ?? '',
        address: cells[3]?.v ?? '',
        anecdote: cells[4]?.v ?? '',
        date: cells[5]?.v ?? ''
      };
    });

    cardData.forEach(data => {
      stack.appendChild(buildCard(data));
    });

    layoutCards();

    function parseDate(dateString) {
        if (!dateString) return null;
    
        const parts = dateString.trim().replace(/\\n/g, '\n').split('\n').map(p => p.trim());
        const year = parts[0];
        const monthDay = parts[1]; // e.g. "Mar 23"
    
        const date = new Date(`${monthDay} ${year}`);
        return isNaN(date) ? null : date;
    }
    
    function getMostRecentDateOverall(cardData) {
        const allDates = cardData
            .map(data => parseDate(data.date))
            .filter(d => d !== null);
    
        if (allDates.length === 0) return null;
    
        return new Date(Math.max(...allDates.map(d => d.getTime())));
    }

    const overallMostRecent = getMostRecentDateOverall(cardData);
    const currentDate = new Date();
    const msDifference = currentDate - overallMostRecent; 
    const daysDifference = Math.floor(msDifference / (1000 * 60 * 60 * 24));

    const daysContainer = document.getElementById('days-since');

    const daysSince = document.createElement('p');
    if (daysDifference == 1) {
        daysSince.textContent = `${daysDifference} day since last library visit.`;
    }
    else {
        daysSince.textContent = `${daysDifference} days since last library visit.`;
    }
    
    daysContainer.appendChild(daysSince);

  })
  .catch(err => console.error('Failed to load sheet data:', err));
