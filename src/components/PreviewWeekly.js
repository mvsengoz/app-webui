import { useState, useEffect } from 'react';
import axios from 'axios';
import Util from './Util';
import ErrorPage from "./ErrorPage";
import { NavLink } from 'react-router-dom';

const cache = {};

function PreviewWeekly(){

  const [isLoading, setLoading] = useState(true);
  const [weeklyList, setWeeklyList] = useState();
  const [isError, setError] = useState(false);

  useEffect(() => {

    const serviceUrl = process.env.REACT_APP_API_ENDPOINT+"/weekly-horoscopes";
 
    if(!Util.isEmpty(cache[serviceUrl])){
      const data = cache[serviceUrl];
      setWeeklyList(data);
      setLoading(false);

    }else{
      axios.get(serviceUrl, Util.getConfigForApiCall()).then(response => {
        setWeeklyList(response.data);
        setLoading(false);
        cache[serviceUrl] = response.data; 

      }).catch(
        function (error) {
          setError(true);
        }
      )
    }
  }, []);


  if (isError){
    return <ErrorPage/>;
  }
  
  if (isLoading) {
    return null ;
    /*
    return <div className="loader">
  <div className="loader-wheel"></div>
  <div className="loader-text"></div>
</div>
*/
  }
  return (

    <div className="box">

      <label id="text3d">Check all signs from {Util.getDate(weeklyList[0].startedAt)} to {Util.getDate(weeklyList[0].endedAt)}</label>

      <br/><br/>
      <br/><br/>
      <br/><br/>
      <br/><br/>

    <div className="container">    
    <div className="row"> 
    {weeklyList.map((d) => (
  
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" key={d.sign}>
                  
          <div className="box-part text-center">

          <div className="svg-container">
          
          <img src={"/images/"+d.sign+".svg"} height="100" width="100" alt={d.sign}/>        
      
          </div>
          
            <div className="title">
              <h4>{d.sign}</h4>
              <b>{d.signStart} / {d.signEnd}</b>
            </div>
                        
            <div className="text">
              <span>{Util.trimDownToWord(d.content, 100)}</span>
            </div>
                        
            <NavLink
                      key={"detail_"+d.sign}
                      to="/detail"
                      state={{ sign: d.sign , details: d.content}}
                    > Learn More</NavLink>
          </div>
          <br/>
        </div>	
          ))}
          </div>		
          </div>
        </div>
   
  )
  
}

export default PreviewWeekly ;
