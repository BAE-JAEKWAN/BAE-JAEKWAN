# Promise의 3가지 상태(state)

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

## Pending(대기)

먼저 아래와 같이 new Promise() 메서드를 호출하면 대기(Pending) 상태가 됨.

```js
function getData() {
  return new Promise();
}
```

new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 resolve, reject.

```js
function getData() {
  new Promise(function (resolve, reject) {
    // ...
  });
}
```

## Fulfilled(이행)

콜백 함수의 인자 resolve를 아래와 같이 실행하면 이행(Fulfilled) 상태.

```js
function getData() {
  new Promise(function (resolve, reject) {
    resolve();
  });
}
```

그리고 이행 상태일 때, 아래와 같이 then()을 이용하여 처리 결과 값을 받을 수 있음.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function (resolvedData) {
  console.log(resolvedData); // 100
});
```

> ※ 프로미스의 '이행' 상태를 다르게 표현해보면 '완료'.

## Rejected(실패)

reject를 아래와 같이 호출하면 실패(Rejected) 상태가 됨.

```js
function getData() {
  new Promise(function (resolve, reject) {
    resolve();
  });
}
```

그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 catch()로 받을 수 있음.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData()
  .then()
  .catch(function (err) {
    console.log(err); // Error: Request is failed
  });
```

# 프로미스 코드 - 기초

ajax 기본 예제

```js
function getData(callbackFunc) {
  $.get("url 주소/products/1", function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

위 코드를 Promise로 변환하면...

```js
function getData(callbackFunc) {
  return new Promise(function (resolve, reject) {
    $.get("url 주소/products/1", function (response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
    reject(new Error("Request is failed"));
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData()
  .then(function (tableData) {
    // resolve()의 결과 값이 여기로 전달됨
    console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
  })
  .catch(function (err) {
    console.log(err);
  });
```
