import React from "react";
import { inject, observer } from "mobx-react";
import { withTranslation } from "react-i18next";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import * as variable from "Base/Variables";
import Layout from "Components/Layout/Layout";
import Panel from "Components/Panel/Panel";
import Loader from "Components/Loader/Loader";
import Pagination from "Components/Pagination/Pagination";
import "./AttackHistory.scss";

@inject("AuthStore", "AttackHistoryStore")
@observer
class AttackHistory extends React.Component {
  constructor(props) {
    super();

    this.state = {
      historyData: [],
      page: 1,
      dataLoading: true,
      last_page: null,
      username: "",
    };
  }

  componentDidMount() {
    this.getHistory();
    let { AuthStore } = this.props;
    this.setState({
      username: AuthStore.name,
    });
  }
  getHistory = () => {
    const { AttackHistoryStore, AuthStore } = this.props;
    let { page } = this.state;
    AttackHistoryStore.getHistory(AuthStore.token, page).then((res) => {
      this.setState({
        historyData: res.data.data,
        dataLoading: false,
        last_page: res.data.last_page,
        page: res.data.current_page,
        isLoading: false,
      });
    });
  };
  onPageChange = (e) => {
    this.setState(
      {
        page: e.selected + 1,
        isLoading: true,
      },
      () => {
        this.getHistory();
      }
    );
  };
  render = () => {
    let { historyData, dataLoading, last_page, isLoading, page, username } =
      this.state;
    return (
      <div className="attack_history">
        <Layout title="Attack History">
          {dataLoading ? (
            <Loader />
          ) : historyData && historyData.length !== 0 ? (
            <div className="panel-wrapper">
              <Panel theme="purple">
                <div className="panel-inner">
                  <div className="table-row">
                    <div className="table-heading purple-text">
                      Attacker User Name
                    </div>
                    <div className="table-heading purple-text">
                      Defender User Name
                    </div>
                    <div className="table-heading purple-text">
                      Earn Capacity
                    </div>
                    <div className="table-heading purple-text">Win Type</div>
                  </div>
                  {historyData.map((obj, key) => {
                    return (
                      <div key={key} className="full-width">
                        {isLoading ? (
                          <div className="skeleton-row">
                            <SkeletonTheme
                              color={variable.Active}
                              highlightColor={variable.CheckboxBorder}
                            >
                              <Skeleton count={1} style={{ margin: "20px" }} />
                            </SkeletonTheme>
                          </div>
                        ) : (
                          <div className="table-row">
                            <div className="table-col center-flex-div">
                              <span className="span-heading">
                                Attacker User Name :-
                              </span>
                              {` ${obj.display_attacker_username}`}
                            </div>

                            <div className="table-col center-flex-div">
                              <span className="span-heading">
                                Defender User Name :-
                              </span>
                              {` ${obj.display_defender_username}`}
                            </div>

                            <div className="table-col center-flex-div">
                              <span className="span-heading">
                                Earn Capacity :-
                              </span>
                              {username === obj.attacker_username
                                ? ` ${obj.earn_capacity.toFixed(2)}`
                                : ` -${obj.earn_capacity.toFixed(2)}`}
                            </div>

                            <div className="table-col center-flex-div">
                              <span className="span-heading">Win Type :-</span>
                              {` ${
                                username === obj.attacker_username
                                  ? "Win"
                                  : "Lose"
                              }`}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {last_page !== null && page <= last_page && (
                    <div className="set-margin">
                      <Pagination
                        pageCount={last_page}
                        onPageChange={(e) => this.onPageChange(e)}
                      />
                    </div>
                  )}
                </div>
              </Panel>
            </div>
          ) : (
            <div className="greenpurple">
              Sorry, Attack history is not available.....
            </div>
          )}
        </Layout>
      </div>
    );
  };
}

export default withTranslation()(AttackHistory);
