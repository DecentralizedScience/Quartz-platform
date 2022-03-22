import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import TwitterIcon from '@material-ui/icons/Twitter'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleIcon from '@material-ui/icons/People';
import { withStyles } from '@material-ui/core/styles'

import App from '../App.js'
import logo from '../img/logo.jpg'
import Banner from '../img/fondo-banner.svg'
import Confirmation from '../img/publication-ico.svg'
import Ilp from '../img/ilp.jpeg'

import config from './config.json'

var https = require('https');


const styles = theme => ({
  root: {
    margin:0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialog: {
    paddingBottom: 50,
    width: 560,
    height: 280
  },
  dialogText: {
    paddingBottom: 15,
    marginTop: -15,
    color: '#727474'
  },
  paper: {
    borderColor: "#e495bd"
  },
  paper2: {
    backgroundColor: "#99679A",
    color: "#ffffff",
    width: 500,
    padding: 20
  },
  paperBanner: {
    padding: 10,
    backgroundImage: `url(${Banner})`,
    color: '#5B305B',
    maxWidth: 480,
    fontSize: "18px"
  }
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)


class DonationButton extends Component {

  constructor(props){
    super(props);
    this.state={
      open: false,
      dialog1Open: false,
      dialog2Open: false,
      dialogSuccessOpen: false,
      dialogErrorOpen: false,
      dialogWaitOpen: false,
      dialogInterledgerOpen: false,
      value: 20,
      buttonText: "DONATE WITH QUARTZ",
      buttonPay: false,
      email: "",
      buttonHover: false,
      checked: false
    }
  }

  setDialog1Open(val){
    this.setState({dialog1Open: val})
  }

  handleDialog1ClickOpen = () => {
    this.setDialog1Open(true)
  }

  handleDialog1Close = () => {
    this.setDialog1Open(false)
  }

  setDialogSuccessOpen(val){
    this.setState({dialogSuccessOpen: val})
  }

  handleDialogSuccessClickOpen = () => {
    this.setDialog1Open(false)
    this.setDialogSuccessOpen(true)
    this.setDialogWaitOpen(false)
  }

  handleDialogSuccessClose = () => {
    this.setDialogSuccessOpen(false)
  }

  setDialogErrorOpen(val){
    this.setState({dialogErrorOpen: val})
  }

  handleDialogErrorClickOpen = () => {
    this.setDialog1Open(false)
    this.setDialogErrorOpen(true)
    this.setDialogWaitOpen(false)
  }

  handleDialogErrorClose = () => {
    this.setDialogErrorOpen(false)
  }

  setDialogWaitOpen(val){
    this.setState({dialogWaitOpen: val})
  }

  handleDialogWaitClickOpen = () => {
    this.setDialog1Open(false)
    this.setDialogWaitOpen(true)
  }

  handleDialogWaitClose = () => {
    this.setDialogWaitOpen(false)
  }

  setDialogInterledgerOpen(val){
    this.setState({dialogInterledgerOpen: val})
  }

  handleDialogInterledgerClickOpen = () => {
    this.setDialog1Open(false)
    this.setDialogInterledgerOpen(true)
  }

  handleDialogInterledgerClose = () => {
    this.setDialogInterledgerOpen(false)
  }

  onPlusClick = () => {
    this.setState({value: parseInt(this.state.value)+1})
  }

  onMinusClick = () => {
    this.setState({value: parseInt(this.state.value)-1})
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  setHover = (val) => {
    this.setState({buttonHover: val})
  }

  handleCheck = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked
    })
  }

  /*sendIlpPayment = () => {
    console.log("sendIlpPayment begins")
    //fetch('http://localhost:8080/?from=alice&to=http://charlie-node:7770/accounts/charlie/spsp&amount=20', {
    fetch('http://localhost:8080/?from=alice&to='+config.ILP_wallet+'spsp&amount=20', {
//      mode: 'cors',
//      credentials: 'include',
      headers: {
        Authorization: 'Bearer alice_password'
      }
    }).then(() => console.log("then")).catch((err) => console.log("catch: "+err))
      console.log("sendIlpPayment ends")
  }*/

  /**Sends a singular payment via the Interledger Network**/
  sendIlpPayment = () => {
    console.log("sendIlpPayment begins")

    const data = JSON.stringify({
      /*"receiver": "http://charlie-node:7770/accounts/charlie/spsp",*/
      /*"receiver": "https://51.91.8.116:443/accounts/acc2/spsp",*/
      /*"receiver": "http://receive.quartz.to/accounts/acc2/spsp",*/
      "receiver": config.ILP_wallet + "spsp",
      "source_amount": this.state.value
    })

    const options = {
      /*hostname: '192.168.128.4',
      port: 7770,*/
      /*hostname: "51.91.8.116",
      port: 443,*/
      hostname: 'receive.quartz.to',
      /*hostname: "51.91.8.116",
      port: 7770,*/
      /*path: '/accounts/' + 'alice' + '/payments',*/
      path: '/accounts/' + 'acc1' + '/payments',
      method: 'POST',
      headers: {
        /*'Authorization': 'Bearer alice_password',*/
        'Authorization': 'Bearer acc1_password',
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      }
    }

    const req = https.request(options, res2 => {

      res2.on('data', d => {
        console.log('200', d.toString());
      })
    })

    req.on('error', error => {
      console.log('500', 'Internal Server Error')
      console.error(error)
    })

    req.write(data)
    req.end()

    /*var txt = "Amount: " + 20 + ", from: " + "alice" + ", to: " + "http://charlie-node:7770/accounts/charlie/spsp";*/
    var txt = "Amount: " + 20 + ", from: " + "acc1" + ", to: " + "https://send.quartz.to/accounts/acc2/spsp"
    console.log(txt);
  }


  render() {

    const {classes} = this.props
    var value = this.state.value
    var hover = this.state.buttonHover

    var meta = document.createElement('meta');
    meta.name = "monetization";
    /*meta.content = "$https://ilp.uphold.com/YJwBWzddQDXq";*/
    meta.content = config.ILP_wallet;
    document.getElementsByTagName("head")[0].appendChild(meta)


    return(
      <Paper
        className={classes.paper2}
        variant="outlined"
        square
      >
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={6}>
            <Typography
              align="center"
            >
              <b>Do you like this Journal?</b>
            </Typography>
            <Typography
              align="center"
            >
              Reward academic papers and
              empower scholars with{""+" "}
              <Link href='http://quartz.to' target='blank' style={{color: "#ffffff"}}>
                <b>{" " + "Qaurtz"}</b>
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={this.handleDialog1ClickOpen}
                  onMouseOver={()=>{this.setHover(true)}}
                  onMouseOut={()=>{this.setHover(false)}}
                  style={{fontSize: "12px", backgroundColor: "#e495bd", color: "#ffffff", textTransform: "none", width: 180}}
                >
                  {hover?("I WILL DONATE 20€"):(this.state.buttonText)}
                </Button>
              </Grid>
              <Grid item xs={12} style={{fontSize: "10px", paddingTop: 0, height:'100%'}}>
                {hover?("(You can change the amount later)"):("")}
              </Grid>
            </Grid>
          </Grid>

          {/* First dialog */}
          <Dialog
            onClose={this.handleDialog1Close}
            aria-labelledby="payment-dialog"
            open={this.state.dialog1Open}
          >
            <DialogTitle
              id="payment-dialog"
              onClose={this.handleDialog1Close}
            >
              Modal title
            </DialogTitle>
            <DialogContent style={{width: 500}}>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <MenuBookIcon style={{color: "#92699b"}}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      fontSize: "21px",
                      maxWidth: 300,
                      textAlign: 'center'
                    }}
                  >
                    <b>THANKS FOR HELPING OPEN ACCESS SCIENCE GROW FASTER!</b>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div>
                    You can change the amount if you prefer
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div>
                    <IconButton
                      color="primary"
                      aria-label="substract money"
                      component="span"
                      onClick={this.onMinusClick}
                      style={{color: "#e495bd"}}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                    <TextField
                      id="standard-basic"
                      value={value}
                      onChange={this.handleChange}
                      variant="outlined"
                      size="small"
                      style={{width: 50}}
                    />
                    <IconButton
                      color="primary"
                      aria-label="add money"
                      component="span"
                      onClick={this.onPlusClick}
                      style={{color: "#e495bd"}}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
              <Divider variant="middle" style={{color: "#e495bd"}}/>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <div
                    style={{color: "#92699b", fontSize: "54px"}}
                  >
                    <b>{this.state.value} €</b>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <App
                    amount={this.state.value}
                    onSuccess={this.handleDialogSuccessClickOpen}
                    onError={this.handleDialogErrorClickOpen}
                    onWait={this.handleDialogWaitClickOpen}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    onClick={this.handleDialogInterledgerClickOpen}
                    style={{fontSize:"12px",backgroundColor: "#5B305B", color: "#ffffff", textTransform: "none", width: 200, marginBottom: 20}}
                  >
                    PAY WITH INTERLEDGER
                  </Button>
                </Grid>
              </Grid>
              <Divider variant="middle" style={{color: "#e495bd"}}/>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={this.state.checkedA} onChange={this.handleChecked} name="checkedA" />}
                    label="By continuing you accept the terms & privacy policy"
                  />
                </Grid>
                {/* Buttons for tests */}
                {/*<Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Button
                      onClick={this.handleDialogSuccessClickOpen}
                      style={{fontSize:"12px"}}
                    >
                      SUCCESS
                    </Button>
                    <Button
                      onClick={this.handleDialogErrorClickOpen}
                      style={{fontSize:"12px"}}
                    >
                      ERROR
                    </Button>
                    <Button
                      onClick={this.handleDialogWaitClickOpen}
                      style={{fontSize:"12px"}}
                    >
                      WAIT
                    </Button>
                  </Grid>
                </Grid>*/}
              </Grid>
              <Divider variant="middle" style={{color: "#e495bd"}}/>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} style={{marginTop:20}}>
                  <PeopleIcon style={{marginRight:20}}/>
                  <PeopleIcon />
                  <PeopleIcon style={{marginLeft:20}}/>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      fontSize: "12px",
                      maxWidth: 400,
                      textAlign: 'center'
                    }}
                  >
                    Quartz OA community  gives 1€ for each donation. This month, we contribute to XXX,
                    an Open Access Journal for black people in order to share knowledge, inspiration,
                    connection and resilience. Silence against systemic racism is not an option. Build
                    the academic community you believe in.
                    <Link href='http://quartz.to' target='blank' style={{color: "#000000"}}>
                      <b>{" " + "Know more"}</b>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>


          {/*Wait dialog*/}
          <Dialog
            onClose={this.handleDialogWaitClose}
            arial-labelledby="quantity-dialog"
            open={this.state.dialogWaitOpen}
          >
            <MuiDialogTitle
              id="quantity-dialog"
              onClose={this.handleDialogErrorClose}
            >
            </MuiDialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <div
                    style={{color: "#92699b"}}
                  >
                    PROCESSING THE OPERATION
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <CircularProgress />
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>


          {/*Success dialog*/}
          <Dialog
            onClose={this.handleDialogSuccessClose}
            arial-labelledby="quantity-dialog"
            open={this.state.dialogSuccessOpen}
          >
            <DialogTitle
              id="quantity-dialog"
              onClose={this.handleDialogSuccessClose}
            >
              Modal title
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <img src={Confirmation} alt="Confirmation icon"/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      //color: "#92699b",
                      fontSize: "21px",
                      textAlign: 'center'
                    }}
                  >
                    <b>YOUR DONATION HAS BEEN MADE CORRECTLY</b>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} style={{marginBottom: 20}}>
                  {/*<Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={6} align="right" style={{maxWidth: 100, marginRight: 30 }} >
                      <img src={logo} alt="Quartz logo" style={{width:100}}/>
                    </Grid>
                    <Grid item xs={6} style={{fontSize: "16px", maxWidth: 300}}>*/}
                    <div style={{textAlign: 'center'}}>
                      <b>Quartz Open Access</b> rewards great
                    </div>
                    <div style={{textAlign: 'center'}}>
                      academic work and empower scholars.
                    </div>
                    <div style={{textAlign: 'center'}}>
                      Do you want to know more?
                    </div>
                    {/*</Grid>
                  </Grid>*/}
                </Grid>

                {/*Espaciar bien*/}
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    target="_blank"
                    href="http://eepurl.com/hiY_7v"
                    style={{fontSize: "14px", backgroundColor: "#5B305B", color: "#ffffff", textTransform: "none", width: 200}}
                  >
                    <b>JOIN QUARTZ OA</b>
                  </Button>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Container
                    style={{
                      padding: -10,
                      backgroundImage: `url(${Banner})`,
                      color: '#5B305B',
                      maxWidth: 480,
                      fontSize: "18px"
                    }}
                  >
                    <div style={{padding:5, paddingRight:80, paddingLeft: 10, paddingTop: 29}}>
                      <b>Join QuartzOA and start doing automatic micro-donations.</b>
                    </div>

                    <div style={{fontSize: "14px", padding: 5, paddingLeft: 10, paddingBottom: 29}}>
                      You have {value*0.1}€ in credits!
                    </div>
                  </Container>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      color: '#92699b'
                    }}
                  >
                    <TwitterIcon style={{marginRight: 5, fontSize: "14px"}} />
                    <a
                      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                      target="_blank"
                      class="twitter-share-button"
                      data-text="I have just donated to Open Access with @quartzoa. Check it out and donate yoursef!"
                      data-hashtags="#openaccess "
                      data-related="quartzoa,decent_science"
                      data-show-count="false"
                      style={{
                        color: '#92699b'
                      }}
                    >
                      <p> Share your donation on Twitter and spread the word</p>
                    </a>
                    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                  </div>
                </Grid>

              </Grid>
            </DialogContent>
          </Dialog>


          {/*Error dialog*/}
          <Dialog
            onClose={this.handleDialogErrorClose}
            arial-labelledby="quantity-dialog"
            open={this.state.dialogErrorOpen}
          >
            <DialogTitle
              id="quantity-dialog"
              onClose={this.handleDialogErrorClose}
            >
              Modal title
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <div
                    style={{color: "#92699b"}}
                  >
                    THERE HAS BEEN AN ERROR IN THE PROCESS
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{fontSize: "12px", color: "#92699b"}}
                  >
                    Please, try again later
                  </div>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>



          {/*Interledger dialog*/}
          <Dialog
            onClose={this.handleDialogInterledgerClose}
            arial-labelledby="quantity-dialog"
            open={this.state.dialogInterledgerOpen}
          >
            <DialogTitle
              id="quantity-dialog"
              onClose={this.handleDialogInterledgerClose}
            >
              Modal title
            </DialogTitle>
            <DialogContent
              style={{width:400}}
            >
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <img src={Ilp} alt="ILP logo" style={{width: 70}}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      //color: "#92699b",
                      fontSize: "21px",
                      textAlign: 'center'
                    }}
                  >
                    <b>INTERLEDGER</b>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      //color: "#92699b",
                      fontSize: "21px",
                      textAlign: 'center'
                    }}
                  >
                    Pay with an ILP account
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    disabled
                    id="outlined-basic"
                    label="ILP node"
                    variant="outlined"
                    defaultValue="QUARTZ"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField id="outlined-basic" label="User" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField id="outlined-basic" label="Password" variant="outlined" type="password" />
                </Grid>

                {/*Espaciar bien*/}
                {/*Este botón lo que tiene que hacer es el equivalente al curl para la petición INTERLEDGER*/
                 /*onClick={this.sendIlpPayment}*/ }
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    target="_blank"
                    onClick={this.sendIlpPayment}
                    style={{fontSize: "14px", backgroundColor: "#5B305B", color: "#ffffff", textTransform: "none", width: 200, marginBottom:50, marginTop: 20}}
                  >
                    <b>PAY</b>
                  </Button>
                </Grid>

              </Grid>
            </DialogContent>
          </Dialog>

        </Grid>

      </Paper>
    )
  }
}

export default withStyles(styles)(DonationButton)
