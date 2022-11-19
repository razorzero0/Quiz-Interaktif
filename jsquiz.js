(function() {
    var questions = [{
      question: "Binatang yang bisa hidup di air dan di darat disebut ? ",
      choices: ["herbivora", "amfibi", "karnivora"],
      correctAnswer: 1
    }, {
      question: "Ibukota negara Indonesia yaitu ?",
      choices: ["jakarta", "Bali", "Jogja"],
      correctAnswer: 0
    }, {
      question: "Pencipta karakter Naruto adalah ?",
      choices: ["Mashashi Kisimoto", "Echiro Oda", "Saitama" ],
      correctAnswer: 0
    }, {
      question: "Berapakah hasil dari 1 x 7?",
      choices: [5, 6, 7 ],
      correctAnswer: 2
    }, {
      question: "Sword adalah bahasa Inggris dari ?",
      choices: ["pedang", "polisi", "pistol"],
      correctAnswer: 0
    }];
    
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      var click = document.getElementById('click');
      click.play();
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      var track = document.getElementById('track');
      var track1 = document.getElementById('track1');
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        track1.play();
        Swal.fire({
          title: 'Oppsss!',
          text: 'Pilihannya diisi dulu ya :) ',
          imageUrl: './img/anime1.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      var click = document.getElementById('click');
      click.play();
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      var click = document.getElementById('click');
      click.play();
      e.preventDefault();
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // Animates buttons on hover
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Soal ' + (index + 1) + ' :</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li style="margin-bottom:8px;">');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      
      quiz.fadeOut(function() {
        $('#question').remove();

        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var track2 = document.getElementById('track2');
      track2.play();
      var score = $('<h1> ',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('<h4 style=" font-weight:bolder;width:100%; margin:0 auto;">Kamu benar ' + '<p style=" color:#EE760E;">'+  numCorrect + '</p>' + ' dari ' +
                   questions.length + ' pertanyaan</h4>');
      return score;
    }
  })();