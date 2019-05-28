import React from 'react';

class MatrixView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            matrix : '',
        };
    }
    async componentWillMount() {
        let res = await fetch(`${process.env.REACT_APP_SAT_PROXY}matrix`);
        res = await res.blob();
        res = URL.createObjectURL(res);
        this.setState({
            matrix: res,
        });
     };
    render(){
        return (
            <>
                <div className={"matrix-chart"}>
                    <img src={this.state.matrix} alt={'matrix'}></img>
                </div>
            </>
        )
    }
}
export default MatrixView;
