import React, {Component} from 'react';


class Pagination extends Component {


    render() {

        const {
            onChangePage,
            page
        } = this.props;


        return (
            <div className="btn-group mb-3 pagination">
                <button
                    type="button"
                    className="btn btn-light"
                    disabled={page === 1}
                    onClick={onChangePage.bind(null, page - 1)}
                >
                    Назад
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    onClick={onChangePage.bind(null, page + 1)}
                >
                    Вперед
                </button>
            </div>
        );

    }
}

export default Pagination;