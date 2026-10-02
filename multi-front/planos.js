const planos = {
    gratuito: {
        nome: "Gratuito",
        valor: "R$ 0",
        periodo: "Sempre gratuito",
        descricao: "Comece sua jornada de aprendizado sem nenhum custo."
    },

    vip: {
        nome: "Estudante VIP",
        valor: "R$ 19,90",
        periodo: "Por mês",
        descricao: "Tenha acesso a recursos ampliados para acelerar seu aprendizado."
    },

    premium: {
        nome: "Premium",
        valor: "R$ 49,90",
        periodo: "Por mês",
        descricao: "Recursos avançados para quem deseja levar seu aprendizado ainda mais longe."
    }
};

let planoAtual = "";

function abrirCheckout(tipo) {
    const plano = planos[tipo];

    if (!plano) {
        return;
    }

    planoAtual = tipo;

    document.getElementById("modalTitulo").textContent =
        "Assinar " + plano.nome;

    document.getElementById("modalDescricao").textContent =
        plano.descricao;

    document.getElementById("resumoPlano").textContent =
        plano.nome;

    document.getElementById("resumoValor").textContent =
        plano.valor;

    document.getElementById("resumoPeriodo").textContent =
        plano.periodo;

    document.getElementById("modalCheckout").style.display = "flex";

    document.body.style.overflow = "hidden";

    resetarAbas();
}

function fecharCheckout() {
    document.getElementById("modalCheckout").style.display = "none";

    document.body.style.overflow = "";

    planoAtual = "";
}

function mudarTab(botao, aba) {
    const botoes = document.querySelectorAll(".tab-btn");
    const abas = document.querySelectorAll(".tab-conteudo");

    botoes.forEach(function (item) {
        item.classList.remove("ativo");
    });

    abas.forEach(function (item) {
        item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    const conteudo = document.getElementById("tab-" + aba);

    if (conteudo) {
        conteudo.classList.add("ativo");
    }
}

function resetarAbas() {
    const botoes = document.querySelectorAll(".tab-btn");
    const abas = document.querySelectorAll(".tab-conteudo");

    botoes.forEach(function (botao) {
        botao.classList.remove("ativo");
    });

    abas.forEach(function (aba) {
        aba.classList.remove("ativo");
    });

    if (botoes.length > 0) {
        botoes[0].classList.add("ativo");
    }

    const email = document.getElementById("tab-email");

    if (email) {
        email.classList.add("ativo");
    }
}

function toggleFaq(botao) {
    const item = botao.closest(".faq-item");

    if (!item) {
        return;
    }

    const resposta = item.querySelector(".faq-resposta");
    const icone = item.querySelector(".faq-icone");
    const aberto = item.classList.contains("aberto");

    document.querySelectorAll(".faq-item").forEach(function (faq) {
        faq.classList.remove("aberto");

        const resp = faq.querySelector(".faq-resposta");
        const icon = faq.querySelector(".faq-icone");

        if (resp) {
            resp.style.maxHeight = null;
        }

        if (icon) {
            icon.textContent = "+";
        }
    });

    if (!aberto) {
        item.classList.add("aberto");

        if (resposta) {
            resposta.style.maxHeight = resposta.scrollHeight + "px";
        }

        if (icone) {
            icone.textContent = "−";
        }
    }
}

function formatarCartao(input) {
    let valor = input.value.replace(/\D/g, "");

    valor = valor.substring(0, 16);

    let resultado = "";

    for (let i = 0; i < valor.length; i++) {
        if (i > 0 && i % 4 === 0) {
            resultado += " ";
        }

        resultado += valor[i];
    }

    input.value = resultado;
}

function formatarValidade(input) {
    let valor = input.value.replace(/\D/g, "");

    valor = valor.substring(0, 4);

    if (valor.length > 2) {
        valor =
            valor.substring(0, 2) +
            "/" +
            valor.substring(2);
    }

    input.value = valor;
}

function processarEmail() {
    const formulario = document.querySelector("#tab-email form");

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const nome = formulario.querySelector(
        'input[type="text"]'
    ).value;

    mostrarToast(
        "Cadastro realizado com sucesso, " + nome + "!",
        "sucesso"
    );

    formulario.reset();

    setTimeout(function () {
        fecharCheckout();
    }, 1500);
}

function processarCartao() {
    const formulario = document.querySelector("#tab-cartao form");

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    const campos = formulario.querySelectorAll("input");

    const numero = campos[2].value.replace(/\D/g, "");
    const validade = campos[3].value;
    const cvv = campos[4].value;

    if (numero.length !== 16) {
        mostrarToast(
            "Digite um número de cartão válido.",
            "erro"
        );
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(validade)) {
        mostrarToast(
            "Digite uma validade válida.",
            "erro"
        );
        return;
    }

    const mes = Number(validade.substring(0, 2));

    if (mes < 1 || mes > 12) {
        mostrarToast(
            "O mês da validade é inválido.",
            "erro"
        );
        return;
    }

    if (cvv.length !== 3) {
        mostrarToast(
            "O CVV deve ter 3 números.",
            "erro"
        );
        return;
    }

    mostrarToast(
        "Pagamento realizado com sucesso!",
        "sucesso"
    );

    formulario.reset();

    setTimeout(function () {
        fecharCheckout();
    }, 1500);
}

function mostrarToast(mensagem, tipo) {
    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = mensagem;
    toast.className = "toast " + tipo;

    setTimeout(function () {
        toast.classList.add("mostrar");
    }, 10);

    setTimeout(function () {
        toast.classList.remove("mostrar");
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalCheckout");

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                fecharCheckout();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            fecharCheckout();
        }
    });
});
