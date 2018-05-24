addCount('money');

$('.submt').click(function() {
  var list = [],
  lowEnd = $('#lowEnd').val(),
  highEnd = $('#highEnd').val();
  cent = $('.cents').val();
  if ((lowEnd === ('')) || (highEnd) === ('') || (lowEnd >= highEnd) ){
    throw Error()
  } else {

    for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    $('#sliderObj').empty();
    $('#slider').fadeIn('slow');
    $('a.control_prev,a.control_next').unbind();
    $('#currentMode').html('counting money from $'+lowEnd+'.00&#162 to $'+highEnd+'.99&#162;')
    $(list).each(function(i, el) {
      $('#sliderObj').append('<li><div class="img-div mt70">$'+el+'.<span class="cents"></span></div></li>');
    });
    $('.cents').each(function(i, el) {
      var cents = Math.floor(Math.random()*(100-0+1)+0);
      if ((cents)<(10)){
        cents = "0"+cents;
      }
      $(el).html(cents+'&#162;');
    });

      $('.img-div').css({'font-size': '50px',"line-height":"4.7"});
    initSlider();
  }
});
