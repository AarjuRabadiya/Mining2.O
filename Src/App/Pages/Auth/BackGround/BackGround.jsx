import React from "react";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import Header from "Components/Header";
import leftBottom from "../Assets/leftBottom.png";
import "./backGround.scss";

@inject("AuthStore")
@observer
class BackGround extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render = () => {
    const { history } = this.props;
    return (
      <div className="background">
        <Header history={history} />

        <div className="left-bottom-section">
          <img src={leftBottom} alt="" />
        </div>
        <div className="container">
          <div className="login-section"> {this.props.children}</div>
        </div>
      </div>
    );
  };
}

export default withTranslation()(BackGround);
