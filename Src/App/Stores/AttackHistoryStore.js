import { action, observable, autorun } from "mobx";
import { create, persist } from "mobx-persist";

class AttackHistoryStore {
  @persist @observable token = false;
  @persist("object") @observable user = {};
  @observable clearActiveFilter = false;

  @action setState = (name, state) => {
    return (this[name] = state);
  };

  /**
   * Get the history
   * @param token
   * @param page
   * @returns {Promise<any>}
   */
  @action getHistory = async (token, page) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
        mode: "cors",
      },
      body: null,
    };

    let response = await fetch(
      `${process.env.API_URL}/mining/attack/land/history?page=${page}`,
      settings
    );
    const json = await response.json();
    return json;
  };
}

const store = new AttackHistoryStore();

export default store;

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

hydrate("AttackHistoryStore", store);
