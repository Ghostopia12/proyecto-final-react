import React from 'react'

const FotoPerfil = (id) => {
    const obj = id;
    const xd = obj.x;
    const img = <img src={"http://localhost:8000/images/" + xd + ".jpg"} alt="foto" />;
    try {
        if (img == undefined) {
            return (
                <img src={"http://localhost:8000/images/noimage.jpg"} alt="foto" width="50" height="50" />
            );
        } else {
            return (
                <img src={"http://localhost:8000/images/" + xd + ".jpg"} alt="foto" width="50" height="50" />
            );
        }
    } catch (e) {

    }
}

export default FotoPerfil;