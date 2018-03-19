var socket = io.connect();
socket.emit('getData');
socket.addEventListener("quiz", function (res) {


var res = res.quizData;
var scoreRight;
var scoreWrong;
  var minimum = 1;
  var maximum = 5;
  var int1 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  var int2 = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  var assetPath = "/audio/";
  var arr = [];
  var sounds = [{
    "src": "correct.wav",
    "id": "correct"
  },
  {
    "src": "incorrect.wav",
    "id": "incorrect"
  }];

  var qanswer = int1 + int2;
  //document.getElementById('a').innerHTML = qanswer;
  function fillVal(a,b){
    document.getElementById(a).value = b
  }

  function fillHtml(a,b){
    document.getElementById(a).innerHTML = b
  }

  shuffle = function(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  function arrPush(i){
    arr.push(['<div class="form-check option-block col-md-6 text-center"><button type="text" class="btn btn-block btn-default btn-select">'+i+'</button></div>']);
  }

  function disableBtn(){
    $('.btn-select').each(function(index, el) {
      $(this).attr('disabled', true);
    });
  }

  function fire() {
    var uanswer = document.getElementById('answer').value;
    if (uanswer == qanswer) {
      socket.emit('subtract',{"right":scoreRight + 1,"wrong":scoreWrong,"type":"plus"});
      $( ".loaderMask" ).fadeIn("fast");
      disableBtn();
      createjs.Sound.play("correct");
      showtoast('Correct answer!');
      setTimeout(function(){ location.reload() }, 6000);
    } else {
      socket.emit('subtract',{"right":scoreRight,"wrong":scoreWrong + 1,"type":"plus"});
      $( ".loaderMask" ).fadeIn("fast");
      disableBtn();
      createjs.Sound.play("incorrect");
      showtoast('Incorrect answer!');
      setTimeout(function(){ location.reload() }, 6000);
    }
  }

  if ((res.user)===("dandan")){
      scoreRight = res.dandanScore.subtract.right;
      scoreWrong = res.dandanScore.subtract.wrong;
  } else if ((res.user)===("baobao")){
    scoreRight = res.baobaoScore.subtract.right;
    scoreWrong = res.baobaoScore.subtract.wrong;
  } else{
    console.log("fill err")
  }
  createjs.Sound.registerSounds(sounds, assetPath);
  fillHtml("question",int1 + " + " + int2);
  fillVal("right",scoreRight);
  fillVal("wrong",scoreWrong);

arrPush(qanswer);
arrPush(Math.floor(Math.random() * (minimum + maximum)));
arrPush(Math.floor(Math.random() * (minimum + maximum)));
arrPush(Math.floor(Math.random() * (minimum + maximum)));


var btnArray = shuffle(arr);
  $("#selectBtns").append(btnArray.toString().replace(/,/g, ""));

  $('.btn-select').click(function(event) {
    $('#answer').val(this.innerHTML);
    fire();
  });
});
