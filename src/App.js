import "./App.css";
import { Reset } from "styled-reset";
import { useEffect, useState } from "react";
import axios from "axios";
import LabelInput from "./components/LabelInput";
import styled from "styled-components";
import Fieldset from "./components/Fieldset";

const Div = styled.div`
  width: 200px;
  height: 300px;
  background-color: #ededed;
  display: inline-block;
  margin: 0px 20px;
`;

const Legend = styled.legend`
  text-align: center;
  padding: 5px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: bisque;
`;

const App = () => {
  //선택된 지역에 대한 정보를 저장
  const [chosenDistrics, setChosenDistrics] = useState({
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
  });

  //각 지역을 출력할 배열을 저장
  const [sections, setSections] = useState({
    section1: [],
    section2: [],
    section3: [],
    section4: undefined,
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
    //지역2를 요청해 가져온뒤 지역1 state 를 이용해 조건에 맞는것만 배열 필터링
    const result = await axios.get("./secondDistricts.json").then((result) => {
      return result.data;
    });
    const filteredDistricts = result.filter(
      (item) => item.name === chosenDistrics.firstChosenDistrict.name
    );
    //지역1 관련 state 저장
    setChosenDistrics((prevState) => ({
      ...prevState,
      firstChosenDistrict: {
        ...prevState.firstChosenDistrict,
        id: e.target.getAttribute("id"),
        name: e.target.getAttribute("name"),
      },
    }));
    //필터링된 지역2 배열을 저장
    setSections({
      ...sections,
      section2: filteredDistricts,
      section3: [],
    });
  }

  //지역2 클릭
  async function getSecondDistrict(e) {
    //지역3 배열을 초기화
    setSections({
      ...sections,
      section3: [],
    });
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
    console.log(chosenDistrics.secondChosenDistrict);
    const filteredDistricts = result.filter(
      (item) =>
        item.name === chosenDistrics.firstChosenDistrict.name &&
        item.subName === chosenDistrics.secondChosenDistrict.name
    );
    //
    console.log("filteredDistricts :" + filteredDistricts.subDistricts);
    const doubleFilteredDistricts = [];
    filteredDistricts.forEach((item) => {
      doubleFilteredDistricts.push(item);
    });
    console.log(doubleFilteredDistricts);
    //
    setSections({
      ...sections,
      section3: doubleFilteredDistricts,
    });
  }

  //지역3 클릭시
  const onClick = async (e) => {
    let filterdDistrict = undefined;
    const result = await axios
      .get(
        "https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?serviceKey=XHdBPXDvwDyK51xmj8Onfl76PpmSE%2FWvQxPvMt6ZZPCWoJYOMney38kmg%2Bto%2Bxp%2F7IXlQjS%2FQLcmSnnh%2BnsTmw%3D%3D&returnType=json&numOfRows=100&pageNo=1&year=2020&itemCode=PM10"
      )
      .then(
        (result) =>
          (filterdDistrict = result.data.filter(
            (item) =>
              item.districtName === chosenDistrics.firstChosenDistrict.name &&
              item.moveName === chosenDistrics.secondChosenDistrict.name
          ))
      );

    setSections({
      ...sections,
      section4: filterdDistrict,
    });
  };

  return (
    <div className="App">
      <Reset />
      <div>{sections.section4}</div>
      <form>
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
                name={item.subName}
                id={item.id}
                onClick={onClick}
              />
            ))}
          </Fieldset>
        </Div>
      </form>
    </div>
  );
};

export default App;
