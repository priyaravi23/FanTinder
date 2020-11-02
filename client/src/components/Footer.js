import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope, FaFolder } from "react-icons/fa";

const AppFooter = () => {
    return (
        <>
            <Container fluid className="text-light page-footer d-flex pt-3 bg-dark">
                <Container>
                    <h5 className='pt-4'>Contact Us</h5>
                    <div className="d-lg-flex pb-4 justify-content-between">
                        <ul className="no-bullets">
                            <li><h6>Anita Ganti</h6></li>
                            <li>
                                <a className="footer-link" href="https://anitapeppercorn.github.io/react-portfolio/#/about">
                                    <span className="pr-3">
                                        <FaFolder />
                                    </span>
                                    https://anitapeppercorn.github.io/react-portfolio
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="mailto:anita_r_ganti@yahoo.com">
                                    <span className="pr-3">
                                        <FaEnvelope />
                                    </span>
                                    anita_r_ganti@yahoo.com
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="https://github.com/anitapeppercorn">
                                    <span className="pr-3">
                                        <FaGithub />
                                    </span>
                                    anitapeppercorn
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="https://www.linkedin.com/in/anita-ganti-9380961/">
                                    <span className="pr-3">
                                        <FaLinkedin />
                                    </span>
                                    anita-ganti-9380961
                                </a>
                            </li>
                        </ul>
                        <ul className="no-bullets">
                            <li><h6>Priya Ravi</h6></li>
                            <li>
                                <a className="footer-link" href="https://priyaravi23.github.io/react-portfolio/#/about">
                                    <span className="pr-3">
                                        <FaFolder />
                                    </span>
                                    https://priyaravi23.github.io/react-portfolio/
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="mailto:priyaravi23@gmail.com">
                                    <span className="pr-3">
                                        <FaEnvelope />
                                    </span>
                                    priyaravi23@gmail.com
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="https://github.com/priyaravi23">
                                    <span className="pr-3">
                                        <FaGithub />
                                    </span>
                                    priyaravi23
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="https://www.linkedin.com/in/priya-ravi-4508437b/">
                                    <span className="pr-3">
                                        <FaLinkedin />
                                    </span>
                                    priya-ravi-4508437b
                                </a>
                            </li>
                        </ul>
                        <ul className="no-bullets">
                            <li><h6>Vanessa Lane</h6></li>
                            <li>
                                <a className="footer-link" href="https://vanessalane.herokuapp.com">
                                    <span className="pr-3">
                                        <FaFolder />
                                    </span>
                                    https://vanessalane.herokuapp.com
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="mailto:vlane0593@gmail.com">
                                    <span className="pr-3">
                                        <FaEnvelope />
                                    </span>
                                    vlane0593@gmail.com
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="https://github.com/vanessalane">
                                    <span className="pr-3">
                                        <FaGithub />
                                    </span>
                                    vanessalane
                                </a>
                            </li>
                            <li>
                                <a className="footer-link" href="https://www.linkedin.com/in/vanessa-lane/">
                                    <span className="pr-3">
                                        <FaLinkedin />
                                    </span>
                                    vanessa-lane
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>© 2020</p>
                        <p>
                            <a className="footer-link" href="https://github.com/anitapeppercorn/FANTINDER">
                                <span className="pr-3">
                                    <FaGithub />
                                </span>
                                Visit the GitHub Repo
                            </a>
                        </p>
                    </div>
                </Container>
            </Container>
        </>
    )
};
export default AppFooter;