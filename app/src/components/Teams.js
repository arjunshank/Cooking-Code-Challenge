import {useState, useEffect} from 'react';
import Team from './Team';

function Teams(props) {

    const [t, setT] = useState([]);

    useEffect(() => {
        let f = [];
        props.data.forEach((value, key) => f.push({
            key: key,
            value: value
        }));

        setT(f);
    }, [props.data]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Kitchen Teams</h2>
                </div>
            </div>
            <div className="row mt-10">
                <div className="col">
                    {t.length === 0 && <div>Teams are not created yet.</div>}
                </div>
            </div>

            {t.map((obj, idx) =>
                <div className="row mt-10" key={idx + 1}>
                    <div className="col">
                        <Team data={obj}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Teams;
