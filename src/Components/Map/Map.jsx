import React, { useRef, useEffect } from "react";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import WebMap from "@arcgis/core/Map";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView";
import Weather from "@arcgis/core/widgets/Weather";
import Daylight from "@arcgis/core/widgets/Daylight";
import Directions from "@arcgis/core/widgets/Directions";
import Search from "@arcgis/core/widgets/Search";
import RouteLayer from "@arcgis/core/layers/RouteLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Graphic from "@arcgis/core/Graphic";
import { shopLocator } from "../../locator";
// import { coffee } from "../../assets/images";
import BarPin from "../../assets/bar_pin.png";
import DaylightViewModel from "@arcgis/core/widgets/Daylight/DaylightViewModel";

import { auth, getMarker, getUnVerified } from "../../Firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

/*
trees: 33383da8a75f4d24b4b6a0d0532abe6e

*/
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

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

      const symbol = {
        type: "picture-marker",
        url: "https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_outline_v4-2-medium.png,assets/icons/poi/tactile/pinlet_v4-2-medium.png,assets/icons/poi/quantum/pinlet/bar_pinlet-2-medium.png&highlight=ea8600,f29900,ffffff?scale=1.25",
        width: 23,
        height: 23,
        yoffset: 11
      };

      const symbol2 = {
        type: "picture-marker",
        url: "https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
        width: 23,
        height: 23,
        yoffset: 11
      };

      const symbol3 = {
        type: "picture-marker",
        url: "https://static.vecteezy.com/system/resources/previews/008/506/390/original/bright-green-tick-checkmark-icon-free-png.png",
        width: 23,
        height: 23,
        yoffset: 11
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
            symbol3,
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
