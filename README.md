# Rune

Rune is a lightweight Javascript lib for drawing graphs and flows. The full documentation is available at [https://MinaPecheux.gitlab.io/rune-core/](https://MinaPecheux.gitlab.io/rune-core/).

It is based on the [Litegraph.js](https://github.com/jagenjo/litegraph.js) JS library: it relies on the same core mechanisms but extends it to provide additional features and in particular more styling/CSS customization!

It also contains an easy-to-use ready-made Vue component to display your graph with just some nodes and edges data.

### Creating a Rune-vanilla graph

If you are in a plain HTML/Javascript context and are not using any frontend framework (such as VueJS or ReactJS), you can still display your graph easily in a canvas. Simply use the CDN script (or [download it](https://unpkg.com/@mpecheux/rune-core/dist/rune-core.min.js) and use it locally): you will then have access to a global `Rune` object that contains the entire library.

You should also import or download the CSS stylesheet.

Here is a basic Rune example:

- first, create your `index.html` file:
  
  ```html
  <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/@mpecheux/rune-core/dist/styles/main.css">
      <script src="https://unpkg.com/@mpecheux/rune-core/dist/rune-core.min.js"></script>
      <script src="./script.js"></script>
    </head>
    <body>
      <canvas id="graph" width="600" height="400"></canvas>
    </body>
  </html>
  ```

- and then add in the Javascript `script.js`:
  
  ```js
  window.onload = () => {
    // instantiate the graph in the html canvas
    const graph = new Rune.Graph();
    const canvas = new Rune.Canvas("#graph", graph);

    // define the nodes and edges data
    const data = {
      nodes: [
        { id: "node-0", type: "basic/input-number" },
        { id: "node-1", type: "basic/output" }
      ],
      edges: [
        { source: "node-0", target: "node-1" }
      ]
    };

    graph.populateFromNodesAndEdges(data);

    let layout = Rune.layouts.getDagreLayout(data);
    layout = Rune.layouts.centerLayout(layout, 600, 400);
    Rune.layouts.applyLayout(graph.getNodes(), layout);
  };
  ```

### In a NodeJS environment with a frontend framework

You can use one of the provided frontend wrappers to easily draw your graph in your app:

- for VueJS: [Rune Vue](https://minapecheux.gitlab.io/rune-vue/) is a basic Vue plugin wrapped around this lib

## Contribute

- To setup the project, run:

```
yarn install
```

- Then, to compile and enable hot-reloading (for development):

```
yarn serve
```

- To lint and fix the files, use:

```
yarn lint
```
