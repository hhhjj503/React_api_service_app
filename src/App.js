import "./App.css";
import { Reset } from "styled-reset";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import LabelInput from "./components/LabelInput";
import styled from "styled-components";
import Fieldset from "./components/Fieldset";

const DivWrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Div = styled.div`
  width: ${(props) => (props.width ? `${props.width}` : "200px")};
  height: ${(props) => (props.height ? `${props.height}` : "300px")};
  background-color: #ededed;
  display: ${(props) => (props.display ? `${props.display}` : "inline-block")};
  margin: 0px ${(props) => (props.margin ? `${props.margin}` : "20px")};
  border-radius: ${(props) =>
    props.borderRadius ? `${props.borderRadius}` : ""};
  background-color: ${(props) =>
    props.backgroundColor ? `${props.backgroundColor}` : ""};
  position: relative;

  &.opacitied {
    overflow: hidden;
    box-sizing: border-box;
    padding: 30px 140px;
    line-height: 33px;
  }

  &.opacitied:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: black;
    z-index: 1;
  }
`;

const Form = styled.form`
  position: relative;
  display: block;
  text-align: center;
  width: 800px;
  margin: 20px auto;
`;

const Legend = styled.legend`
  text-align: center;
  padding: 5px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  color: white;
  font-weight: bold;
  background-color: #7070c8;
`;

