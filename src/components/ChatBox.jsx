// import React, {useState} from "react";
// import Chat, { Bubble, useMessages, Button, } from "@chatui/core";
// import "@chatui/core/dist/index.css";

// const initialMessages = [
//     {
//       type: 'text',
//       content: { text: 'Hi! I am Sara the ShopLyft AI assistant. What can I help for you?' },
//       user: { avatar: 'https://www.svgrepo.com/show/35097/avatar.svg' },
//     },
//   ];

// export default function ChatBox(props) {
//     // const { messages, appendMsg, setTyping } = useMessages([]);
//     const { messages, appendMsg, setTyping } = useMessages(initialMessages);
    
//     const [message, setMessage] = useState({});
//     const [reply, setReply] = useState({});

//     console.log(props);

   

//     function handleSend(type, val) {
//         if (type === "text" && val.trim()) {
//             appendMsg({
//                 type: "text",
//                 content: { text: props.message },
//                 user: { avatar: 'https://www.svgrepo.com/show/43652/avatar.svg' },
//                 position: "right"
//             });

//             setTyping(true);

//             setTimeout(() => {
//                 appendMsg({
//                     type: "text",
//                     content: { text: props.reply },
//                     user: { avatar: 'https://www.svgrepo.com/show/35097/avatar.svg' },
//                 });
//             }, 1000);
//         }
//     }

//     function renderMessageContent(msg) {
//         const { content } = msg;
//         return <Bubble content={content.text} />;
//     }


//     return (
//         <div>
//             <Chat
//                 navbar={{ title: "Chat" }}
//                 messages={messages}
//                 renderMessageContent={renderMessageContent}
//                 onSend={handleSend}
//                 text={props.message}
//                 placeholder="You can type your message too"
//             />
//         </div>

//     );
// }


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
