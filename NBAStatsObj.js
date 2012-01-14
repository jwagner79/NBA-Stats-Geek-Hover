
var NBAStats = function(playerId, gameId){
    this._playerId = playerId;
    this._gameId = gameId;
};

NBAStats.prototype.makePlayerDiv = function(playerInfo) {



};

NBAStats.prototype.setTeamName = function(teamName) {
	this.teamName = teamName;
};

NBAStats.prototype.onNbaTeam = function(arr) {
 var boxHtml = "";
 var data = arr[0];
 var obj = arr[1];
	
 var statsParser = new EspnNbaTeamParser(data);
 var teamStats = statsParser.parseNbaTeam();
 if (teamStats) {
	var teamName = obj.teamName;
	var boxHtml =
			"<table class='team' style='width: 100%;'>" +
			 "<tr><td style='vertical-align: top; align: center' colspan='2'><h2>" + teamStats.teamName + "</h2></td></tr>" +
			 "<tr><td style='vertical-align: middle; align: left;' nowrap>Overall: " + teamStats.record + "</td>" +
	         "<td style='vertical-align: top; align: right'><img src='" + teamStats.icon + "' width='60' height='60'></td>"
			"</tr></table>";

	if(document.getElementById("TEAMINFO_" + teamName))
		var infoDiv = document.getElementById("TEAMINFO_" + teamName);
	 else{
		var infoDiv = document.createElement("DIV");
		infoDiv.id = "TEAMINFO_" + teamName;
	 }
	 infoDiv.style.display="none";
	 infoDiv.innerHTML = boxHtml;
	 var body = document.getElementsByTagName('body') [0];
	 body.appendChild(infoDiv);
 }
	
};

NBAStats.prototype.onNbaProfile = function(arr){
 var boxHtml = "";
 var data = arr[0];
 var stats = arr[1];
 var parser = new EspnNbaPlayerParser(data);
 var player = parser.parseNbaPlayer();
 var playerInfo = player.getPlayerInfo();
 //console.log(player);


 this._playerId = stats._playerId;
 this._gameId = stats._gameId;

 //console.log("this._playerId = " + this._playerId);
 var statsParser = new EspnNbaBoxScoresParser(data, this._playerId);
 var season = statsParser.parseSeasonStats();
 var career = statsParser.parseCareerStats();
  if (playerInfo) {
    var boxHtml =
            "<table class='stats' width='100%' align='center'>" +
             "<thead><tr><th>Name</th><th>Age</th><th>Height</th><th>Weight</th><th>Experience</th><th>Salary</th></tr></thead>" +
             "<tbody></tbody><tr><td nowrap>" + playerInfo.name + "</td>" +
             "<td nowrap>" + playerInfo.age + "</td>" +
             "<td nowrap>" + playerInfo.height + "</td>" +
             "<td nowrap>" + playerInfo.weight +  "</td>"+
             "<td nowrap>" + playerInfo.experience +  " years</td>" +
             "<td>" + playerInfo.salary + "</td>" +
            "</tr></tbody></table>";

    if(document.getElementById("NBAINFO_" + this._playerId))
        var infoDiv = document.getElementById("NBAINFO_" + this._playerId);
     else{
        var infoDiv = document.createElement("DIV");
        infoDiv.id = "NBAINFO_" + this._playerId;
     }
     infoDiv.style.display="none";
     infoDiv.innerHTML = boxHtml;
     var body = document.getElementsByTagName('body') [0];
     body.appendChild(infoDiv);
 }

   // $(".playerProfileLink").SetBubblePopupInnerHtml(boxHtml, true);
    //$(".playerProfileLink").ShowBubblePopup();

};

NBAStats.prototype.onNbaStats = function(arr){
 var boxHtml = "";
 var data = arr[0];
 var stats = arr[1];
 var parser = new EspnNbaPlayerParser(data);
 var player = parser.parseNbaPlayer();

 //console.log(player);


 this._playerId = stats._playerId;
 this._gameId = stats._gameId;

 //console.log("this._playerId = " + this._playerId);
 var statsParser = new EspnNbaBoxScoresParser(data, this._playerId);
 var season = statsParser.parseSeasonStats();
 var career = statsParser.parseCareerStats();

 boxHtml = "<table class='stats' width='100%' align='center'><thead><tr>" +
              "<th>&nbsp;</th>" +
              "<th nowrap><b>G</b></th>" +
              "<th><b>MIN</b></th>" +
              "<th nowrap><b>FG %</b></th>" +
              "<th nowrap><b>3PT %</b></th>" +
              "<th nowrap><b>FT %</b></th>" +
              "<th> <b>REB</b> </th>" +
              "<th><b>AST</b></th>" +
              "<th><b>TO</b></th>" +
              "<th><b>PTS</b></th>" +
              "</tr></thead>";
 if (season){
     boxHtml +=
              "<tbody>" +
              "<tr>" +
              "<td>Season</td>" +
              "<td>" + season._games + "</td>" +
              "<td>" + season._min +"</td>" +
              "<td>" + season._fgpercent + "</td>" +
              "<td>" + season._threePointPercent + "</td>" +
              "<td>" + season._ftpercent + "</td>" +
              "<td>" + season._rpg + "</td>" +
              "<td>" + season._apg + "</td>" +
              "<td>" + season._to + "</td>" +
              "<td>" + season._ppg + "</td>" +
              "</tr>";
 }
 if (career){
    boxHtml +=
              "<tr><td>Career</td>" +
              "<td>" + career._games + "</td>" +
              "<td>" + career._min +"</td>" +
              "<td>" + career._fgpercent + "</td>" +
              "<td>" + career._threePointPercent + "</td>" +
              "<td>" + career._ftpercent + "</td>" +
              "<td>" + career._rpg + "</td>" +
              "<td>" + career._apg + "</td>" +
              "<td>" + career._to + "</td>" +
              "<td>" + career._ppg + "</td>" +
              "</tr>" +
             "</tbody></table>";
 }

    if(!career && !season)
        boxHtml = "";
     if(document.getElementById("STATS_" + this._playerId))
        var statsDiv = document.getElementById("STATS_" + this._playerId);
     else{
        var statsDiv = document.createElement("DIV");
        statsDiv.id = "STATS_" + this._playerId;
     }
     statsDiv.style.display="none";
     statsDiv.innerHTML = boxHtml;
     var body = document.getElementsByTagName('body') [0];
     body.appendChild(statsDiv);

   // $(".playerProfileLink").SetBubblePopupInnerHtml(boxHtml, true);
    //$(".playerProfileLink").ShowBubblePopup();

};

