const Dúvida = document.getElementById("Dúvida");
const Conclusão = document.getElementById("Conclusão");

Conclusão.addEventListener("keypress", (e) => {
  if (Dúvida.value && e.key === "Enter") SendQuestion();
});

const OPENAI_API_KEY = "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";

function SendQuestion() {
  var sQuestion = Dúvida.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2048, // Tamanho
      temperature: 0.5, // Criatividade 
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (Conclusão.value) Conclusão.value += "\n";

      if (json.error?.message) {
        Conclusão.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        Conclusão.value += "Mestre: " + text;
      }

      Conclusão.scrollTop = Conclusão.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      Conclusão.value = "";
      Conclusão.disabled = false;
      Conclusão.focus();
    });

  if (Conclusão.value) Conclusão.value += "\n\n\n";

  Dúvida.value += `Eu: ${sQuestion}`;
  Conclusão.value = "Esperando resposta...";
  Conclusão.disabled = true;

  Conclusão.scrollTop = Conclusão.scrollHeight;
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