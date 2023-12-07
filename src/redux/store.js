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
        name: action.payload.name,
        kingdom: action.payload.kingdom,
        clade: action.payload.clade,
        order: action.payload.order,
        family: action.payload.family,
        subfamily: action.payload.subfamily,
        genus: action.payload.genus
      }
    })
    yield put({
      type: 'SAGA_GET_PLANTS',
    })
  } catch (error) {
    console.log('Unable to save plants to server', error);
  }
}

function* deletePlants(action) {
  try {
      const response = yield axios({
          method: 'DELETE',
          url: `/api/plants/${action.payload}`

      })
      yield put({
          type: 'SAGA_GET_PLANTS',
      })
  } catch (error) {
      console.log('Unable to deleting plant from server', error);
  }
}




function* rootSaga() {
  yield takeLatest('SAGA_GET_PLANTS', getPlants)
  yield takeLatest('SAGA_POST_PLANTS', postPlants)
  yield takeLatest('SAGA_DELETE_PLANT', deletePlants)
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
