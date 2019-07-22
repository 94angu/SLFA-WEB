import React, {Component} from 'react';
import {Card} from 'react-mdl';
import CountDown from 'reactjs-countdown';
import Newsfeed from './Newsfeed';
import Promo from './Promo';

// Random component
const Completionist = () => <span>Festival started..!!</span>;


class Landingpage extends Component {

    constructor(props){
        super(props);
      }

    render(){

        return(
            <div className="wrapper wrapper-full-page">
            <div className="full-page landing-page">
                <div className="content">
                    <div style={{left:"-5px"}} id="myCarousel" className="carousel slide" data-interval="5000" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>

                    
                        <div className="carousel-inner">
                            <div className="item active">
                            <img style={{width:'100%',height:'480px',objectFit:'cover',opacity:'0.6'}} src="assets/img/slfest3.jpg" alt="Los Angeles"></img>
                                <div className="carousel-caption">
                                    <h3>SRI LANKAN DAY 2019</h3>
                                    <p>SRI LANKAN DAY 2019
35 stalls at the Food Mart at the festival serving authentic Sri Lankan food and beverages as well as non-authentic Sri Lankan food.</p>
                                </div>
                            </div>

                            <div className="item">
                                <img style={{width:'100%',height:'480px',objectFit:'cover'}} src="assets/img/slfest4.jpg" alt="Chicago"></img>
                                    <div className="carousel-caption">
                                        <h3>15TH SRI LANKA FESTIVAL IN JAPAN, 2019</h3>
                                        <p>LA is always so much fun!</p>
                                    </div>
                            </div>

                            <div className="item">
                                <img style={{width:'100%',height:'480px',objectFit:'cover'}} src="assets/img/slfest9.jpg" alt="New York"></img>
                                    <div className="carousel-caption">
                                        <h3>FEEL SRI LANKA IN TOKYO</h3>
                                        <p>LA is always so much fun!</p>
                                    </div>  
                            </div>
                        </div>

                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                            <span className="sr-only">Next</span>
                        </a>

                    </div>
                    
                    <Card shadow={0} style={{width: '80%',minHeight:'45px',margin:'auto',marginTop:'-35px'}}>
                   
                    <div className="row">
                        <div className="col-xs-6 col-md-4 col-lg-4">
                            <div className="intro-info-block">
                                <div className="intro-icon-wrapper">
                                <img  style={{width: '30px'}} src="https://uploads-ssl.webflow.com/5c64e08639e719533fb04a7f/5c64e08639e7192290b04a97_Icon-location.png"></img>
                                </div>
                                <div className="intro-info-title">
                                Tokyo
                                </div>
                                <div className="intro-info-title subtitle">
                                Shibuya
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-6 col-md-4 col-lg-4">
                            <div className="intro-info-block">
                                <div className="intro-icon-wrapper">
                                <img  style={{width: '30px'}} src="https://uploads-ssl.webflow.com/5c64e08639e719533fb04a7f/5c64e08639e7194f7ab04a99_Icon-calendar.png"></img>
                                </div>
                                <div className="intro-info-title">
                                3rd August
                                </div>
                                <div className="intro-info-title subtitle">
                                03-08-2019
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-4 col-lg-4 countdown">
                            <div style={{color:'#fff'}} className="small timer"> 
                            <CountDown deadline='03 August 2019 13:02:03'/>
                            </div>
                        </div>
                        
                    </div>
                    </Card>
                    


                    {/* <div className="home-intro-section">
                        <div className="container home-intro-container w-container">
                                <div className="home-intro-block w-clearfix">
                                    <div className="intro-row w-row">
                                        <div className="intro-column w-col w-col-6">
                                            <div className="intro-info-block">
                                                <div className="intro-icon-wrapper">
                                                <img src="https://uploads-ssl.webflow.com/5c64e08639e719533fb04a7f/5c64e08639e7192290b04a97_Icon-location.png"></img>
                                                </div>
                                                <div className="intro-info-title">
                                                Tokyo
                                                </div>
                                                <div className="intro-info-title subtitle">
                                                Shibuya
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div> */}
                    <div className="container w-container boxes">
                        {/* <div className="section-title-wrapper">
                            <h2 className="section-title">promo</h2>
                            <div className="section-divider"></div>
                            <h2 className="section-title subtitle">The best excitement of the year in Japan for all who love Sri Lankan style</h2>
                        </div> */}

                        <Promo/>
                    </div>

                    <div className="container news-section">
                        <div className="section-title-wrapper">
                            <h2 className="section-title">News feed</h2>
                            <div className="section-divider"></div>
                            <h2 className="section-title subtitle">The best excitement of the year in Japan for all who love Sri Lankan style</h2>
                        </div>

                        <Newsfeed/>
            
            <div className="intro-section-column w-col w-col-12 w-col-small-12 w-col-tiny-12">
                                <p className="join-text">Interested in reading more news about the event?</p>
                                <a className="button w-button" href="#">Read More News</a>
                            </div>
                    </div>

                    <div className="container w-container tokyo-text">
                        <div className="section-title-wrapper centered">
                            <h2 className="section-title">feel sri Lanka in tokyo....!!</h2>
                            <div className="section-divider"></div>
                            <h2 className="section-title subtitle">The best excitement of the year in Japan for all who love Sri Lankan style</h2>
                        </div>

                        <div className="intro-section-row w-row">
                            <div className="intro-section-column w-col w-col-4 w-col-small-4 w-col-tiny-12">
                                <div className="icon-block">
                                    <img src="assets/img/food.png"></img>
                                </div>
                                <div className="intro-column-title">Food</div>
                                <p>There are over 35 stalls at the Food Mart at the festival</p>
                            </div>

                            <div className="intro-section-column w-col w-col-4 w-col-small-4 w-col-tiny-12">
                                <div className="icon-block">
                                    <img src="assets/img/music.png"></img>
                                </div>
                                <div className="intro-column-title">music & dance</div>
                                <p>Celebrate with Sri Lankan music and dance</p>
                            </div>

                            <div className="intro-section-column w-col w-col-4 w-col-small-4 w-col-tiny-12">
                                <div className="icon-block">
                                    <img src="assets/img/ayurveda.png"></img>
                                </div>
                                <div className="intro-column-title">ayurveda & yoga</div>
                                <p>Try out Ayurveda and Yogo in Sri Lankan style</p>
                            </div>

                            <div className="intro-section-column w-col w-col-12 w-col-small-12 w-col-tiny-12">
                                <p className="join-text">Join with us and experience a great festival full of entertainment</p>
                                <a className="button w-button" href="/register">Register Here Today</a>
                            </div>
                        </div>
                    </div>

                    

                    <div className="section download-section">
                        <div className="div-block">
                            <h2 className="section-title small" style={{paddingTop:'10px'}}>downloads</h2>
                            <div className="section-divider"></div>
                            <p className="paragraph-2">Various form and documents can that are useful for exhibitors and other interested parties can be downloaded here.</p>
                            <a className="button w-button">Download Now</a>
                        </div>
                    </div>

                    <div className="section">
                        <div className="map-container">
                            <div className="section-title-wrapper centered">
                                <h2 className="section-title">festival map</h2>
                                <div className="section-divider">
                                </div>
                                <div className="map-section">Google Map goes here</div>

                            </div>

                        </div>

                    </div>
                   
                </div>
                
            </div>
        </div>
        )
    }
}

export default Landingpage;