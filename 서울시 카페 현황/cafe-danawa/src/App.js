import {
  NavermapsProvider,
  Container as MapDiv,
  NaverMap,
  Marker,
} from "react-naver-maps";

function App() {
  return (
    <div>
      <header>
        <h1>현위치 주변 카페 현황</h1>
      </header>

      <NavermapsProvider ncpClientId="p6cikodn76">
        <MapDiv style={{ width: "100%", height: "calc(100vh - 86px)" }}>
          <NaverMap
            defaultCenter={{ lat: 37.5666102, lng: 126.9783881 }} // 초기 중심 좌표
            defaultZoom={13} // 초기 줌 레벨
          >
            <Marker
              position={{ lat: 37.5666102, lng: 126.9783881 }} // 마커 좌표
            />
          </NaverMap>
        </MapDiv>
      </NavermapsProvider>
    </div>
  );
}

export default App;
