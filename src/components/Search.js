import React, { Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

class Search extends Component {

    constructor() {
        super();
        this.state = {
            search: []
        };
    }

    handleSearchChange = e => {
        this.setState({ search: e.target.value })
    }

    handleSearch = () => {
        this.props.handleSearch(this.state.search.split(' '));
    }

    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl
                onChange={e => this.handleSearchChange(e)}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                />
                    <InputGroup.Append>
                    <Button onClick={this.handleSearch}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

Search.propTypes = {
    handleSearch: PropTypes.func.isRequired
}

export default Search;