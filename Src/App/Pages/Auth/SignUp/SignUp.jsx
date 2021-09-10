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
      errorMessage: "",
      error: false,
      emailValidation: false,
      passwordValidation: false,
    };
  }
  componentDidMount() {
    const { AuthStore, history } = this.props;
    this.props.isLoadingFalse();
    if (history.location.search) {
      this.setState({
        pool_code: history.location.search.substring(
          history.location.search.indexOf("=") + 1
        ),
      });
    }

    /** ACCOUNT change trigger MM address change **/
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (res) => {
        AuthStore.setState("mm_address", res[0]);
      });
    }
  }
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
    this.setState({ [event.target.name]: event.target.value });
  };
  connectMetaMask = (event) => {
    event.preventDefault();
    const { AuthStore } = this.props;
    const { email } = this.state;

    // Retrieve the MetaMask Address from the user
    AuthStore.retrieveMetaMaskAddress().then((res) => {
      if (res.address) {
        AuthStore.setState("email", email);
        AuthStore.setState("mm_address", res.address);
      }
      if (res.error) {
        this.setState({ error: true });
        this.setState({ errorMessage: res.error.message });
      }
    });
  };
  signUp = (event) => {
    event.preventDefault();

    const { AuthStore, i18n } = this.props;
    const { email, password, displayName } = this.state;

    if (!AuthStore.mm_address) {
      this.setState({ erroe: true, errorMessage: i18n.t("login.connect.mm") });
      setTimeout(() => {
        this.removeError();
      }, 5000);
      return false;
    }

    if (!password || password.length <= 7) {
      this.setState({
        error: true,
        errorMessage: i18n.t("login.signup.error.minlength"),
      });
      setTimeout(() => {
        this.removeError();
      }, 5000);
      return false;
    }

    if (!validateEmail(email)) {
      this.setState({
        errorMessage: i18n.t("login.signup.error.invalidemail"),
        erroe: true,
      });
      setTimeout(() => {
        this.removeError();
      }, 5000);
    }

    if (!AuthStore.mm_address) {
      this.setState({ errorMessage: i18n.t("login.connect.mm"), error: true });
      setTimeout(() => {
        this.removeError();
      }, 5000);
    }

    let signSignature = this.signSignature();

    signSignature.then((res) => {
      if (res) {
        let mm_signature = res;

        // Check if the user exists in the Safename DB
        AuthStore.emailExists(email).then((res) => {
          if (res.exists === 1) {
            this.setState({
              errorMessage: i18n.t("login.signup.error.emailexists"),
              error: true,
            });
            setTimeout(() => {
              this.removeError();
            }, 5000);
          } else if (res.exists === 0) {
            let signupData = {
              email: email,
              password: password,
              mm_address: AuthStore.mm_address,
              mm_signature: mm_signature,
              username: displayName,
              ...(this.state.pool_code !== "" && {
                pool_code: this.state.pool_code,
              }),
            };

            AuthStore.signUp(signupData).then((res) => {
              if (res.error === 2) {
                this.setState({
                  errorMessage: "ETH address already exists",
                  error: true,
                });
                setTimeout(() => {
                  this.removeError();
                }, 5000);
              } else if (res.access_token) {
                this.setState({ signupConfirmed: true });
              } else if (res.error) {
                this.setState({ errorMessage: i18n.t(res.error), error: true });
                setTimeout(() => {
                  this.removeError();
                }, 5000);
              }
            });
          }
        });
      }
    });
  };
  signSignature = async () => {
    const { AuthStore } = this.props;

    await AuthStore.initWeb3();

    if (window.ethereum) {
      await ethereum.enable();
    }

    let address = await AuthStore.getAddress();

    return await AuthStore.getSignature(address, "register");
  };
  removeError = () => {
    this.setState({
      errorMessage: "",
      error: false,
    });
  };
  render = () => {
    const { history, AuthStore, i18n } = this.props;
    let {
      error,
      errorMessage,
      email,
      password,
      displayName,
      emailValidation,
      passwordValidation,
    } = this.state;

    return (
      <BackGround
        history={history}
        i18n={i18n}
        languages={i18n.options.languageOptions}
      >
        <div className="sign-in">
          <div className="heading">
            <span className="yellow-tex"> Sign Up</span>
          </div>
          <div className="sub-heading">
            Sign up using your email address below, we use MetaMask to verify
            your address
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
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  minlength="7"
                  maxlength="10"
                  value={password}
                  onChange={(e) => this.setField(e)}
                />
              </div>
              {password !== "" && !passwordValidation && (
                <div className="form-error-section">
                  <span className="error-color">
                    Please enter min 8 character
                  </span>
                </div>
              )}
              <div>
                <Input
                  type="text"
                  onChange={(e) => this.setField(e)}
                  name="displayName"
                  placeholder="Enter user name"
                  minlength="1"
                  maxlength="30"
                />
              </div>
              <div className="button-section margin-top">
                <CommonButton
                  name="Sign Up"
                  className="yellow-button"
                  disabled={
                    email !== "" &&
                    emailValidation &&
                    password !== "" &&
                    passwordValidation &&
                    displayName !== "" &&
                    (AuthStore.mm_address !== null || !AuthStore.mm_address)
                      ? false
                      : true
                  }
                  onClick={(e) => this.signUp(e)}
                />
              </div>
            </form>
          </div>
        </div>

        <Social />
        <div className="button-section">
          {!AuthStore.mm_address ? (
            <CommonButton
              name="Connect meta mask"
              className="white-button metamask"
              icon="metamsk"
              onClick={(e) => this.connectMetaMask(e)}
            />
          ) : (
            <div className="mm-messasge">
              {i18n.t("login.connect.connected")} :{" "}
              <strong>{truncate(AuthStore.mm_address, 22)}</strong>
            </div>
          )}
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
