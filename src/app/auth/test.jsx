import { NavLink } from "react-router-dom"

function Test(){
    return (
        <div>
            <NavLink to='/etudiant/dashboard'>
            <span>
                Etudiant
            </span>
            </NavLink>
            <br /><br />
            <NavLink to='/enseignant/dashboard'>
            <span>
                Enseignant
            </span>
            </NavLink>

        </div>
    )

}

export default Test