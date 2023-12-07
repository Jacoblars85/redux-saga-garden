import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

// this startingPlantArray should eventually be removed


const plantList = (state = [], action) => {
  switch (action.type) {
    case 'GET_PLANTS':
      return action.payload
    default:
      return state;
  }
};

function* getPlants() {
  try {
    const response = yield axios({
      method: 'GET',
      url: '/api/plants'
    })
    yield put({
      type: 'GET_PLANTS',
      payload: response.data
    })
  } catch (error) {
    console.log('Unable to get plants from server', error);
  }
}

function* postPlants(action) {
  try {
    const response = yield axios({
      method: 'POST',
      url: '/api/plants',
      data: {
        name: action.payload,
        kingdom: action.payload,
        clade: action.payload,
        order: action.payload,
        family: action.payload,
        subfamily: action.payload,
        genus: action.payload
      }
    })
    yield put({
      type: 'SAGA_GET_PLANTS',
    })
  } catch (error) {
    console.log('Unable to save plants to server', error);
  }
}




function* rootSaga() {
  yield takeLatest('SAGA_GET_PLANTS', getPlants)
  yield takeLatest('SAGA_POST_PLANTS', postPlants)
}

const sagaMiddleware = createSagaMiddleware();

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({
    plantList
  }),

  applyMiddleware(sagaMiddleware, logger),
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

sagaMiddleware.run(rootSaga)


export default store;
