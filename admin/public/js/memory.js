var socket = io.connect();
socket.emit('getData');
socket.addEventListener("quiz", function (res) {
var audio = res.quizAudio;
var response = res.quizData;

var assetPath = "/audio/";
if ((response.mode)===("colors")) {
  mode = response.colors;
  sounds = audio.colors;
} else if ((response.mode)===("body")) {
  mode = response.body;
  sounds = audio.body
} else if ((response.mode)===("shapes")) {
  mode = response.shapes;
  sounds = audio.shapes
} else if ((response.mode)===("animals")) {
  mode = response.animals;
  sounds = audio.animals
} else if ((response.mode)===("fruit")) {
  mode = response.fruit;
  sounds = audio.fruit
} else if ((response.mode)===("vegetables")) {
  mode = response.vegetables;
  sounds = audio.vegetables
} else if ((response.mode)===("letters")) {
  mode = response.letters;
  sounds = audio.letters
} else if ((response.mode)===("items")) {
  mode = response.items;
  sounds = audio.items
} else if ((response.mode)===("cooked-food")) {
  mode = response.cooked_food;
  sounds = audio.cooked_food
} else {
  mode = response.numbers;
  sounds = audio.numbers
}
createjs.Sound.registerSounds(sounds, assetPath);
var Memory = {

  init: function(cards){
    this.$game = $(".game");
    this.$modal = $(".modal");
    this.$overlay = $(".modal-overlay");
    this.$restartButton = $("button.restart");
    this.cardsArray = $.merge(cards, cards);
    this.shuffleCards(this.cardsArray);
    this.setup();
  },

  shuffleCards: function(cardsArray){
    this.$cards = $(this.shuffle(this.cardsArray));
  },

  setup: function(){
    this.html = this.buildHTML();
    this.$game.html(this.html);
    this.$memoryCards = $(".card");
    this.binding();
    this.paused = false;
    this.guess = null;
  },

  binding: function(){
    this.$memoryCards.on("click", this.cardClicked);
    this.$restartButton.on("click", $.proxy(this.reset, this));
  },

  cardClicked: function(){
    var _ = Memory;
    var $card = $(this);
    if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
      $card.find(".inside").addClass("picked");
      createjs.Sound.play(this.id);
      if(!_.guess){
        _.guess = $(this).attr("data-id");
      } else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
        $(".picked").addClass("matched");
        _.guess = null;
        setTimeout(function(){
          createjs.Sound.play("correct");
        }, 800);
      } else {

        _.guess = null;
        _.paused = true;
        setTimeout(function(){
          $(".picked").removeClass("picked");
          Memory.paused = false;
        }, 600);
      }
      if($(".matched").length == $(".card").length){
        _.win();
      }
    }
  },

  win: function(){
    this.paused = true;
    setTimeout(function(){
      Memory.showModal();
      Memory.$game.fadeOut();
    }, 1000);
  },

  showModal: function(){
    this.$overlay.show();
    this.$modal.fadeIn("slow");
  },

  hideModal: function(){
    this.$overlay.hide();
    this.$modal.hide();
  },

  reset: function(){
    this.hideModal();
    this.shuffleCards(this.cardsArray);
    this.setup();
    this.$game.show("slow");
  },

  shuffle: function(array){
    var counter = array.length, temp, index;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
  },

  buildHTML: function(){
    var frag = '';

    this.$cards.each(function(k, v){


      frag += '<div class="col-md-2"><div class="card" id="'+v.answer+'" data-id="'+ v.id +'"><div class="inside"><div class="front"><img class="img-responsive" src="img/'+ v.img +'" alt="'+ v.answer +'" /></div><div class="back shrink"></div></div></div></div>';

    });

    return frag;
  }
};

var cards = mode

Memory.init(cards);

if ((response.mode)===("numbers")){
  $('.card').each(function(k, v){
    $(this).attr('id', $(this).children('.inside').children('.front').children('.img-responsive').attr('src').slice(12,-4))
  });
}

});
