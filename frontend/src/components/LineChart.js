import React, {Component} from "react";

import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class LineChart extends Component {
  render() {
    const options = {
      title: {
        text: "Last 10 Rounds"
      },
      data: [{
        type: "spline",
        dataPoints: [
          { label: "1",  y: 99  },
          { label: "2", y: 98  },
          { label: "3", y: 101  },
          { label: "4",  y: 81  },
          { label: "5",  y: 87  }
        ]
      }]
    }
			
    return (
      <div>
        <CanvasJSChart options = {options} />
      </div>
    );
  }
}