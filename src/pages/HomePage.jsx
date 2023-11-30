import { NavLink } from "react-router-dom"

export const HomePage = () => {
    return (
        <>
            <section className="w-full flex flex-col md:flex-row h-[79.8vh]">
                <article className="w-full md:w-1/2 mx-8 px-8">
                    <h1 className="text-5xl font-bold my-10 mx-5">
                        La ruta hacía tu bienestar
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
                        className="inline-block p-5 text-xl uppercase bg-red-600 font-bold text-white rounded-lg mt-10 ml-10 hover:bg-red-800 transition-all hover:p-7"
                    >
                        Ir al mapa de hospitales
                    </NavLink>
                </article>
                <article className="w-full md:w-1/2 flex flex-row-reverse">
                    <img
                        src="/girl-cellphone.png"
                        alt="Chica consultando a su celular"
                        className="h-full object-cover"
                    />
                </article>
            </section>
        </>
    )
}
