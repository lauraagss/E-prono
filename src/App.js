import * as React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Registration from "./pages/auth/registration/Registration";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logged from "./Logged";
import GamesList from "./pages/games/GamesList";
import MatchList from "./pages/matchs/MatchList";
import TeamsList from "./pages/teams/TeamsList";
import MyBets from "./pages/mybets/MyBets";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="inscription" element={<Registration />} />
                <Route path="connexion" element={<Login />} />
                <Route path="/app" element={<Logged />} >
                    <Route path="games" element={<GamesList />} />
                    <Route path="games/:slug/matches" element={<MatchList/>} />
                    <Route path="games/:slug/teams" element={<TeamsList/>} />
                    <Route path="mybets" element={<MyBets/>} />
                </Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}
export default App;
