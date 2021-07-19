const d = document;

export class Calculadora{
    constructor(){
        this.propina = 0;
        this.numPersonas = 1;
        this.precio = 0;
    }

    establecerPropina(valor){
        if(this.esUnNumero(valor)) return console.log("No es un numero");
        
        if(parseFloat(valor) > 1) this.propina = parseFloat(valor) / 100;
        else this.propina = parseFloat(valor);
    }

    establecerNumeroPersonas(valor){
        if(this.esUnNumero(valor)) return console.log("No es un numero");

        this.numPersonas = parseInt(valor);
    }

    establecerPrecio(valor){
        if(this.esUnNumero(valor)) return console.log("No es un numero");

        this.precio = parseFloat(valor);
    }

    obtenerPrecioPorPersona(){
        return ((this.precio + (this.precio * this.propina)) / this.numPersonas).toFixed(2);
    }

    obtnerPropinaPorPersona(){
        return ((this.precio * this.propina) / this.numPersonas).toFixed(2);
    }

    reestablecerValores(){
        this.precio = 0;
        this.numPersonas = 1;
        this.propina = 0;
    }

    esUnNumero(valor){
        return isNaN(parseFloat(valor));
    }
}

export class UI{
    mostrarValor(valor, id){
        d.getElementById(id).textContent = valor.toString();
    }

    limpiarInputs(selec){
        d.querySelectorAll(selec).forEach(el => el.value = "");
    }

    limpiarDisplays(selec){
        d.querySelectorAll(selec).forEach(el => el.textContent = "0.00");
    }

    reestablecerBotones(selec){
        d.querySelectorAll(selec).forEach(el => el.checked = false);
    }

    obtenerValorInput(id){
        return d.getElementById(id).value;
    }
}