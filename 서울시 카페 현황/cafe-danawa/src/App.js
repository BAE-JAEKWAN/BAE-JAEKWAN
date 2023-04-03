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
        <MapDiv
          style={{
            height: 400,
          }}
        >
          <NaverMap>
            <Marker defaultPosition={{ lat: 37.5666103, lng: 126.9783882 }} />
          </NaverMap>
        </MapDiv>
      </NavermapsProvider>
    </div>
  );
}

export default App;
