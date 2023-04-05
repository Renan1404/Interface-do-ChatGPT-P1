const duvida = document.getElementById("duvida");
const conclusao = document.getElementById("conclusao");
duvida.addEventListener("keypress", (e) => {
  if (duvida.value && e.key === "Enter") {
   SendQuestion();
  }
});
const OPENAI_API_KEY = "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";
const SendQuestion = async() => {
  conclusao.value = '';
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
      max_tokens: 2048,
      temperature: 1, 
    }),
  }).then((response) => response.json())
    .then((json) => {
      var text = json.choices[0].message.content ;

      conclusao.value += "Mestre: " + text;
      document.getElementById('duvida').value = '';
      conclusao.scrollTop = conclusao.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
    });
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