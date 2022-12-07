"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSection4 = exports.updateSection4 = exports.deleteSection3 = exports.updateSection3 = exports.deleteSection2 = exports.updateSection2 = exports.deleteSection1 = exports.updateSection1 = void 0;
//
//type 정의
const UPDATE_SECTION1 = "UPDATE/SECTION1";
const DELETE_SECTION1 = "DELETE/SECTION1";
const UPDATE_SECTION2 = "UPDATE/SECTION2";
const DELETE_SECTION2 = "DELETE/SECTION2";
const UPDATE_SECTION3 = "UPDATE/SECTION3";
const DELETE_SECTION3 = "DELETE/SECTION3";
const UPDATE_SECTION4 = "UPDATE/SECTION4";
const DELETE_SECTION4 = "DELETE/SECTION4";
//
//dispatch 호출 메서드
const updateSection1 = (section) => ({
    type: UPDATE_SECTION1,
    section: section,
});
exports.updateSection1 = updateSection1;
const deleteSection1 = () => ({
    type: DELETE_SECTION1,
});
exports.deleteSection1 = deleteSection1;
const updateSection2 = (section) => ({
    type: UPDATE_SECTION2,
    section: section,
});
exports.updateSection2 = updateSection2;
const deleteSection2 = () => ({
    type: DELETE_SECTION2,
});
exports.deleteSection2 = deleteSection2;
const updateSection3 = (section) => ({
    type: UPDATE_SECTION3,
    section: section,
});
exports.updateSection3 = updateSection3;
const deleteSection3 = () => ({
    type: DELETE_SECTION3,
});
exports.deleteSection3 = deleteSection3;
const updateSection4 = (section) => ({
    type: UPDATE_SECTION4,
    section: section,
});
exports.updateSection4 = updateSection4;
const deleteSection4 = () => ({
    type: DELETE_SECTION4,
});
exports.deleteSection4 = deleteSection4;
//초기 상태값 -------------------initialState----------------
const initialState = {
    section1: [],
    section2: [],
    section3: [],
    section4: [],
};
//
//reudecer 리듀서
const sections = (state = initialState, action) => {
    switch (action.type) {
        //section1---------------------
        case UPDATE_SECTION1:
            return Object.assign(Object.assign({}, state), { section1: action.section });
        case DELETE_SECTION1:
            return Object.assign(Object.assign({}, state), { section1: [] });
        //section2---------------------
        case UPDATE_SECTION2:
            //console.log("section2 업데이트");
            return Object.assign(Object.assign({}, state), { section2: action.section });
        case DELETE_SECTION2:
            //console.log("section2 삭제");
            return Object.assign(Object.assign({}, state), { section2: [] });
        //section3---------------------
        case UPDATE_SECTION3:
            return Object.assign(Object.assign({}, state), { section3: action.section });
        case DELETE_SECTION3:
            //console.log("section3 삭제");
            return Object.assign(Object.assign({}, state), { section3: [] });
        //section4---------------------
        case UPDATE_SECTION4:
            return Object.assign(Object.assign({}, state), { section4: action.section });
        case DELETE_SECTION4:
            //console.log("section4 삭제");
            return Object.assign(Object.assign({}, state), { section4: [] });
        default:
            return state;
    }
};
exports.default = sections;
