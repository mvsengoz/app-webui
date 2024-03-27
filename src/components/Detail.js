import { useLocation } from "react-router-dom";
import Util from './Util';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ErrorPage from "./ErrorPage";
import { useState, useEffect } from 'react';
import PreviewDaily from "./PreviewDaily";
function Detail(props) {



  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isError, setError] = useState(false);
  let [details, setDetails] = useState();
  const [isLoading, setLoading] = useState(true);
  const [missingParameters, setMissingParamaters] = useState(false);
  const id = searchParams.get('hash');
  const sign = searchParams.get('sign');
  const period = searchParams.get('period');
  let [dateInfo, setDateInfo] = useState(searchParams.get('date'));


  useEffect(() => {
    if (!Util.isEmpty(sign) && !Util.isEmpty(period)) {
      setMissingParamaters(false);
      document.title = Util.prettify(sign) +" "+ Util.prettify(period) + " Horoscope | aicope.net"

      const serviceUrl = Util.getProtocol(window.location.href) + process.env.REACT_APP_API_ENDPOINT + "/horoscope/latest/" + sign + "/" + period;


      if (!Util.isEmpty(location.state)) {
        setDetails(location.state.details);
        setLoading(false);
      }

      if (Util.isEmpty(location.state)) {
        axios.get(serviceUrl, Util.getConfigForApiCall()).then(response => {
          setDetails(response.data.content);
          setDateInfo(Util.getDateInfo(period, response.data.startedAt, response.data.endedAt));
          setLoading(false);
        }).catch(
          function (error) {
            setError(true)
          }
        )

      }
    }else{
      setMissingParamaters(true);
    }
  }, []);


  if (isError) {
    return <ErrorPage />;
  }

  if (missingParameters) {
    return <PreviewDaily />;
  }

  if (isLoading) {
    return null;
  }


  return (


    <div className="box-part text-center">

      <div className="svg-container">
        <br />



        <img src={"/images/" + sign + ".svg"} height="200" width="200" />

      </div>
      <div className="title">
        <h3> <b>{Util.prettify(sign)} {Util.prettify(period)} Horoscope</b></h3>
      </div>


      <div className="detailBox">
        <span>
          <b>{dateInfo} - </b>{Util.clearData(details)}
        </span>
      </div>
      <Link to={'..'} onClick={(e) => { e.preventDefault(); navigate(-1); }}>
        Go back
      </Link>
      <br></br><br></br>
     
    </div>


  )

}

export default Detail;
