import React from 'react';
import MatrixView from './MatrixView';
import PredictForm from "./PredictForm";
import AggregateView from "./AggregateView";
const Route = require('react-router-dom').Route;

class Routing extends React.Component {
    render(){
        return(
            <div>
                <Route exact path="/" component={AggregateView}></Route>
                <Route exact path="/matrix" component={MatrixView}></Route>
                <Route exact path="/predict" component={PredictForm}></Route>
            </div>
        )
    }
}
export default Routing;