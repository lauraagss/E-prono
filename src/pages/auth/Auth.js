import * as React from "react";
import {Link} from "react-router-dom";

export default function Auth() {
    return (
        <div>
            <nav className="navbar-home">
                <Link className='' to="/inscription">Inscription</Link>
                <Link className='' to="/connexion">Connexion</Link>
            </nav>
        </div>
    )
}