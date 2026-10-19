const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  mensagem.classList.add("mostrar");

  setTimeout(() => {
    mensagem.classList.remove("mostrar");
  }, 3000);
}

document.getElementById("botaoEntrar").addEventListener("click", () => {
  const email = prompt("Digite seu e-mail:");

  if (email === null) return;

  if (email.trim() === "") {
    mostrarMensagem("Preencha o e-mail.");
    return;
  }

  mostrarMensagem("Login em desenvolvimento.");
});

document.getElementById("botaoComecar").addEventListener("click", () => {
  const idioma = prompt(
    "Escolha um idioma:\n1 - Inglês\n2 - Espanhol\n3 - Francês"
  );

  if (idioma === null) return;

  const idiomas = {
    1: "Inglês",
    2: "Espanhol",
    3: "Francês"
  };

  if (!idiomas[idioma.trim()]) {
    mostrarMensagem("Opção inválida.");
    return;
  }

  mostrarMensagem("Idioma escolhido: " + idiomas[idioma.trim()] + ".");
});

document.querySelectorAll("[data-recurso]").forEach((botao) => {
  botao.addEventListener("click", () => {
    const recurso = botao.dataset.recurso;

    if (recurso === "tradução") {
      const texto = prompt("Digite uma palavra ou frase:");

      if (texto === null || texto.trim() === "") return;

      mostrarMensagem("Recurso de tradução em desenvolvimento.");
    }

    if (recurso === "chat") {
      mostrarMensagem("Chat em desenvolvimento.");
    }

    if (recurso === "progresso") {
      mostrarMensagem("Progresso em desenvolvimento.");
    }
  });
});

document.getElementById("botaoAvaliacao").addEventListener("click", () => {
  const idioma = prompt("Qual idioma você deseja aprender?");

  if (idioma === null || idioma.trim() === "") return;

  const nivel = prompt(
    "Escolha seu nível:\n1 - Iniciante\n2 - Intermediário\n3 - Avançado"
  );

  if (nivel === null) return;

  const niveis = {
    1: "Iniciante",
    2: "Intermediário",
    3: "Avançado"
  };

  if (!niveis[nivel.trim()]) {
    mostrarMensagem("Opção inválida.");
    return;
  }

  mostrarMensagem(
    idioma.trim() + " - Nível " + niveis[nivel.trim()] + "."
  );
});