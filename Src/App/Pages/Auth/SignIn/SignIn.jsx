import React from "react";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import BackGround from "../BackGround";
// import leftBottom from "../Assets/leftBottom.png";
import "./signIn.scss";

@inject("AuthStore")
@observer
class LoginContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render = () => {
    const { history } = this.props;
    return (
      <BackGround history={history}>
        <div>
          <div>SignIn</div>
        </div>
      </BackGround>
    );
  };
}

export default withTranslation()(LoginContainer);
