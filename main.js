function chatBot() {

    this.input;
    
    this.respondTo = function (input) {
  
      this.input = input.toLowerCase();
  
      if (this.match('(hy|hello)'))
      return "Hi dude";
  
      if (this.match('(how are you|hw r u|how r u )'))
      return "I'm doing great,thanks for asking!";
  
      if (this.match('(how old are you)'))
      return "Infinity";
  
      if (this.match('(what is your name)'))
      return "Robot";

      if(this.match('(i love you|i luv u|143)'))
      return"I love you too";


      return input + ", I don't understand what it is";
    };
  
    
    this.match = function (regex) {
  
      return new RegExp(regex).test(this.input);
    };
  }
  
  
  $(function () {
  
   
    var you = 'You';
    var robot = 'Chatbot';
  
   
    var delayStart = 400;
    var delayEnd = 800;
  
    
    var bot = new chatBot();
    var chat = $('.chat');
    var waiting = 0;
    $('.busy').text(robot + ' is typing...');
  
   
    var submitChat = function () {
  
      var input = $('.input input').val();
      if (input == '') return;
  
      $('.input input').val('');
      updateChat(you, input);
  
      var reply = bot.respondTo(input);
      if (reply == null) return;
  
      var latency = Math.floor(Math.random() * (delayEnd - delayStart) + delayStart);
      $('.busy').css('display', 'block');
      waiting++;
      setTimeout(function () {
        if (typeof reply === 'string') {
          updateChat(robot, reply);
        } else {
          for (var r in reply) {
            updateChat(robot, reply[r]);
          }
        }
        if (--waiting == 0) $('.busy').css('display', 'none');
      }, latency);
    };
  
    var updateChat = function (party, text) {
  
      var style = 'you';
      if (party != you) {
        style = 'other';
      }
  
      var line = $('<div><span class="party"></span> <span class="text"></span></div>');
      line.find('.party').addClass(style).text(party + ':');
      line.find('.text').text(text);
  
      chat.append(line);
  
      chat.stop().animate({ scrollTop: chat.prop("scrollHeight") });
  
    };
  
  
    $('.input').bind('keydown', function (e) {
      if (e.keyCode == 13) {
        submitChat();
      }
    });
    $('.input a').bind('click', submitChat);
  
  
    updateChat(robot, 'Hello write me something');
  
  });