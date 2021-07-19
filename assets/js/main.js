const d = document;
let precioTotal = 0,
    numPersonas = 1,
    propina = 0,
    totalPersona = 0,
    propinaPersona = 0;
    
 
const obtenerTotalPersona = () => ((precioTotal + (precioTotal * propina)) / numPersonas).toFixed(2);
const obtenerPropinaPersona = () => ((precioTotal * propina) / numPersonas).toFixed(2);

const mostrarResultado = (selecTotal, totalPersona, propinaPersona = 0) => {
    const $total = d.querySelectorAll(selecTotal);

    $total[0].textContent = propinaPersona.toString();
    $total[1].textContent = totalPersona.toString();
};

const obtenerDatosInputs = () => {
    d.addEventListener("keyup", e => {
        const $idInput = e.target.getAttribute("id");
        const $input = d.getElementById($idInput);
        const campos = {
            precio: valor => precioTotal = parseFloat(valor),
            personas: valor => {
                if(valor === "") numPersonas = 1;
                else numPersonas = parseInt(valor)
            },
            propina: valor => {
                if(valor === "") propina = 0;
                else propina = parseInt(valor) / 100
            },
        }
        
        campos[$idInput]($input.value);
        totalPersona = obtenerTotalPersona();
        propinaPersona = obtenerPropinaPersona();
        mostrarResultado(".card__total", totalPersona, propinaPersona);
    });
};

const desmarcarBotones = selec => {
    d.querySelectorAll(selec).forEach(el => el.checked = false);
};
const limpiarTotales = selec => {
    d.querySelectorAll(selec).forEach(el => el.textContent = "0.00");
}
const limpiarInputs = selec => {
    d.querySelectorAll(selec).forEach(el => el.value = "");
}
const limpiarValores = () => {
    precioTotal = 0;
    numPersonas = 1;
    propina = 0;
    totalPersona = 0;
}

const obtenerDescuentoBotones = () => {
    d.addEventListener("click", e => {
        if(e.target.matches("[type='radio']")){
            propina = parseFloat(e.target.value);
            totalPersona = obtenerTotalPersona();
            mostrarResultado(".card__total", totalPersona);
        }else if(e.target.matches("input[type='number']") && e.target.matches("input[id='propina']")){
            desmarcarBotones("[type='radio']");
        }
    });
};

const aplicarReset = (idReset) => {
    d.addEventListener("click", e => {
        const $botonReset = d.getElementById(idReset);

        if(e.target !== $botonReset) return;

        desmarcarBotones("[type='radio']");
        limpiarTotales(".card__total");
        limpiarInputs("input[type='number']");
        limpiarValores();
    });
}

d.addEventListener("DOMContentLoaded", e => {
    obtenerDatosInputs();
    obtenerDescuentoBotones();
    aplicarReset("reset");
});