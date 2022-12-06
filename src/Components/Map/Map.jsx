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
import Barpin from "../../assets/MapMarkers/map-marker.png";
import RestPin from "../../assets/MapMarkers/map-marker-rest.png";
import VerifiedPin from "../../assets/MapMarkers/map-marker_verified.png";
/*
trees: 33383da8a75f4d24b4b6a0d0532abe6e

*/

esriConfig.apiKey =
  "AAPKfc0209af11d3434bbf0799554f377d1dACO76XRtjlavzo6uvi6tHkQ6lGLr_cixp79m4dHK00DGYykDGt2L19cTUeSICw4K";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const mapDiv = useRef(null);
  const routeLayer = new RouteLayer();
  const today = new Date("2022-07-25 15:13:00");

  useEffect(() => {
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
          position: [10.736641, 59.914573, 2000], //70
          tilt: 50
          // heading: 50
        }
      });

      // Create SceneLayer and add to the map
      const sceneLayer = new SceneLayer({
        portalItem: {
          id: "ca0470dbbddb4db28bad74ed39949e25"
        },
        popupEnabled: false
      });
      webmap.add(sceneLayer);

      const treeLayer = new SceneLayer({
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

      // const routing = new Expand({
      //   view: view,
      //   content: new Directions({
      //     view: view,
      //     layer: routeLayer
      //   }),
      //   group: "top-right",
      //   expanded: false
      // });
      // view.ui.add(routing, { position: "top-right" });

      // const symbol = {
      //   type: "picture-marker",
      //   url: "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_outline_v4-2-medium.png,assets/icons/poi/tactile/pinlet_v4-2-medium.png,assets/icons/poi/quantum/pinlet/bar_pinlet-2-medium.png&highlight=ea8600,f29900,ffffff?scale=1.25",
      //   width: 23,
      //   height: 23,
      //   yoffset: 11
      // };

      // const symbol2 = {
      //   type: "picture-marker",
      //   url: "https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
      //   width: 23,
      //   height: 23,
      //   yoffset: 11
      // };

      // const symbol3 = {
      //   type: "picture-marker",
      //   url: "https://static.vecteezy.com/system/resources/previews/008/506/390/original/bright-green-tick-checkmark-icon-free-png.png",
      //   width: 23,
      //   height: 23,
      //   yoffset: 11
      // };

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

      getMarker().then((results) => {
        // console.log(results);
        results.forEach((result) => {
          const obj = {
            address: result.title,
            location: {
              x: result.lon,
              y: result.lat
            },
            attributes: {
              PlaceName: result.title,
              Place_addr: result.address ? result.address : "No address"
              // PlaceType: result.type
            },
            extent: {
              xmin: result.lon - 0.0001,
              ymin: result.lat - 0.0001,
              xmax: result.lon + 0.0001,
              ymax: result.lat + 0.0001
            },
            score: 100
          };
          const { attributes, location, extent } = obj;
          const graphic = new Graphic({
            attributes,
            geometry: {
              type: "point",
              ...location
            },
            symbol: {
              type: "picture-marker",
              url: VerifiedPin, //../../assets/MapMarkers/map-marker.png
              width: 23,
              height: 23
            },
            popupTemplate: {
              title: "{PlaceName}",
              content:
                "<a href={Place_addr} target='_blank' rel='noreferrer'>Finn Adresse</a> <br/> <br/> Verifisert av CSun"
            }
          });
          setTimeout(() => {
            view.graphics.add(graphic);
            // view.extent = extent;
          }, 10000);
        });
      });

      //RESTDATA PROFFF
      RestData.forEach((result) => {
        const obj = {
          address: result.name,
          location: {
            x: result.lon,
            y: result.lat
          },
          attributes: {
            PlaceName: result.name,
            Place_addr: result.original_Address ? result.original_Address : "No address",
            PlaceType: result.BarRest
          },
          extent: {
            xmin: result.lon - 0.0001,
            ymin: result.lat - 0.0001,
            xmax: result.lon + 0.0001,
            ymax: result.lat + 0.0001
          },
          score: 100
        };
        const { attributes, location, extent } = obj;
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

      //BarDATA PROFFF
      BarData.forEach((result) => {
        const obj = {
          address: result.name,
          location: {
            x: result.lon,
            y: result.lat
          },
          attributes: {
            PlaceName: result.name,
            Place_addr: result.original_Address ? result.original_Address : "No address",
            PlaceType: result.BarRest
          },
          extent: {
            xmin: result.lon - 0.0001,
            ymin: result.lat - 0.0001,
            xmax: result.lon + 0.0001,
            ymax: result.lat + 0.0001
          },
          score: 100
        };
        const { attributes, location, extent } = obj;
        const graphic = new Graphic({
          attributes,
          geometry: {
            type: "point",
            ...location
          },
          symbol,
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

      getUnVerified().then((results) => {
        // console.log(results);
        results.forEach((result) => {
          const obj = {
            address: result.title,
            location: {
              x: result.lon,
              y: result.lat
            },
            attributes: {
              PlaceName: result.title,
              Place_addr: result.address ? result.address : "No address",
              PlaceType: result.type
            },
            extent: {
              xmin: result.lon - 0.0001,
              ymin: result.lat - 0.0001,
              xmax: result.lon + 0.0001,
              ymax: result.lat + 0.0001
            },
            score: 100
          };
          const { attributes, location, extent } = obj;
          const graphic = new Graphic({
            attributes,
            geometry: {
              type: "point",
              ...location
            },
            symbol,
            popupTemplate: {
              title: "{PlaceName}",
              content: "{Place_addr}  <br/> <br/>  Uverifisert"
            }
          });
          setTimeout(() => {
            view.graphics.add(graphic);
            // view.extent = extent;
          }, 10000);
        });
      });
    }
  }, []);

  useEffect(() => {}, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
