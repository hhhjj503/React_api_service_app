//
//type 정의
const UPDATE_SECTION1: string = "UPDATE/SECTION1";
const DELETE_SECTION1: string = "DELETE/SECTION1";
const UPDATE_SECTION2: string = "UPDATE/SECTION2";
const DELETE_SECTION2: string = "DELETE/SECTION2";
const UPDATE_SECTION3: string = "UPDATE/SECTION3";
const DELETE_SECTION3: string = "DELETE/SECTION3";
const UPDATE_SECTION4: string = "UPDATE/SECTION4";
const DELETE_SECTION4: string = "DELETE/SECTION4";

//
//dispatch 호출 메서드
export const updateSection1 = (section: []) => ({
  type: UPDATE_SECTION1,
  section: section,
});
export const deleteSection1 = () => ({
  type: DELETE_SECTION1,
});
export const updateSection2 = (section: []) => ({
  type: UPDATE_SECTION2,
  section: section,
});
export const deleteSection2 = () => ({
  type: DELETE_SECTION2,
});
export const updateSection3 = (section: []) => ({
  type: UPDATE_SECTION3,
  section: section,
});
export const deleteSection3 = () => ({
  type: DELETE_SECTION3,
});
export const updateSection4 = (section: []) => ({
  type: UPDATE_SECTION4,
  section: section,
});
export const deleteSection4 = () => ({
  type: DELETE_SECTION4,
});

//
interface Sections {
  section1: [];
  section2: [];
  section3: [];
  section4: [];
}
//초기 상태값 -------------------initialState----------------
const initialState: Sections = {
  section1: [],
  section2: [],
  section3: [],
  section4: [],
};

//
//reudecer 리듀서
const sections = (state = initialState, action: any) => {
  switch (action.type) {
    //section1---------------------
    case UPDATE_SECTION1:
      return {
        ...state,
        section1: action.section,
      };
    case DELETE_SECTION1:
      return {
        ...state,
        section1: [],
      };
    //section2---------------------
    case UPDATE_SECTION2:
      //console.log("section2 업데이트");
      return {
        ...state,
        section2: action.section,
      };
    case DELETE_SECTION2:
      //console.log("section2 삭제");
      return {
        ...state,
        section2: [],
      };

    //section3---------------------
    case UPDATE_SECTION3:
      return {
        ...state,
        section3: action.section,
      };
    case DELETE_SECTION3:
      //console.log("section3 삭제");
      return {
        ...state,
        section3: [],
      };
    //section4---------------------
    case UPDATE_SECTION4:
      return {
        ...state,
        section4: action.section,
      };
    case DELETE_SECTION4:
      //console.log("section4 삭제");
      return {
        ...state,
        section4: [],
      };

    default:
      return state;
  }
};

export default sections;
