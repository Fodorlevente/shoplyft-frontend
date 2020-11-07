import React  from 'react';
import { MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';

export default class ChatBox extends React.Component {   

    render() {
        console.log("Rendering... ChatBox");
        return (
        <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={this.props.data}
        />
        )
    }

 }
