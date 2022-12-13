import { getTipoForDisplay } from "../utils/MascotaUtilities";
import React from 'react'

const CeldaMascota = ({ persona }) => {
    return (
        <>
            {persona.mascotas && persona.mascotas.map((mascota) =>
                <div key={"mascota-" + mascota.id}>
                    <b>{getTipoForDisplay(mascota.tipo)}:</b> {mascota.nombre}
                </div>
            )
            }
        </>
    );
}

export default CeldaMascota;