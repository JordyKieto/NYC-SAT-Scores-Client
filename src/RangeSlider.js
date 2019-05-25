import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const BinarySearchTree = require('binary-search-tree').BinarySearchTree;


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
// const Handle = Slider.Handle;



class RangeSlider extends React.Component{
    handle([lesserOrEqual, greaterOrEqual]) {
        let newScores = {}
        for (let race in this.props.scores){
                newScores[race] = 
                this.props.scores[race].betweenBounds({ $gte: lesserOrEqual, $lte: greaterOrEqual })
                .reduce((bst, curr)=>{bst.insert(curr.y, curr); return bst}, new BinarySearchTree());
        }
        this.props.setAggState({scores: newScores})
    };
    render(){
        return (
            <>
                <div className={"Range-Slider-Container"}>
                    <p>Score Range</p>
                    <Range 
                    pushable={1} 
                    min={0} 
                    max={800} 
                    vertical={true}
                    defaultValue={[400, 800]} 
                    onChange={this.handle.bind(this)}
                    />
                </div>
            </>
        )
    }
}
export default RangeSlider;