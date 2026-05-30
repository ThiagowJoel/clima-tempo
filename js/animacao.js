let input = document.querySelector(".digitar");

let botaoAdicionar = document.querySelector(".buscar");

let resultado = document.querySelector(".area-resultado");

let apiKey = "0aa52440637ed213552d0dd542c2904d";

botaoAdicionar.addEventListener("click", buscarClima)

document.addEventListener("keydown", function(event){
    if(event.key === "Enter")
        buscarClima()
    }) 
    
async function buscarClima() {  

botaoAdicionar.innerText = "Buscando..."



    let cidade = input.value;

    if(cidade === "") {
        resultado.innerText = "Digite uima cidade";
        botaoAdicionar.innerText = "BUSCAR"
        return;
    }

  

    let resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    );
  
    let dados = await resposta.json();

    if(dados.cod === "404" || dados.cod === 404) {
        resultado.innerText = "Cidade não encontrada";
        botaoAdicionar.innerText = "BUSCAR"
        return;
    }
 
    let icone = dados.weather[0].icon;

    let emojiClima;

    if(icone === "01n") {
        emojiClima = "🌙"
    }

    if(icone === "01d") {
        emojiClima = "☀️"
    }

    if(icone === "02d") {
        emojiClima = "🌤️"   
    }

   if(
    icone === "03d" ||
    icone === "03n" ||
    icone === "04d" ||
    icone === "04n"
) {

    emojiClima = "☁️"

}

   if(
    icone === "09d" ||
    icone === "09n" ||
    icone === "10d" ||
    icone === "10n"
) {

    emojiClima = "🌧️"

}


   if(
    icone === "11d" ||
    icone === "11n" 
) {

    emojiClima = "⛈️"

}


resultado.innerHTML = `

<h2 class="nome-cidade">${dados.name}</h2>

<div class="clima-card">

    <div class="emoji-clima">${emojiClima}</div>

    <div class="temperatura-area">
        <span class="temperatura">${Math.round(dados.main.temp)}</span>
        <span class="graus">°C</span>
    </div>

    <div class="info-clima">
        <strong>${dados.weather[0].description}</strong>
        <p>Sensação térmica ${Math.round(dados.main.feels_like)}°</p>
    </div>
</div>
 
    <p class="umidade">Umidade: ${dados.main.humidity}%</p>
    <p class="vento">Vento: ${dados.wind.speed} km/h</p>
    <p class="visibilidade">Visibilidade: ${dados.visibility / 1000} km</p>
`;

input.value = "";

    setTimeout(function(){
        botaoAdicionar.innerText = "BUSCAR";
        return;
    },800);

}





