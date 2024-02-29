
function Box(props){
    return (
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                
        <div className="box-part text-center">

        <div className="svg-container">
        
        <img src={"/images/"+props.sign+".svg"} height="200" width="200" />        
     
        </div>
        
          <div className="title">
            <h4>{props.sign}</h4>
          </div>
                      
          <div className="text">
            <span>Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore te sed. Elitr scripta ocurreret qui ad.</span>
          </div>
                      
          <a href="/#">Learn More</a>
          
                      
        </div>
        <br/>
      </div>	
     
    )
  
}

export default Box ;
