import React, {Component} from 'react';
import {Card} from 'react-mdl';

class About extends Component {
    render(){
        return(
            <div className="wrapper wrapper-full-page">
                <div className="full-page landing-page">
                    <div className="content">
                        <div className="section intro-section">
                            <div className="container w-container">
                                <div className="section-title-wrapper intro">
                                    <h2 className="section-title">About the festival</h2>
                                    <div className="section-divider"></div>
                                    <div className="section-title subtitle">
                                    Sri Lanka Festival organized by Sri Lanka Business Council of Japan, consists of well over 100 booths and stalls, marketing and projecting products made, primarily in Sri Lanka. There are over 35 stalls at the Food Mart at the festival serving authentic Sri Lankan food and beverages as well as non-authentic Sri Lankan food. A number of booths and stalls sell Sri Lankan products and services ranging from garments, gems & Jewellery, handicrafts, ornamental items, financial and banking services to astrological and ayurvedic services, among others.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Card shadow={0} style={{width: '80%',minHeight:'45px',margin:'auto',marginTop:'-35px'}}>
                   
                            <div className="row">
                                <div className="col-s-12 col-md-6 col-lg-6">
                                    <div className="intro-info-block">
                                        <div className="intro-icon-wrapper">
                                        <img  style={{width: '30px'}} alt={Image} src="https://uploads-ssl.webflow.com/5c64e08639e719533fb04a7f/5c64e08639e7192290b04a97_Icon-location.png"></img>
                                        </div>
                                        <div className="intro-info-title">
                                        Tokyo
                                        </div>
                                        <div className="intro-info-title subtitle">
                                        Shibuya
                                        </div>
                                    </div>
                    
                                </div>
                                <div className="col-s-12 col-md-6 col-lg-6">
                                    <div className="intro-info-block">
                                        <div className="intro-icon-wrapper">
                                        <img  style={{width: '30px'}} alt={Image} src="https://uploads-ssl.webflow.com/5c64e08639e719533fb04a7f/5c64e08639e7194f7ab04a99_Icon-calendar.png"></img>
                                        </div>
                                        <div className="intro-info-title">
                                        3rd August
                                        </div>
                                        <div className="intro-info-title subtitle">
                                        03-08-2019
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    
                    </div>
                
                </div>
            </div>
        )
    }
}

export default About;