var marksForBombs = 20;
var goodCells = 108;
window.onload = function createGame() {
    document.getElementById("marksForBombs").innerHTML = "<h3>" + marksForBombs + "</h3>";
    for (var i = 1; i <= 8; ++i) {
        var createLine = document.createElement('tr');
        document.getElementById("grid").appendChild(createLine);
        for (var j = 1; j <= 16; ++j) {
            var createCol = document.createElement('td');
            createCol.setAttribute("id", i + "" + j);
            createCol.setAttribute("class", "unpressedBtn");
            createCol.setAttribute("onclick", "checkPosition(this.id)");
            createCol.setAttribute("oncontextmenu", "flagThis(this.id)");
            createCol.textContent = 0;
            createLine.appendChild(createCol);
        }
    }
    spawnBombs();
}

function spawnBombs() {
    for (var i = 1; i <= 20; ++i) {
        var line = Math.floor(Math.random() * 8) + 1;
        var column = Math.floor(Math.random() * 16) + 1;
        var spawnBombHere = document.getElementById(line + "" + column);
        if (spawnBombHere.innerText != "B") {
            spawnBombHere.innerText = "B";
            markCloseCells(line, column);
        } else {
            --i;
        }
    }
}

function markCloseCells(line, column) {
    for (var i = -1; i < 2; ++i) {
        for (var j = -1; j < 2; ++j) {
            if ((line + i > 0 && line + i <= 8) && (column + j > 0 && column + j <= 16)) {
                var markThisCell = document.getElementById((line + i) + "" + (column + j));
                if (markThisCell.innerText != "B") {
                    ++markThisCell.innerText;
                }
            }
        }
    }
}

function checkPosition(btnId) {
    var clickedBtn = document.getElementById(btnId);
    var btnIdCopy = btnId, countDigits = 0;
    var line = 0, column = 0;
    while (btnIdCopy > 0) {
        ++countDigits;
        btnIdCopy /= 10;
        btnIdCopy = Math.floor(btnIdCopy);
    }
    if (countDigits == 3) {
        line = btnId / 100;
        line = Math.floor(line);
        column = btnId % 100;
    } else if (countDigits == 2) {
        line = btnId / 10;
        line = Math.floor(line);
        column = btnId % 10;
    }
    if (clickedBtn.className == "unpressedBtn" && clickedBtn.innerHTML != "B") {
        clickedBtn.setAttribute("class", "pressedBtn");
        --goodCells;
        if (document.getElementById(line + "" + column).innerHTML == 0) {
            uncoverCloseCells(line, column);
        }
        checkWin();
    } else if (clickedBtn.innerHTML == "B") {
        clickedBtn.setAttribute("class", "bomb");
        document.getElementById("gameStatus").innerHTML = "<h3> You lost ! </h3>";
        printAllCells();
        restartGame();
    }
}

function uncoverCloseCells(line, column) {
    for (var i = line; i <= 8; ++i) {
        var checkLine = document.getElementById(i + "" + column);
        if (checkLine.innerHTML >= 0 && checkLine.className == "unpressedBtn") {
            checkLine.setAttribute("class", "pressedBtn");
            --goodCells;
            if (checkLine.innerHTML > 0) {
                break;
            }
        } else if (checkLine.innerHTML == "B" || (checkLine.className == "pressedBtn" && i > line)) {
            break;
        }
        for (var j = column + 1; j <= 16; ++j) {
            var checkCol = document.getElementById(i + "" + j);
            if (checkCol.innerHTML >= 0 && checkCol.className == "unpressedBtn") {
                checkCol.setAttribute("class", "pressedBtn");
                --goodCells;
                if (checkCol.innerHTML > 0) {
                    break;
                }
            } else {
                break;
            }
        }
        for (var j = column - 1; j > 0; --j) {
            var checkCol = document.getElementById(i + "" + j);
            if (checkCol.innerHTML >= 0 && checkCol.className == "unpressedBtn") {
                checkCol.setAttribute("class", "pressedBtn");
                --goodCells;
                if (checkCol.innerHTML > 0) {
                    break;
                }
            } else {
                break;
            }
        }
    }
    for (var i = line; i > 0; --i) {
        var checkLine = document.getElementById(i + "" + column);
        if (checkLine.innerHTML >= 0 && checkLine.className == "unpressedBtn") {
            checkLine.setAttribute("class", "pressedBtn");
            --goodCells;
            if (checkLine.innerHTML > 0) {
                break;
            }
        } else if (checkLine.innerHTML == "B" || (checkLine.className == "pressedBtn" && i > line)) {
            break;
        }
        for (var j = column + 1; j <= 16; ++j) {
            var checkCol = document.getElementById(i + "" + j);
            if (checkCol.innerHTML >= 0 && checkCol.className == "unpressedBtn") {
                checkCol.setAttribute("class", "pressedBtn");
                --goodCells;
                if (checkCol.innerHTML > 0) {
                    break;
                }
            } else {
                break;
            }
        }
        for (var j = column - 1; j > 0; --j) {
            var checkCol = document.getElementById(i + "" + j);
            if (checkCol.innerHTML >= 0 && checkCol.className == "unpressedBtn") {
                checkCol.setAttribute("class", "pressedBtn");
                --goodCells;
                if (checkCol.innerHTML > 0) {
                    break;
                }
            } else {
                break;
            }
        }
    }
}

function flagThis(btnId) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    var clickedBtn = document.getElementById(btnId);
    if (clickedBtn.className == "unpressedBtn") {
        --marksForBombs;
        clickedBtn.className = "flaggedBtn";
    } else if (clickedBtn.className == "flaggedBtn") {
        ++marksForBombs;
        clickedBtn.className = "unpressedBtn";
    }
    document.getElementById("marksForBombs").innerHTML = "<h3>" + marksForBombs + "</h3>";
}

function printAllCells() {
    for (var i = 1; i <= 8; ++i) {
        for (var j = 1; j <= 16; ++j) {
            var cell = document.getElementById(i + "" + j);
            if (cell.innerHTML == "B") {
                cell.setAttribute("class", "bomb");
            } else {
                cell.setAttribute("class", "pressedBtn");
            }
        }
    }
}

function checkWin() {
    if (goodCells == 0) {
        document.getElementById("gameStatus").innerHTML = "<h2> You win ! </h2>";
        restartGame();
    }
}

function restartGame() {
    setTimeout(function() {location.reload()}, 3000);
}