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
import { withStyles } from '@material-ui/core/styles'
//import Typography from '@material-ui/core/Typography'

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
      value: 20
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

  render() {

    const {classes} = this.props
    var value = this.state.value

    return(
      <div>
        <Button
          variant="contained"
          onClick={this.handleDialog1ClickOpen}
          style={{fontSize: "12px", backgroundColor: "#e495bd", color: "#ffffff"}}
        >
          DONATE WITH QUARTZ
        </Button>

        {/* First dialog */}
        <Dialog
          onClose={this.handleDialog1Close}
          arial-labelledby="quantity-dialog"
          open={this.state.dialog1Open}
        >
          <DialogTitle
            id="quantity-dialog"
            onClose={this.handleDialog1Close}
          >
            Modal title
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item xs={12} sm={12}>
                <div
                  style={{color: "#92699b"}}
                >
                  HOW MUCH WOULD YOU LIKE TO DONATE?
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div
                  style={{fontSize: "12px", color: "#92699b"}}
                >
                  Dare to end precariousness at the academy.
                </div>
              </Grid>
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
          <DialogContent>
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item xs={12} sm={12}>
                <div
                  style={{color: "#92699b"}}
                >
                  THANKS FOR HELPING OPEN ACCESS SCIENCE GROW FASTER!
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div
                  style={{color: "#92699b"}}
                >
                  You will donate: {this.state.value} €
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
                  style={{color: "#92699b"}}
                >
                  YOUR DONATION HAS BEEN MADE CORRECTLY
                </div>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div
                    style={{fontSize: "12px", color: "#92699b", marginLeft:60, paddingRight:0}}
                  >
                    <img src={logo} alt="Quartz logo" style={{width:100}}/>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    style={{fontSize: "12px", color: "#92699b"}}
                  >
                    <p>
                      <b>Quartz Open Access</b> rewards great <br></br>
                      academic work and empower scholars. <br></br>
                      Do you want to know more?
                    </p>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{fontSize: "12px", color: "#92699b"}}
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
                  <TwitterIcon style={{marginRight: 5}} />
                  <p> Share your donation on Twitter and spread the word</p>
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

      </div>
    )
  }
}

export default withStyles(styles)(DonationButton)
