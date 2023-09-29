let game = document.querySelector('.board'),
    res = document.querySelector('.res'),
    btnGame = document.querySelector('.new-game'),
    cells = document.querySelectorAll('.cell'),
    step = false,
    count = 0,
    circle = `<svg class="circle">
            <circle r="55" cx="70" cy="70" stroke="DimGrey"
            stroke-width="10" fill="none" stroke-linecap="round" />
            </svg>`,
    cross = `<svg class="cross">
            <line class="first" x1="20" y1="20" x2="125" y2="125"
            stroke="MediumVioletRed" stroke-width="10" stroke-linecap="round" />
            <line class="second" x1="125" y1="20" x2="20" y2="125"
            stroke="MediumVioletRed" stroke-width="10" stroke-linecap="round" />  
            </svg>`;

function stepCross (target) {
    target.innerHTML = cross;
    target.classList.add('x');
    let crossAudio = new Audio ('audio/cross.mp3');
    crossAudio.play();
    count++;
}
function stepZero (target) {
    target.innerHTML = circle;
    target.classList.add('o');
    let circleAudio = new Audio ('audio/zero.mp3');
    circleAudio.play();
    count++;
}
function init (e) {
    if(!step) stepCross(e.target);
    else stepZero(e.target);
       step = !step;
       win(); 
}
function win() {
    let comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3 ,6],
        [1, 4 ,7],
        [2, 5, 8],
        [0, 4 ,8],
        [2, 4, 6]
    ];
    
    for (let i = 0; i < comb.length; i++) {
        if (cells[comb[i][0]].classList.contains('x') &&
           cells[comb[i][1]].classList.contains('x') && 
           cells[comb[i][2]].classList.contains('x')) {
           setTimeout (() => {
            cells[comb[i][0]].classList.add('active');
            cells[comb[i][1]].classList.add('active');
            cells[comb[i][2]].classList.add('active');
            res.innerText = 'Won X';
            }, 1600);
            game.removeEventListener('click', init);
           }
        else if (cells[comb[i][0]].classList.contains('o') &&
           cells[comb[i][1]].classList.contains('o') && 
           cells[comb[i][2]].classList.contains('o')) {
           setTimeout (() => {
            cells[comb[i][0]].classList.add('active');
            cells[comb[i][1]].classList.add('active');
            cells[comb[i][2]].classList.add('active');
            res.innerText = 'Won O';
            }, 1600);
            game.removeEventListener('click', init);
           } 
        else if (count == 9) {
            setTimeout (() => {
            res.innerText = 'Draw';
            }, 1600);
        }    
    }
}
function newGame () {
    step = false;
    count = 0;
    res.innerText = '';
    cells.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('x', 'o', 'active');
    });
    game.addEventListener('click', init);
}
btnGame.addEventListener('click', newGame);
game.addEventListener('click',init);


