window.addEventListener('load', init);
var shopData = new Array();
var genreList = new Array();

async function init() {
    const store = new SteinStore(
        "https://api.steinhq.com/v1/storages/5efa0b1083c30d0425e2c586"
    );

    await store.read("test", { offset: 0 }).then(data => {
        shopData = data;
    });
    console.log("loaded");
}

// モーダルビュー内のリストをクリックした際の処理
function genreClickFunction() {
    $('#grumetModal li').click(function(){
        var data = $(this).text();
        extractionGenre(data)
    });
    return 0;
}

// カテゴリーごとに分ける
function separateCategory(data, category) {
    var categoryData = new Array();
    for (let i = 0; i < data.length; i++) {
        if (data[i]["category"] === category) {
            categoryData.push(data[i]);
        }
    }
    return categoryData;
}

// 重複しているジャンルを削除してモーダルウィンドウに追加
function removeGenreDuplication(data) {
    var genreData = new Array();
    var cloneData = Object.create(data);
    for (let i = 0; i < cloneData.length; i++) {
        var genreRow = cloneData[i]['genre'];
        var words = (String(genreRow)).split(',');
        for (let j = 0; j < words.length; j++) {
            genreData.push(words[j]);
        }
        data[i]['genre'] = words;
    }
    var genreList = Array.from(new Set(genreData));
    return genreList;
}

// ジャンルごとに抽出
function extractionGenre(genre) {
    let grumetClassify = shopData.filter(function(value) {
        for (let i = 0; i < value['genre'].length; i++) {
            if ((value["genre"][i] === genre) === true) {
                return true;
            }
        }
    });
    clickModalItem(grumetClassify);
    return grumetClassify;
}

function setGenreModal(category) {
    var categoryData = separateCategory(shopData, category);
    var grumetModal = document.getElementById('grumetModal');
    var liItem = '';
    var genreList = removeGenreDuplication(categoryData);
    for (let i = 0; i < genreList.length; i++) {
        liItem += '<li class="list-group-item">' + genreList[i] + '</li>';
    }
    grumetModal.innerHTML = liItem;
    genreClickFunction();
    return 0;
}

function clickModalItem(data) {
    var grumetModal = document.getElementById('grumetModal');
    var liItem = "";
    for (let i = 0; i < data.length; i++) {
        liItem += '<a href=' + data[i].url + '><li class="list-group-item">' + data[i].name + '</li>';
    }
    grumetModal.innerHTML = liItem;
    return 0;
}
