import {useState, useEffect} from 'react';

function WaitingList(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>Waiting List</h4>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col">
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
                            {props.data.length === 0 && <tr>
                                <td colSpan={6} style={{padding: '15px'}}>No chefs are in waiting list.</td>
                            </tr>}
                            {props.data.map((chef, idx) =>
                                <tr key={chef._id}>
                                    <td className="text-center">{idx + 1}</td>
                                    <td>{chef.firstName} {chef.lastName}</td>
                                    <td className="text-right">{chef.abilities.find(k => k.type === "Risotto").rating}</td>
                                    <td className="text-right">{chef.abilities.find(k => k.type === "Pizza").rating}</td>
                                    <td className="text-right">{chef.abilities.find(k => k.type === "Cake").rating}</td>
                                    <td className="text-right">{chef.abilities.find(k => k.type === "Baked Potato").rating}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaitingList;
