import create from "zustand";
import produce from "immer";
import messengerSlice from "./slices/messengerSlice";

const INITIAL_STATE = {
  model: {
    toggle: false,
  },
  alert: {
    message: "",
    toggled: false,
    type: "success",
    time: 3000,
  },
  form: { error: { global: undefined } },
  edit: { name: false, username: false, email: false },
  query: '',
  filter: [],
};

const store = (set) => {
  return {
    ...INITIAL_STATE,
    ...messengerSlice(set),
    setAlert: (alert) => set(pre => ({ alert: { ...pre.alert, ...alert } })),
    setQuery: (value) => set(state => state.query = value),
    set: (fn) => set(produce(fn)),
  }
};

export const useStore = create(
  // persist
  (store
    // , {
    //   name: 'my-store',
    //   getStorage: () => sessionStorage,
    //   serialize: (data) => {
    //     const state = JSON.stringify({
    //       ...data,
    //       state: {
    //         ...data.state,
    //         messages: Array.from(data.state.messages),
    //         unreadMessages: Array.from(data.state.unreadMessages),
    //       },
    //     });
    //     return state
    //   },
    //   deserialize: (value) => {
    //     const data = JSON.parse(value);
    //     data.state.messages = new Map(data.state.messages);
    //     data.state.unreadMessages = new Map(data.state.unreadMessages);
    //     return data;
    //   },
    // }
  ));
