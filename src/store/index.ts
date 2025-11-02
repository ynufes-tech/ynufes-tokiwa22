import { createStore } from 'vuex'

interface Sponsor {
  image: {
    url: string;
  };
}

interface State {
  sponsors: Sponsor[];
}

export default createStore<State>({
  state: {
    sponsors: [
      { image: { url: "/data/images/loading1.png" } },
      { image: { url: "/data/images/loading1.png" } },
      { image: { url: "/data/images/loading1.png" } },
      { image: { url: "/data/images/loading1.png" } }
    ],
  },
  getters: {},
  mutations: {
    setSponsors(state, newSponsors: Sponsor[]) {
      state.sponsors = newSponsors;
    },
  },
  actions: {},
  modules: {}
})
