import {useEffect, useState} from "react";
import {getAllTeamsByGames} from "../../services/teams-service";
import { useParams } from 'react-router-dom';
import * as React from "react";
import "./teams.css";


export default function MatchList() {
    const [teams, setTeams] = useState([]);
    const { slug } = useParams();

    useEffect(() => {
        async function getTeams(){
            setTeams(await getAllTeamsByGames(slug))
        }
        getTeams()
    }, [slug])

    return (
        <div className="container-games">
            <h1>Liste des équipes</h1>
            {
                teams.map(team => (
                        <div className={"teams"} key={"teams" + team.id}>
                            <div>
                                <a className={"teams-name"}>{team.name}</a>

                            </div>
                            {
                                team.players && team.players.map(player => (
                                    <div key={"players" + player.id}>
                                        {player.name}
                                        {player.nationality}
                                        <img src={player.image_url}  />
                                    </div>
                                ))
                            }
                        </div>
                    )
                )
            }
        </div>
    )
}
