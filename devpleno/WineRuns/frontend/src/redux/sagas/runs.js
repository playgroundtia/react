import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import ActionCreators from '../actionsCreators';
import api from '../../services/api';

export function* getRuns() {
  const token = localStorage.getItem('@WineRuns/TOKEN');
  const headerParams = { Authorization: `Bearer ${token}` };
  try {
    const { data } = yield call(api.get, '/runs', { headers: headerParams });
    yield put(ActionCreators.getRunsSuccess(data));
  } catch (error) {
    yield put(ActionCreators.getRunsFailure('error'));
    toast.warn('Could not found get runs.');
  }
}

export function* createRun({ run }) {
  const token = localStorage.getItem('@WineRuns/TOKEN');
  const headerParams = { Authorization: `Bearer ${token}` };
  try {
    const { data } = yield call(api.post, '/runs', run, {
      headers: headerParams,
    });
    yield put(ActionCreators.createRunSuccess(data));
  } catch (error) {
    yield put(ActionCreators.createRunFailure('error'));
    toast.warn('Could not found create run.');
  }
}

export function* updateRun({ run }) {
  const token = localStorage.getItem('@WineRuns/TOKEN');
  const headerParams = { Authorization: `Bearer ${token}` };
  try {
    const { data } = yield call(api.patch, `/runs/${run.id}`, run, {
      headers: headerParams,
    });
    yield put(ActionCreators.updateRunSuccess(data));
  } catch (error) {
    yield put(ActionCreators.updateRunFailure('error'));
    toast.warn('Could not found update run.');
  }
}

export function* deleteRun({ run }) {
  const token = localStorage.getItem('@WineRuns/TOKEN');
  const headerParams = { Authorization: `Bearer ${token}` };
  try {
    const { data } = yield call(api.delete, `/runs/${run.id}`, {
      headers: headerParams,
    });
    yield put(ActionCreators.deleteRunSuccess(data));
    yield getRuns();
    toast.info('Delete Success');
  } catch (error) {
    yield put(ActionCreators.deleteRunFailure('error'));
    toast.warn('Could not found delete run.');
  }
}
