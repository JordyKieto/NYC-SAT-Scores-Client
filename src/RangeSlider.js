import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import filterByRange from './utils/filterByRange';
import filterBySchool from './utils/filterBySchool';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class RangeSlider extends React.Component{
    handle(score_range) {
        let scoresByRange = filterByRange(this.props.scores, score_range);
        let newScores = filterBySchool(scoresByRange, this.props.active_school);
        this.props.setAggState({
                                scores: newScores,
                                score_range,
        });
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
