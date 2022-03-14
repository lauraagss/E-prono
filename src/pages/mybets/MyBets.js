import {useEffect, useState} from "react";
import { getMyBets, patchBet, patchUser } from "../../services/bets-service";
import { getMatch } from "../../services/matchs-service";
import "./MyBets.css";

function MyBets() {
    const [matchs, setMatches] = useState([]);
    const [myBets, setMyBets] = useState([]);
    const [loading, setLoading] = useState([]);
    const user = () => JSON.parse(localStorage.getItem("user"));
    const userId = user().id;

    useEffect(() => {
        async function fetchMybets(){
            setLoading(true);
            const bets = await getMyBets();
            setMyBets(bets);
            let allMatchs = [] ;
            for(const bet of bets){
                const match = await getMatch(bet.match);
                allMatchs.push(match);
            }
            setMatches(allMatchs);
            applyResult(allMatchs, bets);
            setLoading(false);
        }
        fetchMybets();

    }, [])
   
    const applyResult = async (matchs, myBets) => {
        for(const bet of myBets){
            if(!bet.ended) {
                const crtMatchWinner = matchs.find(match => match.id === bet.match).winner;
                if(crtMatchWinner === bet.winner && crtMatchWinner !== null)
                    await patchUser(userId, {coins: user().coins + bet.amount * 2})
                
                await patchBet(bet.id, {ended: true})
            }
        }
    }

    const getStatus = (currentMatch) => {
        const currentBet = myBets.find(bet => bet.match === currentMatch.id);

        if(!currentMatch.winner) {
            return "Pas terminé";
        } else if(currentMatch.winner === currentBet.winner){
            return "Gagné";
        } else {
            return "Perdu";
        }
    }

    const getClassStatus = (label) => {
        switch (label) {
            case "Pas terminé":
                return "not-finish"
            case "Gagné":
                return "win"
            default:
                return "lose"
        }
    }
    return (
        <div className="myBets-container">
            <h2>Mes paries</h2>
            <div>
                {
                    matchs.length > 0 && !loading ? matchs.map(match => (
                        <div key={"mybets" + match.id } className="match-line">
                            <span>{match.name}</span>
                            <div className={`${getClassStatus(getStatus(match))} container-status` }>
                                <span className="status">{getStatus(match)}</span>
                            </div>
                        </div>
                    ))
                    : matchs.length === 0 && !loading ?
                    "Aucun paris"
                    : "Chargement ..."
                }
            </div>
        </div>
    )
}

export default MyBets;