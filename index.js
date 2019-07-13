const $buttomJogar = document.querySelector(".wrap-button-jogar");
const $board = document.querySelector(".wrap-board");
const $campos = [...document.querySelectorAll(".campos")];
const $placares = [...document.querySelectorAll(".placar-jogador")];
const $placarJogador1 = document.querySelector(".placar-jogador-1");
const $placarJogador2 = document.querySelector(".placar-jogador-2");
const $buttonMD = document.querySelector(".button-md");
const $buttonStateMD = document.querySelector(".button-md-state");
const $buttonBot = document.querySelector(".button-bot");
const $buttonStateBot = document.querySelector(".button-bot-state");
const pontuacaoJogador1 = parseInt($placarJogador1.textContent);
const pontuacaoJogador2 = parseInt($placarJogador2.textContent);
const inputJogador1 = document.querySelector(".input-jogador1");
const inputJogador2 = document.querySelector(".input-jogador2");
const boxHistorico = document.querySelector(".container-historico");
const boxCenarioVencedor = document.querySelector(".wrap-cenario-vencedor");
const textCenario = document.querySelector(".text-cenario");
const $containerHistorico = document.querySelector(".container-historico");

let arrayHistorico = [];
const locais = [
  "Primeiro",
  "Segundo",
  "Terceiro",
  "Quarto",
  "Quinto",
  "Sexto",
  "Setimo",
  "Oitavo",
  "Nono"
];

let bot = false;
let md3 = true;
let arrayCampos = $campos;
let numero = 0;
let vencedor = "";
let vencedorMelhorDeTres = 0;
let fimDeJogo = true;
let velha;
let jogada = true;
let vezDoBot = false;
let primeiraJogada = true;
let jogadorAtual = "";
let local = "";
let localJogado = null;

const resetarVelha = () => {
  if (checarVelha()) {
    setTimeout(limparMD, 2000);
    fimDeJogo = true;
  }
};

const pintarVelha = () => {
  if (checarVelha() && vencedor == "") {
    $campos.map(campo => campo.classList.add("campos2"));
  }
  resetarVelha();
};

const checarVelha = () => {
  let velha = true;
  arrayCampos.map(campos => (!campos.textContent ? (velha = false) : null));
  velha ? (fimDeJogo = true) : null;
  return velha;
};

const testarLinha = linha => {
  const elementLinha = linha;
  linha = [linha[0].textContent, linha[1].textContent, linha[2].textContent];
  let isNotEqual = false;
  linha.map(letra => {
    if (letra != saberJogador()) isNotEqual = true;
  });
  if (isNotEqual) return;
  vencedor = saberJogador();
  if (!vencedor) return;
  if (vencedor == "X")
    $placarJogador1.innerHTML = parseInt($placarJogador1.textContent) + 1;
  if (vencedor == "O")
    $placarJogador2.innerHTML = parseInt($placarJogador2.textContent) + 1;
  setTimeout(limparMD, 2000);
  fimDeJogo = true;
  pintarVencedor(elementLinha);
};

// Detector do vencedor

const checarVencedor = () => {
  const linha789 = [arrayCampos[0], arrayCampos[1], arrayCampos[2]];
  const linha456 = [arrayCampos[3], arrayCampos[4], arrayCampos[5]];
  const linha123 = [arrayCampos[6], arrayCampos[7], arrayCampos[8]];
  const coluna741 = [arrayCampos[0], arrayCampos[3], arrayCampos[6]];
  const coluna852 = [arrayCampos[1], arrayCampos[4], arrayCampos[7]];
  const coluna963 = [arrayCampos[2], arrayCampos[5], arrayCampos[8]];
  const diagonal753 = [arrayCampos[0], arrayCampos[4], arrayCampos[8]];
  const diagonal951 = [arrayCampos[2], arrayCampos[4], arrayCampos[6]];

  const linhas = [
    linha789,
    linha456,
    linha123,
    coluna741,
    coluna852,
    coluna963,
    diagonal753,
    diagonal951
  ];
  for (linha of linhas) {
    testarLinha(linha);
  }
};

const saberJogador = () => {
  jogada ? (jogadorAtual = "X") : (jogadorAtual = "O");
  return jogadorAtual;
};

