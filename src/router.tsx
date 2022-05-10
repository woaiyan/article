import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Article from "./pages/article";
import Note from "./pages/note";
import Svg from "./pages/svg";
const Router = () => (
    <Routes>
        <Route path="/svg" element={<Svg/>}/>
        <Route path="/article" element={<Article/>}></Route>
        <Route path="/note" element={<Note/>}></Route>
    </Routes>
);
export default Router;
