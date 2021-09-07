import React from "react";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";
import { ForceGraph3D } from "react-force-graph";
import Loader from "Components/Loader/Loader";
// import Layout from "Components/Layout/Layout";
import "./Distance.scss";

@inject("AuthStore", "GraphStore")
@observer
class Distance extends React.Component {
  constructor(props) {
    super();

    this.state = {
      dataLoading: true,
      graph: {
        nodes: [],
        edges: [],
      },
    };
  }

  componentDidMount() {
    this.getGraphDetails();

    // console.log(window.screen.width, window.screen.height);
  }
  getGraphDetails = () => {
    const { GraphStore, AuthStore } = this.props;
    let payload = {
      table_name: "decentraland_estate",
      // table_name: "decentraland",
      record: 30,
    };
    GraphStore.getGraphDetails(payload).then((res) => {
      if (res.data) {
        let newResArray = [];
        newResArray = res.data.data;
        // newResArray = [
        //   { distance: 5, name: "Test 5", _id: 1 },
        //   { distance: 10, name: "Test 10", _id: 2 },
        //   { distance: 15, name: "Test 15", _id: 3 },
        //   { distance: 20, name: "Test 20", _id: 4 },
        //   { distance: 25, name: "Test 25", _id: 5 },
        // ];
        let nodes = [];
        let edges = [];
        let distanceArray = [];

        newResArray.sort(function (a, b) {
          return a.distance - b.distance;
        });
        newResArray.forEach((key, objId) => {
          if (distanceArray.indexOf(key.distance) <= -1) {
            // distanceArray.push(key.distance);
            let obj = {
              id: key.distance,
              label: key.name ? key.name : "Parcel",
              description: key.distance ? key.distance : "distance",
            };

            nodes.push(obj);
            distanceArray.push(key.distance);
            // let arrayLenght = distanceArray.length;
            if (distanceArray.indexOf(key.distance) >= -1) {
              if (objId > 0) {
                let newObj = {
                  source: key.distance,
                  // target: key1.distance,
                  target: distanceArray[Math.floor(Math.random())],
                };
                edges.push(newObj);
                if (distanceArray.length > 3) {
                  let newObj1 = {
                    source: distanceArray[distanceArray.length - 2],
                    // target: key1.distance,
                    target: distanceArray[distanceArray.length - 1],
                  };
                  edges.push(newObj1);
                }
              }
            }
          }
        });

        this.setState({
          graph: {
            nodes: nodes,
            links: edges,
          },
          dataLoading: false,
        });
      }
    });
  };
  render = () => {
    let { dataLoading, graph } = this.state;
    return (
      <React.Fragment>
        {/* <Layout title="Distance graph"> */}
        <div className="distance">
          {dataLoading ? (
            <Loader />
          ) : (
            <ForceGraph3D
              // nodeRelSize={10}
              graphData={graph}
              nodeLabel={(node) => `${node.label}: ${node.description}`}
              nodeAutoColorBy="label"
              linkDirectionalParticles={1}
              width={window.screen.width / 1.2}
              height={window.screen.height / 1.3}
              // backgroundColor="#3C74A2"
            />
          )}
          {/* </Layout> */}
        </div>
      </React.Fragment>
    );
  };
}

export default withTranslation()(Distance);
