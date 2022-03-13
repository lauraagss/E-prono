import {useEffect, useState} from "react";
import {getAllGames} from "../../services/games-service";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./games.css";



export default function GamesList() {
    const [games, setGames] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        async function getGames(){
            setGames(await getAllGames())
        }
        getGames()

    }, [])
    return (
        <div className="container-games">
            <h1>Liste des jeux</h1>
            {
                games.map(game => (

                        <div className={"game-content"} key={"games" + game.id}>
                            <h2>Game</h2>
                            <div className={"game-name"}>
                                {game.name}
                                <div className={"game-button"}>
                                <button onClick={() => navigate(`/app/games/${game.slug}/matches`)}>Voir les matchs</button>
                                <button onClick={() => navigate(`/app/games/${game.slug}/teams`)}>Voir les équipes</button>
                                </div>
                            </div>
                            <h2>Liste des leagues</h2>
                            <div className={"game-league-content"}>
                            {
                                game.leagues && game.leagues.map(league => (
                                    <div  className={"game-league"} key={"leagues" + league.id}>
                                        {league.name}
                                        <img src={league.image_url}  />
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}