import React from "react";

export default class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  render = (props) => {
    const { width, height, path, fill } = this.props;

    return (
      <svg
        viewBox={"0 0 " + width + " " + height}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
      >
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#ffdd00", stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#fbb034", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <path fill={"url(#grad3)"} fillRule="evenodd" d={path} />
      </svg>
    );
  };
}
