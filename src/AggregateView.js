import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Dot} from 'recharts';
import React from 'react';
import DetailView from './DetailView';
import ScoreSlider from './ScoreSlider';
import MatrixView from './MatrixView';
import SubjectPicker from './SubjectPicker';
import SearchBar from './SearchBar';
import races from './jsCommon/races';
import filterByRange from './utils/filterByRange';
import filterBySchool from './utils/filterBySchool';
import PredictForm from "./PredictForm";

import {
    Navbar,
    Nav,
} from 'react-bootstrap'

class AggregateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allScores: {},
            scores: {},
            schools: [],
            show: {
                black: true,
                hispanic: false,
                white: false,
                asian: false,
            },
            active: {},
            subject: 'Math',
            score_range: [-Number.MAX_VALUE, Number.MAX_VALUE],
            active_school: ''
        }
    
    };
    async getScores(subject, shouldFetch){
        if(shouldFetch === false){
            let scoresByRange = filterByRange(this.state.allScores, this.state.score_range);
            this.setState({
                scores: scoresByRange,
            });
        }
        else{
            let res = await fetch(`${process.env.REACT_APP_SAT_PROXY}scores?subject=${subject}`);
            res = await res.json();
            let scoresByRange = filterByRange(res.scores, this.state.score_range);
            this.setState({
                scores: scoresByRange,
                schools: res.schools,
                allScores: res.scores,
                subject,
            });
            if(this.state.active_school) this.schoolFilter(this.state.active_school);
        };
    };
    schoolFilter(school){
        let scoresBySchool = filterBySchool(this.state.allScores, this.state.schools.indexOf(school));
        this.setState({
            scores: scoresBySchool,
            active_school: school
        });
    };
    componentWillMount() {
       this.getScores('Math');
    };
    filterByRace({value}) {
        this.setState({show: Object.assign({}, this.state.show, {[value]: !this.state.show[value]})});
    };
    setActive(props){
        let index = props.payload[0].payload.index;
        let school = this.state.schools[index];
        let black = this.state.allScores.black[index].x;
        let white = this.state.allScores.white[index].x;
        let asian = this.state.allScores.asian[index].x;
        let hispanic = this.state.allScores.hispanic[index].x;
        let score = props.payload[0].payload.y;
        return {
                school,
                black,
                white,
                asian,
                hispanic,
                other: 100 - black - white - asian - hispanic,
                score,
        };
    };
    async unsetActiveSchool(){
        this.setState({active_school: ""});
        await this.getScores(this.state.subject, false);
    };
    renderTooltip(props) {
        if (props.active === true) {
            return (
                <div className="customToolTip">
                    <b>{this.state.schools[props.payload[0].payload.index]}</b><br></br>
                    <>Percentage of students {props.payload[0].value}%</><br></br>
                    <>SAT Score {props.payload[1].value}</>
                    <DetailView active={this.setActive(props)}/>
                </div>
               )
        }
    }
    render() {
        return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">NYC SAT Scores By Racial Makeup</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                </Navbar.Collapse>
            </Navbar>;
            <ScatterChart
                    width={650}
                    height={650}
                    margin={{
                        top: 20, right:20, bottom:20, left: 20
                    }}
                    className={`main-scatter`}
            >
                <CartesianGrid />
                <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Percentage of Students" 
                        unit="%" domain={[0, 100]}
                >
                        <Label 
                                value="Percentage of Students" 
                                offset={-10} 
                                position="insideBottom" 
                        />
                </XAxis>
                <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Average SAT Score"
                >
                        <Label 
                                value="Average SAT Score" 
                                angle={-90} 
                                position="insideBottomLeft" 
                        />
                </YAxis>
                <Tooltip    
                        cursor={{ strokeDasharray: '3 3'}} 
                        content={this.renderTooltip.bind(this)} 
                />
                <Legend className={`race-legend`} 
                        verticalAlign="top" 
                        height={50} 
                        onClick={this.filterByRace.bind(this)}
                />
                {races.map(([race, color])=>(
                    <Scatter
                        key={race}
                        name={race} 
                        data={this.state.scores[race]} 
                        fill={color}
                        className={this.state.show[race]? "": "hidden"} 
                        shape={<Dot r={this.state.active_school? 10: 5}/>}>
                    </Scatter>
                ))}
           </ScatterChart>
           <ScoreSlider active_school={this.state.schools.indexOf(this.state.active_school)} 
                        schoolFilter={this.schoolFilter.bind(this)} 
                        scores={this.state.allScores}   
                        setAggState={this.setState.bind(this)}>
           </ScoreSlider>
           <SubjectPicker 
                        getScores={this.getScores.bind(this)}>
           </SubjectPicker>
           <MatrixView></MatrixView>
           <SearchBar   schools={[...this.state.schools]} 
                        schoolFilter={this.schoolFilter.bind(this)}
                        unsetActiveSchool={this.unsetActiveSchool.bind(this)}>
           </SearchBar>
           <PredictForm>
               
           </PredictForm>
        </>
        )
    }
};
export default AggregateView;