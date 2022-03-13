import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth-service";
import { getUser } from "../services/auth-service";

import "./navbar.css";

const users = getUser();
const user =  JSON.parse(users);

export default class NavBar extends React.Component{

    render() {
        return (
            <>
                <nav className="nav-bar">
                    <ul>
                        <li className="nav-bar-li-a">
                            <a key={"users" + user.id }>
                             username: {user.email}
                            </a>
                            <a key={"users" + user.id }>
                              coins:  {user.coins}
                            </a>
                        </li>
                        <a className="nav-bar-li">
                            <Link to="/app/games">Jeux</Link>
                        </a>
                        <a className="nav-bar-li">
                            <Link to="/app/mybets" >Mes paries</Link>
                        </a>
                        <li className="nav-bar-li">
                            <Link to="/" onClick={() => logout()}>
                                Deconnexion
                            </Link>
                        </li>
                    </ul>
                </nav>
            </>
        )

    }
}