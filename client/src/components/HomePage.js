import React, { Component } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
        this.setSearchInput = this.setSearchInput.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit() {
        this.props.handleFormSubmit(this.state.searchInput);
    }

    setSearchInput(val) {
        this.setState({
            searchInput: val
        })
    }

    render() {

        return (
            <section className="my-5 homepage">
                <div className="home-container">

                    <p className="display-4 home-text">Track your favorite movies</p>

                    <Form onSubmit={(event) => {this.props.handleFormSubmit(event, this.state.searchInput)}}>
                        <div className="home-input">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    name='searchInput'
                                    value={this.state.searchInput}
                                    onChange={(e) => this.setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='The Lord of the Rings'
                                />
                            </InputGroup>

                            <InputGroup>
                                <Button type="submit" variant="outline-danger" className="search-btn">Search</Button>
                            </InputGroup>
                        </div>
                    </Form>
                </div>
            </section>
        );
    }
}

export default Homepage;