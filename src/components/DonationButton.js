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
import TwitterIcon from '@material-ui/icons/Twitter'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import App from '../App.js'
import logo from '../img/logo.jpg'


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
      value: 20,
      buttonText: "DONATE WITH QUARTZ",
      buttonPay: false
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

  setDialog2Open(val){
    this.setState({dialog2Open: val})
  }

  handleDialog2ClickOpen = () => {
    this.setDialog1Open(false)
    this.setDialog2Open(true)
  }

  handleDialog2Close = () => {
    this.setDialog2Open(false)
  }

  handleDialog2Back = () => {
    this.setDialog1Open(true)
    this.setDialog2Open(false)
  }

  setDialogSuccessOpen(val){
    this.setState({dialogSuccessOpen: val})
  }

  handleDialogSuccessClickOpen = () => {
    this.setDialog2Open(false)
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
    this.setDialog2Open(false)
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
    this.setDialog2Open(false)
    this.setDialogWaitOpen(true)
  }

  handleDialogWaitClose = () => {
    this.setDialogWaitOpen(false)
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

  donateButtonClick = () => {
    if(!this.state.buttonPay){
      this.setState({
        buttonText: <React.Fragment>
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item xs={12}>
                <b>I WILL DONATE 20€</b>
              </Grid>
              <Grid item xs={12} style={{fontSize: "10px", marginTop: -10, paddingTop: 0}}>
                (You can change the amount later)
              </Grid>
            </Grid>
          </React.Fragment>,
        buttonPay: true
      })
    } else {
      this.handleDialog1ClickOpen()
    }
  }


  render() {

    const {classes} = this.props
    var value = this.state.value

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
            <Button
              variant="contained"
              onClick={this.donateButtonClick}
              style={{fontSize: "12px", backgroundColor: "#e495bd", color: "#ffffff", textTransform: "none"}}
            >
              {this.state.buttonText}
            </Button>
          </Grid>

          {/* First dialog */}
          <Dialog
            onClose={this.handleDialog1Close}
            arial-labelledby="quantity-dialog"
            open={this.state.dialog1Open}
            contentStyle={{maxWidth: 600}}
          >
            <DialogTitle
              id="quantity-dialog"
              onClose={this.handleDialog1Close}
            >
              Modal title
            </DialogTitle>
            <DialogContent style={{width: 500}}>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      fontSize: "21px",
                      maxWidth: 300,
                      textAlign: 'center'
                    }}
                  >
                    <b>HOW MUCH WOULD YOU LIKE TO DONATE?</b>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{fontSize: "16px"}}
                  >
                    Dare to end precariousness at the academy.
                  </div>
                </Grid>
              </Grid>
              {/*<Divider variant="middle" />*/}
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <Paper
                    className={classes.paper}
                    variant="outlined"
                    square
                  >
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
                      InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                      }}
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
                    {/*<InputBase
                      className={classes.input}
                      placeholder="€"
                      autoFocus
                      value={this.props.value}
                      onChange={this.props.onChange}
                      inputProps={{
                        'aria-label': 'reviewers search',
                        style: {textAlign: 'left', marginLeft:10}
                      }}
                    />*/}
                  </Paper>
                </Grid>
              </Grid>
              {/*<Divider variant="middle" />*/}
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleDialog2ClickOpen}
                    style={{fontSize:"12px", backgroundColor: "#e495bd", color: "#ffffff"}}
                  >
                    DONATE {this.state.value} €
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>

          {/*Second dialog*/}
          <Dialog
            onClose={this.handleDialog2Close}
            aria-labelledby="payment-dialog"
            open={this.state.dialog2Open}
          >
            <DialogTitle
              id="payment-dialog"
              onClose={this.handleDialog2Close}
            >
              Modal title
            </DialogTitle>
            <DialogContent style={{width: 500}}>
              <Grid container spacing={2} alignItems="center" justify="center" direction="column">
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
                    You will donate to this journal:
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div
                    style={{color: "#92699b", fontSize: "54px"}}
                  >
                    <b>{this.state.value} €</b>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  {/*<Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleDialog2Close}
                    style={{fontSize:"12px", backgroundColor: "#e495bd", color: "#ffffff"}}
                  >
                    PAY WITH PAYPAL
                  </Button>*/}
                  <App
                    amount={this.state.value}
                    onSuccess={this.handleDialogSuccessClickOpen}
                    onError={this.handleDialogErrorClickOpen}
                    onWait={this.handleDialogWaitClickOpen}
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Button
                      onClick={this.handleDialog2Back}
                      style={{fontSize:"12px", color: "#92699b"}}
                    >
                      GO BACK
                    </Button>
                    <Button
                      onClick={this.handleDialogSuccessClickOpen}
                      style={{fontSize:"12px"}}
                    >
                      SUCCESS
                    </Button>
                    {/*<Button
                      onClick={this.handleDialogErrorClickOpen}
                      style={{fontSize:"12px"}}
                    >
                      ERROR
                    </Button>*/}
                    <Button
                      onClick={this.handleDialogWaitClickOpen}
                      style={{fontSize:"12px"}}
                    >
                      WAIT
                    </Button>
                  </Grid>
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
                  <div
                    style={{
                      color: "#92699b",
                      fontSize: "21px",
                      maxWidth: 300,
                      textAlign: 'center'
                    }}
                  >
                    YOUR DONATION HAS BEEN MADE CORRECTLY
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={6} align="right" style={{maxWidth: 100, marginRight: 30 }} >
                      <img src={logo} alt="Quartz logo" style={{width:100}}/>
                    </Grid>
                    <Grid item xs={6} style={{fontSize: "16px", color: "#92699b", maxWidth: 300}}>
                      <b>Quartz Open Access</b> rewards great
                      academic work and empower scholars.
                      Do you want to know more?
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{fontSize: "16px", color: "#92699b"}}
                  >
                      <b>Subscribe to our newsletter:</b>
                  </div>
                </Grid>
                <TextField
                  id="standard-name"
                  label="Email"
                  placeholder="Enter your email"
                  variant="outlined"
                  InputProps={{
                    endAdornment:
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleDialogSuccessClose}
                        style={{fontSize:"12px", backgroundColor: "#e495bd", color: "#ffffff"}}
                      >
                        SUBSCRIBE
                      </Button>
                  }}
                  style={{color: "#92699b"}}
                  color="#92699b"
                  />
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
                    <p> Share your donation on Twitter and spread the word</p>
                  </div>

                </Grid>
                <Grid item xs={12} sm={12}>
                  <Paper
                    variant="outlined"
                    square
                    style={{
                      padding: 10,
                      backgroundColor: '#F7C8D9',
                      color: '#5B305B',
                      maxWidth: 480,
                      fontSize: "14px"
                    }}
                  >
                    <div>
                      Subscribe to our newsletter and find out what's new in the
                      browser extension we are developing to facilitate micropayments
                      within the academy
                    </div>
                  </Paper>
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
        </Grid>

      </Paper>
    )
  }
}

export default withStyles(styles)(DonationButton)
