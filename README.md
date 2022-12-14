# 미세먼지 경보정보 서비스

미세먼지 경보 발령이 발생한 기록을 제공받는 공공API를 이용한 서비스 입니다<br/>
서버를 이용하지 않는 프로젝트이기 때문에 API 요청이 불필요한 데이터는 json 파일을 DB 로 이용하며 axios 로 요청해 사용합니다

따라서 각 지역 섹션은 사용자의 편의를 위해 직접 입력하는 방식보다는 공공API 문서 내부의 지역 항목을 모두 별도의 json 파일로 만들었고
지역 클릭시 해당 파일을 요청해 관련된 값을 Redux 를 사용한 전역 state 로 관리합니다.
<br/>
API는 버튼을 클릭해 최종 요청할 경우에만 이용합니다.

<br/>
state 관리 형식 :<br/>
action 의 type 은 상수로 선언한뒤 메서드를 이용해 dispatch 의 type 값으로 자동입력되며
상수를 직접 사용하지는 않습니다
<br/>
<br/>
ex )<br/>
const UPDATE_FINEDUST: string = "UPDATE/FINEDUST";
<br/>
<br/>
export const updateFineDust = (fineDust : FineDust) => ({<br/>
  type: UPDATE_FINEDUST,<br/>
  fineDust,<br/>
});
<br/>
<br/>
dispatch(updateFineDust(fineDust));
<br/>
<hr />
<br/>

### 사이트 소개

1. 사이트 접속시 기본 화면 입니다<br/>
useEffect 를 사용해 json 파일을 받아와 지역1 데이터만 화면에 출력합니다
<img src="https://user-images.githubusercontent.com/69440128/202608342-41cd27c1-6071-4f9f-a78b-7011ea54f959.JPG" />
<hr />

<br/>
2. 지역1 항목을 선택시 지역2 데이터 json 파일을 axios 로 요청해 화면에 출력하며<br/>
지역1에 선택한 항목 데이터 마다 출력되는 지역2, 지역3의 데이터는 서로 다릅니다
<img src="https://user-images.githubusercontent.com/69440128/202608345-fec42d63-75cf-44ab-ae01-634da456cd04.JPG" />
<hr />

<br/>
3. 지역3까지 데이터를 선택한뒤 확인하기 버튼을 누르면 각각의 지역 데이터를 저장한 state 를 이용해 최종 API 를 요청하고,<br/>
결과로 받은 데이터중 선택한 지역에 해당하는 데이터만 filter 를 이용해 쿼리한 뒤 상단 회색박스란에 출력합니다
<img src="https://user-images.githubusercontent.com/69440128/202608346-805a3285-71de-4600-aaba-cbbb78daa721.JPG" />
<hr />


<br/>
4. 최종 데이터 요청시 받아온 정보가 없을 경우에는 예외처리를 통해 화면에 데이터가 생성되지 않습니다
<img src="https://user-images.githubusercontent.com/69440128/202608348-0f783b09-c78b-41ce-91ba-2d2340cb7fdd.JPG" />
<hr />


<br/>
5. 지역을 모두 선택하지 않았는데 확인버튼을 누를 경우 alert 창으로 전송을 막습니다
<img src="https://user-images.githubusercontent.com/69440128/202608337-d3803248-e575-423e-a7af-4e8aa048f374.JPG" />
<br/>
<br/>

### 기능실행
1. 데이터가 있는경우
<img src="https://user-images.githubusercontent.com/69440128/202831264-e4047f7a-e22a-434a-a310-c0b47b9d0cdc.gif" />
<br/>
<br/>
2. 데이터가 없는경우
<img src="https://user-images.githubusercontent.com/69440128/202831267-1e92dcd4-9650-423f-866a-af3421f68815.gif" />

<hr />
<br/>

### 구현환경

OS : windows<br/>
라이브러리 : React, Typescript, Styled-Component, axios, Redux<br/>
사용한 공공 API : 에어코리아 미세먼지 경보정보 API     
