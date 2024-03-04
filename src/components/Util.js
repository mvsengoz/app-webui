
import { Buffer } from "buffer";
import moment from "moment";

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

      static getDate(input) {
        var formatted = moment(input).format('Do MMM');
        return formatted;
      }

      static getYear(input) {
        var formatted = moment(input).format('YYYY');
        return formatted;
      }

      static getMonth(input) {
        var formatted = moment(input).format('MMMM');
        return formatted;
      }

  }
  export default Util;