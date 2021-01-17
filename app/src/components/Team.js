import {useState, useEffect} from 'react';

function Team(props) {

    const getAverage = type => props.data.value.map(x => x.abilities.find(k => k.type === type).rating).reduce((accu, curr) => accu + curr, 0) / props.data.value.length;

    return (
        <div>
            <h3>{props.data.key} (Average ability: {parseFloat((getAverage("Risotto")+getAverage("Pizza")+getAverage("Cake")+getAverage("Baked Potato"))/4).toFixed(2)})</h3>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-sm">
                    <thead>
                    <tr>
                        <th>Sr.#</th>
                        <th>Full Name</th>
                        <th>Risotto Rating</th>
                        <th>Pizza Rating</th>
                        <th>Cake Rating</th>
                        <th>Baked Potato Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.data.value.map((chef, idx) =>
                        <tr key={chef._id}>
                            <td className="text-center">{idx + 1}</td>
                            <td>{chef.firstName} {chef.lastName}</td>
                            <td className="text-right">{chef.abilities.find(k => k.type === "Risotto").rating}</td>
                            <td className="text-right">{chef.abilities.find(k => k.type === "Pizza").rating}</td>
                            <td className="text-right">{chef.abilities.find(k => k.type === "Cake").rating}</td>
                            <td className="text-right">{chef.abilities.find(k => k.type === "Baked Potato").rating}</td>
                        </tr>
                    )}
                    <tr>
                        <th></th>
                        <th>Average</th>
                        <td className="text-right" style={{fontWeight: '700'}}>{getAverage("Risotto")}</td>
                        <td className="text-right" style={{fontWeight: '700'}}>{getAverage("Pizza")}</td>
                        <td className="text-right" style={{fontWeight: '700'}}>{getAverage("Cake")}</td>
                        <td className="text-right" style={{fontWeight: '700'}}>{getAverage("Baked Potato")}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Team;
