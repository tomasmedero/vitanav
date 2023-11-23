import { Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { Navbar } from "../components";
import { AboutUsPage, AdminPage, LoadingPage, MapPage } from "../pages";

export const AppRouter = () => {
    const status = "checking2";
    //Nota Chapa Editar el Loading Page
    // const status = useCheckAuth()  Nota Chapa hacer que funcione
    if (status === "checking") {
        return <LoadingPage />;
    }

    return (
        <>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/*" element={<App />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
};
