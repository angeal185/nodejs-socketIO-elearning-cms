var socket = io.connect();
var mode;
socket.emit('getData');
socket.addEventListener("quiz", function (response) {
var assetPath = "/audio/";
var quiz = response.quizData;
var audio = response.quizAudio;
if ((quiz.mode)===("colors")) {
	mode = quiz.colors;
	sounds = audio.colors;
} else if ((quiz.mode)===("body")) {
	mode = quiz.body;
	sounds = audio.body
} else if ((quiz.mode)===("animals")) {
	mode = quiz.animals;
	sounds = audio.animals
} else if ((quiz.mode)===("fruit")) {
	mode = quiz.fruit;
	sounds = audio.fruit
} else if ((quiz.mode)===("vegetables")) {
	mode = quiz.vegetables;
	sounds = audio.vegetables
} else if ((quiz.mode)===("letters")) {
	mode = quiz.letters;
	sounds = audio.letters
} else if ((quiz.mode)===("numbers")) {
	mode = quiz.numbers;
	sounds = audio.numbers
} else if ((quiz.mode)===("items")) {
	mode = quiz.items;
	sounds = audio.items
} else if ((quiz.mode)===("cooked-food")) {
	mode = quiz.cooked_food;
	sounds = audio.cooked_food
}
createjs.Sound.registerSounds(sounds, assetPath);


$(mode).each(function(index, el) {
  $('#sliderObj').append('<li><h3 class="slide-title">'+el.answer.replace("-", " ")+'</h3><img src="./img/'+el.img+'" class="img-thumbnail"><button id="'+el.id+'" class="btn btn-block btn-slider">'+el.answer.replace("-", " ")+'</button></li>')
});
$('#currentMode').append(quiz.mode);

$(document).ready(function ($) {

  $('#checkbox').change(function(){
    setInterval(function () {
        moveRight();
    }, 3000);
  });

	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#slider').css({ width: slideWidth, height: slideHeight });

	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });


    $('.btn-slider').click(function() {
			if (quiz.mode != "numbers") {
      createjs.Sound.play(this.innerHTML.replace(" ", "-"));
			} else {
				createjs.Sound.play($(this).prev('img').attr('src').slice(14,-4));
				//console.log($(this).prev('img').attr('src').slice(14,-4))
			}
    });



});


});
