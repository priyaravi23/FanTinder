import React, { Component } from 'react'
import { Jumbotron, Container, Col, Form, Button } from 'react-bootstrap';

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
            <>
                <Jumbotron fluid className='text-light search-jumbo'>
                    <Container>
                        <h1>Keep Track of Movies Your Way.</h1>
                        <Form onSubmit={(event) => {this.props.handleFormSubmit(event, this.state.searchInput)}}>
                            <Form.Row>
                                <Col xs={12} md={8}>
                                    <Form.Control
                                        name='searchInput'
                                        value={this.state.searchInput}
                                        onChange={(e) => this.setSearchInput(e.target.value)}
                                        type='text'
                                        size='lg'
                                        placeholder='The Dark Knight'
                                    />
                                </Col>
                                <Col xs={12} md={4}>
                                    <Button type='submit'  size='lg' >
                                        Submit Search
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Container>
                </Jumbotron>
            </>
        )
    }
}

export default SearchForm;