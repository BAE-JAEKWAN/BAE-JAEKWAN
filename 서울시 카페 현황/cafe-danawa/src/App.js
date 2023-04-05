import { useState, useEffect } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  InfoWindow,
} from "react-naver-maps";
import "./App.css";

function App() {
  const navermaps = useNavermaps();
  const [map, setMap] = useState(null); // 지도 초기 위치 상태
  const [currentWindow, setCurrentWindow] = useState(null); // 정보창 상태
  const [localName, setLocalName] = useState(null); // 현재 위치 지역 이름
  const [localAddress, setLocalAddress] = useState(null); // 현재 위치 상세 주소

  const [selectedMarker, setSelectedMarker] = useState(null); // 카페 상세 정보창
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  useEffect(() => {
    console.log(selectedMarker);
    if (selectedMarker && selectedMarker.code) {
      const location = new navermaps.LatLng(...selectedMarker.code);
      const infoWindow = new navermaps.InfoWindow({
        content: `<div style="padding:5px">${selectedMarker.station}</div>`,
      });
      infoWindow.open(map, location);
    }
  }, [selectedMarker]);

  const cafeData = [
    { order: 11, station: "잠실새내", code: [37.511687, 127.086162] },
    { order: 23, station: "종합운동장", code: [37.510997, 127.073642] },
    { order: 1456, station: "삼성", code: [37.508844, 127.06316] },
    { order: 71, station: "선릉", code: [37.504503, 127.049008] },
    { order: 1341, station: "역삼", code: [37.500622, 127.036456] },
    { order: 65, station: "강남", code: [37.497175, 127.027926] },
    { order: 333, station: "교대", code: [37.493415, 127.01408] },
    { order: 575, station: "방배", code: [37.481426, 126.997596] },
    { order: 3, station: "사당", code: [37.47653, 126.981685] },
    { order: 578, station: "신대방", code: [37.487462, 126.913149] },
    {
      order: 976,
      station: "구로디지털단지",
      code: [37.485266, 126.901401],
    },
    { order: 1343, station: "신도림", code: [37.508725, 126.891295] },
    { order: 2345, station: "문래", code: [37.517933, 126.89476] },
  ];

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
    console.log("Coordinates: " + location.toString());
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
          defaultZoom={13} // 초기 줌 레벨
          disableKineticPan={false} // 관성 드래그
          ref={setMap}
        >
          {cafeData.map((el) => (
            <Marker
              key={el.order}
              position={new navermaps.LatLng(...el.code)}
              icon={{
                content: `<button class="markerBox"></button>`,
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
