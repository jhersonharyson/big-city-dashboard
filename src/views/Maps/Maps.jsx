import React from "react";
import Button from "@material-ui/core/Button";
import * as axios from "axios";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: 200,
      rerender: true,
      map: {}
    };
  }
  componentWillMount() {
    this.setState({ map: this.map });
  }
  componentDidMount = async () => {
    document.data = { data: await this.doRequestMap("temperature") };
    document.leaflet();
  };

  doRequestMap = async name => {
    const request = await axios.get(
      `https://big-city-server.herokuapp.com/api/v1/ws/data-map/${name}/${
        this.setState.requests
      }`
    );
    return request.data;
  };

  map = (
    <div
      className="heatmap"
      id="map-canvas"
      style={{ height: window.innerHeight * 0.7 }}
    />
  );

  selectMap = async name => {
    // alert(name);
    document.data = { data: await this.doRequestMap(name) };
    console.log(document.data.data);
    const map = (
      <div
        className="heatmap"
        id="map-canvas"
        style={{ height: window.innerHeight * 0.7 }}
      />
    );

    await this.setState({ map: null });
    await this.setState({ map });
    document.leaflet();

    //rerender

    // if(name === "temperature"){

    // }else if(name === "humidity"){

    // }else if(name === "co"){

    // }else if(name === "smoke"){

    // }else if(name === "lpg"){

    // }else if(name === "temperature_"){

    // }else if(name === "humidity_"){

    // }
  };
  render() {
    return (
      <>
        <div
          className="heatmap"
          id="map-canvas"
          style={{ height: window.innerHeight * 0.7 }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5px"
          }}
        >
          <Button className="btn" onClick={_ => this.selectMap("temperature")}>
            Temperatura
          </Button>
          <Button className="btn" onClick={_ => this.selectMap("humidity")}>
            Humidade
          </Button>
          <Button className="btn" onClick={_ => this.selectMap("co")}>
            CO²
          </Button>
          <Button className="btn" onClick={_ => this.selectMap("smoke")}>
            Fumaça
          </Button>
          <Button className="btn" onClick={_ => this.selectMap("lpg")}>
            LPG
          </Button>
          <Button className="btn" onClick={_ => this.selectMap("temperature_")}>
            Temperatura¹
          </Button>
          <Button className="btn" onClick={_ => this.selectMap("humidity_")}>
            Humidade¹
          </Button>
        </div>
      </>
    );
  }
}

export default Map;
