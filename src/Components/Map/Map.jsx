import React, { useRef, useEffect } from "react";
import Expand from "@arcgis/core/widgets/Expand";
import WebMap from "@arcgis/core/Map";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import esriConfig from "@arcgis/core/config";
import SceneView from "@arcgis/core/views/SceneView";
import Daylight from "@arcgis/core/widgets/Daylight";
import Search from "@arcgis/core/widgets/Search";
import RouteLayer from "@arcgis/core/layers/RouteLayer";
import DaylightViewModel from "@arcgis/core/widgets/Daylight/DaylightViewModel";





esriConfig.apiKey =
  "AAPKfc0209af11d3434bbf0799554f377d1dACO76XRtjlavzo6uvi6tHkQ6lGLr_cixp79m4dHK00DGYykDGt2L19cTUeSICw4K";

function App() {
  const mapDiv = useRef(null);
  const routeLayer = new RouteLayer();
  const today = new Date("2025-02-25 15:13:00");

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


      const view = new SceneView({
        container: mapDiv.current,
        map: webmap,
        zoom: 12,
        camera: {
          position:  [10.1212513446808, 61.4489785202556, 1000], //70  55.68155441541816,12.58227229143479
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


      const searchWidget = new Search({
        view: view
      });

      // Add the search widget to the top right corner of the view
      view.ui.add(searchWidget, {
        position: "top-right"
      });


    }
  }, []);

  useEffect(() => {}, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
