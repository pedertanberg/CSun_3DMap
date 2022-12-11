import React, { useRef, useEffect } from "react";
import Expand from "@arcgis/core/widgets/Expand";
import WebMap from "@arcgis/core/Map";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView";
import Daylight from "@arcgis/core/widgets/Daylight";
import Search from "@arcgis/core/widgets/Search";
import RouteLayer from "@arcgis/core/layers/RouteLayer";
import Graphic from "@arcgis/core/Graphic";
import { shopLocator } from "../../locator";
import DaylightViewModel from "@arcgis/core/widgets/Daylight/DaylightViewModel";
import { auth, getMarker, getUnVerified } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import RestData from "../../assets/Scraped_Data/PROFFNO_Rest_scrape.json";
import BarData from "../../assets/Scraped_Data/PROFFNO_BAR_scrape.json";
import RestDataCPH from "../../assets/Scraped_Data/ProffDK_hoved_Rest.json";
import RestDataStck from "../../assets/Scraped_Data/ProffSE_Stck_Rest.json";
import RestDataLund from "../../assets/Scraped_Data/ProffSE_Lnd_Rest.json";
import Barpin from "../../assets/MapMarkers/map-marker.png";
import RestPin from "../../assets/MapMarkers/map-marker-rest.png";
import VerifiedPin from "../../assets/MapMarkers/map-marker_verified.png";
import { useLocation } from "react-router-dom";
import CPHDATA from "../../assets/Scraped_Data/Cph.json";

/**Importing from Geocoder, which again is data from proff */
import CPHGEO from "../../assets/Geocoder_output/Cph.json";
import STCKGEO from "../../assets/Geocoder_output/Stck.json";
import LUNDGEO from "../../assets/Geocoder_output/Lund.json";
import OSLOGEO from "../../assets/Geocoder_output/OSL_Rest.json";

const data1 = {
  Osl: { src: OSLOGEO, coordinates: [10.736641, 59.914573, 2000] },
  Cph: { src: CPHGEO, coordinates: [12.568337, 55.676098, 2000] },
  Stck: { src: STCKGEO, coordinates: [18.06324, 59.334591, 2000] },
  Lund: { src: LUNDGEO, coordinates: [13.184357, 55.705307, 2000] }
};

esriConfig.apiKey =
  "AAPKfc0209af11d3434bbf0799554f377d1dACO76XRtjlavzo6uvi6tHkQ6lGLr_cixp79m4dHK00DGYykDGt2L19cTUeSICw4K";

