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
    document.body.appendChild(panel);
    navBar.style = "text-align: center;";
    panel.appendChild(navBar);

    var prevBtn = document.createElement("button");
    prevBtn.className = "btn";
    prevBtn.textContent = "<";
    prevBtn.addEventListener("click", prev);
    navBar.appendChild(prevBtn);

    nav.innerHTML = `<span>${idx}/${playlist.length}</span>`;
    navBar.appendChild(nav);
    
    var moveBtn = document.createElement("button");
    moveBtn.className = "btn";
    moveBtn.textContent = "移動";
    moveBtn.addEventListener("click", move);
    navBar.appendChild(moveBtn);

    var nextBtn = document.createElement("button");
    nextBtn.className = "btn";
    nextBtn.textContent = ">";
    nextBtn.addEventListener("click", next);
    navBar.appendChild(nextBtn);

    listArea.style = "padding: 5px; white-space: pre-wrap;";
    panel.appendChild(listArea);
    
    var clearBtn = document.createElement("button");
    clearBtn.className = "btn";
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
        btn.className = "btn"
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