export const getTipoForDisplay = (tipo) => {
    switch (tipo) {
        case 0:
            return "Perro";
        case 1:
            return "Gato";
        case 2:
            return "Llama";
        case 3:
            return "Loro";
        case 4:
            return "Capibara";
        default:
            return "Otro";
    }
}