import axios from "axios";

export async function sendSpeech(reply) {
    try {
        const data = JSON.stringify({ "query": reply, "key": "5vkEg9HYcR0dIFqYrX61Cm3Q7y5OMO4d", "unit": "1604692439244" });

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



