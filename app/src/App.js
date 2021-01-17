import {useState, useEffect} from 'react';
import './App.css';
import chefsJson from './data/chefs.json';
import WaitingList from "./components/WaitingList";
import Teams from "./components/Teams";

function App() {
    const [chefs, setChefs] = useState(chefsJson.chefs);
    const [teams, setTeams] = useState([]);
    const [waiting, setWaiting] = useState([]);
    const [noOfTeams, setNoOfTeams] = useState(4);

    useEffect(() => {
        // set all chefs in wating list in the begining
        setWaiting(chefs);
    }, []);

    const hanldeSubmit = e => {
        e.preventDefault();

        // check if user have not provided no. of teams greater then no. of chefs, which is not possible.
        if (noOfTeams > chefs.length) {
            alert(`You cannot create more teams then no. of chefs present.\nChefs present: ${chefs.length}\nMax no. of teams: ${chefs.length}`);
            return;
        }

        // do some helping calculations
        const reminder = chefs.length % noOfTeams;
        const noOfChefsInEachTeam = (chefs.length - reminder) / noOfTeams;
        const noOfChefsInWaitingList = reminder;
        const noOfChefsTobeSelected = chefs.length - noOfChefsInWaitingList;

        // separating the selected/not-selected chefs
        const selectedChefs = chefs.slice(0, noOfChefsTobeSelected);
        const notSelectedChefs = chefs.slice(noOfChefsTobeSelected, chefs.length);
        // setting the waiting list
        setWaiting(notSelectedChefs);

        // adding average of abilities in each chef, so that we can compare chefs among each other to make equal teams
        const chefsWithAverage = selectedChefs.map(x => {
            return {...x, average: x.abilities.reduce((accu, curr) => accu + curr.rating, 0) / 4}
        });

        // sorting with average
        const chefsOrderedWithAverage = chefsWithAverage.sort((a, b) => b.average - a.average);

        // create a Map variable to store teams data
        let result = new Map();

        // giving name "Team 1", "Team 2" and so on to each team, initialzing with empty arrary
        for (let j = 1; j <= noOfTeams; j++)
            result.set(`Team ${j}`, new Array());

        // separator will separate each chefs in teams
        let separator = 1;

        // looping through all selected chefs and putting them in teams
        for (let i = 0; i < selectedChefs.length; i++) {

            // getting existing chefs array in a team
            let f = result.get(`Team ${separator}`);

            // check if the team is not full yet, add one more chef with high average ability
            if (f.length < noOfChefsInEachTeam) {
                f.push(chefsOrderedWithAverage[i]);
            }

            // check if the team is not full yet, add one more chef with lowest average ability
            if (f.length < noOfChefsInEachTeam) {
                f.push(chefsOrderedWithAverage[selectedChefs.length - i - 1]);
            }

            // then add the array back in our result variable
            result.set(`Team ${separator}`, f);

            // counter up
            separator += 1;

            // if counter is going up the no. of teams, bring it back to fill team 1
            if (separator > noOfTeams) {
                separator = 1;
            }
        }

        // finally setting the results to our state variable
        setTeams(result);
    }

    const hanldeReset = e => {
        e.preventDefault();

        // to reset whole challenge, just reset the teams and set all chefs to wating list
        setTeams([]);
        setWaiting(chefs);
    }

    return (
        <div className="container">
            <div className="row mt-30">
                <div className="col">
                    <h2>Cooking Show Challenge!</h2>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col text-left">
                    <label style={{width: '100%'}}>Choose no. of teams you want to create</label>
                    <input type="number" className="form-control" placeholder={5}
                           style={{width: '40%', display: 'inline'}}
                           min={1} step={1} max={chefs.length}
                           value={noOfTeams} onChange={e => setNoOfTeams(parseInt(e.target.value))}/>
                    <button className="btn btn-primary m-1" onClick={hanldeSubmit}>Create Teams</button>
                    <button className="btn btn-secondary m-1" onClick={hanldeReset}>Reset Teams</button>
                </div>
            </div>
            <div className="row mt-20">
                <div className="col">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="teams-tab" data-toggle="tab" href="#teams" role="tab"
                               aria-controls="teams" aria-selected="true">Kitchen Teams</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="waiting-tab" data-toggle="tab" href="#waiting" role="tab"
                               aria-controls="waiting" aria-selected="false">Waiting List</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active mt-10" id="teams" role="tabpanel"
                             aria-labelledby="teams-tab">
                            <Teams data={teams}/>
                        </div>
                        <div className="tab-pane fade mt-10" id="waiting" role="tabpanel" aria-labelledby="waiting-tab">
                            <WaitingList data={waiting}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
