import axios from "axios";

const session = (Math.floor(Math.random() * 50) +  1);

export async function sendSpeech(reply) {
    console.log(`Session: ${session}`);
    try {
        const data = JSON.stringify({ "query": reply, "key": "5vkEg9HYcR0dIFqYrX61Cm3Q7y5OMO4d", "unit": session  });

        const config = {
            method: 'post',
            url: 'https://api.aimybox.com/request',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
    
        const res = await axios(config);
        return res.data.text;
        
    } catch (e) {
        console.log(e);
        return 'Error';
    }
   
}



