import React from 'react';
// import { SayButton } from 'react-say';
import Say from 'react-say';


function Speech(props) {

    return (
        <Say
            pitch={0.5}
            volume={ .8 }
            rate={1.5}
            text={props.reply}
        />
    )
}

export default Speech;