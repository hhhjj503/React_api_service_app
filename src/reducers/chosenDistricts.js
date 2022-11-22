//
//type 정의
const UPDATE_FIRSTCHOSENDISTRICT = "UPDATE/FIRSTCHOSENDISTRICT";
const DELETE_FIRSTCHOSENDISTRICT = "DELETE/FIRSTCHOSENDISTRICT";
const UPDATE_SECONDCHOSENDISTRICT = "UPDATE/SECONDCHOSENDISTRICT";
const DELETE_SECONDCHOSENDISTRICT = "DELETE/SECONDCHOSENDISTRICT";
const UPDATE_THIRDCHOSENDISTRICT = "UPDATE/THIRDCHOSENDISTRICT";
const DELETE_THIRDCHOSENDISTRICT = "DELETE/THIRDCHOSENDISTRICT";

//
//dispatch 호출 메서드
//updateFirstChosenDistrict
export const updateFirstChosenDistrict = (id, name) => ({
  type: UPDATE_FIRSTCHOSENDISTRICT,
  id: id,
  name: name,
});
export const deleteFirstChosenDistrict = () => ({
  type: DELETE_FIRSTCHOSENDISTRICT,
});
//updateSecondChosenDistrict
export const updateSecondChosenDistrict = (id, name) => ({
  type: UPDATE_SECONDCHOSENDISTRICT,
  id: id,
  name: name,
});
export const deleteSecondChosenDistrict = () => ({
  type: DELETE_SECONDCHOSENDISTRICT,
});
//updateThirdChosenDistrict
export const updateThirdChosenDistrict = (id, name) => ({
  type: UPDATE_THIRDCHOSENDISTRICT,
  id: id,
  name: name,
});
export const deleteThirdChosenDistrict = () => ({
  type: DELETE_THIRDCHOSENDISTRICT,
});

//
//초기 상태값 -------------------initialState----------------
const initialState = {
  firstChosenDistrict: {
    id: 0,
    name: "",
  },
  secondChosenDistrict: {
    id: 0,
    name: "",
  },
  thirdChosenDistrict: {
    id: 0,
    name: "",
  },
};

//
//reudecer 리듀서
const chosenDistricts = (state = initialState, action) => {
  switch (action.type) {
    //firstChosenDistrict-------------------
    case UPDATE_FIRSTCHOSENDISTRICT:
      //console.log(action.id + "   " + action.name);
      return {
        ...state,
        firstChosenDistrict: {
          id: action.id,
          name: action.name,
        },
      };
    case DELETE_FIRSTCHOSENDISTRICT:
      //console.log("FIRSTCHOSENDISTRICT 삭제");
      return {
        ...state,
        firstChosenDistrict: {
          ...state.firstChosenDistrict,
          id: 0,
          name: "",
        },
      };
    //secondChosenDistrict-------------------
    case UPDATE_SECONDCHOSENDISTRICT:
      return {
        ...state,
        secondChosenDistrict: {
          id: action.id,
          name: action.name,
        },
      };
    case DELETE_SECONDCHOSENDISTRICT:
      //console.log("secondChosenDistrict 삭제");
      return {
        ...state,
        secondChosenDistrict: {
          id: 0,
          name: "",
        },
      };
    //thirdChosenDistrict-------------------
    case UPDATE_THIRDCHOSENDISTRICT:
      return {
        ...state,
        thirdChosenDistrict: {
          id: action.id,
          name: action.name,
        },
      };
    case DELETE_THIRDCHOSENDISTRICT:
      //console.log("thirdChosenDistrict 삭제");
      return {
        ...state,
        thirdChosenDistrict: {
          id: 0,
          name: "",
        },
      };
    default:
      return state;
  }
};

export default chosenDistricts;
