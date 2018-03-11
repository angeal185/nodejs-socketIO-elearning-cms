/* Created and coded by Abhilash Narayan */
/* Quiz source: w3schools.com */


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
} else if ((quiz.mode)===("items")) {
	mode = quiz.items;
	sounds = audio.items
} else if ((quiz.mode)===("cooked-food")) {
	mode = quiz.cooked_food;
	sounds = audio.cooked_food
} else {
	mode = quiz.vegetables;
	sounds = audio.vegetables
}
createjs.Sound.registerSounds(sounds, assetPath);

var quizApp = function() {

	this.score = 0;
	this.qno = 1;
	this.currentque = 0;
	var totalque = mode.length;


	this.displayQuiz = function(cque) {
		this.currentque = cque;
		if(this.currentque <  totalque) {
			$("#tque").html(totalque);
			$("#previous").attr("disabled", false);
			$("#next").attr("disabled", false);
			$("#qid").html(mode[this.currentque].id);

			$("#qImg").append("<img src='./img/"+mode[this.currentque].img+"' class='img-thumbnail'>");
			$("#question").html(mode[this.currentque].question);
			 $("#question-options").html("");
			for (var key in mode[this.currentque].options[0]) {
			  if (mode[this.currentque].options[0].hasOwnProperty(key)) {

				$("#question-options").append("<div class='form-check option-block col-md-6 text-center'><input type='radio' class='form-check-input' name='option'   id='q"+key+"' value='" + mode[this.currentque].options[0][key].replace("-", " ") + "'><button type='text' class='btn btn-block btn-default btn-select shrink'>" + mode[this.currentque].options[0][key].replace("-", " ")+"</button></div>"
				);
			  }
			}
		}
		if(this.currentque <= 0) {
			$("#previous").attr("disabled", true);
		}
		if(this.currentque >= totalque) {
				$('#next').attr('disabled', true);
				for(var i = 0; i < totalque; i++) {
					this.score = this.score + mode[i].score;
				}
			return this.showResult(this.score);
		}
	}

	this.showResult = function(scr) {
		$("#result").addClass('result');
		$("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr  + '/' + totalque + "</h1>");
		for(var j = 0; j < totalque; j++) {
			var res;
			if(mode[j].score == 0) {
					res = '<span class="wrong">' + mode[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
			} else {
				res = '<span class="correct">' + mode[j].score + '</span><i class="fa fa-check c-correct"></i>';
			}
			$("#result").append('<img src="./img/'+mode[j].img+'" class="img-thumbnail"><div class="result-question"><span>Q ' + mode[j].id + '</span> &nbsp;' + mode[j].question + '</div><div><b>Correct answer:</b> &nbsp;' + mode[j].answer + '</div><div class="last-row"><b>Score:</b> &nbsp;' + res + '</div>'

			);

		}
		$("#result").append(cnv);

		if ((quiz.user)===("dandan")){
      var smt = quiz.dandanScore.multi
    } else if ((quiz.user)===("baobao")){
      var smt = quiz.baobaoScore.multi
    } else{
      console.log("error")
    }

		data1 = {
    datasets: [{
        data: [scr, totalque - scr],
				backgroundColor:["rgb(107, 239, 30)","rgb(239, 30, 30)"]
    }],
    labels: [
        'right',
        'wrong'
    ]
		};
		data2 = {
    datasets: [{
        data: [smt.right + scr,smt.wrong + totalque - scr],
				backgroundColor:["rgb(107, 239, 30)","rgb(239, 30, 30)"]
    }],
    labels: [
        'right',
        'wrong'
    ]
		};
		Chart.defaults.global.defaultFontSize = 14;
		new Chart(document.getElementById("chartjs-1"),{
		    type: 'doughnut',
		    data: data1
		});

		new Chart(document.getElementById("chartjs-2"),{
		    type: 'doughnut',
		    data: data2
		});
		socket.emit('quiz', {"right":smt.right + scr,"wrong":smt.wrong + totalque - scr});
	}


	this.checkAnswer = function(option) {
		var answer = mode[this.currentque].answer.replace("-", " ");

		if(option == answer) {
			if(mode[this.currentque].score == "") {
				mode[this.currentque].score = 1;
				mode[this.currentque].status = "correct";
				showtoast('correct');
				createjs.Sound.play("correct");
		}
		} else {
			mode[this.currentque].status = "wrong";
			showtoast('incorrect');
			createjs.Sound.play("incorrect");
		}

	}

	this.changeQuestion = function(cque) {
			this.currentque = this.currentque + cque;
			this.displayQuiz(this.currentque);

	}

}


var jsq = new quizApp();

var selectedopt;

function changeOpt(){
	$('.btn-select').click(function(e) {
		$(this).prev("input:radio").prop("checked", true);
		selectedopt = $(this).html();
		createjs.Sound.play(selectedopt.replace(" ", "-"));
		//$(this).focus();

	});

}

	$(document).ready(function() {
			jsq.displayQuiz(0);
			changeOpt();
	});




	$('#next').click(function(e) {
			e.preventDefault();
			$(".content").addClass("fadeInUp");
			setTimeout(function(){
				$(".content").removeClass("fadeInUp");
			}, 1500);
			$("#qImg").empty();
			if(selectedopt) {
				jsq.checkAnswer(selectedopt);
			}
			jsq.changeQuestion(1);
			changeOpt();
	});

	$('#previous').click(function(e) {
		e.preventDefault();
		$("#qImg").empty();
		if(selectedopt) {
			jsq.checkAnswer(selectedopt);
		}
			jsq.changeQuestion(-1);
			changeOpt();
	});

	});
