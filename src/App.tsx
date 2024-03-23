import "./App.css"

import {Editor} from "./components/posts/Editor"

import { Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from "./components/Layout/Layout";
import {Posts} from "./components/posts/Posts";
import EditorContainer from "./components/posts/EditorContainer";
import {FullPostItem} from "./components/posts/FullPostItem";
const App = () => {

    return ( <div>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    <Route path="/" element={<Posts/>} />
                    <Route path="/editor/:id" element={ <EditorContainer/>} />
                    <Route path="/editor" element={ <Editor post={undefined}/>} />
                    <Route path="/post/:id" element={ <FullPostItem/>} />
                    {/*<Route path="contact" element={<Contact />} />*/}
                </Route>
            </Routes>
        </BrowserRouter>
    </div>

    )
}

export default App
