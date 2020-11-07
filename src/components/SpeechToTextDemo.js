import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import SpeechToText from 'speech-to-text';

import supportedLanguages from '../supportedLanguages';

import Speech from './Speech';
import * as api from '../api';
import logo from '../img/bread.png';

import { MessageList } from 'react-chat-elements';

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
    paddingBottom: 22
  })
});

class SpeechToTextDemo extends Component {
  state = {
    error: '',
    interimText: '',
    finalisedText: [],
    listening: false,
    language: 'en-US',
    reply: ''
  };

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
    const alma = await api.sendSpeech(text);
    console.log(alma);
    this.setState({
      finalisedText: [text, ...this.state.finalisedText],
      interimText: '',
      reply: alma,
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
          <Button color="primary" onClick={() => this.stopListening()}>
            Stop Listening
          </Button>
        );
      } else {
        buttonForListening = (
          <Button
            style={{ background: '#FFB63E' }}
            onClick={() => this.startListening()}
            variant="contained"
          >
            Start Listening
          </Button>
        );
      }
      content = (
        <Grid container spacing={8} >
          <Grid item xs={12} md={7}>
            <Paper className={this.props.classes.paper} >
              <Grid container spacing={8}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="overline" gutterBottom>
                    Status: {listening ? 'listening...' : 'finished listening'}
                  </Typography>
                  {buttonForListening}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={language}
                      onChange={evt =>
                        this.setState({ language: evt.target.value })
                      }
                      disabled={listening}
                    >
                      {supportedLanguages.map(language => (
                        <MenuItem key={language[1]} value={language[1]}>
                          {language[0]}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      What language are you going to speak in?
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper className={this.props.classes.paper} style={{ color: "white",  background: '#A3CEB6' }}>
              <Typography variant="overline" gutterBottom>
              text you have spoken
              </Typography>
              <Typography variant="body1" gutterBottom>
                {interimText}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Finalised Text</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {finalisedText.map((str, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {str}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container>
        <AppBar position="static">
          <Toolbar style={{ background: '#FFB63E' }}>
            <Typography variant="h6" className={classes.grow} style={{ color: 'white' }}>
              Need bread? - ShopLyft™  
            </Typography>
            <img src={logo} />
          </Toolbar>
        </AppBar>
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
