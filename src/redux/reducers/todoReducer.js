import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  todos: [],
  todo: { id: "", task: "" },
  loading: false,
  error: null,
};

export const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TODO:
      return { ...state, todos: [...state.todos, payload] };

    case ActionTypes.REMOVE_TODO:
      return { ...state, todos: state.todos.filter((e) => e.id !== payload) };

    case ActionTypes.UPDATE_TODO:
      return { ...state, todos: state.todos.filter((e) => e.id !== payload.id).concat(payload) };

    case ActionTypes.SET_TODO:
      return { ...state, todos: state.todos.concat(payload) };

    case ActionTypes.SET_LOADING:
      return { ...state, loading: payload };

    case ActionTypes.SET_ERROR:
      return { ...state, error: payload };

    default:
      return state;
  }
};
