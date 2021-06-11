console.log("Javascript no frontend");

const cotacaoForm = document.querySelector("form");
const mainMensage = document.querySelector("h3");
const close = document.getElementById("close");
const high = document.getElementById("high");
const low = document.getElementById("low");
const open = document.getElementById("open");

cotacaoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const ativo = document.querySelector("input").value;

  close.innerHTML = "";
  high.innerHTML = "";
  low.innerHTML = "";
  open.innerHTML = "";

  if (!ativo) {
    mainMensage.innerHTML = "O ativo deve ser informado";
    return;
  }

  fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        mainMensage.innerHTML = `Alguma coisa deu errado`;
        close.innerHTML = `${data.error.mensage} | código: ${data.error.code}`;
      } else {
        mainMensage.innerHTML = data.symbol;
        close.innerHTML = `Fechamento: ${data.close}`;
        high.innerHTML = `Alta: ${data.high}`;
        low.innerHTML = `Baixa: ${data.low}`;
        open.innerHTML = `Abertura: ${data.open}`;
      }
    })
  );
});
