const assetPath = "/audio/",
socket = io.connect();
var timesup = 0,
started = 0;

let time = 45;

createjs.Sound.registerSounds(sounds, assetPath);

function disable(i) {
  $(i).prop("disabled", true);
}

function CountDown() {

  if (time > 0) {
    $("#time").html(time);
    time = time - 1;
    var gameTimer = setTimeout("CountDown()", 1000)
  } else if (time == 0) {
    $("#time").html("0");
    timesup = 1;
    alert('Time\'s Up!');
    disable("#answer");
    disable("#answerBtn");
    $("#q").empty();
    $("#answer").val("");
    $("#result").append(cnv);
    mdl('mdl2', 'block');
    socket.emit('getData');
    socket.addEventListener("quiz", function (response) {
      var quiz = response.quizData;
      if ((quiz.user) === ("dandan")) {
        var smt = quiz.dandanScore.test
      } else if ((quiz.user) === ("baobao")) {
        var smt = quiz.baobaoScore.test
      } else {
        console.log("error")
      }

      data1 = {
        datasets: [
          {
            data: [
              parseInt($("#points").val()),
              parseInt($("#incorrect").val())
            ],
            backgroundColor: ["rgb(107, 239, 30)", "rgb(239, 30, 30)"]
          }
        ],
        labels: ['right', 'wrong']
      };
      data2 = {
        datasets: [
          {
            data: [
              smt.right + parseInt($("#points").val()),
              smt.wrong + parseInt($("#incorrect").val())
            ],
            backgroundColor: ["rgb(107, 239, 30)", "rgb(239, 30, 30)"]
          }
        ],
        labels: ['right', 'wrong']
      };
      Chart.defaults.global.defaultFontSize = 14;
      new Chart(document.getElementById("chartjs-1"), {
        type: 'doughnut',
        data: data1
      });

      new Chart(document.getElementById("chartjs-2"), {
        type: 'doughnut',
        data: data2
      });
      socket.emit('test', {
        "right": smt.right + parseInt($("#points").val()),
        "wrong": smt.wrong + parseInt($("#incorrect").val())
      });

    });

    console.log({
      "right": parseInt($("#points").val()),
      "wrong": parseInt($("#incorrect").val())
    });
  }
}

function startgame() {
  if (started != 0) {
    alert('You\'ve Already Started!');
  } else {
    started = 1;
    time = $('#timelimit').val();
    CountDown();
    getProb();
  }
}

function randnum(min, max) {
  var num = Math.round(Math.random() * (max - min)) + min;
  return num;
}

var choice,
choose,
rightanswer
function getProb() {
  $("#q").empty()
  choice = $('#settingsCurrent').val()
  if (choice == "Random") {
    choose = randnum(1, 4);
  } else if (choice == "+") {
    choose = "1";
  } else if (choice == "-") {
    choose = "2";
  } else if (choice == "x") {
    choose = "3";
  } else if (choice == "/") {
    choose = "4";
  } else {
    console.log('choice error');
  }

  if (choose == "1") {

    var choose1 = randnum(0, 20);
    var choose2 = randnum(0, 20);
    $("#q").html(choose1 + "+" + choose2);
    rightanswer = choose1 + choose2;
  }
  if (choose == "2") {

    var choose2 = randnum(0, 20);
    var choose1 = randnum(choose2, 20);
    $("#q").html(choose1 + "-" + choose2);
    rightanswer = choose1 - choose2;
  }
  if (choose == "3") {

    var choose1 = randnum(0, 5);
    var choose2 = randnum(0, 5);
    $("#q").html(choose1 + "x" + choose2);
    rightanswer = choose1 * choose2;
  }
  if (choose == "4") {

    var choose2 = randnum(1, 10);
    var choose1 = choose2 * randnum(0, 10);
    $("#q").html(choose1 + "/" + choose2);
    rightanswer = choose1 / choose2;
  }
}
function answerit() {
  if (started == 0) {
    alert('You Must Click The Button Labeled \'Start\'!');
  } else {
    if (timesup != 0) {
      alert('Time Ran Out!');
    } else {
      var theiranswer = $("#answer").val();
      var theirpoints = $("#points").val();
      var theirwrongpoints = $("#incorrect").val();
      if (theiranswer == null) {
        alert('Put Your Answer In The Box To The Left Of The Button Labeled \'Dap an\'!');
        $("#answer").select();
      } else {
        if (theiranswer == rightanswer) {
          createjs.Sound.play("correct");
          alert('Right');
          theirpoints++;
          $("#points").val(theirpoints);
        } else {
          createjs.Sound.play("incorrect");
          alert(theiranswer + " is wrong!\n\n" + rightanswer + " is correct!");
          theirwrongpoints++;
          $("#incorrect").val(theirwrongpoints);
        }
        $("#answer").select();
        getProb();
      }
    }
  }
}

$('#answer').keypress(function (e) {
  if (e.which == 13) {
    answerit();
    return false;
  }
});

$('#timelimit').val(time);
$(settingsBtn).each(function(i, val) {
  $('#settingsGroup').append('<button type="button" id="'+val.id+'" class="btn btn-default w80">'+val.title+'</button>');
  $('#'+val.id).click(function() {
    $('#settingsCurrent').val(val.title)
    createjs.Sound.play(val.id);
  });
});

$('#start').click(function() {
  $("#timelimit").prop("disabled", true);
  $('#settingsGroup button').each(function() {
    $(this).prop("disabled", true);
  });
});
