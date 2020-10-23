import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.setSearchInput = this.setSearchInput.bind(this);
    }

    handleFormSubmit() {
        this.props.handleFormSubmit(this.searchInput);
    }

    setSearchInput(val) {
        this.setState({
            searchInput: val
        })
    }

    render() {
        return (
            <Form onSubmit={(event) => {this.props.handleFormSubmit(event, this.state.searchInput)}}>
                <Form.Group>
                    <Form.Label className="h3">Find your favorite movies</Form.Label>
                    <Form.Control
                        name='searchInput'
                        value={this.state.searchInput}
                        onChange={(e) => this.setSearchInput(e.target.value)}
                        type='text'
                        placeholder='The Lord of the Rings'
                    />
                </Form.Group>
                <Button type='submit'>
                    Search
                </Button>
            </Form>
        )
    }
}

export default SearchForm;