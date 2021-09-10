import React from "react";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
// import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
import BackGround from "../BackGround";
import Social from "../Social";
import Input from "Components/Input";
import CommonButton from "Components/Button";
import { validateEmail, truncate, validationForEmail } from "Base/Utilities";
// import Google from "../Assets/google.svg";
// import Facebook from "../Assets/facebook.svg";
import "./forgotPassword.scss";

@inject("AuthStore")
@observer
class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      errorMessage: "",
      error: false,
      emailValidation: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    const { AuthStore } = this.props;
    this.props.isLoadingFalse();
    AuthStore.logout();
  }
  forgotPassword = () => {
    const { AuthStore } = this.props;
    const { email } = this.state;
    this.setState({
      isLoading: true,
    });
    let payload = {
      email: email,
    };

    if (email !== "") {
      AuthStore.forgotPassword(payload).then((res) => {
        if (res.success === true) {
          this.setState({
            resMessage:
              "WE HAVE SENT YOU AN EMAIL WITH YOUR RESET PASSWORD LINK",
            email: "",
            isLoading: false,
          });
        } else {
          this.setState({
            error: true,
            errorMessage: "SORRY, PLEASE TRY AGAIN!!",
            isLoading: false,
            email: "",
          });
        }
      });
    }
  };
  setField = (event) => {
    event.preventDefault();

    if (event.target.name === "email") {
      this.setState({
        emailValidation: validationForEmail(event.target.value),
      });
    }
    if (event.target.name === "password") {
      this.setState({ passwordValidation: event.target.value.length >= 7 });
    }
    this.setState({
      [event.target.name]: event.target.value,
      error: false,
      errorMessage: "",
    });
  };
  redirectToHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
    if (history.location.pathname === "/login") {
      this.reset();
    } else {
      history.push("/login");
    }
  };
  reset = () => {
    this.setState({
      email: "",
      errorMessage: "",
      error: false,
      emailValidation: false,
      isLoading: false,
    });
  };
  render = () => {
    const { history, i18n } = this.props;
    let { error, errorMessage, email, isLoading, emailValidation } = this.state;

    return (
      <BackGround
        history={history}
        i18n={i18n}
        languages={i18n.options.languageOptions}
      >
        <div className="forgot-password">
          <div className="heading">
            <span className="yellow-tex">Forgot Password</span>
          </div>
          <div className="sub-heading">
            Enter your email address and we'll send you a link to reset your
            password.
          </div>
          {error && (
            <div className="error-section">
              <span className="error-color">{errorMessage}</span>
            </div>
          )}

          <div>
            <form noValidate autoComplete="off">
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => this.setField(e)}
                />
              </div>
              {email !== "" && !emailValidation && (
                <div className="form-error-section">
                  <span className="error-color">Please enter valid email</span>
                </div>
              )}

              <div className="button-section margin-top">
                <CommonButton
                  name="Reset password"
                  className="yellow-button reset"
                  disabled={email !== "" && emailValidation ? false : true}
                  onClick={(e) => this.forgotPassword(e)}
                  isLoading={isLoading}
                />
              </div>
              <div className="button-section margin-top">
                <CommonButton
                  name="back"
                  className="white-button back"
                  onClick={(e) => this.redirectToHome(e)}
                />
              </div>
            </form>
          </div>
        </div>
      </BackGround>
    );
  };
}

export default withTranslation()(ForgotPasswordContainer);
