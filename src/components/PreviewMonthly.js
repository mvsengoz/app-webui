import { useState, useEffect } from 'react';
import axios from 'axios';
import Util from './Util';
import ErrorPage from "./ErrorPage";
import { NavLink } from 'react-router-dom';

const cache = {};
const header = "Monthly Horosocopes";

function PreviewMonthly() {
  document.title = header + " | aicope.net";
  const [isLoading, setLoading] = useState(true);
  const [monthlyList, setMonthlyList] = useState();
  const [isError, setError] = useState(false);


  useEffect(() => {
    const serviceUrl = Util.getProtocol(window.location.href) + process.env.REACT_APP_API_ENDPOINT + "/horoscopes/monthly/latest";

    if (!Util.isEmpty(cache[serviceUrl])) {
      const data = cache[serviceUrl];
      setMonthlyList(data);
      setLoading(false);

    } else {
      axios.get(serviceUrl, Util.getConfigForApiCall()).then(response => {
        setMonthlyList(response.data);
        setLoading(false);
        cache[serviceUrl] = response.data;

      }).catch(
        function (error) {
          setError(true);
        }
      )
    }
  }, []);

  if (isError) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return null;
    /*
    return <div className="loader">
  <div className="loader-wheel"></div>
  <div className="loader-text"></div>
</div>
*/

  }
  monthlyList.sort(function(a, b){
    return a.startedAt - b.startedAt ;
  })
  return (


    <div className="box">

      <h1>Monthly Horoscopes</h1>
      <h2>{Util.getMonth(monthlyList[0].startedAt)} {Util.getYear(monthlyList[0].startedAt)}</h2>

      <div className="container">
        <div className="row">
          {monthlyList.map((d) => (

            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" key={d.sign}>

              <div className="box-part text-center">

                <div className="svg-container">

                  <img src={"/images/" + d.sign + ".svg"} height="100" width="100" alt={d.sign} />

                </div>

                <div className="title">
                  <h4><b>{Util.prettify(d.sign)}</b></h4>
                  <b>{d.signStart} / {d.signEnd}</b>
                </div>

                <div className="text">
                  <b>{Util.getMonth(monthlyList[0].startedAt)} {Util.getYear(monthlyList[0].startedAt)+ " - "}</b><span>{Util.trimDownToWord(d.content, 100)}</span>
                </div>

                <NavLink
                  key={"detail_" + d.sign}
                  to={"/detail/monthly-horoscope?hash="+d.id+"&sign="+d.sign+"&period=monthly&date="+Util.getDateInfo("monthly", d.startedAt, d.endedAt)}
                  state={{ details: d.content }}
                > Learn More</NavLink>
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>

  )


}

export default PreviewMonthly;
