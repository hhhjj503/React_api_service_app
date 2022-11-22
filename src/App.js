import "./App.css";
import { Reset } from "styled-reset";
import { useEffect } from "react";
import axios from "axios";
import LabelInput from "./components/LabelInput";
import styled from "styled-components";
import Fieldset from "./components/Fieldset";
import apiKey from "./apiKey";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSection1,
  deleteSection1,
  updateSection2,
  deleteSection2,
  updateSection3,
  deleteSection3,
  updateSection4,
} from "./reducers/sections";
import {
  updateFirstChosenDistrict,
  deleteFirstChosenDistrict,
  updateSecondChosenDistrict,
  deleteSecondChosenDistrict,
  updateThirdChosenDistrict,
  deleteThirdChosenDistrict,
} from "./reducers/chosenDistricts";
import { updateFineDust, deleteFineDust } from "./reducers/fineDust";

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
  const sections = useSelector((state) => state.sections);
  const chosenDistricts = useSelector((state) => state.chosenDistricts);
  const fineDust = useSelector((state) => state.fineDust);
  const dispatch = useDispatch();

  //첫화면 기본 요청데이터
  useEffect(() => {
    async function fetchData() {
      const result = await axios
        .get("./firstDistricts.json")
        .then((response) => {
          return response.data;
        });
      dispatch(updateSection1(result));
    }
    fetchData();
  }, [dispatch]);

  //지역1 클릭
  async function getFirstDistrict(e) {
    //지역2와 지역3의 배열 초기화
    dispatch(deleteSection2());
    dispatch(deleteSection3());
    dispatch(deleteFirstChosenDistrict());
    dispatch(deleteSecondChosenDistrict());
    dispatch(deleteThirdChosenDistrict());
    //지역2를 요청해 가져온뒤 지역1 state 를 이용해 조건에 맞는것만 배열 필터링
    const result = await axios.get("./secondDistricts.json").then((result) => {
      return result.data;
    });
    //지역1 관련 state 저장
    dispatch(
      updateFirstChosenDistrict(
        e.target.getAttribute("id"),
        e.target.getAttribute("name")
      )
    );
    const filteredDistricts = result.filter(
      (item) => item.name === e.target.getAttribute("name")
    );
    //필터링된 지역2 배열을 저장
    dispatch(updateSection2(filteredDistricts));
    changeBackColor(1, e);
  }

  //지역2 클릭
  async function getSecondDistrict(e) {
    //지역3 배열과  선택한 지역3 초기화
    dispatch(deleteSection3());
    dispatch(deleteThirdChosenDistrict());

    //지역2 관련 state 저장
    dispatch(
      updateSecondChosenDistrict(
        e.target.getAttribute("id"),
        e.target.getAttribute("name")
      )
    );

    //데이터를 요청해 가져온뒤 지역2 state 를 이용해 조건에 맞는것만 배열 필터링
    const result = await axios.get("./secondDistricts.json").then((result) => {
      return result.data;
    });
    const filteredDistricts = result.filter(
      (item) =>
        item.name === chosenDistricts.firstChosenDistrict.name &&
        item.subName === e.target.getAttribute("name")
    );

    const doubleFilteredDistricts = [];
    filteredDistricts.forEach((item) => {
      item.subDistricts.forEach((item) => {
        doubleFilteredDistricts.push(item);
      });
    });
    dispatch(updateSection3(doubleFilteredDistricts));
    changeBackColor(2, e);
  }

  //지역3 클릭시
  async function getThirdDistrict(e) {
    dispatch(
      updateThirdChosenDistrict(
        e.target.getAttribute("id"),
        e.target.getAttribute("name")
      )
    );
    console.log("first : " + chosenDistricts.firstChosenDistrict.name);
    console.log("second : " + chosenDistricts.secondChosenDistrict.name);
    console.log("third : " + chosenDistricts.thirdChosenDistrict.name);
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
      chosenDistricts.firstChosenDistrict.id === 0 ||
      chosenDistricts.secondChosenDistrict.id === 0 ||
      chosenDistricts.thirdChosenDistrict.id === 0
    ) {
      alert("지역을 모두 선택해 주세요");
      return;
    }

    const result = await axios
      .get(
        `https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?serviceKey=${apiKey}&returnType=json&numOfRows=100&pageNo=1&year=2022&itemCode=PM10`
      )
      .then((result) => {
        return result.data.response.body;
      });

    const filteredDistricts = result.items.filter(
      (item) =>
        item.districtName === chosenDistricts.firstChosenDistrict.name &&
        item.moveName === chosenDistricts.secondChosenDistrict.name
    );
    console.log("filteredDistricts :" + filteredDistricts);
    console.log("filteredDistricts[0] :" + filteredDistricts[0]);

    if (filteredDistricts[0] === undefined) {
      const fineDust = {
        districtName: undefined, //지역명
        dataDate: undefined, //발령일
        issueVal: undefined, //발령농도
        issueTime: undefined, //발령시간
        moveName: undefined, //권역명
        clearTime: undefined, //해제시간
        issueGbn: undefined, //경보단계
      };
      dispatch(updateFineDust(fineDust));
    } else {
      dispatch(updateSection4(filteredDistricts[0]));
      const fineDust = {
        districtName: sections.section4.districtName, //지역명
        dataDate: sections.section4.dataDate, //발령일
        issueVal: sections.section4.issueVal, //발령농도
        issueTime: sections.section4.issueTime, //발령시간
        moveName: sections.section4.moveName, //권역명
        clearTime: sections.section4.clearTime, //해제시간
        issueGbn: sections.section4.issueGbn, //경보단계
      };
      dispatch(updateFineDust(fineDust));
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
