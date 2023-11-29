import { useState } from "react"

export const AdminComponent = () => {
    const [count, setCount] = useState(0)

    const incrementCounter = () => {
        setCount(count + 1)
    }

    const decrementCounter = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    return (
        <>
            <div className="divAdmin bg-neutral-500 h-[79.8vh] flex flex-col justify-center">
                <h2 className="text-3xl my-5 font-semibold text-center">
                    Hospital de emergencias psiquiatricas Torcuato de Alvear
                </h2>
                {/* ACÁ VA EL NOMBRE DINAMICO DE CADA HOSPITAL */}
                <p className="text-center">
                    Por favor actualice la lista de espera según las personas
                    que ingresen y egresen del establecimiento
                </p>
                <div className="divCounter">
                    <p className="text-3xl mb-10 text-center">
                        Pacientes en espera:
                    </p>
                    <div className="flex items-center justify-center mb-6">
                        <button
                            onClick={incrementCounter}
                            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded mr-5 text-5xl"
                        >
                            +
                        </button>
                        <p className="text-5xl font-bold">{count}</p>
                        <button
                            onClick={decrementCounter}
                            className="bg-red-400 hover:bg-red-600 text-white font-bold py-6 px-8 rounded ml-5 text-5xl"
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
