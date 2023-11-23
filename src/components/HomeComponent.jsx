// import React from "react";
import { NavLink } from "react-router-dom";

export const HomeComponent = () => {
    return (
        <>
            <section className="homeContainer">
                <article className="divHome1">
                    <h1 className="text-5xl font-bold my-10 mx-5">
                        Bienvenido a Vitanav
                    </h1>
                    <p className="text-2xl">
                        Descubre una nueva forma de gestionar tu atención médica
                        con VitaNav.
                    </p>
                    <p className="text-2xl my-5">
                        Encuentra hospitales cercanos, verifica las esperas en
                        tiempo real y elige la opción que mejor se adapte a tus
                        necesidades.
                    </p>
                    <p className="text-2xl">
                        <span className="underline">
                            Conectividad en Salud:
                        </span>{" "}
                        Conéctate con una red de profesionales de la salud,
                        hospitales y centros médicos. VitaNav te brinda la
                        posibilidad de tomar decisiones respaldadas por
                        información precisa y actualizada.
                    </p>
                    <NavLink
                        to="/map"
                        className="inline-block p-5 text-xl uppercase bg-red-600 font-bold text-white rounded-lg my-40 ml-10 hover:bg-red-800 transition-all hover:p-7"
                    >
                        Ir al mapa de hospitales
                    </NavLink>
                </article>
                <article className="divHome2">
                    <img
                        src="/girl-cellphone.png"
                        alt="Chica consultando a su celular"
                        className="w-full"
                    />
                </article>
            </section>
            <footer className="bg-orange-950 w-[100%] py-2">
                <div>
                    <div className="flex justify-center">
                        <ul className="text-white text-center mb-3">
                            <li>Términos y condiciones de uso</li>
                            <li>Leandro Martín Fernández Chapotot</li>
                        </ul>
                    </div>
                    <p className="text-white text-center">
                        2023 &copy; Todos los derechos reservados
                    </p>
                </div>
            </footer>
        </>
    );
};
