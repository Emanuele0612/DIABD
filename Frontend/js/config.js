password = "bigdata";
user = "neo4j";

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic(user, password)
);

const graphConfig = {
  containerId: "viz",
  neo4j: {
    serverUrl: "bolt://localhost:7687",
    serverUser: user,
    serverPassword: password,
  },
  visConfig: {
    nodes: {
      shape: "dot",
      scaling: {
        label: true,
      },
    },
    edges: {
      arrows: {
        to: { enabled: true },
      },
    },
    physics: {
      hierarchicalRepulsion: {
        avoidOverlap: 1,
      },
      solver: "repulsion",
      repulsion: {
        nodeDistance: 100,
      },
    },
    layout: {
      improvedLayout: true,
      randomSeed: 420,
    },
  },
  labels: {
    User: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        function: {
          title: (node) => {
            return node.properties.user_id;
          },
          label: (node) => {
            return node.properties.user_id.toString();
          },
        },
        static: {
          color: "#87ceeb",
        },
      },
    },
    Anime: {
      label: "title",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        function: {
          title: (node) => {
            return node.properties.title;
          },
        },
        static: {
          color: "#ff7f50",
        },
      },
    },

    Genre: {
      label: "name",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#90ee90",
        },
      },
    },
    Rating: {
      label: "name",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#90ee90",
        },
      },
    },
    Source: {
      label: "name",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#90ee90",
        },
      },
    },
    Type: {
      label: "name",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#90ee90",
        },
      },
    },
  },

  relationships: {
    RATED: {
      value: "rating",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        function: {
          title: (relationship) => {
            return relationship.properties.rating;
          },
        },
        static: {
          scaling: { max: 7 },
          color: "#444",
        },
      },
    },
    RECOMMENDED: {
      value: "rating",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        function: {
          title: (relationship) => {
            return relationship.properties.rating;
          },
        },
        static: {
          scaling: { max: 7 },
          color: "#444",
        },
      },
    },
    BELONGS_TO_GENRE: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#444",
        },
      },
    },
    ADAPTED_FROM: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#444",
        },
      },
    },
    TYPE: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#444",
        },
      },
    },
    RATED_AS: {
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        static: {
          color: "#444",
        },
      },
    },
    SIMILAR_TO: {
      value: "similarity",
      [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
        function: {
          title: (relationship) => {
            return relationship.properties.similarity;
          },
        },
        static: {
          scaling: { max: 7 },
          color: "#444",
        },
      },
    },
  },
};
