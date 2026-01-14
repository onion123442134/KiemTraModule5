import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/edit/:id" element={<ProductEdit />} />
            </Routes>
        </BrowserRouter>
    );
}
