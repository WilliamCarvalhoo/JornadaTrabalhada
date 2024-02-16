import React, { useState, useRef } from 'react';
import './App.css'; // Certifique-se de que o arquivo CSS esteja na mesma pasta que o componente App.js

function App() {
  const [resultado, setResultado] = useState('');
  const entradaRef = useRef(null);
  const saidaAlmocoRef = useRef(null);
  const retornoAlmocoRef = useRef(null);
  const saidaRef = useRef(null);

  const calcularCargaHoraria = () => {
    const entrada = entradaRef.current.value;
    const saidaAlmoco = saidaAlmocoRef.current.value;
    const retornoAlmoco = retornoAlmocoRef.current.value;
    const saida = saidaRef.current.value;

    if (!entrada || !saidaAlmoco || !retornoAlmoco || !saida) {
      alert('Digite valores válidos em todos os campos.');
      return;
    }

    const converterParaData = (tempo) => {
      const digitosApenas = /^\d+$/;
      tempo = digitosApenas.test(tempo) ? `${tempo}:00` : tempo;

      const correspondencia = tempo.match(/^(\d{1,2}):?(\d{2})$/);
      if (!correspondencia) {
        alert('Digite um formato de hora válido.');
        return null;
      }

      const horas = parseInt(correspondencia[1], 10);
      const minutos = parseInt(correspondencia[2], 10);
      return new Date(2000, 0, 1, horas, minutos);
    };

    const entradaTime = converterParaData(entrada);
    const saidaAlmocoTime = converterParaData(saidaAlmoco);
    const retornoAlmocoTime = converterParaData(retornoAlmoco);
    const saidaTime = converterParaData(saida);

    if ([entradaTime, saidaAlmocoTime, retornoAlmocoTime, saidaTime].some(time => time === null)) {
      return;
    }

    if (entradaTime.value || saidaAlmocoTime.value || retornoAlmocoTime.value || saidaTime.value > 24) {
      alert(' Insira uma hora válida ( Entre 01 e 24)')
      return;

    }
    const horasTrabalhadas = (saidaTime - entradaTime) - (retornoAlmocoTime - saidaAlmocoTime);

    const cargaHorariaMinima = 7 * 60 + 20;

    const diferenca = horasTrabalhadas - cargaHorariaMinima;
    const horas = Math.floor(diferenca / (60 * 60 * 1000));
    const minutos = Math.floor((diferenca % (60 * 60 * 1000)) / (60 * 1000));

    const tempoTrabalhado = `${horas} horas e ${minutos} minutos`;

    const horaExtra = Math.max(horas - 7, 0);
    const minutoExtra = Math.max(minutos - 20, 0);

    const horaFalta = -Math.max(horas - 7);
    const minutosFalta = -Math.max(minutos - 20);

    const horadeAlmoco = retornoAlmocoTime - saidaAlmocoTime
    const interjornada = Math.floor(horadeAlmoco / (60 * 1000))





    if (horadeAlmoco < 60 * 60 * 1000) {
      setResultado(`Você fez ${interjornada} minutos de almoço, o mínimo é 1 hora, procure o setor de RH para mais informações`);
    }
    /*else if (horadeAlmoco === almocoNegativo) {
        setResultado(`Você fez ${interjornada} de almoço, viajante do tempo `)
    }*/
    else if (diferenca > (7 * 60 * 60 * 1000 + 20 * 60 * 1000) && horaExtra > 0) {
      setResultado(`Você trabalhou ${tempoTrabalhado}, e isso gerou ${horaExtra} horas e ${minutoExtra} minutos extras.`);
    }
    else if (diferenca > (7 * 60 * 60 * 1000 + 20 * 60 * 1000) && horaExtra < 0 && minutoExtra > 0) {
      setResultado(`Você trabalhou ${tempoTrabalhado}, e isso gerou ${minutoExtra} minutos extras.`);

    }
    else if (diferenca < (7 * 60 * 60 * 1000 + 20 * 60 * 1000) && horaFalta > 0) {
      setResultado(`Você trabalhou ${tempoTrabalhado}, faltam ${horaFalta} horas e ${minutosFalta} minutos para cumprir a carga horária.`);
    }
    else if (diferenca < (7 * 60 * 60 * 1000 + 20 * 60 * 1000) && horaFalta === 0 && minutosFalta > 1) {
      setResultado(`Você trabalhou ${tempoTrabalhado}, faltam  ${minutosFalta} minutos.`);
    }
    else if (diferenca < (7 * 60 * 60 * 1000 + 20 * 60 * 1000) && horaFalta === 0 && minutosFalta === 1) {
      setResultado(`Você trabalhou ${tempoTrabalhado}, falta apenas 1 minuto `)
    }


    else {
      setResultado('A carga horária foi cumprida regularmente.');
    }
  };

  return (
    <div>
      <div className="Logos">
        <img src='/arenaatacado.png' alt='Logo Arena' />
        <img src='/saovicente.png' alt='Logo SV' />

      </div>
      <div className="container">
        <input type="text" id="entrada" ref={entradaRef} placeholder="Entrada" />
        <input type="text" id="saidaAlmoco" ref={saidaAlmocoRef} placeholder="Saída Almoço" />
        <input type="text" id="retornoAlmoco" ref={retornoAlmocoRef} placeholder="Retorno Almoço" />
        <input type="text" id="saida" ref={saidaRef} placeholder="Saída" />
        <button onClick={calcularCargaHoraria}>Calcular</button>
        <p>{resultado}</p>
      </div>
    </div>
  );
}

export default App;
