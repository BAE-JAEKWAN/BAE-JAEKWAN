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
  const [currentWindow, setCurrentWindow] = useState(null); // 현재 위치 정보창
  const [currentLocalName, setLocalName] = useState(null); // 현재 위치 지역 이름
  const [currentLocalAddress, setLocalAddress] = useState(null); // 현재 위치 상세 주소

  const funcCurrentLocation = () => {
    console.log("현재 위치 좌표 구하기 실행");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 위치 정보 가져오기 성공
        setLocalLat(position.coords.latitude);
        setLocalLng(position.coords.longitude);
        console.log("현재 위치 좌표", localLat, localLng);
        funcCurrentAddress(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        // 위치 정보 가져오기 실패
        console.log("현재 위치 좌표 불러오기 실패", error);
      }
    );
  };

  // 현재 위치 지역명 구하기
  const funcCurrentAddress = (lat, lng) => {
    console.log("현재 위치 주소 구하기 실행", lat, lng);
    navermaps.Service.reverseGeocode(
      {
        location: new navermaps.LatLng(lat, lng),
      },
      function (status, response) {
        if (status !== navermaps.Service.Status.OK) {
          return alert("reverseGeocode 실행 오류!");
        }
        console.log(
          "현재 위치 주소",
          response.result.items[0].addrdetail.sigugun,
          response.result.items[0].address
        );
        setLocalName(response.result.items[0].addrdetail.sigugun);
        setLocalAddress(response.result.items[0].address);
      }
    );
  };

  // const funcCurrentWindow = () => {
  //   currentWindow.setContent(
  //     `<div style="padding:10px;">현재 위치 : ${localAddress}</div>`
  //   );
  //   currentWindow.open(map, location);
  // }

  useEffect(() => {
    funcCurrentLocation();
  }, [localLat, localLng]);

  return (
    <div>
      <header>
        <h1>현재 위치 주변 카페 현황</h1>
      </header>
      <MapDiv style={{ width: "100%", height: "calc(100vh - 86px)" }}>
        {/* 초기 렌더링 시 현재 위치 좌표가 계산되면 지도 렌더링 */}
        {localLat && localLng && (
          <NaverMap
            defaultCenter={new navermaps.LatLng(localLat, localLng)}
            defaultZoom={15}
          >
            <Marker defaultPosition={{ lat: localLat, lng: localLng }} />
            <InfoWindow ref={setCurrentWindow} />
          </NaverMap>
        )}
      </MapDiv>
    </div>
  );
}

export default Refactor;
