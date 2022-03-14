import * as React from "react";
import {Link} from "react-router-dom";
import "./auth.css";

export default function Auth() {
    return (
        <div>
            <h1> Bienvenue sur E-prono</h1>
            <nav className="navbar-home">
                <Link className='' to="/inscription">Inscription</Link>
                <Link className='' to="/connexion">Connexion</Link>
            </nav>
        </div>
    )
}