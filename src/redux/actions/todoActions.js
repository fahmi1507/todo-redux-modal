import { ActionTypes } from "../constants/actionTypes";

function addNewTodo(newTodo) {
  return {
    type: ActionTypes.ADD_TODO,
    payload: newTodo,
  };
}

function updateTodo(todo) {
  return {
    type: ActionTypes.UPDATE_TODO,
    payload: todo,
  };
}

export function emptyTodo(empty) {
  return {
    type: ActionTypes.EMPTY_TODO,
    payload: empty,
  };
}

export function addTodo(newTodo) {
  return (dispatch, getState) => {
    const { todos } = getState().allTodos;

    let x = todos.find((e) => e.id === newTodo.id);

    if (x) {
      dispatch(updateTodo(newTodo));
    } else {
      dispatch(addNewTodo(newTodo));
    }
  };
}

export function removeTodo(id) {
  return {
    type: ActionTypes.REMOVE_TODO,
    payload: id,
  };
}

export function findOne(id) {
  return {
    type: ActionTypes.SET_TODO,
    payload: id,
  };
}
