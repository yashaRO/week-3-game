var hangman = {
    gameStart: false,
    guesses: 5,
    guessBank: [],
    words: ['KEVIN', 'LISA', 'ROGER', 'BASIC', 'DAVID', 'MOVIE', 'SUPERNATURAL', 'TECHNOLOGY', 'OCCIPITAL', 'INUYASHA', 'SYMPHONY', 'DISHONORED'],
    currWord: '',
    wordBlank: [],
    blank: function() {
        this.currWord = this.words[Math.floor(Math.random() * this.words.length)]
        this.wordBlank = [];
        for (i = 0; i < this.currWord.length; i++) {this.wordBlank.push('_')}
        this.gameStart = true;
        document.getElementById('text').innerHTML = this.currWord;
        document.getElementById('hangman').innerHTML = this.wordBlank.join(' ');
        document.getElementById('hangman2').innerHTML = hangman.guesses;
        document.getElementById('hangman3').innerHTML = 'lol'
    },
    entry: function(letter) {
        if (this.currWord.indexOf(letter) > -1) {
            for (i = 0; i < this.currWord.length; i++) {
                if (this.currWord[i] == letter) {
                    this.wordBlank[i] = letter
                };
            }
            document.getElementById('hangman').innerHTML = this.wordBlank.join(' ');
        }
        else if (this.guessBank.indexOf(letter) > -1) {
            return;
        }
        else {
            this.guesses--;
            this.guessBank.push(letter);
            document.getElementById('hangman4').innerHTML = hangman.guessBank.join(' ');
            document.getElementById('hangman2').innerHTML = hangman.guesses;
        }
    },
    win: function() {
        document.getElementById('hangman3').innerHTML = 'Congrats!'
        this.reset();
    },
    lose: function() {            
        document.getElementById('hangman3').innerHTML = 'GAME OVER!'
        this.reset()
    },
    reset: function() {
        this.guesses = 5;
        this.gameStart = false;
        this.guessBank = [];
        document.getElementById('hangman4').innerHTML = 'lol'
        
    }
}
document.addEventListener('keyup',function (e){
    if (!hangman.gameStart) {
        hangman.blank()
    }
    else {
        hangman.entry(String.fromCharCode(event.keyCode))
        if (!hangman.guesses) {
            hangman.lose()
        }
        if (hangman.currWord == hangman.wordBlank.join('')) {
            hangman.win()
        }
    }
})
