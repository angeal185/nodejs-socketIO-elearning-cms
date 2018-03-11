const socket = io.connect();

socket.emit('getData');
socket.addEventListener("quiz", function (res) {
  var assetPath = "/audio/",
  mode = res.quizData.numbers,
  sounds = res.quizAudio.numbers,
  guessField = $('.guessField'),
  row1 = [1,2,3,4,5,6,7,8,9,0];

  createjs.Sound.registerSounds(sounds, assetPath);

  $('.startGame').click(function(event) {

    var min = parseInt($('.min').val()),
    max = parseInt($('.max').val()),
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;;
    guesses = $('.guesses'),
    lowOrHi = $('.lowOrHi'),
    guessSubmit = $('.guessSubmit'),
    guessCount = 1;


    if (($('.init').val())===('')) {
        showtoast('enter min and max numbers');
    } else if ((min) >= (max)) {
        showtoast('min cannot be higher than max');
    } else {


      $('.startIt, .minMax').addClass('hidden'),
      $('#keyboard, .newGame, .guessField, .gc').removeClass('hidden');
      $('.betweenVal').text('guess the number between ' + min + ' - ' + max);
      $(row1).each(function() {
        $('.guessCubes').append('<div class="guessCube blink"></div>');
      });
      guessSubmit.attr('disabled', false)

      function reInit(){
        guessSubmit.attr('disabled', true),
        setTimeout(function(){ location.reload() }, 3000);
      }
      function checkGuess() {
        console.log(randomNumber);
        var userGuess = Number(guessField.val());
        if (guessCount === 1) {
          guesses.text('Previous guesses: ');
        }
        guesses.append(userGuess + ', ');

        if (userGuess === randomNumber) {
          $('.guessCube').eq(guessCount-1).addClass('guessRight');
          guessField.remove(),
          createjs.Sound.play('correct');
          showtoast('correct');
          reInit();
          lowOrHi.text('');
        } else if (guessCount === 10) {
          $('.guessCube').eq(9).addClass('guessWrong');
          $('.guessCount').text('10'),
          showtoast('GAME OVER'),
          reInit();
        } else {
          $('.guessCube').eq(guessCount-1).addClass('guessWrong');
          createjs.Sound.play('incorrect'),
          showtoast('incorrect'),
          $('.guessCount').text(guessCount);
          if (userGuess < randomNumber) {
            lowOrHi.text('Last guess was too low!');
          } else if (userGuess > randomNumber) {
            lowOrHi.text('Last guess was too high!');
          }
        }
        guessCount++;
        guessField.val('');
        guessField.focus();
      }
      guessSubmit.click(function() {
        checkGuess();
      });
    }

    createKeys(row1, $('.row1'), guessField);

    function createKeys(keyArray, row, inputTarget){
      for(var i = 0; i < keyArray.length; i++){
        var span = $('<span class="shrink btn btn-success key '+ i +'">'+ keyArray[i] +'</span>');
        row.append(span);
        span.click(function(index, value) {
          appendKeyValue(inputTarget, $(this).text());
          createjs.Sound.play($(this).text());
          $(".guessSubmit").focus();
        });
      }
    }

    function appendKeyValue(inputTarget, keyValue){
      inputTarget.val( function( index, val ) {
        return val + keyValue;
      });
    }

    $("#guessField").keyup(function(event) {
      if (event.keyCode === 13) {
        $(".guessSubmit").click();
      }
    });
  });
});
