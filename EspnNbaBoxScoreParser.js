
EspnNbaBoxScoresParser = function(html, playerId){
 this._html = html;
 this._playerId = playerId;
 this.htmlObj = $(html);
};

EspnNbaBoxScoresParser.STARTERS = "STARTERS";
EspnNbaBoxScoresParser.START = '<a href="/nba/players/profile?playerId=';
EspnNbaBoxScoresParser.END = '<a href="/nba/players/profile?playerId=';
EspnNbaBoxScoresParser.START_NEW = '<a href="http://espn.go.com/nba/player/_/id/';
EspnNbaBoxScoresParser.SEASON_START = "Season</td>";
EspnNbaBoxScoresParser.CAREER_START = "Career</td>";

EspnNbaBoxScoresParser.getCurrentSeason = function() {
	var date = new Date();
	var year = date.getYear() - 100;
	var month = date.getMonth() + 1;
	var startYear = 0;
	var endYear =  1;
	if (month > 8 && month <= 12) {
		startYear = year;
		endYear = year + 1;
	}
	else {
		startYear = year -1;
		endYear = year;
	}
		
	if (startYear < 10)
		startYear = "0" + startYear;
	
	if (endYear < 10)
		endYear = "0" + endYear;
	return "'" + startYear + "-'" + endYear;
};

EspnNbaBoxScoresParser.prototype.parseNbaBoxScore = function(){
   this._lineHtml = this.getLineHtml();
   if (this._lineHtml)
    return this.parseGameStats();
   else
    return null;
};

EspnNbaBoxScoresParser.prototype.getLineHtml = function(){

 var html = this._html;
 var skipToScores = html.indexOf(EspnNbaBoxScoresParser.STARTERS);
 if (skipToScores > 0) {
	 html = html.substring(skipToScores);
 }
 var start = EspnNbaBoxScoresParser.START + this._playerId + '\">';
 var startPos = html.indexOf(start);
 if (startPos < 0) {
	 start  = EspnNbaBoxScoresParser.START_NEW + this._playerId;
	 console.log(start);
	 startPos = html.indexOf(start);
	 console.log(startPos);
	 if (startPos < 0) {
		 return null;  //player is not on page
	 }
 }

 var tmpHtml = html.substring(startPos + start.length);
 var end = "</tr><tr";
 var endPos = tmpHtml.indexOf(end);
 var lineHtml = tmpHtml.substring(0, endPos);
 //console.log(lineHtml);
 return lineHtml;
};

EspnNbaBoxScoresParser.prototype.getSeasonLineHtml = function(){
  var start = EspnNbaBoxScoresParser.getCurrentSeason() + "</td>";
	console.log("currentSeason = " + start);
  var startPos = this._html.indexOf(start);
  if (startPos < 0)
    return null;
  var tmpHtml = this._html.substring(startPos + start.length);
  var end = "</td></tr>";
  var endPos = tmpHtml.indexOf(end);
  var lineHtml = tmpHtml.substring(0, endPos);
  //console.log(lineHtml);
  return lineHtml;
};

EspnNbaBoxScoresParser.prototype.getCareerLineHtml = function(){
  var start = EspnNbaBoxScoresParser.CAREER_START;
  var startPos = this._html.indexOf(start);
  if (startPos < 0)
    return null;
  var tmpHtml = this._html.substring(startPos + start.length);
  var end = "</td></tr>";
  var endPos = tmpHtml.indexOf(end);
  var lineHtml = tmpHtml.substring(0, endPos);
  //console.log(lineHtml);
  return lineHtml;
};

EspnNbaBoxScoresParser.prototype.parseSeasonStats = function(){
  var stats = new NbaPlayerStats();
  this._seasonLineHtml = this.getSeasonLineHtml();
  if (!this._seasonLineHtml)
    return null;
  var seasonStats = this._seasonLineHtml.replace(/<\/td>/g, ";");
  seasonStats = seasonStats.replace(/<td style="text-align:right;">/g,"");
  seasonStats = seasonStats.replace(/<td>/g,"");
  var statsArr = seasonStats.split(";");
  stats.setGames(statsArr[1]);
  stats.setMin(statsArr[3]);
  stats.setFGAttemptsMake(statsArr[4]);
  stats.setFGPercent(statsArr[5]);
  stats.set3PtAttemptMake(statsArr[6]);
  stats.set3PTPercent(statsArr[7]);
  stats.setFTAttemptMake(statsArr[8]);
  stats.setFTPercent(statsArr[9]);
  stats.setRPG(statsArr[12]);
  stats.setStl(statsArr[15]);
  stats.setBlk(statsArr[14]);
  stats.setTO(statsArr[17]);
  stats.setFoul(statsArr[16]);
  stats.setAPG(statsArr[13]);
  stats.setPPG(statsArr[18]);
  console.log(stats);
  return stats;
};

