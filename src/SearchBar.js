import React from 'react';
import Autocomplete from 'react-autocomplete';

function matchTerm(item, value){
    return item.toLowerCase().includes(value.toLowerCase());
};
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            schools: []
        }
    };
    unsetActiveSchool(){
        this.setState({value: ''});
        this.props.unsetActiveSchool();
    };
    componentWillReceiveProps({schools}){
        schools.sort();
        this.setState({schools});
    };
    render() {
        return (
            <>
            <div className={`autocomplete`}>
                <Autocomplete
                getItemValue={(item)=> item}
                items={this.state.schools}
                renderItem={(item, isHighlighted)=>
                    <div key={item} style={{ background: isHighlighted ? 'lightgray' : 'white'}}>
                        {item}
                    </div>
                }
                shouldItemRender={matchTerm}
                value={this.state.value}
                onChange={(e) => this.setState({value: e.target.value})}
                onSelect={(val) => {this.setState({value: val}); this.props.schoolFilter(val)}}
                />
                <button className={`clear-search`} onClick={this.unsetActiveSchool.bind(this)}></button>
            </div>
            </>
        )
    }
};
export default SearchBar;
