import React, {Component} from 'react';


class TotalPages extends Component {


    render() {

        const {total_pages} = this.props;


        return (
            <div className="form-group form-group--total_pages">
                <span className="btn_total_pages">Всего страниц</span>
                <span className="total_pages-counter">{total_pages}</span>
            </div>
        );

    }
}

export default TotalPages;