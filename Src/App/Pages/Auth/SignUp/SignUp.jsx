import React from "react";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import BackGround from "../BackGround";
import Social from "../Social";
import Input from "Components/Input";
import CommonButton from "Components/Button";
import Google from "../Assets/google.svg";
import Facebook from "../Assets/facebook.svg";
import "./signUp.scss";

@inject("AuthStore")
@observer
class SignUpContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      displayName: "",
    };
  }

  render = () => {
    const { history } = this.props;
    return (
      <BackGround history={history}>
        <div className="sign-in">
          <div className="heading">
            <span className="yellow-tex"> Sign Up</span>
          </div>
          <div className="sub-heading">
            Sign up using your email address below, we use MetaMask to verify
            your address
          </div>
          <div className="error-section">
            <span className="error-color">Incorrect email or password</span>
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
              <div>
                <Input
                  type="text"
                  name="displayName"
                  placeholder="Enter user name"
                />
              </div>
              <div className="button-section margin-top">
                <CommonButton name="Sign Up" className="yellow-button" />
              </div>
            </form>
          </div>
        </div>

        <Social />
        <div className="button-section">
          <CommonButton
            name="Sign in with meta mask"
            className="white-button metamask"
            icon="metamsk"
          />
        </div>
        <div className="button-section account-link">
          Already have a account?{" "}
          <Button
            className="link-button"
            onClick={() => this.props.history.push("/signIn")}
          >
            Sign In
          </Button>
        </div>
      </BackGround>
    );
  };
}

export default withTranslation()(SignUpContainer);
