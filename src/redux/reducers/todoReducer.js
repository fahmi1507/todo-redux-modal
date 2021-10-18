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

    case ActionTypes.SET_TODO:
      return { ...state, todo: state.todos.find((e) => e.id === payload) };

    case ActionTypes.EMPTY_TODO:
      return { ...state, todo: payload };

    case ActionTypes.UPDATE_TODO:
      return { ...state, todos: state.todos.filter((e) => e.id !== payload.id).concat(payload) };

    default:
      return state;
  }
};
