const newDeckBn = document.querySelector('.btn');
const drawCardBtn = document.querySelector('.draw-card-btn');
const cardSection = document.querySelector('.card-section');

let deckId = '';
let scoreCardOne = 0;
let scoreCardTwo = 0;

newDeckBn.addEventListener('click', () => {
    window.location.reload();
    getNewDeck();
});

drawCardBtn.addEventListener('click', () => {
    drawCards();
});

const getNewDeck = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then((res) => res.json())
        .then((data) => {
            deckId = data.deck_id;
        });
};

const drawCards = () => {
    const cardOne = document.querySelector('.card-one');
    const cardTwo = document.querySelector('.card-two');

    cardOne.innerHTML = '';
    cardTwo.innerHTML = '';

    fetch(
        `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
        .then((res) => res.json())
        .then((data) => {
            const cardContainerOne = document.createElement('img');
            cardContainerOne.src = data.cards[0].image;
            cardContainerOne.className = 'card-one-api';

            const cardContainerTwo = document.createElement('img');
            cardContainerTwo.src = data.cards[1].image;
            cardContainerTwo.className = 'card-two-api';

            cardOne.appendChild(cardContainerOne);
            cardTwo.appendChild(cardContainerTwo);

            const card1 = data.cards[0].value;
            const card2 = data.cards[1].value;
            const remainingCards = data.remaining;

            winningCard(card1, card2);
            updateRemainingCards(data);
        });
};

const winningCard = (card1, card2) => {
    const computerScore = document.querySelector('.computer-score');
    const userScore = document.querySelector('.user-score');

    if (card1 > card2) {
        scoreCardOne++;
        computerScore.textContent = `Computer : ${scoreCardOne}`;
    } else if (card2 > card1) {
        scoreCardTwo++;
        userScore.textContent = `Me : ${scoreCardTwo}`;
    } else if (card1 === card2) {
        computerScore.textContent = `Computer : Tie`;
        userScore.textContent = `Me : Tie`;
    }
};

const updateRemainingCards = (data) => {
    const remainingCards = document.querySelector('.cards-left');

    remainingCards.textContent = `Remaining cards : ${data.remaining}`;

    if (data.remaining < 2) {
        drawCardBtn.disabled = true;
        displayWinner();
    }
};

const displayWinner = () => {
    const winnerSection = document.querySelector('.winner-section');
    const getNewDeck = document.querySelector('.get-new-deck');

    if (scoreCardOne > scoreCardTwo) {
        winnerSection.textContent = 'Computer wins!';
        getNewDeck.textContent = 'Get new deck to play again';
    } else if (scoreCardTwo > scoreCardOne) {
        winnerSection.textContent = 'User wins!';
        getNewDeck.textContent = 'Get new deck to play again';
    } else if (scoreCardOne === scoreCardTwo) {
        winnerSection.textContent = "It's a tie";
    }
};

getNewDeck();