function App() {
  const [user, loading, error] = useAuthState(auth);
  let location = useLocation();
  const [data, setData] = React.useState(
    data1[location.mapProp.city].src ? data1[location.mapProp.city].src : RestData
  );

  const mapDiv = useRef(null);
  const routeLayer = new RouteLayer();
  const today = new Date("2022-07-25 15:13:00");

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }

    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        basemap: "topo-vector",
        ground: "world-elevation",
        layers: [routeLayer]
      });

      // const scenelayer = new SceneLayer({
      //   portalItem: {
      //     id: "e337746e9a7442f9a4060d126854689e"
      //   }
      // });

      const view = new SceneView({
        container: mapDiv.current,
        map: webmap,
        zoom: 12,
        camera: {
          position: data1[location.mapProp.city].coordinates
            ? data1[location.mapProp.city].coordinates
            : [10.736641, 59.914573, 2000], //70  55.68155441541816,12.58227229143479
          tilt: 50
          // heading: 50
        }
      });

      // Create SceneLayer and add to the map
      const sceneLayer = new SceneLayer({
        minScale: 3000,
        maxScale: 0,
        portalItem: {
          id: "ca0470dbbddb4db28bad74ed39949e25"
        },
        popupEnabled: false
      });
      webmap.add(sceneLayer);

      const treeLayer = new SceneLayer({
        minScale: 3000,
        maxScale: 0,
        portalItem: {
          id: "33383da8a75f4d24b4b6a0d0532abe6e"
        },
        popupEnabled: false
      });
      webmap.add(treeLayer);

      // const weatherExpand = new Expand({
      //   view: view,
      //   content: new Weather({
      //     view: view
      //   }),
      //   group: "top-right",
      //   expanded: false
      // });

      const daylightModel = new DaylightViewModel({
        localDate: today,
        sunLightingEnabled: true,
        directShadowsEnabled: true,
        timeSliderPosition: today.getUTCMinutes()
        // utcOffset: 1
        // view: view
      });

      const daylightExpand = new Expand({
        view: view,
        content: new Daylight({
          view: view,
          visibleElements: {
            sunLightingToggle: false,
            shadowsToggle: false,
            timezone: false
          }
          // viewModel: daylightModel
        }),
        group: "bottom-right",
        expanded: true
      });
      view.ui.add([daylightExpand], "bottom-right"); //weatherExpand,
      view.environment.lighting.directShadowsEnabled = true;
      view.environment.lighting.date = today;

      const symbol = {
        type: "picture-marker",
        url: Barpin, //../../assets/MapMarkers/map-marker.png
        width: 23,
        height: 23
      };

      const searchWidget = new Search({
        view: view
      });

      // Add the search widget to the top right corner of the view
      view.ui.add(searchWidget, {
        position: "top-right"
      });

      // shopLocator().then((results) => {
      //   // console.log(results);
      //   results.forEach((result) => {
      //     const { attributes, location, extent } = result;
      //     const graphic = new Graphic({
      //       attributes,
      //       geometry: {
      //         type: "point",
      //         ...location
      //       },
      //       symbol2,
      //       popupTemplate: {
      //         title: "{PlaceName}",
      //         content: "{Place_addr}"
      //       }
      //     });
      //     setTimeout(() => {
      //       view.graphics.add(graphic);
      //       // view.extent = extent;
      //     }, 10000);
      //   });
      // });

      //RESTDATA PROFFF THIS IS FOR CPH ONLY NOW. not commited to github, be aware.
      data.forEach((result) => {
        const { location, extent, address, score, Name } = result;
        const obj = {
          address,
          location,
          // attributes: {
          //   PlaceName: result.name,
          //   Place_addr: result.original_Address ? result.original_Address : "No address",
          //   PlaceType: result.BarRest
          // },
          extent,
          score
        };
        const attributes = {
          PlaceName: Name,
          Place_addr: address,
          PlaceType: result.Type
        };
        const graphic = new Graphic({
          attributes,
          geometry: {
            type: "point",
            ...location
          },
          symbol: {
            type: "picture-marker",
            url: RestPin, //../../assets/MapMarkers/map-marker.png
            width: 23,
            height: 23
          },
          popupTemplate: {
            title: "{PlaceName}",
            content: "{Place_addr}  <br/> <br/>  {PlaceType}"
          }
        });
        setTimeout(() => {
          view.graphics.add(graphic);
          // view.extent = extent;
        }, 10000);
      });

      //___________________END_________________________________________

      // if (location.mapProp.city == "Osl") {
      //   getMarker().then((results) => {
      //     // console.log(results);
      //     results.forEach((result) => {
      //       const obj = {
      //         address: result.title,
      //         location: {
      //           x: result.lon,
      //           y: result.lat
      //         },
      //         attributes: {
      //           PlaceName: result.title,
      //           Place_addr: result.address ? result.address : "No address"
      //           // PlaceType: result.type
      //         },
      //         extent: {
      //           xmin: result.lon - 0.0001,
      //           ymin: result.lat - 0.0001,
      //           xmax: result.lon + 0.0001,
      //           ymax: result.lat + 0.0001
      //         },
      //         score: 100
      //       };
      //       const { attributes, location, extent } = obj;
      //       const graphic = new Graphic({
      //         attributes,
      //         geometry: {
      //           type: "point",
      //           ...location
      //         },
      //         symbol: {
      //           type: "picture-marker",
      //           url: VerifiedPin, //../../assets/MapMarkers/map-marker.png
      //           width: 23,
      //           height: 23
      //         },
      //         popupTemplate: {
      //           title: "{PlaceName}",
      //           content:
      //             "<a href={Place_addr} target='_blank' rel='noreferrer'>Finn Adresse</a> <br/> <br/> Verifisert av CSun"
      //         }
      //       });
      //       setTimeout(() => {
      //         view.graphics.add(graphic);
      //         // view.extent = extent;
      //       }, 10000);
      //     });
      //   });

      //   //BarDATA PROFFF
      //   BarData.forEach((result) => {
      //     const obj = {
      //       address: result.name,
      //       location: {
      //         x: result.lon,
      //         y: result.lat
      //       },
      //       attributes: {
      //         PlaceName: result.name,
      //         Place_addr: result.original_Address ? result.original_Address : "No address",
      //         PlaceType: result.BarRest
      //       },
      //       extent: {
      //         xmin: result.lon - 0.0001,
      //         ymin: result.lat - 0.0001,
      //         xmax: result.lon + 0.0001,
      //         ymax: result.lat + 0.0001
      //       },
      //       score: 100
      //     };
      //     const { attributes, location, extent } = obj;
      //     const graphic = new Graphic({
      //       attributes,
      //       geometry: {
      //         type: "point",
      //         ...location
      //       },
      //       symbol,
      //       popupTemplate: {
      //         title: "{PlaceName}",
      //         content: "{Place_addr}  <br/> <br/>  {PlaceType}"
      //       }
      //     });
      //     setTimeout(() => {
      //       view.graphics.add(graphic);
      //       // view.extent = extent;
      //     }, 10000);
      //   });

      //   // getUnVerified().then((results) => {
      //   //   // console.log(results);
      //   //   results.forEach((result) => {
      //   //     const obj = {
      //   //       address: result.title,
      //   //       location: {
      //   //         x: result.lon,
      //   //         y: result.lat
      //   //       },
      //   //       attributes: {
      //   //         PlaceName: result.title,
      //   //         Place_addr: result.address ? result.address : "No address",
      //   //         PlaceType: result.type
      //   //       },
      //   //       extent: {
      //   //         xmin: result.lon - 0.0001,
      //   //         ymin: result.lat - 0.0001,
      //   //         xmax: result.lon + 0.0001,
      //   //         ymax: result.lat + 0.0001
      //   //       },
      //   //       score: 100
      //   //     };
      //   //     const { attributes, location, extent } = obj;
      //   //     const graphic = new Graphic({
      //   //       attributes,
      //   //       geometry: {
      //   //         type: "point",
      //   //         ...location
      //   //       },
      //   //       symbol,
      //   //       popupTemplate: {
      //   //         title: "{PlaceName}",
      //   //         content: "{Place_addr}  <br/> <br/>  Uverifisert"
      //   //       }
      //   //     });
      //   //     setTimeout(() => {
      //   //       view.graphics.add(graphic);
      //   //       // view.extent = extent;
      //   //     }, 10000);
      //   //   });
      //   // });
      // }
    }
  }, []);

  useEffect(() => {}, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