$board.addEventListener("click", function(e) {
  console.log(arrayHistorico)
  if (e.target.classList.contains("jogo-da-velha")) {
  } else {
    if (e.target.textContent == "" && fimDeJogo == false && jogar) {
      const classe = e.target.classList[1];
      arrayCampos[classe[5] - 1].textContent = saberJogador();
      local = `${locais[classe[5] - 1]} campo`;
      addHistorico();
      checarVencedor();
      pintarVelha();
      criarArrayHistorico();
      addElementoHistoricoPartidas();
      melhorDeTres();
      melhorDeCinco();
      jogada = !jogada;
      if (bot) random();
    }
  }

  if (jogar == false) {
    $buttomJogar.classList.add("button-jogar-vermelho");
    setTimeout(function() {
      $buttomJogar.classList.remove("button-jogar-vermelho");
    }, 250);
    setTimeout(function() {
      $buttomJogar.classList.add("button-jogar-vermelho");
    }, 500);
    setTimeout(function() {
      $buttomJogar.classList.remove("button-jogar-vermelho");
    }, 750);
    setTimeout(function() {
      $buttomJogar.classList.add("button-jogar-vermelho");
    }, 1000);
    setTimeout(function() {
      $buttomJogar.classList.remove("button-jogar-vermelho");
    }, 1250);
  }
});

const limparCampos = () => {
  $campos.map(campo => (campo.textContent = ""));
};

// Pinta as letras vencedoras

const resetarPlacar = () => {
  $placarJogador1.innerHTML = "0";
  $placarJogador2.innerHTML = "0";
};

let jogar = false;

$buttomJogar.addEventListener("click", function() {
  $buttomJogar.classList.toggle("button-reiniciar");
  resetaHistoricoVitoria();
  limparMD();
  jogar = !jogar;
  if (jogar) {
    fimDeJogo = false;
    $buttomJogar.textContent = "Reiniciar";
    inputJogador1.disabled = true;
    inputJogador2.disabled = true;
  } else {
    $buttomJogar.textContent = "Jogar";
    $buttomJogar.classList.add("button-jogar-text");
    inputJogador1.disabled = false;
    inputJogador2.disabled = false;
    resetarPlacar();
    despintarVencedor();
    jogada = true;
    fimDeJogo = true;
  }
});

const pintarVencedor = linhas => {
  linhas.map(item => item.classList.add("campos2"));
};

const despintarVencedor = () =>
  arrayCampos.map(campo => campo.classList.remove("campos2"));

$buttonBot.addEventListener("click", function() {
  $buttonStateBot.classList.toggle("button-bot-state2");
  bot = !bot;
  limparMD();
});


$buttonMD.addEventListener("click", function() {
  limparMD();
  resetarPlacar();
  $buttonStateMD.classList.toggle("button-md-state2");
  md3 = !md3;
});

const limparMD = () => {
  limparCampos();
  resetaArrayHistorico();
  primeiraJogada = true;
  despintarVencedor();
  fimDeJogo = false;
  boxHistorico.innerHTML = "";
  jogada = true;
  vencedor = "";
  numero = 0;
  if (vencedorMelhorDeTres > 0 || vencedorMelhorDeTres > 0) {
    resetaHistoricoVitoria();
    vencedorMelhorDeTres = 0;
  }
};

const melhorDeTres = () => {
  if ($placarJogador1.innerHTML == "2" && md3) {
    vencedorMelhorDeTres = 1;
    setTimeout(limparMD, 2000);
    setTimeout(resetarPlacar, 2000);
  } else if ($placarJogador2.innerHTML == "2" && md3) {
    vencedorMelhorDeTres = 2;
    setTimeout(limparMD, 2000);
    setTimeout(resetarPlacar, 2000);
  }
};
const melhorDeCinco = () => {
  if ($placarJogador1.innerHTML == "3" && md3 == false) {
    vencedorMelhorDeTres = 1;
    setTimeout(resetarPlacar, 2000);
    setTimeout(limparMD, 2000);
  } else if ($placarJogador2.innerHTML == "3" && md3 == false) {
    vencedorMelhorDeTres = 2;
    setTimeout(resetarPlacar, 2000);
    setTimeout(limparMD, 2000);
  }
}


const random = () => {
  const randomNumber = Math.floor(Math.random() * 9);
  if (!fimDeJogo) botFacil(randomNumber);
};

const botFacil = randomNumber => {
  if (!!arrayCampos[randomNumber].textContent) {
    return random();
  }
  if (fimDeJogo) return;
  arrayCampos[randomNumber].textContent = saberJogador();
  local = `${locais[randomNumber]} campo`;
  criarArrayHistorico();
  addHistorico();
  checarVencedor();
  jogada = !jogada;
};

const escreverNomeJogador = textNomeJogador => {
  if (saberJogador() == "X") textNomeJogador.textContent = inputJogador1.value;
  if (saberJogador() == "O") textNomeJogador.textContent = inputJogador2.value;
};

