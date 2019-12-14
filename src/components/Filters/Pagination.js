import React, {Component} from 'react';


class Pagination extends Component {

    handleClick = (newPage) => () => {

        this.props.onChangePage(newPage)
    };

    render() {

        const {
            page,
            total_pages
        } = this.props;


        return (
            <>
                <div className="form-group form-group--total_pages">
                    <span className="btn_total_pages">Страница</span>
                    <span className="btn_total_pages">{page}</span>
                    <span className="btn_total_pages">из</span>
                    <span className="btn_total_pages">{total_pages}</span>
                </div>
                <div className="btn-group mb-3 pagination">
                    <button
                        type="button"
                        className="btn btn-light"
                        disabled={page === 1}
                        onClick={this.handleClick(Number(page) - 1)}
                    >
                        Назад
                    </button>
                    <button
                        type="button"
                        className="btn btn-light"
                        disabled={page === total_pages}
                        onClick={this.handleClick(Number(page) + 1)}
                    >
                        Вперед
                    </button>
                </div>
            </>
        );

    }
}

export default Pagination;