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
import { coffee } from "../../assets/images";
import DaylightViewModel from "@arcgis/core/widgets/Daylight/DaylightViewModel";

/*
trees: 33383da8a75f4d24b4b6a0d0532abe6e

*/

esriConfig.apiKey =
  "AAPKfc0209af11d3434bbf0799554f377d1dACO76XRtjlavzo6uvi6tHkQ6lGLr_cixp79m4dHK00DGYykDGt2L19cTUeSICw4K";

function App() {
  const mapDiv = useRef(null);
  const routeLayer = new RouteLayer();
  const today = new Date();

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
        zoom: 3,
        camera: {
          position: [10.750764, 59.915925, 70],
          tilt: 81
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

      const weatherExpand = new Expand({
        view: view,
        content: new Weather({
          view: view
        }),
        group: "top-right",
        expanded: false
      });

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
          view: view
          // viewModel: daylightModel
        }),
        group: "bottom-right",
        expanded: true
      });
      view.ui.add([weatherExpand, daylightExpand], "bottom-right");
      view.environment.lighting.directShadowsEnabled = true;
      view.environment.lighting.date = today;

      const routing = new Expand({
        view: view,
        content: new Directions({
          view: view,
          layer: routeLayer
        }),
        group: "top-right",
        expanded: false
      });
      view.ui.add(routing, { position: "top-right" });

      const symbol = {
        type: "picture-marker",
        url: "https://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png",
        width: 46,
        height: 46,
        yoffset: 23
      };

      const searchWidget = new Search({
        view: view
      });

      // Add the search widget to the top right corner of the view
      view.ui.add(searchWidget, {
        position: "top-right"
      });

      shopLocator().then((results) => {
        results.forEach((result) => {
          const { attributes, location, extent } = result;
          const graphic = new Graphic({
            attributes,
            geometry: {
              type: "point",
              ...location
            },
            symbol,
            popupTemplate: {
              title: "{PlaceName}",
              content: "{Place_addr}"
            }
          });
          view.graphics.add(graphic);
          view.extent = extent;
        });
      });
    }
  }, []);

  useEffect(() => {}, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
