import "./App.css";
import { Reset } from "styled-reset";
import { useEffect, useState } from "react";
import axios from "axios";
import LabelInput from "./components/LabelInput";
import styled from "styled-components";

const Div = styled.div`
  width: 200px;
  height: 300px;
  background-color: #ededed;
  overflow-y: scroll;
  overflow-x: hidden;
  display: inline-block;
  margin: 0px 20px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    color: white;
    background-color: #96969666;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #22223c;
    border-radius: 15px;
  }
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
  const [firstDistricts, setFirstDistricts] = useState([]);
  const [chosenDistrics, setChosenDistrics] = useState({
    firstChosenDistrict: {
      index: undefined,
      name: undefined,
    },
    secondChosenDistrict: {
      index: undefined,
      name: undefined,
    },
    thirdChosenDistrict: {
      index: undefined,
      name: undefined,
    },
  });
  const [sections, setSections] = useState({
    section1: [],
    section2: [],
    section3: [],
  });

  const onClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .get(
          "https://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?serviceKey=XHdBPXDvwDyK51xmj8Onfl76PpmSE%2FWvQxPvMt6ZZPCWoJYOMney38kmg%2Bto%2Bxp%2F7IXlQjS%2FQLcmSnnh%2BnsTmw%3D%3D&returnType=json&numOfRows=100&pageNo=1&year=2020&itemCode=PM10"
        )
        .then((response) => {});
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("./firstDistricts.json");
      setSections({
        ...sections,
        section1: result.data,
      });
    }
    fetchData();
  }, []);

  //label 클릭시 id값을 state 에 저장한뒤 section1  map 돌려서 비교해서 배경색변경

  return (
    <div className="App">
      <Reset />
      <form>
        <Div>
          <fieldset>
            <Legend>지역1</Legend>
            {sections.section1.map((item, index) => (
              <LabelInput
                key={index}
                name={item.name}
                engName={item.engName}
                id={item.id}
              />
            ))}
          </fieldset>
        </Div>
        <Div>
          <fieldset>
            <Legend>지역2</Legend>
            {sections.section1.map((item, index) => (
              <LabelInput
                key={index}
                name={item.name}
                engName={item.engName}
                id={item.id}
              />
            ))}
          </fieldset>
        </Div>
        <Div>
          <fieldset>
            <Legend>지역3</Legend>
            {sections.section1.map((item, index) => (
              <LabelInput
                key={index}
                name={item.name}
                engName={item.engName}
                id={item.id}
              />
            ))}
          </fieldset>
        </Div>
        <button onClick={onClick}>요청</button>
      </form>
    </div>
  );
};

export default App;
