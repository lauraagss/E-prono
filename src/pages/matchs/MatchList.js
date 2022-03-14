import {useEffect, useState} from "react";
import {getAllMatchByGames} from "../../services/matchs-service";
import { patchUser, betMatch, getMyBets } from "../../services/bets-service";
import { useParams } from 'react-router-dom';
import "./MatchList.css";

export default function MatchList() {
    const [matchs, setMatchs] = useState([]);
    const [bet, setBet] = useState("");
    const [matchChosen, setMatchChosen] = useState("");
    const [teamChosen, setTeamChosen] = useState("");
    const [filter, setFilter] = useState("running");
    const [amountExcedeed, setAmountExcedeed] = useState(false);
    const [myBets, setMyBets] = useState([]);
    const { slug } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id

    useEffect(() => {
        async function getMatchs(){
            setMatchs(await getAllMatchByGames(slug, filter))
        }
        getMatchs()
    }, [slug, filter])

    async function fetchMyBets() {
        setMyBets(await getMyBets());
    }
    useEffect(() => {
        fetchMyBets()
    }, [])

    const handleChangeBet = async () => {
        try {
            await betMatch({
                match: matchChosen,
                winner: +teamChosen,
                amount: +bet,
                id_user: +userId,
                ended: false
            })
            const resp = await patchUser(userId, {coins: user.coins - bet});
            resp.coins < bet && setAmountExcedeed(true);
            fetchMyBets();
            setMatchChosen(null);
            setTeamChosen(null);
        } catch (error) {

        }
        
    }
    
    const handleAmountBet = (value) => {
        setBet(value);
        if (value > user.coins) setAmountExcedeed(true);
        else {
            setAmountExcedeed(false);
        }
    }

    const alreadyBet = (id) => {
        const aldBet = myBets.filter(bet => bet.match === id);
        return aldBet.length > 0 ? true : false;
    }

    return (
        <div className="container-games">
            <h1>Liste des matchs</h1>
            <button variant="contained" onClick={() => setFilter("past")}>Terminés</button>
            <button variant="contained" onClick={() => setFilter("running")}>En cours</button>
            <button variant="contained" onClick={() => setFilter("upcoming")}>A venir</button>
            {
                matchs.map(match => 
                    <div key={"match" + match.id} style={{display: "flex", justifyContent: "center"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div>{match.name}</div>
                            {   
                                filter !== "past" && !alreadyBet(match.id) && (
                                    <button variant="contained" onClick={() => setMatchChosen(match.id)}>Parier</button>
                                )
                            }
                            { matchChosen === match.id && !alreadyBet(match.id) && (
                                <>  
                                    <input value={bet} type="number" onChange={event => handleAmountBet(event.target.value)}></input>
                                    { amountExcedeed && <p style={{color:"indianred"}}>Vous avez dépasser vos coins !</p>}
                                    <div>
                                        {
                                            match.opponents.map((opponent) => (
                                                <div key={"opponent" + opponent.opponent.id}>
                                                    <input 
                                                        type="radio" 
                                                        value={opponent.opponent.id}
                                                        checked={+teamChosen === opponent.opponent.id} 
                                                        id={opponent.opponent.id} 
                                                        onChange={(event) => setTeamChosen(event.target.id)}
                                                    >
                                                    </input>
                                                    <label htmlFor={opponent.opponent.id}> {opponent.opponent.name}</label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button disabled={amountExcedeed || !teamChosen || !bet} variant="contained" onClick={handleChangeBet}>Valider</button>
                                </>
                            )}
                        </div>
                    </div>
            )}
        </div>
    )
}
