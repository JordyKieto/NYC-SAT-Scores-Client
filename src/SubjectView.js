import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
} from 'recharts';
import React from 'react';

class SubjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: {"math":0,"reading":0,"writing":0}
        };
    };
    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    async componentWillReceiveProps({school}){
        if (this.state.scores.math === 0){
                let res = await fetch(`${process.env.REACT_APP_SAT_PROXY}scores?school=${school}`);
                let scores = await res.json();
            if(this._isMounted) {
                this.setState({scores})
            }
        }
    };
    render() {
        return (
            <>
                <BarChart
                    width={400}
                    height={275}
                    data={[this.state.scores]}
                    margin={{
                        top:20, right: 30, left: 20, bottom: 5
                    }}
                    className={`inner-bar`}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis/>
                    <YAxis domain={[0, 800]}/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="math" stackId="math" fill="#140d77"/>
                    <Bar dataKey="reading" stackId="reading" fill="#FFFF33"/>
                    <Bar dataKey="writing" stackId="writing" fill="#56912e"/>
                </BarChart>
            </>
        )
    }
};

export default SubjectView;