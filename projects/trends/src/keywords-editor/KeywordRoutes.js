
import { Route, Routes } from "react-router-dom";
import KeywordEditor from "./KeywordsEditor";
import Keywords from "./Keywords";
export default function KeywordsRoutes() {
        return <Routes >
                <Route path="editor" element={<KeywordEditor />} />
                <Route path="/" element={<Keywords />} />
        </Routes>



}