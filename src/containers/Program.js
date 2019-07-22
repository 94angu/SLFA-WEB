import React, {Component} from 'react';
import Youtubeplayer from './Youtubeplayer'
class Program extends Component {
    render(){
        return(
            <div className="wrapper wrapper-full-page">
                <div className="full-page landing-page">
                    <div className="content">
                        <div style={{paddingBottom: '50px'}} className="section intro-section">
                            <div className="container w-container">
                                <div className="section-title-wrapper intro">
                                    <h2 className="section-title">The Program</h2>
                                    <div className="section-divider"></div>
                                    <div className="section-title subtitle">
                                    The best excitement of the year in Japan for all who love Sri Lankan style                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container w-container">
                            <div className="program-tabs w-tabs">
                                <div className="program-tabs-menu w-tab-menu">
                                    <a className="program-tab-button w-inline-block w-tab-link w--current">
                                        <div className="tab-button-title">Tuesday</div>
                                        <div className="tab-button-title subtitle">19-09-2015</div>
                                    </a>
                                    <a className="program-tab-button w-inline-block w-tab-link">
                                        <div className="tab-button-title">Tuesday</div>
                                        <div className="tab-button-title subtitle">19-09-2015</div>
                                    </a>
                                </div>
                                <div className="program-tabs-content w-tab-content">
                                    <div className="program-tab-pane w-tab-pane w--tab-active">
                                        <ul className="program-list w-list-unstyled">
                                            <li className="program-list-item">
                                                <div className="program-time-block">
                                                    <div className="program-time-title">08:00</div>
                                                </div>
                                                <a className="link program-link">Opening Ceremony</a>
                                                <div className="program-info-title">Length: 60 minutes</div>
                                            </li>
                                            <li className="program-list-item">
                                                <div className="program-time-block">
                                                    <div className="program-time-title">11:00</div>
                                                </div>
                                                <a className="link program-link">Lightning oil lamb</a>
                                                <div className="program-info-title">Length: 10 minutes</div>
                                            </li>
                                            <li className="program-list-item">
                                                <div className="program-time-block">
                                                    <div className="program-time-title">12:30</div>
                                                </div>
                                                <a className="link program-link">Entertainment</a>
                                                <div className="program-info-title">Length: 60 minutes</div>
                                            </li>
                                            <li className="program-list-item last">
                                                <div className="program-time-block">
                                                    <div className="program-time-title">15:45</div>
                                                </div>
                                                <a className="link program-link">Vote of thanks</a>
                                                <div className="program-info-title">Length: 10 minutes</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div style={{marginBottom:'20px'}} className="container w-container card-wrap">
                            <Youtubeplayer videoId='CZqp8yymfA4'/>
                        </div>
                    
                    </div>
                
                </div>
            </div>
        )
    }
}

export default Program;