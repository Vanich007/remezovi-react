import "./App.css"

import {Editor} from "./components/editor/Editor"

import { Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from "./components/Layout/Layout";
const App = () => {

    return ( <div>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/" element={<Editor/>} />
                    <Route path="/editor" element={ <Editor/>} />
                    {/*<Route path="contact" element={<Contact />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    </div>

    )
}

export default App
