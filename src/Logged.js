import * as React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {updateAxiosToken} from "./services/auth-service";
import NavBar from "./components/navBar";

export default function Logged() {
    let navigate = useNavigate();
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user) navigate(`/connexion`);
        if(user) {
            updateAxiosToken();
            setIsReady(true)
        }
    }, [navigate])

    return (
        <div>
            {isReady && (
                <>
                    <NavBar />
                    <div className="app">
                        <div className="template-base">
                            <Outlet />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
