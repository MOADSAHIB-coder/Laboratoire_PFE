import { Route, Routes } from "react-router-dom"
import Test from "./test"

function Testauth(){
    return (
        <Routes>
            <Route path="/" element={<Test />}/>
        </Routes>
    )

}

export default Testauth