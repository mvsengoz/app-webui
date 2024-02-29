
function Detail(props){


let search = window.location.search;
let params = new URLSearchParams(search);
const sign = params.get('sign')
const details = params.get('details')
console.log(sign)


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
