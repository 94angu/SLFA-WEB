import React, {Component} from 'react';
import NavBar from './../ui/template/NavBar';
import firebase from '../config/database';
import CardUI from './../ui/template/Card';
import fire from 'firebase';
import ReactTable from "react-table";


class RaffleDraw extends Component {
    constructor(props) {
      super(props);
      this.state = {
        min: 1,
        max: 1000,
        number: "Start Raffle",
        selected_winners:null,
        winners:[]
        // isRaffleDone:"0",
      }

      this.startRaffle = this.startRaffle.bind(this);
      this.getWinnersDataFromFirestore = this.getWinnersDataFromFirestore.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.addNextWinner = this.addNextWinner.bind(this);
      this.resetDataFunction = this.resetDataFunction.bind(this);
    }
  
    componentDidMount() {
    //  this.setState({ number: this.generateNumber(this.state.min, this.state.max)});
    // this.setState({number:"Start Raffle"});
      // const _this=this;
      // const db = firebase.app.firestore();
      // const ticketStatsRef = db.collection('raffle_results').doc('--raffle_stats--');
      // ticketStatsRef.get()
      // .then(doc => {
      //   if(!doc.exists){
      //     console.log("No such document!");
      //   } else{
      //     console.log('Document data:', doc.data());
      //     _this.setState({
      //       isRaffleDone:doc.data().isRaffleDone,
      //       raffleStatus:doc.data().status,
      //       selected_winner:doc.data().selected_winner
      //     });
      //   }
      // })
      this.getWinnersDataFromFirestore();
    }

    getWinnersDataFromFirestore(){
      const _this=this;
      const winners = [];
      const ref = firebase.app.firestore().collection("raffle_results");
      ref.get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc) {
              const content = doc.data();
              // console.log("doc data", doc.data());
              
              if(doc.id==="--raffle_stats--"){
                _this.setState({
                  isRaffleDone:doc.data().isRaffleDone,
                  raffleStatus:doc.data().status,
                  selected_winners:doc.data().selected_winners
                });
              }else{
                winners.push({
                  place:doc.id,
                  content
              });
              }
              
          });
  
          _this.setState({
            winners:winners
          })
      })
    }
    
    minChange = (event) => {
      this.setState({ min: event.target.value})
    }
    
    maxChange = (event) => {
      this.setState({ max: event.target.value})
    }
    
    generateNumber = (min, max) => {
      return Math.floor(Math.random()*(max-min+1)+min)
    }

    startRaffle(){
      const _this =this;
      _this.setState({
        isRaffleDone:"1",
        raffleStatus:"1"
      })
    }
    
    getInputs = () => {
      if(this.state.min > this.state.max ){
        const minTemp = this.state.min
        const maxTemp = this.state.max
        this.setState(
        { 
          min: maxTemp,
          max: minTemp
        }, () =>
          this.setState({
            number: this.generateNumber(this.state.min, this.state.max)  
          })
        );
      } else {
        this.setState({
          number: this.generateNumber(this.state.min, this.state.max)  
        })
      }
    }

    selectRaffleNumber(row){
      console.log("raffle place :"+JSON.stringify(row.original.place));
      var luckyNo;
      if(this.state.min > this.state.max ){
        const minTemp = this.state.min
        const maxTemp = this.state.max
        this.setState(
        { 
          min: maxTemp,
          max: minTemp
        }, () =>
          luckyNo = this.generateNumber(this.state.min, this.state.max)
        );
      } else {
        luckyNo = this.generateNumber(this.state.min, this.state.max)
      }

      this.setState({
        number: luckyNo 
      })
      const db = firebase.app.firestore();
      const raffleResultRef = db.collection('raffle_results').doc(row.original.place);
      raffleResultRef.update({ticket_no:luckyNo});
      this.resetDataFunction();
    }

    addNextWinner(){
      const _this=this;
      const db = firebase.app.firestore();
      const increment = fire.firestore.FieldValue.increment(1);
   
      const raffleStatsRef = db.collection('raffle_results').doc('--raffle_stats--');
      const raffleResultRef = db.collection('raffle_results').doc((this.state.selected_winners+1).toString());
 
      const batch = db.batch();
      batch.set(raffleResultRef,{ticket_no:""});
      batch.set(raffleStatsRef,{selected_winners:increment},{merge:true});
      batch.commit();

      _this.resetDataFunction();
    }

    resetDataFunction(){
      this.getWinnersDataFromFirestore();
    }
    
    render() {
      const columns = [{
        Header: '#',
        accessor: 'place' // String-based value accessors!
      }, {
        Header: 'Ticket No',
        accessor: 'content.ticket_no',
      },{
        Header: 'Name', // Custom header components!
        accessor: 'name'
      }, {
        Header: 'Action',
        filterable:false,
        Cell: row => 
          <span>
            <button onClick={()=>this.selectRaffleNumber(row)} type="button" className="btn btn-danger btn-sm">Raffle</button>
          </span>
      }]
      return (
        <div className="content">
			<NavBar />
            <div className="row">
                <CardUI class="col-md-6"  name='' title={"Raffle Draw"}  showAction={false}>
                    <br />
                    <div style={this.state.raffleStatus==="1" ? {} : {pointerEvents:'none',opacity:'0.4'}} id="raffle-draw">
                    <div id="winning-num-label">Winning Number</div>
                    <p id="winning-num">{this.state.number}</p>
                    <div>
                        <div id="headers"> 
                        <p>Number from</p>
                        <p>Number to</p>
                        </div>
                        <div id="raffle-input">
                        <input className="raffle-input" min="-9999999999" max="9999999999" type="number" value={ this.state.min } onChange={this.minChange} />
                        <input className="raffle-input" min="-9999999999" max="9999999999" type="number" value={ this.state.max } onChange={this.maxChange} />
                        </div>
                        <div style={{textAlign:"center"}}>
                            <input className="btn btn-success" type="submit" value="Raffle" onClick={ this.getInputs }/>
                        </div>
                        
                    </div>
                    </div>
                </CardUI>

                <CardUI class="col-md-6"  name={"results"} title={"Results"}  showAction={false}>
                    {/* <br /><br /> */}
                    {this.state.isRaffleDone==="1" ?
                    <div>
                        <ReactTable
                          key={this.state.pageLength}
                          data={this.state.winners}
                          filterable
                          columns={columns}
                          className="-striped -highlight"
                          defaultPageSize={this.state.winners.length}
                          showPagination={false}  
                        />
                        <input style={{float:"right"}} className="btn btn-sm" type="submit" value="Add" onClick={this.addNextWinner}/>
                    </div>

                        
                      :
                      <div style={{textAlign:"center"}}>
                          <input className="btn btn-success" type="submit" value="Start Raffle" onClick={this.startRaffle}/>
                      </div>
                     
                    }
                    
                    
                    
                </CardUI>
            </div>
		</div>
  
      );
    }
  }

  export default RaffleDraw;


