const API_KEY = "4878467965626a6b34355851476d4e";
// await를 쓰려면 async를 선언해줘야 함.
const getData = async (curentLat, curentLng, localName) => {
  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/GetParkInfo/1/10/${localName}`;
  //   console.log(url);

  // await를 쓰는 이유 : url을 받을 때까지 기다려줘라!
  const response = await fetch(url);
  const data = await response.json();
  const markerLocation = data.GetParkInfo.row.map((el) => [
    {
      name: el.PARKING_NAME,
      addr: el.ADDR,
      type: el.PARKING_TYPE_NM,
      pay: el.PAY_NM,
      lat: el.LAT,
      lng: el.LNG,
    },
  ]);
  //   console.log(markerLocation);

  // 위 로직으로부터 전달 받은 마커 좌표, 현재 위치 좌표를 drawMap 함수로 전달한다.
  drawMap(markerLocation, curentLat, curentLng);
};

// 현재 위치 구하기
const currentLocation = (curentLat, curentLng) => {
  naver.maps.Service.reverseGeocode(
    {
      location: new naver.maps.LatLng(curentLat, curentLng),
    },
    function (status, response) {
      if (status !== naver.maps.Service.Status.OK) {
        return alert("Something wrong!");
      }

      var result = response.result, // 검색 결과의 컨테이너
        items = result.items; // 검색 결과의 배열
      localName = items[0].addrdetail.sigugun;
      // do Something
      getData(curentLat, curentLng, localName);
    }
  );
};
navigator.geolocation.getCurrentPosition(function (pos) {
  currentLocation(pos.coords.latitude, pos.coords.longitude);
});

const drawMap = (markerLocation, curentLat, curentLng) => {
  const map = new naver.maps.Map(document.getElementById("map"), {
    // 지도 option 설정
    center: new naver.maps.LatLng(curentLat, curentLng),
    zoom: 13,
  });
  markerLocation.forEach((el) => {
    // console.log(el[0].name, el[0].lat, el[0].lng);
    const location = new naver.maps.LatLng(el[0].lat, el[0].lng);
    const markerOptions = {
      position: location,
      map: map,
      icon: {
        url: "img/marker.svg",
        size: new naver.maps.Size(50, 50),
        scaledSize: new naver.maps.Size(50, 50),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 25),
      },
    };
    const marker = new naver.maps.Marker(markerOptions);
  });
};
