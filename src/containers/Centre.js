import React, {Component} from 'react';
import firebase from '../config/database'
import {Grid,Cell,Card,CardTitle,CardText,CardActions,Button} from 'react-mdl';

class Centre extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            centres: []
          }
    }

    componentWillMount(){
        const _this=this;
        const centres = [];
        const ref = firebase.app.firestore().collection("restaurant_collection");
        ref.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                // const {content} = doc.data();
                // console.log("doc data", doc.data().isNews);
                // posts.push({
                //     key:doc.id,
                //     content
                // });
                centres.push(doc.data())
                
            });

            _this.setState({
                centres:centres
            })
        })

    }


    render(){
        const centres = this.state.centres.map((centre, index) =>
        <Restaurant key={index} value={centre} />
        );
        return(
            <div className="wrapper wrapper-full-page">
                <div className="full-page landing-page">
                    <div className="content">
                        <div style={{paddingBottom: '50px'}} className="section intro-section">
                            <div className="container w-container">
                                <div className="section-title-wrapper intro">
                                    <h2 className="section-title">restaurants</h2>
                                    <div className="section-divider"></div>
                                    <div className="section-title subtitle">
                                    There are over 35 stalls at the Food Mart at the festival serving authentic Sri Lankan food and beverages as well as non-authentic Sri Lankan food.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container w-container">
                            <Grid className="demo-grid-1">
                                {centres}
                            </Grid>
                        </div>
                    
                    </div>
                
                </div>
            </div>
        )
    }
}

class Restaurant extends Component {
    render() {
        return (
            <Cell col={3}>
                <Card shadow={0} style={{width: '100%', height: '320px', margin: 'auto'}}>
                    <CardTitle style={{height:'180px',color: '#fff', background: 'url('+this.props.value.image+')bottom right 15% no-repeat #46B6AC',backgroundSize:'cover'}}></CardTitle>
                    <CardText style={{width:'100%',textAlign:'center'}}>
                        {this.props.value.description}
                    </CardText>
                    <CardActions border>
                        <Button colored>{this.props.value.title}</Button>
                    </CardActions>
                </Card>
            </Cell>
            
        )
    }
}

export default Centre;