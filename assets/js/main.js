import { Calculadora, UI } from "./clases.js";
import { esElemento } from "./funciones.js";

const d = document,
    calc = new Calculadora(),
    ui = new UI();


const mostrarResultado = (valor, id) => {
    ui.mostrarValor(valor, id);
};

const obtenerDatosInputs = () => {
    d.addEventListener("keyup", e => {
        const $id = e.target.getAttribute("id");
        const valor = ui.obtenerValorInput($id);

        const campos = {
            precio: valor => calc.establecerPrecio(valor),
            personas: valor => calc.establecerNumeroPersonas(valor),
            propina: valor => calc.establecerPropina(valor),
        }
        
        campos[$id](valor);
        mostrarResultado(calc.obtenerPrecioPorPersona(), "precios");
        mostrarResultado(calc.obtnerPropinaPorPersona(), "propinas");
    });
};

const obtenerDescuentoBotones = () => {
    d.addEventListener("click", e => {
        if(e.target.matches("[type='radio']")){
            calc.establecerPropina(e.target.value);
            mostrarResultado(calc.obtnerPropinaPorPersona(), "propinas");
        }
        
        if(esElemento(e, "input[type='number']") 
        && esElemento(e, "input[id='propina']")){
            ui.reestablecerBotones("[type='radio']");
        }
    });
};

const aplicarReset = (idReset) => {
    const $botonReset = d.getElementById(idReset);

    d.addEventListener("click", e => {
        if(e.target !== $botonReset) return;

        ui.reestablecerBotones("[type='radio']");
        ui.limpiarDisplays(".card__total");
        ui.limpiarInputs("input[type='number']");
        calc.reestablecerValores();
    });
}

d.addEventListener("DOMContentLoaded", e => {
    obtenerDatosInputs();
    obtenerDescuentoBotones();
    aplicarReset("reset");
});