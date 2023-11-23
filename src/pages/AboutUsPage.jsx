export const AboutUsPage = () => {
    return (
        <>
            <section className="containerAbout">
                <h1 className="text-5xl font-bold mt-5 mb-10 ml-10">
                    Sobre el creador
                </h1>
                <section className="divAbout">
                    <article className="article1">
                        <p className="text-2xl">
                            ¡Hola! Soy Leandro Martín Fernández Chapotot, el
                            cerebro detrás de VitaNav. Como desarrollador
                            Full-Stack, he fusionado mi pasión por la tecnología
                            con un compromiso profundo con la salud y el
                            bienestar.
                        </p>
                        <p className="text-2xl my-10">
                            VitaNav nació en 2022 cursando la carrera de Diseño
                            Y Programación Web en la Escuela Da Vinci. Mi
                            objetivo es ofrecer a las personas la capacidad de
                            tomar decisiones informadas sobre los
                            establecimientos médicos y la información de la
                            lista de espera en tiempo real, para que cada
                            persona pueda decidir que lugar le conviene más.
                        </p>
                    </article>
                    <article className="article2">
                        <img
                            src="./foto-cv.png"
                            alt="Fotografía de Leandro Fernandez"
                            className="w-[80%]"
                        />
                    </article>
                </section>
            </section>
        </>
    );
};
