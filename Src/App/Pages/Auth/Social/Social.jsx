import React from "react";
import { withTranslation } from "react-i18next";
import { GoogleLogin } from "react-google-login";
import { inject, observer } from "mobx-react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Loader from "react-loader-spinner";
import Modal from "react-modal";
import Google from "../Assets/google.svg";
import Facebook from "../Assets/facebook.svg";
import "./social.scss";

const customStyles = {
  overlay: {
    backgroundColor: "rgb(0 0 0 / 75%)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

@inject("AuthStore")
@observer
class Social extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isGoogleLoading: false,
      isFacebookLoading: false,
      isOpen: true,
      email: "",
      setFaceBookResponse: {},
      isModal: false,
    };
  }
  componentWillMount() {
    Modal.setAppElement("body");
  }
  responseGoogle = (response) => {
    if (!response.error) {
      this.setState({
        isGoogleLoading: true,
      });
      if (response) {
        let payload = {
          data: response,
          type: "google",
          ...(this.props.pool_code !== "" && {
            pool_code: this.props.pool_code,
          }),
        };
        this.SocialLogin(payload);
      }
    } else {
      this.setState({
        isGoogleLoading: false,
      });
    }
  };
  responseFacebook = (response) => {
    if (!response.status) {
      this.setState({
        isFacebookLoading: true,
      });
      if (response) {
        let payload = {
          data: response,
          type: "facebook",
          ...(this.props.pool_code !== "" && {
            pool_code: this.props.pool_code,
          }),
        };
        if (payload.type === "facebook") {
          if (payload.data.email === undefined) {
            this.setState({
              isModal: true,
              setFaceBookResponse: payload.data,
            });
          } else {
            this.SocialLogin(payload);
          }
        } else {
          this.SocialLogin(payload);
        }
      }
    } else {
      this.setState({
        isFacebookLoading: false,
      });
    }
  };
  SocialLogin = (payload) => {
    const { AuthStore } = this.props;

    AuthStore.googleLogin(payload).then((res) => {
      this.setState({
        isGoogleLoading: false,
        isFacebookLoading: false,
      });
      if (res.access_token) {
        AuthStore.setState("token", res.access_token);
        AuthStore.setState("email", res.email);
        const { history } = this.props;
        history.push("/dashboard/mining");
      }
    });
  };
  openModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      isFacebookLoading: false,
    });
  };
  onChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onSubmit = () => {
    let { email, setFaceBookResponse } = this.state;
    if (email) {
      setFaceBookResponse["email"] = email;
      this.setState(
        {
          setFaceBookResponse,
          isOpen: false,
        },
        () => {
          let { setFaceBookResponse } = this.state;
          let payload = {
            data: setFaceBookResponse,
            type: "facebook",
          };
          this.SocialLogin(payload);
        }
      );
    }
  };
  render = () => {
    const { isGoogleLoading, isFacebookLoading, isModal, isOpen } = this.state;
    return (
      <div className="social-login">
        {isModal && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => this.closeModal()}
            style={customStyles}
          >
            <div className="modal-container">
              <div className="email-input">
                <input
                  type="email"
                  placeholder="Please enter email"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="email-submit">
                <button className="submit" onClick={() => this.onSubmit()}>
                  Submit email
                </button>
              </div>
            </div>
          </Modal>
        )}
        <span className="social-text">Sign in with</span>
        {isGoogleLoading ? (
          <Loader type="Oval" color="#CDD5DB" width="18" height="18" />
        ) : (
          <GoogleLogin
            // clientId={`${process.env.CLIENTID}`}
            clientId="877884316890-hvdtvvjthd8sh0ednld3l2ak0fisrnu3.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                className="social-button"
                type="button"
                onClick={renderProps.onClick}
                disabled={renderProps.isDisabled}
              >
                <img src={Google} alt="facebook" />
              </button>
            )}
          />
        )}
        {isFacebookLoading ? (
          <Loader type="Oval" color="#CDD5DB" width="18" height="18" />
        ) : (
          <FacebookLogin
            appId="786621485540466"
            // appId={`${process.env.APPID}`}
            fields="name,email,picture"
            callback={this.responseFacebook}
            render={(renderProps) => (
              <button
                className="social-button"
                type="button"
                onClick={renderProps.onClick}
                disabled={renderProps.isDisabled}
              >
                <img src={Facebook} alt="facebook" />
              </button>
            )}
          />
        )}
      </div>
    );
  };
}

export default withTranslation()(Social);
