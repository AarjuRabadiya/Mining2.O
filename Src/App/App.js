import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import i18n from "../i18";
import "./app.scss";
import Auth from "Components/HOC/Auth";
import BG from "../Assets/BG.png";

const SignIn = lazy(() => import("Pages/Auth/SignIn"));
const Mining = lazy(() => import("Pages/Dashboard/Mining/Mining"));
const Mining2 = lazy(() => import("Pages/Dashboard/Mining2.0/Mining2"));
const Profile = lazy(() => import("Pages/Dashboard/Profile/Profile"));
const History = lazy(() => import("Pages/Dashboard/History/History"));
const Participation = lazy(() =>
  import("Pages/Dashboard/Participation/Participation")
);
const Balance = lazy(() => import("Pages/Dashboard/Balance/Balance"));
const Partners = lazy(() => import("Pages/Dashboard/Partners/Partners"));
const Logout = lazy(() => import("Pages/Logout/Logout"));
const SignUp = lazy(() => import("Pages/Login/SignUp"));
const Stats = lazy(() => import("Pages/Dashboard/Stats/Stats"));
const Search = lazy(() => import("Pages/Search"));
const ForgotPassword = lazy(() => import("Pages/Login/Forgotpassword"));
const ChangePassword = lazy(() => import("Pages/Login/ChangePassword"));
const CloudMining = lazy(() =>
  import("Pages/Dashboard/CloudMining/CloudMining")
);
const Referral = lazy(() => import("Pages/Dashboard/Referral/Referral"));
const Land = lazy(() => import("Pages/Dashboard/Lands"));
const JoinTeam = lazy(() => import("Pages/Dashboard/JoinTeam"));
const Distance = lazy(() => import("Pages/Dashboard/Distance"));
const AttackHistory = lazy(() => import("Pages/Dashboard/AttackHistory"));

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  loadBg = (key) => {
    this.setState({ background: 0 });
  };

  render = (props) => {
    return (
      <>
        {/*
					Helmet provides an update to all of our SEO routing
					SEO routing is all configured within the App.js file
					We shouldn't overwrite routing on specific pages unless absolutely necessary
				*/}
        <Helmet
          title=""
          meta={[
            { name: "description", content: "" },
            { name: "keywords", content: "" },
            { name: "geo.region", content: "UK" },
            { name: "geo.placename", content: "chainguardians" },
            { property: "og:type", content: "website" },
            { property: "og:locale", content: "en_GB" },
            { property: "og:url", content: "https://chainguardians.io" },
            { property: "og:title", content: "chainguardians" },
            { property: "og:description", content: "" },
            { property: "og:image", content: "/banner.png" },
            { property: "og:image:width", content: "862" },
            { property: "og:image:height", content: "485" },
            { property: "og:image:type", content: "image/jpeg" },
            { property: "og:site_name", content: "chainguardians" },
            {
              property: "og:see_also",
              content: "https://twitter.com/chainguardians",
            },
            {
              property: "og:see_also",
              content: "https://www.facebook.com/chainguardians",
            },
          ]}
        />

        <Router>
          <Suspense fallback="">
            <Switch>
              <Auth
                exact
                path="/login"
                render={(props) => <SignIn {...props} i18n={i18n} />}
              />
              <Route
                exact
                path="/signup"
                render={(props) => <SignUp {...props} i18n={i18n} />}
              />
              <Route
                exact
                path="/forgot-password"
                render={(props) => <ForgotPassword {...props} i18n={i18n} />}
              />
              <Route
                exact
                path="/change-password/:token"
                render={(props) => <ChangePassword {...props} i18n={i18n} />}
              />
              <Auth
                exact
                path="/dashboard/logout"
                render={(props) => <Logout {...props} i18n={i18n} />}
              />
              <Route
                exact
                path="/search"
                render={(props) => <Search {...props} i18n={i18n} />}
              />
              <Auth
                exact
                path="/dashboard/join_team"
                render={(props) => <JoinTeam {...props} i18n={i18n} />}
              />
              <Auth
                exact
                path="/dashboard/attack_history"
                render={(props) => <AttackHistory {...props} i18n={i18n} />}
              />

              <Route
                exact
                path="/distance"
                render={(props) => <Distance {...props} i18n={i18n} />}
              />
              <Auth
                exact
                path="/dashboard/partners"
                render={(props) => (
                  <Partners
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/mining"
                render={(props) => (
                  <Mining
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/team_mining"
                render={(props) => (
                  <Mining2
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/profile"
                assets={false}
                render={(props) => (
                  <Profile
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/history"
                render={(props) => (
                  <History
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/participation"
                render={(props) => (
                  <Participation
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/balance"
                render={(props) => (
                  <Balance
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/stats"
                render={(props) => (
                  <Stats
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/lands"
                render={(props) => (
                  <Land {...props} i18n={i18n} loadBg={(e) => this.loadBg(e)} />
                )}
              />
              <Auth
                exact
                path="/dashboard/cloudMining"
                render={(props) => (
                  <CloudMining
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Auth
                exact
                path="/dashboard/referral"
                render={(props) => (
                  <Referral
                    {...props}
                    i18n={i18n}
                    loadBg={(e) => this.loadBg(e)}
                  />
                )}
              />
              <Redirect to="/login" />
            </Switch>
          </Suspense>
        </Router>
      </>
    );
  };
}
