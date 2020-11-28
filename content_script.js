var idx = 1;
var playlist = [];
var currentScroll = 0;

window.addEventListener("load", init);
window.addEventListener("scroll", onScroll);

var panel = document.createElement("div");
var navBar = document.createElement("div");
var nav = document.createElement("span");
var listArea  = document.createElement("div");

function init() {
    panel.className = "panel visible";
    panel.style = `
    position: fixed;
    padding: 5px;
    right: 10px;
    bottom: 10px;
    z-index: 9999;
    background: rgb(252, 244, 220);
    border-style: groove; 
    border-width: 4px; 
    border-radius: 5px; 
    border-color: rgb(211, 139, 117);
    `;
    document.body.appendChild(panel);
    navBar.style = "text-align: center;";
    panel.appendChild(navBar);

    var prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.style = "padding: 5px 10px;"
    prevBtn.addEventListener("click", prev);
    navBar.appendChild(prevBtn);

    nav.innerHTML = `<span>${idx}/${playlist.length}</span>`;
    nav.style = "padding: 5px 10px; margin: 0 10px;";
    navBar.appendChild(nav);
    
    var moveBtn = document.createElement("button");
    moveBtn.textContent = "移動";
    moveBtn.style = "padding: 5px 10px; margin-right: 10px;";
    moveBtn.addEventListener("click", move);
    navBar.appendChild(moveBtn);

    var nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.style = "padding: 5px 10px;";
    nextBtn.addEventListener("click", next);
    navBar.appendChild(nextBtn);

    listArea.style = "padding: 5px; white-space: pre-wrap;";
    panel.appendChild(listArea);
    
    var clearBtn = document.createElement("button");
    clearBtn.style = "padding: 5px 10px;";
    clearBtn.textContent = "クリア";
    clearBtn.addEventListener("click", clearList);
    panel.appendChild(clearBtn);

    var target = document;
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if(mutation.type === "childList") {
            showButton();
        }
      });    
    });
    var config = { childList: true, subtree: true };
    observer.observe(target, config);
}


function showButton() {
    var elems = document.getElementsByClassName("css-1wfxbpx");

    for(var i=0;i<elems.length;i++) {
        var elem = elems[i];
        if(elem.getElementsByClassName("add-button").length > 0) continue; 

        var puzzle = elem.getElementsByTagName("a")[0];
        var link = puzzle.href;
        var puzzleName = puzzle.textContent;
        var btn = document.createElement("button");
        btn.style = "padding: 5px 10px";
        btn.className = "add-button"
        btn.textContent = "追加";
        
        btn.addEventListener("click", {puzzle: {name: puzzleName, url: link}, handleEvent: push});
        elem.appendChild(btn);
    }
}

function onScroll() {
    if(currentScroll > window.scrollY) {
        panel.className = "panel visible";
    } else {
        panel.className = "panel hidden";
    }

    currentScroll = window.scrollY;
}

function prev() {
    if(idx <= 1) {
        idx = 1;
        return;
    }
    idx = idx - 1;
    move();
    refreshListArea();
}

function next() {
    if(idx >= playlist.length) {
        idx = playlist.length;
        return;
    }
    idx = idx + 1;
    move();
    refreshListArea();
}

function move() {
    var a = listArea.getElementsByTagName("a")[idx - 1];
    if(!a) return;
    a.click();
}

function push() {
    playlist.push(this.puzzle);
    refreshListArea();
}

function clearList() {
    idx = 1;
    playlist = [];
    refreshListArea();
}

function refreshListArea() {
    nav.innerHTML = `<span>${idx}/${playlist.length}</span>`;
    listArea.innerHTML = "";
    for(var i=0;i<playlist.length;i++) {
        var puzzle = playlist[i];
        
        var d = document.createElement("div");
        d.innerHTML = `<span>${i===idx - 1?'◆':''}</span><a href="${puzzle.url}">${puzzle.name}</a>`;
        listArea.appendChild(d);
    }
}