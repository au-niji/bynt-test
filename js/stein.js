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
    return element
}

function setSteinItem(data) {
    var steinItem = document.getElementById("stein-item");
    for (let i = 0; i < data.length; i++) {
        var content =
            '<div class="stein-item"> \
                <a href=' + data[i].link + ' class="d-flex flex-row">\
                    <h3 class="p-2 bd-highlight">' + data[i].title + '</h3>\
                        <img style="width: 30%;" class="p-2 bd-highlight" src=' + data[i].image + '>\
                </a>\
            </div>'
        steinItem.innerHTML += content;
    }
}

