const grid = document.querySelector('.grid');
const movesDisplay = document.querySelector('.moves');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'vilager1',
  'vilager2',
  'vilager3',
  'vilager4',
  'vilager5',
  'vilager6'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard= '';
let moves = 0;

const updateMovesDisplay = () => {
  movesDisplay.textContent = `${moves} movimentos`;
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter){

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame(); 

  } else {

    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }
}

const checkEndGame = () =>{
  const disabledCards = document.querySelectorAll('.disabled-card');

  if(disabledCards.length === 12) {
    clearInterval(this.loop);
    alert(`Parabéns ${spanPlayer.innerHTML}, você ganhou! Você fez ${moves} movimentos, em ${timer.innerHTML} segundos`);
  }
}


const revealCard = ({ target }) =>{

  if(target.parentNode.className.includes('reveal-card')){
    return;
  }

  if(firstCard === ''){

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
    moves++
    updateMovesDisplay();

  } else if (secondCard === ''){

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    moves++
    updateMovesDisplay();

    checkCards();

  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../imgs/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

const loadGame = () => {

  const duplicateCharacters = [ ...characters, ...characters ];

  const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5 );

  shuffledArray.forEach((character)=> {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop =  setInterval(()=>{

    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;

  }, 1000);

}

window.onload = () => {
  const playerName = localStorage.getItem('player');
  spanPlayer.innerHTML = playerName;
  startTimer();
}

loadGame();
updateMovesDisplay();


document.getElementById('reloadButton').addEventListener('click', function() {
  location.href = '../index.html';
});