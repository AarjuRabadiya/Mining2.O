import React from "react";
import i18n from "Src/i18";
import i18next from "i18next";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Menu from "./Menu";
import LOGO from "./Assets/LOGO.png";
import arrow from "./Assets/down-arrow.png";
import left_menu from "./Assets/left_menu.png";
import closeIcon from "./Assets/closeicon.png";
import "./DashboardHeader.scss";

export default class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: "",
      menu: false,
    };
  }
  /**
   * Change the language toggle cross site
   *  [ en, jp, cn, vm ]
   * */
  changeLanguageToggle = (lang = "en") => {
    const { open } = this.state;

    /** Force the language update on callback **/
    i18next.changeLanguage(lang, () => {
      this.getActiveLanguageMap(i18n.language);
      this.setState({ open: !open });
    });
  };

  getActiveLanguageMap = (language) => {
    const { languages } = this.props;
    let activeLang;

    languages.forEach((lang, key) => {
      if (lang === language) {
        activeLang = i18n.t("language." + lang);
      }
    });

    return activeLang;
  };

  toggleSubMenu = (event) => {
    const { open } = this.state;
    this.setState({ open: !open });
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({ open: false });
    }
    // this.forceUpdate();
  };
  searchRedirect = () => {
    let { search } = this.state;
    this.props.history.push({
      pathname: "/search",
      search_obj: search,
    });
  };

  toggleDrawer = (obj) => {
    if (obj === "open") {
      this.setState({
        menu: true,
      });
    } else {
      this.setState({
        menu: false,
      });
    }
  };
  render = () => {
    const { languages, history } = this.props;
    const { open, menu } = this.state;
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
      <div className="dashboard-header">
        <div className="logo-section">
          <div className="image-section">
            <img alt="NFT Mining" src={LOGO} />
          </div>
        </div>
        <div className="center-div">
          {!menu && (
            <>
              <div className="link-button">
                <Button
                  variant="contained"
                  color="primary"
                  className="custom-button"
                  onClick={() => this.searchRedirect()}
                >
                  <span> Show All Assets</span>
                </Button>
              </div>

              <div className="menu-section">
                <Button
                  aria-haspopup="true"
                  onClick={(e) => this.toggleSubMenu(e)}
                  className="menu-button"
                >
                  <span>{this.getActiveLanguageMap(i18n.language)}</span>
                  <div className={`image-span ${open && "rotate"} `}>
                    <img src={arrow} />
                  </div>
                </Button>
                {open && (
                  <Paper>
                    <ClickAwayListener
                      onClickAway={(e) => this.toggleSubMenu(e)}
                    >
                      <MenuList
                        autoFocusItem={open}
                        onKeyDown={(e) => this.toggleSubMenu(e)}
                      >
                        {languages &&
                          languages.map((lang, key) => {
                            return (
                              <MenuItem
                                key={key}
                                onClick={(e) => this.changeLanguageToggle(lang)}
                                disabled={i18n.language === lang}
                              >
                                {i18n.t("language." + lang)}
                              </MenuItem>
                            );
                          })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                )}
              </div>
            </>
          )}
        </div>
        <div className="toggle-section">
          <div
            className="right-image-section"
            onClick={() => this.toggleDrawer("open")}
          >
            <img alt="NFT Mining" src={left_menu} />
          </div>
        </div>
        <SwipeableDrawer
          anchor="top"
          open={menu}
          onClose={() => this.toggleDrawer("close")}
          onOpen={() => this.toggleDrawer("open")}
          disableBackdropTransition={false}
          // disableSwipeToOpen={true}
          disableDiscovery={true}
        >
          <div className="dashboard-header open-menu-section">
            <div className="logo-section">
              <div className="image-section">
                <img alt="NFT Mining" src={LOGO} />
              </div>
            </div>
            <div className="center-div"></div>

            <div className="toggle-section">
              <div
                className="right-image-section"
                onClick={() => this.toggleDrawer("close")}
              >
                <img alt="NFT Mining" src={closeIcon} />
              </div>
            </div>
          </div>

          <Menu history={history} />
        </SwipeableDrawer>
      </div>
    );
  };
}
