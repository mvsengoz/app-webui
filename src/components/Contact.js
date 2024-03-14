import axios from 'axios';
import moment from "moment";

import Util from './Util';


const handleSubmit = (event) => {
    event.preventDefault();
    const baseURL = process.env.REACT_APP_API_ENDPOINT + "/message";

    let name = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let message = event.target.elements.message.value;
    let createdAt = moment().format("YYYY-MM-DDTHH:mm:ss");
   
 
    const data = JSON.stringify(
        {
            name: name,
            email: email,
            message: message,
            createdAt: createdAt
        });



      sendMessage(baseURL, data, event);


  

}

async function sendMessage(baseURL, data, event) {

    const result = await axios.post(baseURL, data, Util.getConfigForApiCall()).catch(
        function (error) {
            console.log('error@contact !' + error);
        }
    ) ;

    if (Util.isEmpty(result)){
        alert("Message failed ! Please try later");
    }else{
        alert("Message saved succesfully");
        event.target.elements.name.value = "";
        event.target.elements.email.value = "";
         event.target.elements.message.value = "";
    }


}



function Contact() {


    return (

        <div className="fcf-body">
            <br />
            <br />
            <br />
            <br />
            <br />
            <div id="fcf-form">
                <h3 className="fcf-h3">Contact us</h3>

                <form id="fcf-form-id" className="fcf-form-class" onSubmit={handleSubmit}>

                    <div className="fcf-form-group">
                        <label htmlFor="Name" className="fcf-label">Your name</label>
                        <div className="fcf-input-group">
                            <input type="text" id="name" name="Name" className="fcf-form-control" required />
                        </div>
                    </div>

                    <div className="fcf-form-group">
                        <label htmlFor="Email" className="fcf-label">Your email address</label>
                        <div className="fcf-input-group">
                            <input type="email" id="email" name="Email" className="fcf-form-control" required />
                        </div>
                    </div>

                    <div className="fcf-form-group">
                        <label htmlFor="Message" className="fcf-label">Your message</label>
                        <div className="fcf-input-group">
                            <textarea id="message" name="Message" className="fcf-form-control" rows="6" maxLength="3000" required></textarea>
                        </div>
                    </div>

                    <div className="fcf-form-group">
                        <button type="submit" id="fcf-button" className="fcf-btn fcf-btn-primary fcf-btn-lg fcf-btn-block" >Send Message</button>
                    </div>



                </form>
            </div>

        </div>
    )

}

export default Contact;
