import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import lataamoReducer from '.';
import PropTypes from 'prop-types';

export const MockProvider = ({ children, mockReducers }) => {
  return (
    <Provider store={createStore(() => ({ ...lataamoReducer, ...mockReducers }), applyMiddleware(thunk))}>
      {children}
    </Provider>
  );
};

MockProvider.propTypes = {
  children: PropTypes.object.isRequired,
  mockReducers: PropTypes.object,
};
