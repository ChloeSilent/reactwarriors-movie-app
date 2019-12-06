import React, {Component} from 'react';


class TotalPages extends Component {


    render() {

        const {total_pages} = this.props;


        return (
            <div className="row">
                <span className="btn">Всего страниц</span>
                <span className="btn">{total_pages}</span>
            </div>
        );

    }
}

export default TotalPages;