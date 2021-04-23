(function () {
  const myQuestions = [
    {
      question: "Bỏ ngoài nướng trong, ăn ngoài bỏ trong là gì?",
      answers: {
        a: "Bắp ngô",
        b: "Khoai tây",
        c: "Cà rốt"
       },
      correctAnswer: "a" 
    
    },
    {
      question: "Bệnh gì bác sĩ bó tay?",
      answers: {
        a: "Đau mắt",
        b: "Đau dạ dày",
        c: "Gãy tay"
      },
      correctAnswer: "c"
    },
    {
      question: " Con gì ăn lửa với nước than?",
      answers: {
        a: "Con ma",
        b: "Con tàu",
        c: "Con rồng",
       
      },
      correctAnswer: "b"
    },
    {
      question: "Trên nhấp dưới giật là đang làm gì?",
      answers: {
        a: "Hái quả",
        b: "Kéo co",
        c: "Câu cá",
       
      },
      correctAnswer: "c"
    },
     {
      question: "Đố bạn ba gọi má bằng gì? Anh gọi em bằng gì? Ông ngoại gọi bà ngoại bằng gì? Chồng gọi vợ bằng gì?",
      answers: {
        a: "Bằng tiếng",
        b: "Bằng hơi",
        c: "Bằng miệng",
       
      },
      correctAnswer: "c"
    },
     {
      question: "Cái gì khi xài thì quăng đi, không xài thì lấy lại??",
      answers: {
        a: "Tiền",
        b: "Neo",
        c: "Bóng chuyền",
       
      },
      correctAnswer: "b"
    },
     {
      question: "Con gì nay mưa mai ướt?",
      answers: {
        a: "Con hươu cao cổ",
        b: "Con cá",
        c: "Con rùa",
       
      },
      correctAnswer: "c"
    },
     {
      question: " Con cóc là cậu ông trời, Vậy là vợ của con cóc gọi là gì với ông trời?",
      answers: {
        a: "Cậu",
        b: "Mợ",
        c: "Bạn",
       
      },
      correctAnswer: "b"
    },
     {
      question: "Khoa học nhận đình rằng trà xanh giảm cân tốt hơn cà phê, vậy 1 kg trà và 1 kg cà phê cái nào nặng hơn?",
      answers: {
        a: "Bằng nhau",
        b: "Cà phê",
        c: "Trà xanh",
       
      },
      correctAnswer: "a"
    },
     {
      question: "Chùa một cột xây dựng dựa trên hình tượng loại hoa nào?",
      answers: {
        a: "Hoa Hồng",
        b: "Hoa sen",
        c: "Hoa Đào",
       
      },
      correctAnswer: "b"
    },
  ];

  function buildQuiz() {
    // tạo một nơi để lưu trữ đầu ra HTML
    const output = [];

    // cho mỗi câu hỏi ...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // lưu trữ danh sách các lựa chọn câu trả lời
      const answers = [];

      // và cho mỗi câu trả lời có sẵn ...
      for (letter in currentQuestion.answers) {
        // ... thêm một nút radio HTML
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // thêm câu hỏi này và câu trả lời của nó vào đầu ra
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // cuối cùng kết hợp danh sách đầu ra thành một chuỗi HTML và đặt nó trên trang
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // thu thập các vùng chứa câu trả lời từ bài kiểm tra
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // theo dõi câu trả lời của người dùng
    let numCorrect = 0;

    // cho mỗi câu hỏi ...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // tìm câu trả lời đã chọn
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // nếu câu trả lời là đúng
      if (userAnswer === currentQuestion.correctAnswer) {
        // thêm vào số câu trả lời đúng
        numCorrect++;

        // tô màu cho các câu trả lời là màu xanh lá cây
        answerContainers[questionNumber].style.color = "green";
      } else {// nếu câu trả lời sai hoặc trống
        

        // tô màu đỏ cho các câu trả lời
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // hiển thị số câu trả lời đúng trong tổng số
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // hiển thị bài kiểm tra
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // khi gửi, hiển thị kết quả
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();


        
        
   
    
    
    
    
        

    