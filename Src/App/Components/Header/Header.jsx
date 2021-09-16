import React from "react";
import i18n from "Src/i18";
import i18next from "i18next";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import LOGO from "./Assets/LOGO.png";
import arrow from "./Assets/down-arrow.png";
import "./header.scss";

export default class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: "",
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
    event.preventDefault();

    const { open } = this.state;
    this.setState({ open: !open });
    if (event.key === "Tab") {
      this.setState({ open: false });
    }
    // this.forceUpdate();
  };

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  searchRedirect = () => {
    let { search } = this.state;
    this.props.history.push({
      pathname: "/search",
      search_obj: search,
    });
  };
  render = (props) => {
    const { languages } = this.props;
    const { open } = this.state;

    return (
      <div className="header">
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
        <div className="logo-section">
          <div className="image-section">
            <Avatar alt="NFT Mining" src={LOGO} />
          </div>
        </div>
        <div className="menu-section">
          <div>
            <div>
              <Button
                aria-haspopup="true"
                onClick={(e) => this.toggleSubMenu(e)}
                className="menu-button"
              >
                <span>{this.getActiveLanguageMap(i18n.language)}</span>

                <span className={`image-span ${open && "rotate"} `}>
                  <img src={arrow} />
                </span>
              </Button>
              {open && (
                <Paper>
                  <ClickAwayListener onClickAway={(e) => this.toggleSubMenu(e)}>
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
          </div>
        </div>
      </div>
    );
  };
}
