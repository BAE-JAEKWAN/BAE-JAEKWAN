import { useEffect, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  InfoWindow,
} from "react-naver-maps";
import "../App.css";

function Refactor() {
  const navermaps = useNavermaps(); //naver.maps 객체 생성
  const [localLat, setLocalLat] = useState(null); // 현재 위치 x좌표 초기값
  const [localLng, setLocalLng] = useState(null); // 현재 위치 y좌표 초기값
  useEffect(() => {
    // 현재위치 구하기
    const currentLocation = () => {
      navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);
      function succesCallback(position) {
        setLocalLat(position.coords.latitude);
        setLocalLng(position.coords.longitude);
        console.log("현재 위치 좌표", localLat, localLng);
      }
      function errorCallback(error) {
        console.log("현재 위치 좌표 불러오기 실패", error);
      }
    };

    // 초기 렌더링 시 지정된 좌표로 지도 이동

    // 위에 선언된 함수 순차적으로 실행
    async function runFunction() {
      await currentLocation();
    }
    runFunction();
  }, [localLat, localLng]);
  return (
    <div>
      <header>
        <h1>현재 위치 주변 카페 현황</h1>
      </header>
      <MapDiv style={{ width: "100%", height: "calc(100vh - 86px)" }}>
        <NaverMap
          defaultCenter={new navermaps.LatLng(localLat, localLng)}
          defaultZoom={15}
        ></NaverMap>
      </MapDiv>
    </div>
  );
}

export default Refactor;
