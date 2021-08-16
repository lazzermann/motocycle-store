import { Action } from 'redux';
export const HYDRATE_ACTION         = 'HYDRATE_ACTION';

export function action(type: string, payload = {}): Action {
    return {type, ...payload};
}

export const setHydrate = (value: boolean) => action (HYDRATE_ACTION,{ value });