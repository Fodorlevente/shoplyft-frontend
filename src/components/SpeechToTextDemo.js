import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import SpeechToText from 'speech-to-text';


import Speech from './Speech';
import * as api from '../api';
import logo from '../img/bread.png';

import ChatBox from './ChatBox';


const styles = theme => ({
  root: {
    paddingTop: 65,
    paddingLeft: 11,
    paddingRight: 11
  },
  flex: {
    flex: 1
  },
  grow: {
    flexGrow: 1
  },
  paper: theme.mixins.gutters({
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: 'lightgrey',
    width: '75%'
  })
});

class SpeechToTextDemo extends Component {
  state = {
    error: '',
    interimText: '',
    finalisedText: [],
    listening: false,
    language: 'en-US',
    reply: '',
    data: [ {
      position: 'left',
      type: 'text',
      text: 'Hi!',
      date: new Date(),
    }]
  };

  generateMessage(msg, dir) {
    console.log("generateMessage");
    return  {
        position: dir,
        type: 'text',
        text: msg,
        date: new Date(),
        avatarFlexible: true,
        avatar: dir === 'left' ? "https://www.svgrepo.com/show/35097/avatar.svg" : 'https://www.svgrepo.com/show/43652/avatar.svg'
    }
  } 

  onAnythingSaid = text => {
    this.setState({ interimText: text });
  };

  onEndEvent = () => {
    if (!isWidthUp('sm', this.props.width)) {
      this.setState({ listening: false });
    } else if (this.state.listening) {
      this.startListening();
    }
  };

  onFinalised = async( text )  => {
    const replyText = await api.sendSpeech(text);
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: '',
      reply: replyText,
      data: [
        ...this.state.data, 
        this.generateMessage(text, 'right'),
        this.generateMessage(replyText, 'left')
      ]
    });

  };

  startListening = () => {
    try {
      this.listener = new SpeechToText(
        this.onFinalised,
        this.onEndEvent,
        this.onAnythingSaid,
        this.state.language
      );
      this.listener.startListening();
      this.setState({ listening: true, reply: '' });
    } catch (err) {
      console.log('yoyoy');
      console.log(err);
    }
  };

  stopListening = () => {
    this.listener.stopListening();
    this.setState({ listening: false });
  };


  render() {
    console.log("Rending...");
    console.log(this.state.finalisedText);
    console.log(this.state.reply);
    
    const {
      error,
      interimText,
      finalisedText,
      listening,
      language
    } = this.state;
    const { classes } = this.props;
    let content;
    if (error) {
      content = (
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
        </Paper>
      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <Button 
            onClick={() => this.stopListening()}
            style={{ background: 'red', marginTop: '24px' }}
            >
            Stop Listening
          </Button>
        );
      } else {
        buttonForListening = (
          <Button
            style={{ background: '#FFB63E', marginTop: '24px' }}
            onClick={() => this.startListening()}
            variant="contained"
          >
            <img src="https://www.svgrepo.com/show/304491/mic.svg" alt="dsada" />
          </Button>
        );
      }
      content = (
        <Grid container spacing={8} >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
               <ChatBox data={this.state.data}/>
            </Paper>
            {buttonForListening}
          </Grid>
          
        </Grid>
      );
    }
    
    return (
      <Grid container>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12} sm={8}>
            {content}
            {this.state.reply !== '' ? 
              <Speech reply={this.state.reply} />
              :
              null
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withWidth()(withStyles(styles)(SpeechToTextDemo));
