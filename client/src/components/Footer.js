import React from 'react';

import { Container } from 'react-bootstrap';

const AppFooter = () => {
    return (
            <Container fluid className="text-light page-footer d-flex">
                <Container className="d-flex m-auto justify-content-between align-items-center">
                    <div>
                        <h4>Contact Us</h4>
                        <div className="d-flex">
                            <ul className="no-bullets">
                                <li><h5>Anita Ganti</h5></li>
                                <li className="small"><span><i className="far fa-envelope pr-3"></i></span>vlane0593@gmail.com</li>
                                <li className="small"><span><i className="fab fa-github pr-3"></i></span> vanessalane</li>
                                <li className="small"><span><i className="fab fa-linkedin pr-3"></i></span> vanessa-lane</li>
                            </ul>
                            <ul className="no-bullets">
                                <li><h5>Priya Ravi</h5></li>
                                <li className="small"><span><i className="far fa-envelope pr-3"></i></span>vlane0593@gmail.com</li>
                                <li className="small"><span><i className="fab fa-github pr-3"></i></span> vanessalane</li>
                                <li className="small"><span><i className="fab fa-linkedin pr-3"></i></span> vanessa-lane</li>
                            </ul>
                            <ul className="no-bullets">
                                <li><h5>Vanessa Lane</h5></li>
                                <li className="small"><span><i className="far fa-envelope pr-3"></i></span>vlane0593@gmail.com</li>
                                <li className="small"><span><i className="fab fa-github pr-3"></i></span> vanessalane</li>
                                <li className="small"><span><i className="fab fa-linkedin pr-3"></i></span> vanessa-lane</li>
                            </ul>
                        </div>
                    </div>

                    <h5>
                        <a href="https://github.com/anitapeppercorn/FANTINDER"><i className="fab fa-github pr-3"></i>Visit the GitHub Repo</a>
                    </h5>
                </Container>
            </Container>
    )
};
export default AppFooter;