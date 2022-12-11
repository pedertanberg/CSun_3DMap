import React, { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Card } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";
import { getMarker } from "../../Firebase/firebase";

const gridStyle = {
  width: "50%",
  textAlign: "center"
};

const App = () => {
  const [clicked, setClicked] = React.useState(false);
  const [verified_places, setVerified_places] = React.useState([]);
  const [suggestion, setSuggestion] = React.useState({});

  const makeSuggestion = () => {
    var item = verified_places[Math.floor(Math.random() * verified_places.length)];
    setSuggestion(item);
  };

  useEffect(() => {
    getMarker()
      .then((results) => {
        // console.log(results);
        setVerified_places(results);
        // var item = results[Math.floor(Math.random() * results.length)];
        // console.log("Suggestion", item);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      {!clicked ? (
        // <Link to="/Byer">
        <div
          className="pulsingButton"
          onClick={() => {
            makeSuggestion(), setClicked(true);
          }}
        >
          Finn din solstol
        </div>
      ) : (
        // </Link>
        <>
          <Card
            title={suggestion.title}
            extra={
              <Tooltip title="search">
                <Button
                  type="primary"
                  // shape="circle"
                  onClick={makeSuggestion}
                  // style={{ borderRadius: "50% !important" }}
                >
                  Nytt Forslag
                </Button>
              </Tooltip>
            }
          >
            <Card.Grid style={gridStyle}>
              <b>Sol Hele dagen</b> <br />
              {suggestion.allDay ? "Ja" : "Nei"}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <b>Sol Fra</b> <br /> {suggestion.from.length > 0 ? suggestion.from : "09:00"}
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <b>Sol Til</b> <br /> {suggestion.to.length > 0 ? suggestion.to : "21:00"}
            </Card.Grid>
            {/* <Card.Grid style={gridStyle}>
              <a href={suggestion.address} target="_blank">
                Veibeskrivelse
              </a>
            </Card.Grid> */}
            <Card.Grid style={gridStyle}>
              <b>Kommentar</b> <br /> {suggestion.comment.length > 0 ? suggestion.comment : "Ingen kommentar"}
            </Card.Grid>
          </Card>
        </>
      )}
    </div>
  );
};

export default App;
