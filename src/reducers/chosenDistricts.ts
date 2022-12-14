//
//type 정의
const UPDATE_FIRSTCHOSENDISTRICT: string = "UPDATE/FIRSTCHOSENDISTRICT";
const DELETE_FIRSTCHOSENDISTRICT: string = "DELETE/FIRSTCHOSENDISTRICT";
const UPDATE_SECONDCHOSENDISTRICT: string = "UPDATE/SECONDCHOSENDISTRICT";
const DELETE_SECONDCHOSENDISTRICT: string = "DELETE/SECONDCHOSENDISTRICT";
const UPDATE_THIRDCHOSENDISTRICT: string = "UPDATE/THIRDCHOSENDISTRICT";
const DELETE_THIRDCHOSENDISTRICT: string = "DELETE/THIRDCHOSENDISTRICT";

//
//dispatch 호출 메서드
//updateFirstChosenDistrict
export const updateFirstChosenDistrict = (id: number, name: string) => ({
  type: UPDATE_FIRSTCHOSENDISTRICT,
  id: id,
  name: name,
});
export const deleteFirstChosenDistrict = () => ({
  type: DELETE_FIRSTCHOSENDISTRICT,
});
//updateSecondChosenDistrict
export const updateSecondChosenDistrict = (id: number, name: string) => ({
  type: UPDATE_SECONDCHOSENDISTRICT,
  id: id,
  name: name,
});
export const deleteSecondChosenDistrict = () => ({
  type: DELETE_SECONDCHOSENDISTRICT,
});
//updateThirdChosenDistrict
export const updateThirdChosenDistrict = (id: number, name: string) => ({
  type: UPDATE_THIRDCHOSENDISTRICT,
  id: id,
  name: name,
});
export const deleteThirdChosenDistrict = () => ({
  type: DELETE_THIRDCHOSENDISTRICT,
});

//
interface ChosenDistricts {
  firstChosenDistrict: {
    id: number;
    name: string;
  };
  secondChosenDistrict: {
    id: number;
    name: string;
  };
  thirdChosenDistrict: {
    id: number;
    name: string;
  };
}
//초기 상태값 -------------------initialState----------------
const initialState: ChosenDistricts = {
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
const chosenDistricts = (state = initialState, action: any) => {
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
