import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignIn from "../pages/auth/SignIn";

import Principal from "../pages/principal/Principal";
import Terminados from "../pages/principal/Terminados";
import Puntaje from "../pages/principal/Puntaje";
import PuntajeEspecifico from "../pages/principal/PuntajeEspecifico";



import FormularioEquipo from "../pages/equipo/FormularioEquipo";
import ListaEquipos from "../pages/equipo/ListaEquipo";
import EquipoFoto from "../pages/equipo/EquipoFoto";

import FormularioGrupo from "../pages/grupo/FormularioGrupo";
import ListaGrupo from "../pages/grupo/ListaGrupo";

import FormularioPartido from "../pages/partido/FormularioPartido";
import ListaPartido from "../pages/partido/ListaPartido";

import FormularioEvento from "../pages/evento/FormularioEvento";
import ListaEvento from "../pages/evento/ListaEvento";

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/terminados" element={<Terminados />} />
            <Route path="/puntuaciones" element={<Puntaje />} />
            <Route path="/puntuaciones/:id" element={<PuntajeEspecifico />} />




            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignIn />} />

            <Route path="/equipos" element={<ListaEquipos />} />
            <Route path="/equipo/create" element={<FormularioEquipo />} />
            <Route path="/equipos/:id" element={<FormularioEquipo />} />
            <Route path="/equipos/:id/foto" element={<EquipoFoto />} />

            <Route path="/grupos" element={<ListaGrupo />} />
            <Route path="/grupo/create" element={<FormularioGrupo />} />
            <Route path="/grupos/:id" element={<FormularioGrupo />} />

            <Route path="/partidos" element={<ListaPartido />} />
            <Route path="/partido/create" element={<FormularioPartido />} />
            <Route path="/partidos/:id" element={<FormularioPartido />} />

            <Route path="/eventos" element={<ListaEvento />} />
            <Route path="/evento/create" element={<FormularioEvento />} />
            <Route path="/eventos/:id" element={<FormularioEvento />} />
        </Routes>
    );
}

export default RouterConfig;