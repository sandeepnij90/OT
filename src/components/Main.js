import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination'
import Search from './Search';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import 'babel-polyfill';
import './styles.scss';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            activePage: 1,
            count: 0,
            step: 1,
            itemsPerPage: 20,
        }
    }

    async componentDidMount() {
        const page = parseInt(this.props.match.params.page, 10);
        const res = await axios.post('http://nyx.vima.ekt.gr:3000/api/books', {page});
        this.setState({ books: res.data.books, count: res.data.count, activePage: page });
    }

    renderList = () => {
        return this.state.books.map(({
             id,
             book_author,
             book_pages,
             book_publication_city,
             book_publication_country,
             book_publication_year,
             book_title
            }) => {
                return (
                    <tr key={id}>
                        <td>{book_title}</td>
                        <td>{book_author.join(', ')}</td>
                        <td>{book_pages}</td>
                        <td>{book_publication_city}</td>
                        <td>{book_publication_country}</td>
                        <td>{book_publication_year}</td>
                    </tr>
                )
        });
    }

    handleSearch = async filter => {
        const res = await axios.post('http://nyx.vima.ekt.gr:3000/api/books', { filters: [{ type: 'all', values: filter}] });
        this.setState({ books: res.data.books, count: res.data.count, activePage: 1 });

    }

    handleFirstPage = () => {
        this.setState({step: 1});
    }

    handleLastPage = () => {
        const { count, itemsPerPage } = this.state;
        const step = Math.ceil((count / itemsPerPage) / 10);
        this.setState({ step })
    }

    handlePrevPage = () => {
        const { step } = this.state;
        if (step != 1)
        this.setState({step: step - 1});
    }

    handleNextPage = () => {
        const { count, itemsPerPage, step } = this.state;
        if (step !== Math.ceil((count / itemsPerPage) / 10)) {
            this.setState({ step: step + 1 });
        }
    }

    updateList = page => async () => {
        const res = await axios.post('http://nyx.vima.ekt.gr:3000/api/books', { page });
        const { books, count } = res.data;
        this.setState({ books: books, count: count, activePage: page });
        this.props.history.push(`/${page}`);
    }

    renderPagination = () => {
        const { step, count, itemsPerPage, activePage } = this.state;
        const maxCount = Math.ceil(count / itemsPerPage);
        let items = [];

        for (let number = (step * 10) - 9; number <= step * 10 && number <= maxCount; number++) {
            items.push(
                <Pagination.Item key={number} active={number === activePage} onClick={this.updateList(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    }

    render() {
        return (
            <div className="container">
            <h1>Book list</h1>
                <Search handleSearch={this.handleSearch}/>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Book Author</th>
                            <th>Book Pages</th>
                            <th>Book Publication City</th>
                            <th>Book Publication Country</th>
                            <th>Book Publication Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </Table>
                <Pagination>
                    <Pagination.First onClick={this.handleFirstPage} />
                    <Pagination.Prev onClick={this.handlePrevPage} />
                        {this.renderPagination()}
                    <Pagination.Next  onClick={this.handleNextPage}/>
                    <Pagination.Last onClick={this.handleLastPage} />
                </Pagination>
            </div>
        )
    }
}

export default withRouter(Main);
