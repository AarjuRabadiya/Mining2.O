import React from "react";
// import i18n from "Src/i18";
// import i18next from "i18next";
import { NavLink } from "react-router-dom";
import Svg from "../Svg";
import "../DashboardHeader.scss";

export default class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    let { history } = this.props;
    let historyPath = history.location.pathname;
    return (
      <div className="bottom-section">
        <div>video</div>
        <div className="bottom-menu">
          <NavLink
            to="/dashboard/mining"
            className={`${
              historyPath === "/dashboard/mining" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Mining"
            >
              <Svg
                width={34}
                height={28}
                path="M14.5 27.8l13.48-15.88a.59.59 0 00.06-.69l-4.9-7.95a.59.59 0 00-.5-.28H5.48c-.2 0-.4.1-.5.28l-4.9 7.95c-.13.22-.1.5.06.69l13.48 15.87c.23.28.65.28.89 0zM25.6 10.8h-4.05l-2.77-6.05h3.2l3.63 6.05zm-5.98 0H8.5l2.78-6.05h5.57l2.77 6.05zm-13.05 0H2.52l3.63-6.05h3.2L6.57 10.8zm3.98 10.94l-7.56-9.38h3.56l4 9.38zm3.51 3.5l-5.6-12.88h11.2l-5.6 12.89zm3.52-3.5l4-9.38h3.56l-7.56 9.38z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Mining</div>
            </div>
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={`${
              historyPath === "/dashboard/profile" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Profile"
            >
              <Svg
                width={34}
                height={28}
                path="M10.94 15.5a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm0-1.56a4.7 4.7 0 11.01-9.4 4.7 4.7 0 01-.01 9.4zM19.54 28c1.29 0 2.33-1.05 2.33-2.34v-2.04a6.56 6.56 0 00-6.56-6.56c-1.4 0-2.07.78-4.37.78-2.3 0-2.97-.78-4.38-.78A6.56 6.56 0 000 23.62v2.04C0 26.95 1.05 28 2.34 28h17.2zm0-1.56H2.33a.78.78 0 01-.78-.78v-2.04a5 5 0 015-5c.96 0 1.91.79 4.38.79 2.46 0 3.42-.79 4.37-.79a5 5 0 015 5v2.04c0 .43-.35.78-.78.78z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Profile</div>
            </div>
          </NavLink>
          {/* <NavLink to="/dashboard/profile">Profile</NavLink> */}
          <NavLink
            to="/distance"
            className={`${historyPath === "/distance" && "active-link"}`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Distance"
            >
              <Svg
                width={34}
                height={28}
                path="M26 25.458c0 .3-.243.542-.542.542H.542A.542.542 0 010 25.458V.542a.542.542 0 111.083 0v24.375h.207l5.267-10.534a.542.542 0 11.97.484l-5.025 10.05h22.956c.3 0 .542.242.542.541zM6.5 10.833a2.167 2.167 0 114.333 0 2.167 2.167 0 01-4.333 0zm1.083 0a1.083 1.083 0 102.167 0 1.083 1.083 0 00-2.167 0zM19.5 8.667a2.167 2.167 0 114.333 0 2.167 2.167 0 01-4.333 0zm1.083 0a1.083 1.083 0 102.167 0 1.083 1.083 0 00-2.167 0zm-6.5 7.583a2.167 2.167 0 114.334 0 2.167 2.167 0 01-4.334 0zm1.084 0a1.083 1.083 0 102.166 0 1.083 1.083 0 00-2.166 0zm-2.709-2.167a.542.542 0 100-1.083.542.542 0 000 1.083zm6.5-1.083a.542.542 0 100-1.083.542.542 0 000 1.083z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Distance</div>
            </div>
          </NavLink>

          {/* <NavLink to="/dashboard/land">Land</NavLink> */}

          <NavLink
            to="/dashboard/attack_history"
            className={`${
              historyPath === "/dashboard/attack_history" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Atatck history"
            >
              <Svg
                width={34}
                height={28}
                path="M21.29 25.12c.32 0 .58-.26.58-.58v-.4a.59.59 0 00-.58-.58h-.16a9.3 9.3 0 01.02-3.21c.42-.18.72-.6.72-1.08V1.3c0-.65-.52-1.17-1.17-1.17H3.9A3.9 3.9 0 000 4.03v17.19a3.9 3.9 0 003.9 3.9H21.3zm-.98-6.24H6.25V1.68h14.06v17.2zm-18.75.78V4.03c0-1.3 1.05-2.34 2.35-2.34h.78v17.19H3.9c-.88 0-1.7.29-2.35.78zM17.38 7.94c.33 0 .59-.27.59-.59v-.39a.59.59 0 00-.59-.58h-8.2a.59.59 0 00-.59.58v.4c0 .31.27.58.59.58h8.2zm0 3.12c.33 0 .59-.26.59-.58v-.4a.59.59 0 00-.59-.58h-8.2a.59.59 0 00-.59.59v.39c0 .32.27.58.59.58h8.2zm2.36 12.5H3.91c-3.13 0-3.13-3.12 0-3.12h15.83c-.14.92-.15 2.13 0 3.12z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Attack History</div>
            </div>
          </NavLink>
          {/* <NavLink to="/dashboard/attack-history">Atatck History</NavLink> */}
          <NavLink
            to="/dashboard/land"
            className={`${historyPath === "/dashboard/land" && "active-link"}`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Land"
            >
              <Svg
                width={34}
                height={28}
                path="M26 25.458c0 .3-.243.542-.542.542H.542A.542.542 0 010 25.458V.542a.542.542 0 111.083 0v24.375h.207l5.267-10.534a.542.542 0 11.97.484l-5.025 10.05h22.956c.3 0 .542.242.542.541zM6.5 10.833a2.167 2.167 0 114.333 0 2.167 2.167 0 01-4.333 0zm1.083 0a1.083 1.083 0 102.167 0 1.083 1.083 0 00-2.167 0zM19.5 8.667a2.167 2.167 0 114.333 0 2.167 2.167 0 01-4.333 0zm1.083 0a1.083 1.083 0 102.167 0 1.083 1.083 0 00-2.167 0zm-6.5 7.583a2.167 2.167 0 114.334 0 2.167 2.167 0 01-4.334 0zm1.084 0a1.083 1.083 0 102.166 0 1.083 1.083 0 00-2.166 0zm-2.709-2.167a.542.542 0 100-1.083.542.542 0 000 1.083zm6.5-1.083a.542.542 0 100-1.083.542.542 0 000 1.083z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Land</div>
            </div>
          </NavLink>
          <NavLink
            to="/dashboard/referral"
            className={`${
              historyPath === "/dashboard/referral" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Pool mining"
            >
              <Svg
                width={34}
                height={28}
                path="M14.5 27.8l13.48-15.88a.59.59 0 00.06-.69l-4.9-7.95a.59.59 0 00-.5-.28H5.48c-.2 0-.4.1-.5.28l-4.9 7.95c-.13.22-.1.5.06.69l13.48 15.87c.23.28.65.28.89 0zM25.6 10.8h-4.05l-2.77-6.05h3.2l3.63 6.05zm-5.98 0H8.5l2.78-6.05h5.57l2.77 6.05zm-13.05 0H2.52l3.63-6.05h3.2L6.57 10.8zm3.98 10.94l-7.56-9.38h3.56l4 9.38zm3.51 3.5l-5.6-12.88h11.2l-5.6 12.89zm3.52-3.5l4-9.38h3.56l-7.56 9.38z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Pool Mining</div>
            </div>
          </NavLink>
          {/* <NavLink to="/dashboard/pool-mining">Pool Mining</NavLink> */}

          <NavLink
            to="/dashboard/cloudMining"
            className={`${
              historyPath === "/dashboard/cloudMining" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Cloud mining"
            >
              <Svg
                width={34}
                height={28}
                path="M14.5 27.8l13.48-15.88a.59.59 0 00.06-.69l-4.9-7.95a.59.59 0 00-.5-.28H5.48c-.2 0-.4.1-.5.28l-4.9 7.95c-.13.22-.1.5.06.69l13.48 15.87c.23.28.65.28.89 0zM25.6 10.8h-4.05l-2.77-6.05h3.2l3.63 6.05zm-5.98 0H8.5l2.78-6.05h5.57l2.77 6.05zm-13.05 0H2.52l3.63-6.05h3.2L6.57 10.8zm3.98 10.94l-7.56-9.38h3.56l4 9.38zm3.51 3.5l-5.6-12.88h11.2l-5.6 12.89zm3.52-3.5l4-9.38h3.56l-7.56 9.38z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Cloud Mining</div>
            </div>
          </NavLink>
          {/* <NavLink to="/dashboard/cloud-mining">Cloud Mining</NavLink> */}

          <NavLink
            to="/dashboard/balance"
            className={`${
              historyPath === "/dashboard/balance" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Balance"
            >
              <Svg
                width={34}
                height={28}
                path="M8.6 22.56c4.74 0 8.59-1.75 8.59-3.9v-.8C21.57 17.67 25 16 25 13.96V4.6C25 2.8 21.97.7 16.4.7c-2.37 0-4.52.44-6.07 1.14-.05.02-2.52 1.03-2.52 2.76v.82C3.71 5.58 0 7.1 0 9.28v9.38c0 2.15 3.85 3.9 8.6 3.9zm7.8-15.62c-.35 0-.68-.03-1.01-.05-1.8-1.06-4.15-1.37-5.65-1.46-.3-.26-.5-.54-.5-.84 0-1.29 3.22-2.34 7.17-2.34 3.96 0 7.16 1.05 7.16 2.34 0 1.3-3.2 2.35-7.16 2.35zm.79 4.65v-2.3c0-.28-.09-.55-.2-.8 2.66-.09 5-.71 6.45-1.65v2.44c0 .64-2.2 2.12-6.25 2.3zm-8.6.04c-3.95 0-7.16-1.05-7.16-2.35s3.2-2.34 7.16-2.34 7.17 1.05 7.17 2.34c0 1.3-3.21 2.35-7.17 2.35zm0 4.68c-4.56 0-7.03-1.66-7.03-2.34v-2.45c1.56 1 4.12 1.67 7.03 1.67s5.48-.66 7.03-1.67v2.45c0 .68-2.46 2.34-7.03 2.34zm8.6-.03v-3.13c2.58-.1 4.84-.71 6.25-1.63v2.45c0 .64-2.2 2.13-6.25 2.3zM8.59 21c-4.56 0-7.03-1.67-7.03-2.34V16.2c1.56 1 4.12 1.67 7.03 1.67s5.48-.66 7.03-1.67v2.45c0 .67-2.46 2.34-7.03 2.34z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Balance</div>
            </div>
          </NavLink>
          {/* <NavLink to="/dashboard/balance">Balance</NavLink> */}

          <NavLink
            to="/dashboard/join_team"
            className={`${
              historyPath === "/dashboard/join_team" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Create/Join team"
            >
              <Svg
                width={34}
                height={28}
                path="M15.62 13.19a5.47 5.47 0 005.47-5.47V.69l-2.73 1.36L15.62.7 12.9 2.05 10.16.7v7.03a5.47 5.47 0 005.46 5.47zm3.91-7.81h-7.81V3.22l1.17.58 2.73-1.37 2.74 1.37 1.17-.58v2.16zm7.03 6.25a3.9 3.9 0 100-7.82 3.9 3.9 0 000 7.82zm-21.87 0a3.9 3.9 0 100-7.82 3.9 3.9 0 000 7.82zm21.87-1.57a2.35 2.35 0 110-4.69 2.35 2.35 0 010 4.7zm-21.87 0a2.35 2.35 0 110-4.69 2.35 2.35 0 010 4.7zm10.93 1.57a3.91 3.91 0 01-3.9-3.91v-.78h7.81v.78c0 2.15-1.75 3.9-3.9 3.9zm14.85 6.25c.43 0 .78-.35.78-.79 0-2.15-1.66-3.9-3.71-3.9h-1.95c-.75 0-1.43.23-2.01.63.45.31.87.68 1.24 1.1.24-.1.5-.17.77-.17h1.95c1.18 0 2.15 1.05 2.15 2.34 0 .44.35.79.78.79zm-29.69 0c.43 0 .78-.35.78-.79 0-1.29.97-2.34 2.15-2.34h1.95c.28 0 .53.06.77.16.37-.41.79-.78 1.24-1.1a3.55 3.55 0 00-2-.62H3.7A3.82 3.82 0 000 17.09c0 .44.35.79.78.79zm21.88 4.68c1.3 0 2.34-1.05 2.34-2.34v-.63a5.38 5.38 0 00-5.46-5.43c-.58 0-1.17.09-1.73.26a7.48 7.48 0 01-4.37 0 7.16 7.16 0 00-1.73-.25 5.38 5.38 0 00-5.46 5.42v.63c0 1.3 1.05 2.34 2.34 2.34h14.07zm0-1.56H8.59a.78.78 0 01-.78-.78v-.63a3.82 3.82 0 013.9-3.87c.44 0 .87.07 1.28.2a9.07 9.07 0 005.27 0c.34-.1.92-.2 1.28-.2 1.33 0 2.53.6 3.2 1.6.46.68.7 1.46.7 2.27v.63c0 .43-.35.78-.78.78z"
                fill={"url(#grad3)"}
              />

              <div className="link-text"> Create/Join Team</div>
            </div>
          </NavLink>
          {/* <NavLink to="/dashboard/edit-hashrate">Edit hashrate</NavLink> */}

          <NavLink
            to="/dashboard/logout"
            className={`${
              historyPath === "/dashboard/logout" && "active-link"
            }`}
          >
            <div
              className="link-div"
              data-toggle="tooltip"
              data-placement="top"
              title="Logout"
            >
              <Svg
                width={34}
                height={28}
                path="M10.94 15.5a6.25 6.25 0 100-12.5 6.25 6.25 0 000 12.5zm0-1.56a4.7 4.7 0 11.01-9.4 4.7 4.7 0 01-.01 9.4zM19.54 28c1.29 0 2.33-1.05 2.33-2.34v-2.04a6.56 6.56 0 00-6.56-6.56c-1.4 0-2.07.78-4.37.78-2.3 0-2.97-.78-4.38-.78A6.56 6.56 0 000 23.62v2.04C0 26.95 1.05 28 2.34 28h17.2zm0-1.56H2.33a.78.78 0 01-.78-.78v-2.04a5 5 0 015-5c.96 0 1.91.79 4.38.79 2.46 0 3.42-.79 4.37-.79a5 5 0 015 5v2.04c0 .43-.35.78-.78.78z"
                fill={"url(#grad3)"}
              />

              <div className="link-text">Logout</div>
            </div>
          </NavLink>
          {/* <NavLink to="/dashboard/logiut">Logout</NavLink> */}
        </div>
      </div>
    );
  };
}
