import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations';
import './App.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import lataamoReducer from './redux/reducers';
import Lataamo from './Lataamo';

const store = createStore(lataamoReducer, applyMiddleware(thunk));

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'fi',
    fallbackLng: 'cimode',
    supportedLngs: ['fi', 'en', 'sv']
  });

const App = () => {
  return (
    <Provider store={store}>
      <Lataamo />
    </Provider>
  );
};

App.propTypes = {
};

export default App;
