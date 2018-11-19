import localForage from 'localforage';

export const SET_JWT = 'SET_JWT';
export const RESTORE_JWT = 'RESTORE_JWT';
export const DELETE_JWT = 'DELETE_JWT';

export function setJWT(jwt) {
  const promise = localForage.setItem('jwt', jwt);
  console.dir(promise);
  return {
    type: SET_JWT,
    payload: promise
  };
}

export function restoreJWT() {
  const promise = localForage.getItem('jwt');
  console.dir(promise);
  return {
    type: RESTORE_JWT,
    payload: promise
  };
}

export function deleteJWT() {
  const promise = localForage.setItem('jwt', null);
  console.dir(promise);
  return {
    type: DELETE_JWT,
    payload: promise
  };
}
