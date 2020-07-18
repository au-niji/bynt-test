function markerEvent(i) {
    marker[i].addListener('click', function() { // マーカーをクリックしたとき
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
    });
}

async function setSpecialContets(data) {
    var specitalContainer = document.getElementById("stein-item");
    for (let i = 0; i < data.length; i++) {
        var content =
            '<div class="col-lg-6 col-xl-4 stein-item"> \
                <a href=' + data[i].link + ' class="d-flex flex-row">\
                    <p class="day">' + data[i].day + '</p>\
                    <h3 class="p-2 bd-highlight shop-name">' + data[i].title + '</h3>\
                    <img class="p-2 bd-highlight img-fluid" src=' + data[i].image + '>\
                </a>\
            </div>'
        specitalContainer.innerHTML += content;
    }
}
// DBから特集用のデータを取得
// DBからGoogle Map用のデータを取得
async function readSpreadSheetMapData() {
    const store = new SteinStore(
        "https://api.steinhq.com/v1/storages/5efa0b1083c30d0425e2c586"
    );
    var element = new Array();
    await store.read("test", { limit: 100, offset: 0 }).then(data => {
        for (let i = 0; i < data.length; i++) {
            element.push(data[i]);
        }
    });
    store.read("special", { limit: 100, offset: 0 }).then(data => {
        var specialData = new Array();
        for (let i = 0; i < data.length; i++) {
                specialData.push(data[i]);
        }
        setSpecialContets(specialData);
    });
    return element
}
var map;
var marker = [];
var infoWindow = [];
// マーカーを設置
async function initMap() {
    let data = await readSpreadSheetMapData();
        // 緯度・経度を変数に格納
        // var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapLatLng = new google.maps.LatLng(35.7295, 139.7109);
        // マップオプションを変数に格納
        var mapOptions = {
            zoom : 15,          // 拡大倍率
            center : mapLatLng  // 緯度・経度
        };
        // マップオブジェクト作成
        var map = new google.maps.Map(
            document.getElementById("map"), // マップを表示する要素
            mapOptions         // マップオプション
        );
        //マーカーを配置するループ
        for (i = 0; i < data.length; i++) {
            marker[i] = new google.maps.Marker({
                position: new google.maps.LatLng(data[i].lat, data[i].lng),
                map: map
            });
            infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
                content: "<a href=" + data[i].url + ">" + data[i].name + "</a>" // 吹き出しに表示する内容
            });
            markerEvent(i);
        }

// if (navigator.geolocation) {
// // 現在地を取得
// navigator.geolocation.getCurrentPosition(
//     // 取得成功した場合
//     function(position) {
//         // 緯度・経度を変数に格納
//         // var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//         var mapLatLng = new google.maps.LatLng(35.7295, 139.7109);
//         // マップオプションを変数に格納
//         var mapOptions = {
//             zoom : 15,          // 拡大倍率
//             center : mapLatLng  // 緯度・経度
//         };
//         // マップオブジェクト作成
//         var map = new google.maps.Map(
//             document.getElementById("map"), // マップを表示する要素
//             mapOptions         // マップオプション
//         );
//         //マーカーを配置するループ
//         for (i = 0; i < data.length; i++) {
//             marker[i] = new google.maps.Marker({
//                 position: new google.maps.LatLng(data[i].lat, data[i].lng),
//                 map: map
//             });
//             infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
//                 content: "<a href=" + data[i].url + ">" + data[i].name + "</a>" // 吹き出しに表示する内容
//             });
//             markerEvent(i);
//         }
//         },
//     // 取得失敗した場合
//     function(error) {
//     // エラーメッセージを表示
//         switch(error.code) {
//             case 1: // PERMISSION_DENIED
//             alert("位置情報の利用が許可されていません");
//             break;
//             case 2: // POSITION_UNAVAILABLE
//             alert("現在位置が取得できませんでした");
//             break;
//             case 3: // TIMEOUT
//             alert("タイムアウトになりました");
//             break;
//             default:
//             alert("その他のエラー(エラーコード:"+error.code+")");
//             break;
//         }
//     }
// );
// // Geolocation APIに対応していない
// } else {
//     alert("この端末では位置情報が取得できません");
// }
}
