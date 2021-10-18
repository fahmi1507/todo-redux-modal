import Home from "../views/Home";
import * as React from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react";

test("renders component correctly", () => {
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  getByText("todos");
  getByLabelText("What's on your mind?");
  getByText("ADD");
});

test("allow users to add task to the lists", () => {
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const input = getByLabelText("What's on your mind?");
  fireEvent.change(input, { target: { value: "test" } });
  fireEvent.click(getByText("ADD"));

  getByText("test");
});
