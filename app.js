const numeros = document.querySelectorAll('button#numeros');
const operadores = document.querySelectorAll('button#operador');
const igual = document.querySelector('button#igual');
const apagar = document.querySelector('button#apagar')
const deletar = document.querySelector('button#deletar')
const operacaoTextElement = document.querySelector('div#operacao')
const inputOpracaoTextElement = document.querySelector('div#input-resultado')


class Calculadora {
    constructor(operacaoTextElement, inputOpracaoTextElement) {
        this.operacaoTextElement = operacaoTextElement;
        this.inputOpracaoTextElement = inputOpracaoTextElement;
        this.limpar();
    }

    delete() { /* delete */
        this.inputOpracao = this.inputOpracao.toString().slice(0, -1)
    }

    calcular(){   /*Calculate*/ 
        let result;
        const _operacao = parseFloat(this.operacao)
        const _inputOpracao = parseFloat(this.inputOpracao)

        if(isNaN(_operacao) || isNaN(_inputOpracao)) return;

        switch (this.operador) {
            case '+': 
                result =  _operacao + _inputOpracao;
                break;
            case '-':
                result = _operacao - _inputOpracao;
                break;
            case '÷': 
                result = _operacao / _inputOpracao;
                break;
            case '*':
                result = _operacao * _inputOpracao;
                break;
            default:
                return;
        }

        this.inputOpracao = result;
        this.operador = undefined;
        this.operacao = "";
        
    }
    operadores(operador) { /*chooseOperation*/ 
        if (this.operacao !== ''){
            this.calcular();
        }
        this.operador = operador;
        this.operacao = this.inputOpracao;
        this.inputOpracao = "";
    }
    limpar() {  /*  clear*/
        this.operacao = "";
        this.inputOpracao = "";
        this.operador = undefined;
    }
    atualizar() { /* updateDisplay*/ 
        this.operacaoTextElement.innerText = `${this.operacao} ${this.operador || ""}`
        this.inputOpracaoTextElement.innerText = this.inputOpracao
    }


    acrescentarNumero(number) {
        if (this.inputOpracao.includes('.') && number == '.') return;

        this.inputOpracao = `${this.inputOpracao}${number.toString()}`
    }
}

const clickCalcular = new Calculadora(
    operacaoTextElement,
    inputOpracaoTextElement
);

for (const numero of numeros) {
    numero.addEventListener('click', () => {
        clickCalcular.acrescentarNumero(numero.innerText);
        clickCalcular.atualizar(); 
    })
}

for ( const operador of operadores) {
    operador.addEventListener('click', () => {
        clickCalcular.operadores(operador.innerText);
        clickCalcular.atualizar();
    })
}

apagar.addEventListener('click', () => {
    clickCalcular.delete();
    clickCalcular.atualizar();
})

igual.addEventListener('click', () => {
    clickCalcular.calcular();
    clickCalcular.atualizar();
})

deletar.addEventListener('click', () => {
    clickCalcular.limpar();
    clickCalcular.atualizar();
})