const Button = styled.button`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: block;
  margin: 20px auto;
  padding: 5px 0;
  width: 50%;
  height: 50px;
  border: none;
  border-radius: 15px;
  background-color: #7070c8;
  color: white;
  font-weight: bold;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

const App = () => {
  //선택된 지역에 대한 정보를 저장
  const [chosenDistrics, setChosenDistrics] = useState(
    {
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
    },
    []
  );

  function reducer(state, action, e) {
    switch (action.type) {
      case 1:
        return {
          ...state,
          firstChosenDistrict: {
            ...state.firstChosenDistrict,
            id: e.target.getAttribute("id"),
            name: e.target.getAttribute("name"),
          },
        };
      case 2:
        return {
          ...state,
          secondChosenDistrict: {
            ...state.secondChosenDistrict,
            id: e.target.getAttribute("id"),
            name: e.target.getAttribute("name"),
          },
        };
      case 3:
        return {
          ...state,
          thirdChosenDistrict: {
            ...state.thirdChosenDistrict,
            id: e.target.getAttribute("id"),
            name: e.target.getAttribute("name"),
          },
        };
      default:
        return state;
    }
  }
  //각 지역을 출력할 배열을 저장
  const [sections, setSections] = useState(
    {
      section1: [],
      section2: [],
      section3: [],
      section4: [],
    },
    []
  );

  const [fineDust, setFineDust] = useState({
    districtName: undefined,
    dataDate: undefined,
    issueVal: undefined,
    issueTime: undefined,
    moveName: undefined,
    clearTime: undefined,
    issueGbn: undefined,
  });

  //첫화면 기본 요청데이터
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("./firstDistricts.json");
      setSections(
        {
          ...sections,
          section1: result.data,
        },
        []
      );
    }
    fetchData();
  }, []);

  //지역1 클릭
  async function getFirstDistrict(e) {
    //지역2와 지역3의 배열 초기화
    setSections(
      {
        ...sections,
        section2: [],
        section3: [],
      },
      []
    );
    setChosenDistrics((prevState) => ({
      ...prevState,
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
    }));
    const prevClicked = sections.section1.filter(
      (item) => item.id === chosenDistrics.firstChosenDistrict.id
    );
    console.log(chosenDistrics.firstChosenDistrict.id);
    console.log(prevClicked);
    //지역2를 요청해 가져온뒤 지역1 state 를 이용해 조건에 맞는것만 배열 필터링
    const result = await axios.get("./secondDistricts.json").then((result) => {
      return result.data;
    });
    //지역1 관련 state 저장
    setChosenDistrics((prevState) => ({
      ...prevState,
      firstChosenDistrict: {
        ...chosenDistrics.firstChosenDistrict,
        id: e.target.getAttribute("id"),
        name: e.target.getAttribute("name"),
      },
    }));
    const filteredDistricts = result.filter(
      (item) => item.name === e.target.getAttribute("name")
    );
    console.log(chosenDistrics.firstChosenDistrict.id);
    //필터링된 지역2 배열을 저장
    setSections({
      ...sections,
      section2: filteredDistricts,
      section3: [],
    });
    changeBackColor(1, e);
  }

  //지역2 클릭
  async function getSecondDistrict(e) {
    //지역3 배열을 초기화
    setSections({
      ...sections,
      section3: [],
    });
    setChosenDistrics((prevState) => ({
      ...prevState,
      secondChosenDistrict: {
        id: 0,
        name: "",
      },
      thirdChosenDistrict: {
        id: 0,
        name: "",
      },
    }));
    //데이터를 요청해 가져온뒤 지역2 state 를 이용해 조건에 맞는것만 배열 필터링
    const result = await axios.get("./secondDistricts.json").then((result) => {
      return result.data;
    });
    //지역2 관련 state 저장
    setChosenDistrics((prevState) => ({
      ...prevState,
      secondChosenDistrict: {
        ...prevState.secondChosenDistrict,
        id: e.target.getAttribute("id"),
        name: e.target.getAttribute("name"),
      },
    }));
    const filteredDistricts = result.filter(
      (item) =>
        item.name === chosenDistrics.firstChosenDistrict.name &&
        item.subName === e.target.getAttribute("name")
    );
    //
    const doubleFilteredDistricts = [];
    filteredDistricts.forEach((item) => {
      item.subDistricts.forEach((item) => {
        doubleFilteredDistricts.push(item);
      });
    });
    //
    setSections({
      ...sections,
      section3: doubleFilteredDistricts,
    });
    changeBackColor(2, e);
  }

  //지역3 클릭시
  async function getThirdDistrict(e) {
    setChosenDistrics((prevState) => ({
      ...prevState,
      thirdChosenDistrict: {
        ...prevState.thirdChosenDistrict,
        id: e.target.getAttribute("id"),
        name: e.target.getAttribute("name"),
      },
    }));
    console.log("first : " + chosenDistrics.firstChosenDistrict.name);
    console.log("second : " + chosenDistrics.secondChosenDistrict.name);
    console.log("third : " + chosenDistrics.thirdChosenDistrict.name);
    changeBackColor(3, e);
  }

  function changeBackColor(distric, e) {
    if (distric === 1) {
      e.target.style.backgroundColor = "black";
      e.target.style.color = "white";
    }
    //
    if (distric === 2) {
      e.target.style.backgroundColor = "black";
      e.target.style.color = "white";
    }
    //
    if (distric === 3) {
      e.target.style.backgroundColor = "black";
      e.target.style.color = "white";
    }
  }

  //버튼클릭
  const onClick = async (e) => {
    e.preventDefault();

    if (
      chosenDistrics.firstChosenDistrict.id === 0 ||
      chosenDistrics.secondChosenDistrict.id === 0 ||
      chosenDistrics.thirdChosenDistrict.id === 0
    ) {
      alert("지역을 모두 선택해 주세요");
      return;
    }

    const result = await axios
      .get(
        "https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?serviceKey=XHdBPXDvwDyK51xmj8Onfl76PpmSE%2FWvQxPvMt6ZZPCWoJYOMney38kmg%2Bto%2Bxp%2F7IXlQjS%2FQLcmSnnh%2BnsTmw%3D%3D&returnType=json&numOfRows=100&pageNo=1&year=2022&itemCode=PM10"
      )
      .then((result) => {
        return result.data.response.body;
      });

    const filteredDistricts = result.items.filter(
      (item) =>
        item.districtName === chosenDistrics.firstChosenDistrict.name &&
        item.moveName === chosenDistrics.secondChosenDistrict.name
    );
    console.log("filteredDistricts :" + filteredDistricts);
    console.log("filteredDistricts[0] :" + filteredDistricts[0]);

    if (filteredDistricts[0] === undefined) {
      setFineDust({
        ...fineDust,
        districtName: undefined,
      });
    } else {
      setSections({
        ...sections,
        section4: filteredDistricts[0],
      });
      setFineDust({
        ...fineDust,
        districtName: sections.section4.districtName, //지역명
        dataDate: sections.section4.dataDate, //발령일
        issueVal: sections.section4.issueVal, //발령농도
        issueTime: sections.section4.issueTime, //발령시간
        moveName: sections.section4.moveName, //권역명
        clearTime: sections.section4.clearTime, //해제시간
        issueGbn: sections.section4.issueGbn, //경보단계
      });
    }
  };

  return (
    <div className="App">
      <Reset />
      <DivWrapper>
        <Div
          width={"600px"}
          display={"block"}
          margin={"auto"}
          borderRadius={"15px"}
          backgroundColor={"transparent"}
          className="opacitied"
        >
          {fineDust.districtName === undefined ? (
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 2,
                position: "absolute",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              등록된 경보 정보가 없습니다
              <br />
              지역을 눌러 요청해 주세요
            </div>
          ) : (
            <>
              <h3
                style={{
                  position: "relative",
                  zIndex: 2,
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  textAlign: "center",
                  backgroundColor: "white",
                  borderRadius: "15px",
                }}
              >
                미세먼지 경보 정보
              </h3>
              <ul style={{ position: "relative", zIndex: 2, color: "white" }}>
                <li>
                  지역명 :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {sections.section4.districtName === undefined
                      ? ""
                      : sections.section4.districtName}
                  </span>
                </li>
                <li>
                  권역명 :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {sections.section4.moveName === undefined
                      ? ""
                      : sections.section4.moveName}
                  </span>
                </li>
                <li>
                  발령일 :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {sections.section4.dataDate === undefined
                      ? ""
                      : sections.section4.dataDate}
                  </span>
                </li>
                <li>
                  발령농도 :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {sections.section4.issueVal === undefined
                      ? ""
                      : sections.section4.issueVal}
                  </span>
                </li>
                <li>
                  발령시간 :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {sections.section4.issueTime === undefined
                      ? ""
                      : sections.section4.issueTime}
                  </span>
                </li>
                <li>
                  경보단계 :{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {sections.section4.issueGbn === undefined
                      ? ""
                      : sections.section4.issueGbn}
                  </span>
                </li>
              </ul>
            </>
          )}
        </Div>
        <Form>
          <Div>
            <Fieldset>
              <Legend>지역1</Legend>
              {sections.section1.map((item, index) => (
                <LabelInput
                  key={index}
                  name={item.name}
                  subName={item.subName}
                  engName={item.engName}
                  id={item.id}
                  onClick={(e) => {
                    getFirstDistrict(e);
                  }}
                />
              ))}
            </Fieldset>
          </Div>
          <Div>
            <Fieldset>
              <Legend>지역2</Legend>
              {sections.section2.map((item, index) => (
                <LabelInput
                  key={index}
                  name={item.subName}
                  subName={item.subName}
                  engName={item.engName}
                  id={item.id}
                  onClick={(e) => {
                    getSecondDistrict(e);
                  }}
                />
              ))}
            </Fieldset>
          </Div>
          <Div>
            <Fieldset>
              <Legend>지역3</Legend>
              {sections.section3.map((item, index) => (
                <LabelInput
                  key={index}
                  name={item}
                  onClick={(e) => {
                    getThirdDistrict(e);
                  }}
                />
              ))}
            </Fieldset>
          </Div>
          <Button onClick={onClick}>확인하기</Button>
        </Form>
      </DivWrapper>
    </div>
  );
};

export default App;
