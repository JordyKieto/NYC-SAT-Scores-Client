import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import filterByRange from './utils/filterByRange';
import filterBySchool from './utils/filterBySchool';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class ScoreSlider extends React.Component{
    handle(score_range) {
        debugger
        let newScores = this.props.active_school !== -1? filterBySchool(this.props.scores, this.props.active_school): this.props.scores;
        let scoresByRange = filterByRange(newScores, score_range);
        this.props.setAggState({
                                scores: scoresByRange,
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
export default ScoreSlider;
