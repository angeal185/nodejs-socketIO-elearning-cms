
function initSlider(){
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
}

function addCount(i){
  $('#slider').css('display', 'none');
  $('#currentMode').html('count '+i);
  $('#slider').after('<div class="row text-center"><div class="col-md-4 col-md-offset-2"><input type="text" id="lowEnd" class="form-control text-center"></div><div class="col-md-4"><input type="text" id="highEnd" class="form-control text-center"></div><button class="btn btn-success submt col-md-6 col-md-offset-3">Start</button></div>');
}

function ToastBuilder(options) {
  // options are optional
  var opts = options || {};

  // setup some defaults
  opts.defaultText = opts.defaultText || 'default text';
  opts.displayTime = opts.displayTime || 3000;
  opts.target = opts.target || 'body';

  return function (text) {
    $('<div/>')
      .addClass('toast')
      .prependTo($(opts.target))
      .text(text || opts.defaultText)
      .queue(function(next) {
        $(this).css({
          'opacity': 1
        });
        var topOffset = 90;
        $('.toast').each(function() {
          var $this = $(this);
          var height = $this.outerHeight();
          var offset = 15;
          $this.css('top', topOffset + 'px');

          topOffset += height + offset;
        });
        next();
      })
      .delay(opts.displayTime)
      .queue(function(next) {
        var $this = $(this);
        var width = $this.outerWidth() + 20;
        $this.css({
          'right': '-' + width + 'px',
          'opacity': 0
        });
        next();
      })
      .delay(600)
      .queue(function(next) {
        $(this).remove();
        next();
      });
  };
}

var myOptions = {
  defaultText: 'builder',
  displayTime: 3000,
  target: 'body'
};

var showtoast = new ToastBuilder(myOptions);


function mdl(e,f) {
  document.getElementById(e).style.display = f
}

var cnv = '<div class="row"><div class="col-md-6"><label>Result</label><canvas id="chartjs-1" class="chartjs"></canvas></div><div class="col-md-6"><label>History</label><canvas id="chartjs-2" class="chartjs"></canvas></div></div>';

function calculator(){

  $(".val").click(function(e){
    e.preventDefault();
  	var a = $(this).attr("href");
		$(".screen").append(a);
		$(".outcome").val($(".outcome").val() + a);

	});

	$(".equal").click(function(){
		$(".outcome").val(eval($(".outcome").val()));
		$(".screen").html(eval($(".outcome").val()));
	});

	$(".clear").click(function(){
		$(".outcome").val("");
		$(".screen").html("");
	});

}




function closeDrop(i){
  $(i).css('display', 'none');
}

$( "body" ).fadeIn( "slow", function() {
  setTimeout(function(){
    $( ".loaderMask" ).fadeOut( "slow", function() {

        showtoast('loading');
      });
  }, 1000);
});



$(".menu-link").click(function () {
  $("#menu").toggleClass("active");
  $(".main").toggleClass("active");
});

$(".menuHead").click(function () {
  $(".menuHead").next().fadeOut('slow');
  $(".icon-down-open").toggleClass("icon-right-open icon-down-open");
  $("i", this).toggleClass("icon-right-open icon-down-open");
  $(this).next().toggle("slow");
});

$(".volOps").click(function () {
  closeDrop(".quick-menu,.user-menu");
  $(".volumeDiv").toggle("slow");
});

$(".usrOps").click(function () {
  closeDrop(".volumeDiv,.quick-menu");
  $(this).next(".user-menu").toggle("slow");
});

$(".quickOps").click(function () {
  closeDrop(".volumeDiv,.user-menu");
  $(this).next(".quick-menu").toggle("slow");
});

$(".cat-change").click(function () {
  socket.emit('changeMode', {"name":$(this).html()});
  $( ".loaderMask" ).fadeIn("fast");
  $( ".main" ).empty();
  setTimeout(function(){
    location.reload();
  }, 8000);

});

$('#np-volume').on('input propertychange', function() {
		var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
$(".vol").html($(this).val())
createjs.Sound.setVolume($(this).val());
console.log(createjs.Sound.getVolume());
		$('#volume-progressbar').css('background',
			'-webkit-gradient(linear, left top, right top, '
			+ 'color-stop(' + 0 + ', #D57D67), '
			+ 'color-stop(' + val + ', #EDB472), '
			+ 'color-stop(' + val + ', #CCC)'
			+ ')'
		);
});
