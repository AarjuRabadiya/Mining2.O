import React from "react";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import BackGround from "../BackGround";
import Input from "Components/Input";
import Button from "Components/Button";
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
        <div className="sign-in">
          <div className="heading">
            <span className="yellow-tex"> SignIn</span>
          </div>
          <div className="error-section">
            <span className="error-color">error mess</span>
          </div>
          <div>
            <form noValidate autoComplete="off">
              <div>
                <Input type="email" name="password" placeholder="Enter email" />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />
              </div>
              <div className="button-section">
                <Button name="Sign In" className="yellow-button" />
              </div>
              <div className="button-section">
                <button className="alink">
                  <span className="yellow-tex">Forgot password?</span>
                </button>
              </div>
              <div className="button-section">
                <button className="alink">
                  <span className="yellow-tex">Sign in via external</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </BackGround>
    );
  };
}

export default withTranslation()(LoginContainer);
