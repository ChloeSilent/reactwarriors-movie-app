import React, {Component} from 'react';

class Year extends Component {
    render() {
        const {onChangeYear} = this.props;
        return (
            <div className="form-group row">
                <label htmlFor="example-number-input"
                       className="col-8 col-form-label">Primary release year</label>
                <div className="col-4">
                    <input className="form-control"
                           type="text"
                           id="example-number-input"
                           onChange={onChangeYear}/>
                </div>
            </div>
        );
    }
}

export default Year;