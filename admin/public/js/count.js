

$('#slider').css('display', 'none');
$('#currentMode').html('count');
$('#slider').after('<div class="row text-center"><div class="col-md-4 col-md-offset-2"><input type="text" id="lowEnd" class="form-control text-center"></div><div class="col-md-4"><input type="text" id="highEnd" class="form-control text-center"></div><button class="btn btn-success submt col-md-6 col-md-offset-3">Start</button></div>');

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
