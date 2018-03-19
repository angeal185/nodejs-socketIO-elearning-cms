
addCount('numbers');

$('.submt').click(function() {
  var list = [],
  lowEnd = $('#lowEnd').val(),
  highEnd = $('#highEnd').val();
  if ((lowEnd === ('')) || (highEnd) === ('') || (lowEnd >= highEnd) ){
    throw Error()
  } else {

    for (var i = lowEnd; i <= highEnd; i++) {
        list.push(i);
    }
    $('#sliderObj').empty();
    $('#slider').fadeIn('slow');
    $('a.control_prev,a.control_next').unbind();
    $('#currentMode').html('counting from '+lowEnd+' to '+highEnd)
    $(list).each(function(i, el) {
      $('#sliderObj').append('<li><div class="img-div mt70">'+el+'</div></li>');
    });
    if (parseInt(highEnd) >= 1000){
      $('.img-div').addClass('smaller-text');
    }  else {
      $('.img-div').removeClass('smaller-text');
    }
    initSlider();
  }
});
