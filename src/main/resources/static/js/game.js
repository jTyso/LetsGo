
function loadUp() {
    paintTiles();
    loadCharactersOnBoard();
};

function paintTiles() {

    var pageUrl = window.location.href;
    var splitUrl = pageUrl.split("/");
    var gameIdSplit = splitUrl[5];
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/game/' + gameIdSplit,
        success: function (boardTileArray) {

            $.each(boardTileArray, function (index, boardTile) {
                if (boardTile.tileType === "GREEN") {
                    $('#t' + boardTile.boardTileId).css('background-color', 'greenyellow');
                } else if (boardTile.tileType === "BLUE") {
                    $('#t' + boardTile.boardTileId).css('background-color', 'blue');
                } else if (boardTile.tileType === "RED") {
                    $('#t' + boardTile.boardTileId).css('background-color', 'red');
                }
            });
        },
        error: function () {
            alert("FAILURE");
        }
    });
};

function loadCharactersOnBoard() {
    var pageUrl = window.location.href;
    var splitUrl = pageUrl.split("/");
    var gameIdSplit = splitUrl[5];
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/game/players/' + gameIdSplit,
        success: function (playerArray) {

            var div1 = "";
            var div2 = "";
            var div3 = "";
            var div4 = "";

            var p1Position;
            var p2Position;
            var p3Position;
            var p4Position;

            $.each(playerArray, function (index, player) {
                var playerTurn = player.playerTurn;
                var playerImage = player.imageUrl
                if (playerTurn === 1) {
                    p1Position = player.currentTile;
                    div1 = '<div id="player' + playerTurn + '" ><p>' + player.playerName + '</p>  <img id="player' + playerTurn + 'Image" src="' + playerImage + '"> </div>';
                } else if (playerTurn === 2) {
                    p2Position = player.currentTile;
                    div2 = '<div id="player' + playerTurn + '" ><p>' + player.playerName + '</p>  <img id="player' + playerTurn + 'Image" src="' + playerImage + '"> </div>';
                } else if (playerTurn === 3) {
                    p3Position = player.currentTile;
                    div3 = '<div id="player' + playerTurn + '" ><p>' + player.playerName + '</p>  <img id="player' + playerTurn + 'Image" src="' + playerImage + '"> </div>';
                } else if (playerTurn === 4) {
                    p4Position = player.currentTile;
                    div4 = '<div id="player' + playerTurn + '" ><p>' + player.playerName + '</p>  <img id="player' + playerTurn + 'Image" src="' + playerImage + '"> </div>';
                }
            });

            $('#t' + p4Position).append(div4);
            $('#t' + p3Position).append(div3);
            $('#t' + p2Position).append(div2);
            $('#t' + p1Position).append(div1);

        },
        error: function () {
            alert("FAILURE");
        }
    });
};



function highlightCurrentPlayer() {
    $('tr').css("background-color", "white");
    var playerTurn = $('#playerTurn').val() * 1;
    var p = $('p[data-playerTurn=' + playerTurn + ']');
    p.parent().parent().css("background-color", "red");
}

highlightCurrentPlayer();

$('#rollButton').on('click', function () {
    //Dice Roll
    var min = 1;
    var max = 4;
    var rollNumber = Math.floor(Math.random() * (+max - +min)) + +min;
    $('#rollNumber').text(rollNumber);
    //Grabbing whos turn it is and how many players there are for the game.
    var playerTurn = $('#playerTurn').val() * 1;
    var numPlayers = $('#numPlayers').val() * 1;

    //nextPlayer
    playerTurn++;
    if (playerTurn > numPlayers) {
        playerTurn = 1;
    }

    $('#playerTurn').val(playerTurn);
    highlightCurrentPlayer();

    return;
    var min = 1;
    var max = 4;
    var rollNumber = Math.floor(Math.random() * (+max - +min)) + +min;
    $('#rollNumber').text(rollNumber);
    $('#t' + playerPosition).css('background-color', 'lightblue');
    //var playerPositionStart = playerPosition;
    playerPosition += rollNumber;
    if (playerPosition > 12) {
        playerPosition = playerPosition - 12;
    }
    $('#t' + playerPosition).append($('#ghostDiv'));
    $('#t' + playerPosition).css({ 'background-color': 'lightgreen', 'transition': "background-color 2s ease" });
    $().empty
});