const addHistorico = () => {
  const historicoElement = document.querySelector(".container-historico");
  historicoElement.appendChild(criaElementoHistorico());
}

const criaElementoHistorico = () => {
  const boxHistorico = document.createElement("div");
  boxHistorico.classList.add("box-historico");
  boxHistorico.classList.add(`box-historico${numero}`);

  const letraJogador = document.createElement("div");
  letraJogador.classList.add("letra-jogador");
  letraJogador.classList.add(`box-historico${numero}`);
  letraJogador.textContent = jogadorAtual;

  const wrapJogadorLocal = document.createElement("div");
  wrapJogadorLocal.classList.add("wrap-jogador-local");
  wrapJogadorLocal.classList.add(`box-historico${numero}`);

  const textNomeJogador = document.createElement("div");
  textNomeJogador.classList.add("wrap-jogador-local");
  textNomeJogador.classList.add(`box-historico${numero}`);
  escreverNomeJogador(textNomeJogador);

  const textLocalJogada = document.createElement("div");
  textLocalJogada.classList.add("text-local-jogada");
  textLocalJogada.classList.add(`box-historico${numero}`);
  textLocalJogada.textContent = local;
  numero++;

  boxHistorico.appendChild(letraJogador);
  boxHistorico.appendChild(wrapJogadorLocal);
  wrapJogadorLocal.appendChild(textNomeJogador);
  wrapJogadorLocal.appendChild(textLocalJogada);
  return boxHistorico;
}
const addElementoHistoricoPartidas = () => {
  if (fimDeJogo) {
    const boxHistoricoVencedor = document.createElement("div");
    boxHistoricoVencedor.classList.add("wrap-cenario-vencedor-miniboard");

    boxHistoricoVencedor.appendChild(criaElementoHistoricoPartidas());
    boxHistoricoVencedor.appendChild(escreverCenario());
    boxHistoricoVencedor.appendChild(criarMiniBoards());
    boxCenarioVencedor.appendChild(boxHistoricoVencedor);
  }
}

const escreverVelha = textVencedor => {
  if (checarVelha()) {
    textVencedor.innerHTML = "VELHA";
  }
}

const criaElementoHistoricoPartidas = () => {
  const boxVencedor = document.createElement("div");
  boxVencedor.classList.add("box-vencedor");

  const textVencedor = document.createElement("div");
  textVencedor.classList.add("box-vencedor-vencedor");
  textVencedor.innerHTML = "Vencedor";
  escreverVelha(textVencedor);

  const textNome = document.createElement("div");
  textNome.classList.add("box-vencedor-nome");
  escreverNomeVencedor(textNome);

  boxVencedor.appendChild(textVencedor);
  boxVencedor.appendChild(textNome);
  return boxVencedor;
}

const escreverNomeVencedor = textNome => {
  if (vencedor == "X") {
    textNome.textContent = inputJogador1.value;
  } else if (vencedor == "O") {
    textNome.textContent = inputJogador2.value;
  }
}

const escreverCenario = () => {
  const cenarioVencedorMiniBoard = document.createElement("div");
  const textCenario = document.createElement("span");
  cenarioVencedorMiniBoard.appendChild(textCenario);
  textCenario.classList.add("text-cenario");
  textCenario.textContent = "Cenário";
  return cenarioVencedorMiniBoard;
}

const criarMiniBoards = () => {
  const miniBoard = document.createElement("div");
  miniBoard.classList.add("mini-board");

  $campos.map(campo => {
    const miniCampo = document.createElement("div");
    miniCampo.classList.add("mini-campos");
    miniBoard.appendChild(miniCampo);
    miniCampo.textContent = campo.textContent;
  });
  return miniBoard;
}

const criarArrayHistorico = () => {
  const oldBoard = [];
  arrayCampos.map(item => oldBoard.push(item.textContent));
  arrayHistorico.push(oldBoard);
}

const montaBoard = arrayCampoBoard =>
  arrayCampoBoard.map((item, index) => (arrayCampos[index].textContent = item));

$containerHistorico.addEventListener("click", function(e) {
  if (!!e.target.classList.contains("container-historico")) return;
  const position = e.target.classList[1];
  limparCampos();
  montaBoard(arrayHistorico[position[13]]);
  console.log(arrayHistorico[position[13]]);
})

const resetaArrayHistorico = () => {
  arrayHistorico = []
} 

const resetaHistoricoVitoria = () => {
  document.querySelector(".wrap-cenario-vencedor").innerHTML = "";
}
 