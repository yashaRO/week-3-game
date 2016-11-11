var hangman = {
    gameStart: false,
    guesses: 6,
    guessImg: 1,
    guessBank: [],
    words: ['ELECTRIC','BASS','TECHNO','LIGHTNING','MICROCHIP','DUBSTEP','PROGRAMMING','JAVASCRIPT','TRANCE','CLUB','RAVE','HACKING','MUSIC','HOUSE','SEVEN|LIONS','ADVENTURE|CLUB','HARD|DRIVE','MONITOR','MOTHERBOARD','DESKTOP','LAPTOP','DEVELOPER','ABOVE|AND|BEYOND','KASKADE','TRITONAL','SKRILLEX','TIESTO','COMPUTER'],
    currWord: '',
    wordBlank: [],
    blank: function() {
        this.currWord = this.words[Math.floor(Math.random() * this.words.length)]
        this.wordBlank = [];
        for (i = 0; i < this.currWord.length; i++) {
            if (this.currWord[i] == '|') {this.wordBlank.push('|')}
            else {this.wordBlank.push('_')}
        }
		switch(this.currWord) {
			case 'SEVEN|LIONS':
				document.getElementById('sound').src = 'assets/music/Fractals.m4a'
				break;
			case 'ABOVE|AND|BEYOND':
				document.getElementById('sound').src = 'assets/music/Alone%20Tonight.mp3'
				break;
			case 'KASKADE':
				document.getElementById('sound').src = 'assets/music/Raining%20(Dance.Love%20Edit).mp3'
				break;
			case 'TRITONAL':
				document.getElementById('sound').src = 'assets/music/Sometimes%20I%20Wish.m4a'
				break;
			case 'TIESTO':
				document.getElementById('sound').src = 'assets/music/Empty%20Streets.mp3'
				break;
			case 'TRANCE':
				document.getElementById('sound').src = 'assets/music/Waiting%20Here%20For%20You.mp3'
				break;
			default:
				break;
		}
        this.gameStart = true;
        document.getElementById('blankspace').innerHTML = this.wordBlank.join(' ');
        document.getElementById('gameover').innerHTML = '';
        document.getElementById('hangman').src = 'assets/images/guess7.PNG';
        document.getElementById('guesses').innerHTML = this.guessBank.join('')
    },
    entry: function(letter) {
        if (this.currWord.indexOf(letter) > -1) {
            for (i = 0; i < this.currWord.length; i++) {
                if (this.currWord[i] == letter) {
                    this.wordBlank[i] = letter
                }
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