import React from 'react';
import races from './jsCommon/races';
import boroughs from './jsCommon/boroughs';

class PredictForm extends React.Component{
    constructor(){
        super();
        this.state = {
            url: new URL("http://127.0.0.1:5000/predict"),
            score: 617,
            borough: 'Manhattan',
            'Percent Black': 20,
            'Percent White': 20,
            'Percent Asian': 20,
            'Percent Hispanic': 20,
            'Percent Other': 20,
            'Spent Per Student': 1000,
            'Student enrollment': 1000,
            'Manhattan': 1,
            'Staten': 0,
            'Bronx': 0,
            'Queens': 0,
            'Brooklyn': 0,
            'Math': 1,
            'Reading': 0,
            "Writing": 0,
            "subject": 'Math'
        }
    };
    validate_demographics(params){
        let sum = params['Percent Black'] + params['Percent White'] + params['Percent Asian'] + params['Percent Hispanic'] + params['Percent Other']
        return 100 === sum
    };
    set_field(event){
        this.setState({[event.target.labels[0].textContent]: parseInt(event.target.value)});
    };
    set_borough(event){
        let new_borough = event.target.value
        let new_state = boroughs.map((borough)=>{
            let value = borough === new_borough? 1: 0
            return [borough, value]
        });
        new_state.push(['borough', new_borough])
        this.setState(Object.fromEntries(new_state))
    };
    async get_prediction(){
        let {url, score, borough, ...params} = this.state
        if(this.validate_demographics(params)){
            this.state.url.search = new URLSearchParams(params)
            let res = await fetch(this.state.url);
            res = await res.json();
            this.setState({'score': Math.floor(res)});
        }
        else{
            alert('Your demograpic percentages must sum up to 100%')
        }
    };
    set_subject(event){
        let new_subject = event.target.value
        let new_state = ['Math', 'Reading', 'Writing'].map((sub)=>{
            let value = sub === new_subject? 1: 0
            return [sub, value]
        });
        new_state.push(['subject', new_subject])
        this.setState(Object.fromEntries(new_state))
    };
    render() {
        return (
            <>
            <div>
                <form>
                    <button className="btn btn-danger" type="button" aria-haspopup="true" aria-expanded="false">{this.state.score}</button>
                    {races.map(([race])=>{
                        race = race.charAt(0).toUpperCase() + race.slice(1)
                        return (
                        <div className="form-group" key={race+"_key"}>
                            <label htmlFor={race + "_input_predict"}>{"Percent " + race }</label>
                            <input  type="number" 
                                    onChange={this.set_field.bind(this)} 
                                    className="form-control race_predict_input" 
                                    id={race + "_input_predict"} 
                                    placeholder="20">
                            </input>
                        </div> 
                        )
                    })}
                    {["Spent Per Student", "Student Enrollment"].map((field)=>{
                        return (
                        <div className="form-group"  key={field+"_key"}>
                            <label htmlFor={field + "_input_predict"}>{field}</label>
                            <input 
                                    type="number" 
                                    onChange={this.set_field.bind(this)} 
                                    className="form-control race_predict_input" 
                                    id={field + "_input_predict"} 
                                    placeholder="1000">
                            </input>
                        </div> 
                        )
                    })}
                    <div className="btn-group">

                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.borough}
                    </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {boroughs.map((borough)=>{
                            return(  <button  type="button"  
                                                key={borough+"_key"}
                                                onClick={this.set_borough.bind(this)} 
                                                className="dropdown-item" 
                                                value={borough}>{borough}
                                        </button>
                                )
                            })}
                        </div>
                    </div>
                  
                    <div className="btn-group">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonSubject" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.subject}
                    </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonSubject">
                            {['Math', 'Reading', 'Writing'].map((subject)=>{
                            return(  <button  type="button"  
                                                key={subject+"_key"}
                                                onClick={this.set_subject.bind(this)} 
                                                className="dropdown-item" 
                                                value={subject}>{subject}
                                        </button>
                                )
                            })}
                        </div>
                    </div>
                    <button className="btn btn-info" onClick={this.get_prediction.bind(this)} type="button" aria-haspopup="true" aria-expanded="false">
                    Submit
                    </button>
                </form>
            </div>
            </>
        )
    }
};
export default PredictForm;