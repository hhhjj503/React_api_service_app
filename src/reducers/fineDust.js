"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFineDust = exports.updateFineDust = void 0;
//
//type 정의
const UPDATE_FINEDUST = "UPDATE/FINEDUST";
const DELETE_FINEDUST = "DELETE/FINEDUST";
//
//dispatch 호출 메서드
const updateFineDust = (fineDust) => ({
    type: UPDATE_FINEDUST,
    fineDust: fineDust,
});
exports.updateFineDust = updateFineDust;
const deleteFineDust = () => ({
    type: DELETE_FINEDUST,
});
exports.deleteFineDust = deleteFineDust;
//
//초기 상태값 -------------------initialState----------------
const initialState = {
    districtName: undefined,
    dataDate: undefined,
    issueVal: undefined,
    issueTime: undefined,
    moveName: undefined,
    clearTime: undefined,
    issueGbn: undefined,
};
//
//reudecer 리듀서
const fineDust = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FINEDUST:
            return Object.assign(Object.assign({}, state), { districtName: action.fineDust.districtName, dataDate: action.fineDust.dataDate, issueVal: action.fineDust.issueVal, issueTime: action.fineDust.issueTime, moveName: action.fineDust.moveName, clearTime: action.fineDust.clearTime, issueGbn: action.fineDust.issueGbn });
        case DELETE_FINEDUST:
            return Object.assign(Object.assign({}, state), { districtName: undefined, dataDate: undefined, issueVal: undefined, issueTime: undefined, moveName: undefined, clearTime: undefined, issueGbn: undefined });
        default:
            return state;
    }
};
exports.default = fineDust;
