const duvida = document.getElementById("duvida");
const conclusao = document.getElementById("conclusao");

duvida.addEventListener("keypress", (e) => {
  if (duvida.value && e.key === "Enter") {
   SendQuestion();
  }
});

const OPENAI_API_KEY = "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";

const SendQuestion = async() => {
  var sQuestion = duvida.value;

  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages:[{"role": "user", "content": sQuestion}],
      max_tokens: 2048, // Tamanho
      temperature: 1, // Criatividade 
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      //console.log(json);
      if (conclusao.value){
        conclusao.value += "\n";
      } 

      /*if (json.error?.message) {
        conclusao.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
*/
      var text = json.choices[0].message.content ;
      console.log(text);
      conclusao.value += "Mestre: " + text;

    //}

      conclusao.scrollTop = conclusao.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      conclusao.value = "";
      conclusao.disabled = false;
      conclusao.focus();
    });


    /*conclusao.value += `Eu: ${sQuestion} \n`;
    conclusao.value += "Esperando resposta... \n";
    conclusao.value += text;
*/
    conclusao.scrollTop = conclusao.scrollHeight;


  
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}