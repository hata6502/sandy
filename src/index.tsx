import "core-js";
import "regenerator-runtime";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
//import ReactDOM from "react-dom";

if (process.env["NODE_ENV"] === "production") {
  Sentry.init({
    dsn: process.env["SENTRY_DSN"],
    beforeSend: (event) => {
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }

      return event;
    },
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener(
      "load",
      () => void navigator.serviceWorker.register("service-worker.js")
    );
  }
}

/*ReactDOM.render(
  <Sentry.ErrorBoundary
    fallback={
      <>
        Sorry, an error has occurred.
        <br />
        Please load again.
      </>
    }
  >
		TEST
  </Sentry.ErrorBoundary>,
  document.querySelector("#app")
);*/

// from: https://github.com/mrdoob/three.js/#usage
import * as THREE from "three";

let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);
}

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
