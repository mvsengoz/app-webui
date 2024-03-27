import { useState, useEffect } from 'react';
import axios from 'axios';
import Util from './Util';
import ErrorPage from "./ErrorPage";
import { NavLink } from 'react-router-dom';

const cache = {};
const header = "Weekly Horosocopes";

function PreviewWeekly(){
  document.title = header + " | aicope.net";
  const [isLoading, setLoading] = useState(true);
  const [weeklyList, setWeeklyList] = useState();
  const [isError, setError] = useState(false);

  useEffect(() => {

    const serviceUrl = Util.getProtocol(window.location.href) + process.env.REACT_APP_API_ENDPOINT + "/horoscopes/weekly/latest";
 
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

      <h1>Weekly Horoscopes</h1>
      <h2>{Util.getDate(weeklyList[0].startedAt)} to {Util.getDate(weeklyList[0].endedAt)}</h2>
    <div className="container">    
    <div className="row"> 
    {weeklyList.map((d) => (
  
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" key={d.sign}>
                  
          <div className="box-part text-center">

          <div className="svg-container">
          
          <img src={"/images/"+d.sign+".svg"} height="100" width="100" alt={d.sign}/>        
      
          </div>
          
            <div className="title">
              <h4><b>{Util.prettify(d.sign)}</b></h4>
              <b>{d.signStart} / {d.signEnd}</b>
            </div>
                        
            <div className="text">
             <b>{Util.getDate(weeklyList[0].startedAt)} - {Util.getDate(weeklyList[0].endedAt)} - </b> <span>{Util.trimDownToWord(d.content, 100)}</span>
            </div>
                        
            <NavLink
                      key={"detail_"+d.sign}
                      to={"/detail/weekly-horoscope?hash="+d.id+"&sign="+d.sign+"&period=weekly&date="+Util.getDateInfo("weekly", d.startedAt, d.endedAt)}
                      state={{ details: d.content}}
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
