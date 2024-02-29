
import { Buffer } from "buffer";

class Util {
    // Simple function
     static trimDownToWord(string, maxLength) {
        if (string <= maxLength) {
          return string;
        }
      
        let first = string.substr(0, maxLength);
        const second = string.substr(maxLength);
      
        if (/\w$/.test(first) && /^\w/.test(second)) {
          first = first.replace(/\b[^\w]*\w+$/, '');
        }
      
        return first.trim() + '...';
      }

      static isEmpty(input) {
        if (input === null || input === undefined) {
          return true;
        }

        if(Array.isArray(input)){
          if(input.length === 0){
            return true;
          }
        }
      
        return false;
      }

      static getConfigForApiCall() {

        const usernamePasswordBuffer = Buffer.from(process.env.REACT_APP_API_USERNAME + ':' + process.env.REACT_APP_API_PASSWORD);
        const base64data = usernamePasswordBuffer.toString('base64');

        const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64data
          }
        };

        return config;

      }

  }
  export default Util;