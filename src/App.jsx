import { Main } from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/convertor" element={ <Main isConvertor={true}/> }/>
                <Route path="/resolver" element={ <Main isConvertor={false}/> }/>
            </Routes>
        </BrowserRouter>
    )
}
