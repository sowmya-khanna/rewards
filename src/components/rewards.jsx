import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Rewards() {

    const [rewards, setRewards] = useState({});
    const [totalRewards, setTotalRewards] = useState(0);

    const [data, setData] = useState([]);

    useEffect(() => {
      fetch(`https://api.npoint.io/79ea8185045ef5fbb075`)
      .then(response => response.json())
      .then(result => setData(result))
    }, []);

    let obj = {};
    let total = 0;

    const calculate = () => {
        data.map(d => {
            let reward = 0;
            if (d.purchase_amount > 100) {
                reward += d.purchase_amount - 100 * 2;
            }
            if (d.purchase_amount > 50) {
                reward += d.purchase_amount - 50;
            }
            total += reward;

            if (obj[d.date.split('-')[1]+'-'+d.date.split('-')[2]] != null) {
                obj[d.date.split('-')[1]+'-'+d.date.split('-')[2]] += reward;
            } else {
                obj[d.date.split('-')[1]+'-'+d.date.split('-')[2]] = reward;
            }
            
            setRewards(
                prevState => ({
                    ...prevState,
                    ...obj
                })
            )
        });
        setTotalRewards(total);
    }

    return (  
        <div>
            <table className='table'>
                <tbody>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
                {
                    data.map((d, i) => 
                        <tr key={i}>
                            <td>{d.date}</td>
                            <td>{d.purchase_amount}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={()=>calculate()}>Calculate Rewards</button>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>Rewards per month</th>
                        <th></th>
                    </tr>
                    {
                        Object.entries(rewards).map((reward, i) => 
                            <tr key={i}>
                                <td>{reward[0]}</td>
                                <td>{reward[1]} points</td>
                            </tr>
                        )
                    }
                    <tr>
                        <th>Total Rewards</th>
                        <th>{totalRewards} points</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Rewards;