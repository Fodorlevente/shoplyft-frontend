import axios from "axios";

export async function _sendSpeech(data) {
    try {
        const res = await axios.post("", data);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

export function sendSpeech(data) {
   console.log(data);
}