EspnNbaBoxScoresParser.prototype.parseCareerStats = function(){
  var stats = new NbaPlayerStats();
  this._careerLineHtml = this.getCareerLineHtml();
  if (!this._careerLineHtml)
    return null;
  var careerStats = this._careerLineHtml.replace(/<\/td><td style="text-align:right;">/g, ";");
  careerStats = careerStats.replace("<td style=\"text-align:right;\">","");

  var statsArr = careerStats.split(";");
  if (statsArr.length > 15) {
	  //handle retired player
	  return this.parseRetiredCareerStats(careerStats);
  }
  stats.setGames(statsArr[0]);
  stats.setMin(statsArr[1]);
  stats.setFGAttemptsMake(statsArr[2]);
  stats.setFGPercent(statsArr[3]);
  stats.set3PtAttemptMake(statsArr[4]);
  stats.set3PTPercent(statsArr[5]);
  stats.setFTAttemptMake(statsArr[6]);
  stats.setFTPercent(statsArr[7]);
  stats.setRPG(statsArr[8]);
  stats.setStl(statsArr[11]);
  stats.setBlk(statsArr[10]);
  stats.setTO(statsArr[13]);
  stats.setFoul(statsArr[12]);
  stats.setAPG(statsArr[9]);
  stats.setPPG(statsArr[14]);
  console.log(stats);
  return stats;
};

EspnNbaBoxScoresParser.prototype.parseRetiredCareerStats = function(careerStats){
var stats = new NbaPlayerStats();
careerStats = careerStats.replace(/<\/td>/g, ";");
careerStats = careerStats.replace(/<td>/g, "");
 var statsArr = careerStats.split(";");
  stats.setGames(statsArr[0]);
  stats.setMin(statsArr[2]);
  stats.setFGAttemptsMake(statsArr[3]);
  stats.setFGPercent(statsArr[4]);
  stats.set3PtAttemptMake(statsArr[5]);
  stats.set3PTPercent(statsArr[6]);
  stats.setFTAttemptMake(statsArr[7]);
  stats.setFTPercent(statsArr[8]);
  stats.setRPG(statsArr[11]);
  stats.setStl(statsArr[14]);
  stats.setBlk(statsArr[13]);
  stats.setTO(statsArr[16]);
  stats.setFoul(statsArr[15]);
  stats.setAPG(statsArr[12]);
  stats.setPPG(statsArr[17]);
  console.log(stats);
  return stats;

};

EspnNbaBoxScoresParser.prototype.parseGameStats = function(){
  var stats = new NbaPlayerStats();
    //console.log("parser = " + this);
  if (!this._lineHtml) {
	console.log("line_html is null");
    return null;
  }
  var gameStats = this._lineHtml.replace(/<\/td><td>/g, ";");
  var statsArr = gameStats.split(";");

  if (statsArr.length < 14 || gameStats.indexOf("DNP") > 0)  {
	  console.log(statsArr.length);
   return null;
  }


      stats.setMin(statsArr[1]);
      stats.setFGAttemptsMake(statsArr[2]);
      stats.set3PtAttemptMake(statsArr[3]);
      stats.setFTAttemptMake(statsArr[4]);
      stats.setRPG(statsArr[7]);
      stats.setAPG(statsArr[8]);
      stats.setStl(statsArr[9]);
      stats.setBlk(statsArr[10]);
      stats.setTO(statsArr[11]);
      stats.setFoul(statsArr[12]);
      stats.setPlusMinus(statsArr[13]);
      stats.setPPG(statsArr[14].replace("</td>", ""));


  var title = $(this.htmlObj).filter("title").text();
  var titleArr = title.split("-");
  var teams = titleArr && titleArr.length > 0 && titleArr[0];
  var date = titleArr && titleArr.length > 1 && titleArr[2];

  stats.setGameInfo({"teams" : teams, "date" : date});
  console.log(stats);
  return stats;
};