NBAStats.prototype.onEspnBoxScore = function(arr){
  var data = arr[0];
  var obj = arr[1];
  if (obj){
      this._playerId = obj._playerId;
      this._gameId = obj._gameId;
  }
  var boxHtml = "";
  if (data) {
      var parser = new EspnNbaBoxScoresParser(data, this._playerId);
      var stats = parser.parseNbaBoxScore();
      if (stats) {

       if (stats._gameTeams && stats._gameDate)
                boxHtml = "<b>" + stats._gameTeams + " - " + stats._gameDate + "</b>";
        boxHtml +=

              "<table class='stats' style='align: center;'><thead><tr>" +
              "<th><b>MIN</b></th>" +
              "<th nowrap> <b>FGM-A</b> </th>" +
              "<th nowrap> 3PM-A </th>" +
              "<th nowrap> <b>FTM-A</b> </th>" +
              "<th> <b>REB</b> </th>" +
              "<th><b>AST</b></th>" +
              "<th><b>STL</b></th>" +
              "<th><b>BLK</b></th>" +
              "<th><b>TO</b></th>"  +
              "<th><b>PF</b></th>" +
              "<th><b>+/-</b></th>" +
              "<th><b>PTS</b></th>" +
              "</tr></thead><tbody>" +
              "<tr>" +
              "<td>" + stats._min +"</td>" +
              "<td nowrap>" + stats._fgAttemptMake + "</td>" +
              "<td nowrap>" + stats._threePointAttemptMake + "</td>" +
              "<td nowrap>" + stats._ftAttemptMake + "</td>" +
              "<td>" + stats._rpg + "</td>" +
              "<td>" + stats._apg + "</td>" +
              "<td>" + stats._stl + "</td>" +
              "<td>" + stats._blk + "</td>" +
              "<td>" + stats._to + "</td>"  +
              "<td>" + stats._foul + "</td>" +
              "<td>" + stats._plus_minus  + "</td>" +
              "<td>" + stats._ppg + "</td>" +
              "</tr></tbody></table>";
      }
  }
     if(document.getElementById("PLAYER_" + this._playerId))
        var statsDiv = document.getElementById("PLAYER_" + this._playerId);
     else {
        var statsDiv = document.createElement("DIV");
        statsDiv.id = "PLAYER_" + this._playerId;
     }
    statsDiv.style.display="none";
    statsDiv.innerHTML = boxHtml;
    var body = document.getElementsByTagName('body') [0];
    body.appendChild(statsDiv);
};


NBAStats.prototype.fetchStats = function(obj){
    //console.log("fetching..." + obj);
	//var statsUrl = obj.href.replace("nba/player/_/id/", "nba/player/stats/_/id/");
    chrome.extension.sendRequest({'url': obj.href, 'obj' : this}, this.onNbaProfile);
	var statsUrl = obj.href.replace("nba/player/_/id/", "nba/player/stats/_/id/");
	if (obj.href.indexOf("nba/players/profile?playerId=") > 0) {
		statsUrl = obj.href.replace("nba/players/profile?playerId=", "nba/player/stats/_/id/");
		statsUrl = statsUrl.replace("scores.espn.go.com", "espn.go.com");
		
	}
	console.log("statsUrl = " + statsUrl);
	 chrome.extension.sendRequest({'url': statsUrl, 'obj' : this}, this.onNbaStats);
    if (this._gameId) {
        //console.log("playerId = " + this._playerId);
        //console.log("fetching..." + 'http://scores.espn.go.com/nba/boxscore?gameId=' + this._gameId);
        chrome.extension.sendRequest({'url': 'http://scores.espn.go.com/nba/boxscore?gameId=' + this._gameId,
        'obj' : this}, this.onEspnBoxScore);
    }else{
      this.onEspnBoxScore([null, this._playerId]);
    }
    //chrome.extension.sendRequest({'url': 'http://www.82games.com/1011/10ATL12.HTM', 'action' : 'fetch82Games'}, on82GamesProfile);

};


NBAStats.prototype.fetchBoxScore = function(obj){
    //console.log("fetching..." + obj);
    if (this._gameId) {
       // console.log("playerID = " + this._playerId);
        //console.log("fetching..." + 'http://scores.espn.go.com/nba/boxscore?gameId=' + this._gameId);
        chrome.extension.sendRequest({'url': 'http://scores.espn.go.com/nba/boxscore?gameId=' + this._gameId,
        'obj' : this}, this.onEspnBoxScore);
    }else{
      this.onEspnBoxScore([null, this._playerId]);
    }
    //chrome.extension.sendRequest({'url': 'http://www.82games.com/1011/10ATL12.HTM', 'action' : 'fetch82Games'}, on82GamesProfile);

};

NBAStats.prototype.fetchTeam = function(obj) {
	chrome.extension.sendRequest({'url': obj.href, 'obj' : this}, this.onNbaTeam);	
};