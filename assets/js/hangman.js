var hangman = {
    gameStart: false,
    guesses: 6,
    guessImg: 1,
    guessBank: [],
    words: ['KEVIN', 'LISA', 'ROGER', 'BASIC', 'DAVID', 'MOVIE', 'SUPERNATURAL', 'TECHNOLOGY', 'OCCIPITAL', 'INUYASHA', 'SYMPHONY', 'DISHONORED'],
    currWord: '',
    wordBlank: [],
    blank: function() {
        this.currWord = this.words[Math.floor(Math.random() * this.words.length)]
        this.wordBlank = [];
        for (i = 0; i < this.currWord.length; i++) {this.wordBlank.push('_')}
        this.gameStart = true;
        document.getElementById('blankspace').innerHTML = this.wordBlank.join(' ');
        document.getElementById('gameover').innerHTML = ''
        document.getElementById('hangman').src = 'assets/images/guess7.png'
    },
    entry: function(letter) {
        if (this.currWord.indexOf(letter) > -1) {
            for (i = 0; i < this.currWord.length; i++) {
                if (this.currWord[i] == letter) {
                    this.wordBlank[i] = letter
                };
            }
            document.getElementById('blankspace').innerHTML = this.wordBlank.join(' ');
        }
        else if (this.guessBank.indexOf(letter) > -1) {
            return;
        }
        else {
            this.guesses--;
            this.guessBank.push(letter);
            document.getElementById('guesses').innerHTML = hangman.guessBank.join(' ')
            document.getElementById('hangman').src = 'assets/images/guess' + (this.guesses + 1) + '.PNG';
        }
    },
    win: function() {
        document.getElementById('gameover').innerHTML = 'Congrats!'
        this.reset();
    },
    lose: function() {            
        document.getElementById('gameover').innerHTML = 'GAME OVER!'
        this.reset()
    },
    reset: function() {
        this.guesses = 6;
        this.gameStart = false;
        this.guessBank = [];        
    }
}
document.addEventListener('keyup',function (e){
    if (!hangman.gameStart) {
        hangman.blank()
    }
    else {
        if(!/[A-Za-z]/.test(String.fromCharCode(event.keyCode)) || event.keyCode >= 96 && event.keyCode <= 111) {
            return
        }
        hangman.entry(String.fromCharCode(event.keyCode))
        if (!hangman.guesses) {
            hangman.lose()
        }
        if (hangman.currWord == hangman.wordBlank.join('')) {
            hangman.win()
        }
    }
})
