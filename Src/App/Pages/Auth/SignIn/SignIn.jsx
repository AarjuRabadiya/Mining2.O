import React from "react";
import { withTranslation } from "react-i18next";
import { inject, observer } from "mobx-react";
import Button from "@material-ui/core/Button";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BackGround from "../BackGround";
import Social from "../Social";
import Input from "Components/Input";
import CommonButton from "Components/Button";

import "./signIn.scss";

@inject("AuthStore")
@observer
class LoginContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      page: "",
      displayName: "",
      selectedOption: "Chainguardian",
      isSelect: false,
      isSignInLoading: false,
      errorMessage: "",
      error: false,
    };
  }
  signInVia = () => {
    this.setState({
      isSelect: true,
    });
  };
  handleChange = (event) => {
    event.preventDefault();

    this.setState({
      selectedOption: event.target.value,
    });
  };
  back = () => {
    this.setState({
      isSelect: false,
    });
  };
  redirectSignUp = () => {
    const { history } = this.props;
    history.push("/signUp");
  };
  setField = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, isError: false });
  };
  signIn = (event) => {
    event.preventDefault();
    this.setState(
      {
        isSignInLoading: true,
      },
      () => {
        const { AuthStore } = this.props;
        const { email, password } = this.state;
        let payload = {
          username: email,
          password: password,
        };
        AuthStore.login(payload).then((res) => {
          this.setState({
            isSignInLoading: false,
          });
          if (res.error === 2) {
            this.setState({
              errorMessage: "please check your email to verify account",
              exists: 0,
              error: true,
            });
            this.resetState();
            setTimeout(() => {
              this.removeError();
            }, 5000);
          } else if (res.success) {
            AuthStore.setState("token", res.success);
            const { history } = this.props;
            this.resetState();
            history.push("/dashboard/mining");
          } else {
            this.setState({ error: true, errorMessage: res.error });
            this.resetState();
            setTimeout(() => {
              this.removeError();
            }, 5000);
          }
        });
      }
    );
  };
  removeError = () => {
    this.setState({
      errorMessage: "",
      error: false,
    });
  };
  resetState = () => {
    this.setState({
      email: "",
      password: "",
      page: "",
      displayName: "",
      selectedOption: "Chainguardian",
      isSelect: false,
      isSignInLoading: false,
      errorMessage: "",
      error: false,
    });
  };

  loginMetaMask = (event) => {
    event.preventDefault();
    const { AuthStore, i18n } = this.props;

    AuthStore.loginMetaMask().then((res) => {
      if (res.exists === 0) {
        this.setState({
          errorMessage: i18n.t("login.signup.error.signupfirst"),
          exists: 0,
        });
      } else if (res.exists === 1) {
        this.setState({ exists: 1 });
      } else if (res.error) {
        if (res.error === 2) {
          this.setState({
            errorMessage: "please check your email to verify account",
          });
        } else {
          this.setState({ errorMessage: res.error.message });
        }
      } else if (res.success) {
        AuthStore.setState("token", res.success);

        const { history } = this.props;

        history.push("/dashboard/mining");
      }
    });
  };
  redirectToForgotPassword = () => {
    const { history } = this.props;
    history.push("/forgot-password");
  };
  redirectExternalSite = (event) => {
    event.preventDefault();
    let { selectedOption } = this.state;
    console.log(selectedOption, "====================================");
    console.log("====================================");
    if (selectedOption === "Chainguardian") {
      window.location.replace("https://partner.nftmining.com/login");
    }
  };
  render = () => {
    const { history } = this.props;
    let {
      isSelect,
      selectedOption,
      isSignInLoading,
      errorMessage,
      error,
      email,
      password,
    } = this.state;

    return (
      <BackGround history={history}>
        <div className="sign-in">
          {isSelect ? (
            <>
              <div className="heading">
                <span className="yellow-tex"> Sign In</span>
              </div>
              {error && (
                <div className="error-section">
                  <span className="error-color">{errorMessage}</span>
                </div>
              )}

              <FormControl variant="outlined">
                <Select
                  native
                  value={selectedOption}
                  onChange={(e) => this.handleChange(e)}
                >
                  <option value="Chainguardian">Chainguardian</option>
                  <option value="NFT_Ethermon">NFT_Ethermon</option>
                  <option value="NFT_WarRider">NFT_WarRider</option>
                </Select>
              </FormControl>
              <div className="button-section margin-top">
                <CommonButton
                  name={`Sign In via ${selectedOption}`}
                  className="yellow-button sing-option"
                  onClick={(e) => this.redirectExternalSite(e)}
                />
              </div>
              <div className="button-section margin-top">
                <CommonButton
                  className="back-button"
                  startIcon="back"
                  onClick={() => this.back()}
                />
              </div>
            </>
          ) : (
            <>
              <div className="heading">
                <span className="yellow-tex"> Sign In</span>
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
                  <div>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => this.setField(e)}
                    />
                  </div>
                  <div className="button-section margin-top">
                    <CommonButton
                      name="Sign In"
                      className="yellow-button"
                      onClick={(e) => this.signIn(e)}
                      isLoading={isSignInLoading}
                    />
                  </div>
                  <div className="button-section margin-top">
                    <Button
                      className="alink"
                      onClick={() => this.redirectToForgotPassword()}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="button-section">
                    <Button className="alink" onClick={() => this.signInVia()}>
                      Sign in via external site
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
        {!isSelect && (
          <>
            <Social />
            <div className="button-section">
              <CommonButton
                name="Sign in with meta mask"
                className="white-button metamask"
                icon="metamsk"
                onClick={(e) => this.loginMetaMask(e)}
              />
            </div>
            <div className="button-section account-link">
              No account?{" "}
              <Button
                className="link-button"
                onClick={() => this.redirectSignUp()}
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </BackGround>
    );
  };
}

export default withTranslation()(LoginContainer);
