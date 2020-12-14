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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    {/*if(!this.state.buttonPay){
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
    } else {*/}
      this.handleDialog1ClickOpen()
    //}
  }

  setHover = (val) => {
    this.setState({buttonHover: val})
  }

  renderButton = (hover) => {
    if(hover){
      return(
        <React.Fragment>
            <Grid container spacing={2} alignItems="center" justify="center" direction="column">
              <Grid item xs={12}>
                <b>I WILL DONATE 20€</b>
              </Grid>
              <Grid item xs={12} style={{fontSize: "10px", marginTop: -10, paddingTop: 0}}>
                (You can change the amount later)
              </Grid>
            </Grid>
          </React.Fragment>
      )
    } else {
      return(this.state.buttonText)
    }
  }

  handleCheck = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked
    })
  }


  render() {

    const {classes} = this.props
    var value = this.state.value
    var hover = this.state.buttonHover

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
                  onClick={this.handleDialog2ClickOpen}
                  onMouseOver={()=>{this.setHover(true)}}
                  onMouseOut={()=>{this.setHover(false)}}
                  style={{fontSize: "12px", backgroundColor: "#e495bd", color: "#ffffff", textTransform: "none", width: 180}}
                >
                {/*<Button
                  variant="contained"
                  onClick={this.donateButtonClick}
                  onMouseOver={()=>{this.setState({
                    buttonText: <React.Fragment>
                        <Grid container spacing={2} alignItems="center" justify="center" direction="column">
                          <Grid item xs={12}>
                            <b>I WILL DONATE 20€</b>
                          </Grid>
                          <Grid item xs={12} style={{fontSize: "10px", marginTop: -10, paddingTop: 0}}>
                            (You can change the amount later)
                          </Grid>
                        </Grid>
                      </React.Fragment>})}}
                  onMouseOut={()=>{this.setState({
                    buttonText: "DONATE WITH QUARTZ"
                  })}}
                  style={{fontSize: "12px", backgroundColor: "#e495bd", color: "#ffffff", textTransform: "none", width: 180}}
                >*/}
                  {hover?("I WILL DONATE 20€"):(this.state.buttonText)}
                  {/*{this.state.buttonText}*/}
                  {/*{this.renderButton(hover)}*/}
                </Button>
              </Grid>
              <Grid item xs={12} style={{fontSize: "10px", paddingTop: 0, height:'100%'}}>
                {hover?("(You can change the amount later)"):("")}
              </Grid>
            </Grid>
          </Grid>

          {/* First dialog */}
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox checked={this.state.checkedA} onChange={this.handleChecked} name="checkedA" />}
                    label="By continuing you accept the terms & privacy policy"
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
                    the academic community you believe in. <b>Know more</b>
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
                {/* <Grid item xs={12}>
                //   <div class="subscribe">
                //     <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css"/>
                //     <div id="mc_embed_signup">
                //       <form action="https://quartz.us2.list-manage.com/subscribe/post?u=11e1b249d0b1d7b9acf7c72f8&amp;id=5cc5470626" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                //         <div id="mc_embed_signup_scroll">
                //   	      <label for="mce-EMAIL">Subscribe</label>
                //   	      <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required></input>
                //           <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_11e1b249d0b1d7b9acf7c72f8_5cc5470626" tabindex="-1" value=""/></div>
                //           <div class="clear">
                //             <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></input>
                //           </div>
                //         </div>
                //       </form>
                //     </div>
                //   </div>
                // </Grid>*/}

                {/*<TextField
                  id="standard-name"
                  label="Email"
                  placeholder="Enter your email"
                  variant="outlined"
                  onChange={ (e)=>{this.setState({email: e.target.value});} }
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
                />*/}

                <form action="https://quartz.us2.list-manage.com/subscribe/post" method="POST" noValidate>
                  <input type="hidden" name="u" value="11e1b249d0b1d7b9acf7c72f8"/>
                  <input type="hidden" name="id" value="5cc5470626"/>
                  <label htmlFor="MERGE0">
                    <input
                      type="email"
                      name="EMAIL"
                      id="MERGE0"
                      value={this.state.email}
                      onChange={ (e)=>{this.setState({email: e.target.value});} }
                      autoCapitalize="off"
                      autoCorrect="off"
                    />
                  </label>
                  <input
                    type="submit"
                    value="OK"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                    style={{
                      backgroundColor: '#F7C8D9',
                      color: '#5B305B',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      padding: 5
                    }}
                  />

                  {/*<div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true' aria-label="Please leave the following three fields empty">
                    <label htmlFor="b_name">Name: </label>
                    <input type="text" name="b_name" tabIndex="-1" value="" placeholder="Freddie" id="b_name"/>

                    <label htmlFor="b_email">Email: </label>
                    <input type="email" name="b_email" tabIndex="-1" value="" placeholder="youremail@gmail.com" id="b_email"/>

                    <label htmlFor="b_comment">Comment: </label>
                    <textarea name="b_comment" tabIndex="-1" placeholder="Please comment" id="b_comment"></textarea>
                  </div>*/}
                </form>

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
