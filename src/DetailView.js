import {
    PieChart, 
    Pie, 
    Cell,
} from 'recharts';
import React from 'react';
import races from './jsCommon/races';
import SubjectView from './SubjectView';

class DetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: []
        };
    };
    componentWillReceiveProps(nextProps){
        this.propsToState(nextProps);
    };
    propsToState({active}){
        this.setState({
            active: [{
                black: active.score * (active.black / 100),
                white: active.score * (active.white / 100),
                asian: active.score * (active.asian / 100),
                hispanic: active.score * (active.hispanic / 100),
                other: active.score * (active.other / 100),
                school: active.school,
            }]
        })
    };
    pieData(data){
        if(data.length === 1){
            return [
                { name: [data[0].black], value: data[0].black },
                { name: [data[0].white], value:  data[0].white },
                { name: [data[0].asian], value: data[0].asian },
                { name: [data[0].hispanic], value: data[0].hispanic },
                { name: [data[0].other], value: data[0].other },            
            ]
        }
    }
    render() {
        return (
            <>
                <SubjectView school={this.state.active[0]? this.state.active[0].school: ''}></SubjectView>
                <PieChart className={`inner-pie`} width={350} height={350}>
                <Pie
                data={this.pieData(this.state.active)}
                cx={100}
                cy={100}
                labelLine={false}
                outerRadius={100}
                innerRadius={10}
                paddingAngle={3}
                fill="#8884d8"
                dataKey="value"
                >
                {races.map(([race, color]) => <Cell key={`cell-${race}`} fill={color} />)}
                </Pie>
            </PieChart>
            </>
        )
    }
};

export default DetailView;