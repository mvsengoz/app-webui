
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
        var formatted = moment(input).format('Do MMMM');
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

      static prettify(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
      }

      static clearData(input) {
        return input.replace(new RegExp('<b>', 'g'), '').replace(new RegExp('</b>', 'g'), '');
      }

      static getDateInfo(period, startedAt, endedAt) {

        if(period === "daily"){
          return Util.getDate(startedAt);
        }else if(period === "weekly"){
          return Util.getDate(startedAt) +" - "+Util.getDate(endedAt);
        }else if(period === "monthly"){
          return Util.getMonth(startedAt)+" "+Util.getYear(startedAt);
        }else{
            return "";
        }
      }

      static getProtocol(input) {
          if(!Util.isEmpty(input)){
            if(input.indexOf("https")>=0){
              return "https://";
            }else{
              return "http://";
            }
          }
      }

  }
  export default Util;