import { useState, useEffect } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  InfoWindow,
} from "react-naver-maps";
import "./App.css";
import axios from "axios";

function App() {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null); // 지도 초기 위치 상태
  const [currentWindow, setCurrentWindow] = useState(null); // 정보창 상태
  const [localName, setLocalName] = useState(null); // 현재 위치 지역 이름
  const [localAddress, setLocalAddress] = useState(null); // 현재 위치 상세 주소

  const [cafeData, setCafeData] = useState([]);
  const params = {
    category_group_code: "CE7", //카페 카테고리 코드
    radius: 200, // 반경 설정
    x: 127.05327728385645,
    y: 37.54480274987832,
  };
  const headers = {
    Authorization: "KakaoAK 36bc1dfae15cdd50ef0fca451fbecbbd",
  };

  useEffect(() => {
    axios
      .get("https://dapi.kakao.com/v2/local/search/category.json", {
        params,
        headers,
      })
      .then((response) => {
        // console.log(location);
        setCafeData(response.data.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(cafeData);
    cafeData.map((el, index) => {
      console.log(parseFloat(el.x), parseFloat(el.y));
    });
  }, [cafeData]);

  // 마커 클릭 시 카페 상세 정보창 노출
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  useEffect(() => {
    console.log(selectedMarker);
    if (selectedMarker) {
      const location = new navermaps.LatLng(
        parseFloat(selectedMarker.y),
        parseFloat(selectedMarker.x)
      );
      const infoWindow = new navermaps.InfoWindow({
        content: `
        <div class="cafeInfoWindow">
          <p>${selectedMarker.place_name}</p>
          <p>${selectedMarker.address_name}</p>
          <p>${selectedMarker.phone}</p>
        </div>
        `,
      });
      infoWindow.open(map, location);
    }
  }, [selectedMarker]);

  const currentLocation = (location) => {
    // 현재 위치 지역명 구하기
    navermaps.Service.reverseGeocode(
      {
        location: location,
      },
      function (status, response) {
        if (status !== navermaps.Service.Status.OK) {
          return alert("Something wrong!");
        }

        setLocalName(response.result.items[0].addrdetail.sigugun);
        setLocalAddress(response.result.items[0].address);
      }
    );
  };

  function onSuccessGeolocation(position) {
    // if (!map || !currentWindow) return;

    const location = new navermaps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    currentLocation(location); // 현재 지역 좌표값을 currentLocation 함수에 인자로 전달
    map.setCenter(location);
    // map.setZoom(10);
    currentWindow.setContent(
      `<div style="padding:10px;">현재 위치 : ${localAddress}</div>`
    );
    currentWindow.open(map, location);
    console.log("현재위치: " + location.toString());
  }

  function onErrorGeolocation() {
    if (!map || !currentWindow) return;

    const center = map.getCenter();
    currentWindow.setContent(
      '<div style="padding:20px;">' +
        '<h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>' +
        "latitude: " +
        center.lat() +
        "<br />longitude: " +
        center.lng() +
        "</div>"
    );
    currentWindow.open(map, center);
  }

  useEffect(() => {
    if (!map || !currentWindow) {
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeolocation,
        onErrorGeolocation
      );
    } else {
      var center = map.getCenter();
      currentWindow.setContent(
        '<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>'
      );
      currentWindow.open(map, center);
    }
  }, [map, currentWindow, localName]);

  return (
    <div>
      <header>
        <h1>현재 위치 주변 카페 현황</h1>
      </header>

      <MapDiv style={{ width: "100%", height: "calc(100vh - 86px)" }}>
        <NaverMap
          defaultCenter={{ lat: 37.5666102, lng: 126.9783881 }} // 초기 중심 좌표
          defaultZoom={17} // 초기 줌 레벨
          disableKineticPan={false} // 관성 드래그
          ref={setMap}
        >
          {cafeData.map((el, index) => (
            <Marker
              key={index}
              position={
                new navermaps.LatLng(parseFloat(el.y), parseFloat(el.x))
              }
              icon={{
                content: `<button class="markerBox" title="${el.place_name}"></button>`,
              }}
              onClick={() => {
                handleMarkerClick(el);
              }}
            />
          ))}
          {selectedMarker && <InfoWindow ref={setSelectedMarker} />}

          <InfoWindow ref={setCurrentWindow} />
        </NaverMap>
      </MapDiv>
    </div>
  );
}

export default App;
