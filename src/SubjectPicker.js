import React from 'react';
import {
    Button,
    ButtonToolbar,
} from 'react-bootstrap';
class SubjectPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "Math"
        };
    };
    handleChange({ target: { value } }){
        this.setState({subject: value});
        this.props.getScores(value);
    };
    render() {
        return (
            <>
            <form className="subject-checkbox" onChange={this.handleChange.bind(this)}>
            <ButtonToolbar>
                <Button onClick={this.handleChange.bind(this)} className={`subject-picker math-pick ${this.state.subject === 'Math'? 'active': ""}`} value={`Math`} variant="outline-primary">Math</Button>
                <Button onClick={this.handleChange.bind(this)} className={`subject-picker reading-pick ${this.state.subject === 'Reading'? 'active': ""}`} value={`Reading`} variant="outline-success">Reading</Button>
                <Button onClick={this.handleChange.bind(this)} className={`subject-picker writing-pick ${this.state.subject === 'Writing'? 'active': ""}`} value={`Writing`} variant="outline-danger">Writing</Button>
            </ButtonToolbar>
            </form>
            </>
        )
    }
};
export default SubjectPicker;