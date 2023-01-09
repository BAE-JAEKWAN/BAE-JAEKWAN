const API_KEY = "4878467965626a6b34355851476d4e";
// await를 쓰려면 async를 선언해줘야 함.
(getData = async () => {
  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/GetParkInfo/1/10/`;
  // await를 쓰는 이유 : url을 받을 때까지 기다려줘라!
  const response = await fetch(url);
  const data = await response.json();
  const markerLocation = data.GetParkInfo.row.map((el, i) => [
    {
      index: i,
      name: el.PARKING_NAME,
      addr: el.ADDR,
      type: el.PARKING_TYPE_NM,
      pay: el.PAY_NM,
      lat: el.LAT,
      lng: el.LNG,
    },
  ]);
  //   console.log(markerLocation);
  drawMap(markerLocation);
})();

const drawMap = (markerLocation) => {
  const mapDiv = document.getElementById("map");
  const mapLocation = new naver.maps.LatLng(37.3595704, 127.105399);
  const mapOption = {
    // 지도 option 설정
    center: mapLocation,
  };
  const map = new naver.maps.Map(mapDiv, mapOption);
  const HOME_PATH = window.HOME_PATH || "";
  markerLocation.forEach((el) => {
    // console.log(el[0].name, el[0].lat, el[0].lng);
    const location = new naver.maps.LatLng(el[0].lat, el[0].lng);
    const markerOptions = {
      position: location,
      map: map,
      icon: {
        url: HOME_PATH + "img/marker.svg",
        size: new naver.maps.Size(50, 50),
        scaledSize: new naver.maps.Size(50, 50),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 25),
      },
    };
    const marker = new naver.maps.Marker(markerOptions);
  });
};
