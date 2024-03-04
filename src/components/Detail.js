import PreviewDaily from "./PreviewDaily";
import { useLocation } from "react-router-dom";
import Util from './Util';

function Detail(props){

  const location = useLocation()
  const sign = location.state.sign;
  const details = location.state.details;


/*
let search = window.location.search;
let params = new URLSearchParams(search);
const details = params.get('details')
*/
  if( Util.isEmpty(sign) || Util.isEmpty(details)){
    return <PreviewDaily/>;
  }


    return (
       
                
        <div className="box-part text-center">

        <div className="svg-container">
        
        <img src={"/images/"+sign+".svg"} height="200" width="200" />        
     
        </div>
        
          <div className="title">
            <h4>{sign}</h4>
          </div>
                      
          <div className="text">
            <span>
            {details}
            </span>
          </div>
                      
          
          
                      
        </div>
  
     
    )
  
}

export default Detail ;
