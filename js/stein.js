window.addEventListener('load', init);
function init() {
    const store = new SteinStore(
        "https://api.steinhq.com/v1/storages/5efa0b1083c30d0425e2c586"
    );
    var element = new Array();

    store.read("news").then(data => {
        var loadData = new Array();
        for (let i = 0; i < data.length; i++) {
            loadData.push(data[i]);
        }
        setSteinItem(loadData);
    });
    return 0;
}

function setSteinItem(data) {
    var steinItem = document.getElementById("stein-item");
    console.log(steinItem)
    for (let i = 0; i < data.length; i++) {
        var content =
            '<div class="col-lg-6 col-xl-4 stein-item"> \
                <a href=' + data[i].link + ' class="d-flex flex-row">\
                    <p class="day">' + data[i].day + '</p>\
                    <p class="p-2 bd-highlight shop-name">' + data[i].title + '</p>\
                    <img class="p-2 bd-highlight img-fluid" src=' + data[i].image + '>\
                </a>\
            </div>'
        steinItem.innerHTML += content;
    }
}
