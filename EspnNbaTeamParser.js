
EspnNbaTeamParser = function(html){
 this._html = html;
 this.htmlObj = $(html);
};

EspnNbaTeamParser.SEASON_END = "Team leaders";

EspnNbaTeamParser.prototype.getTeamName = function(){
 var name = $(this.htmlObj).filter("meta:[property=og:title]").attr("content");
 return name;
};

EspnNbaTeamParser.prototype.getTeamIcon = function(){
 var icon = $(this.htmlObj).filter("meta:[property=og:image]").attr("content");
 return icon;
};

EspnNbaTeamParser.prototype.getDivision = function() {
	var division = this._teamText[3].replace(":", "");	
	return division.replace(/ /, "");
};

EspnNbaTeamParser.prototype.getDivisionRecord = function() {
	return this._teamText[4];	
};

EspnNbaTeamParser.prototype.getRecord = function() {
	var record = this._teamText[0] + " " + this._teamText[1] + " " + this._teamText[2] + " ";
	var division = this._teamText[3].split("\n")[0];
	return record + division;	
};


EspnNbaTeamParser.prototype.parseNbaTeam = function(){
// console.log(this.htmlObj);
 var seasonText = this.getSeasonHtml();
 this._teamText = seasonText.replace(/ /g, ";").split(";");
 var espnTeam = new NbaTeam();
 espnTeam.setTeamName(this.getTeamName());
 //espnTeam.setDivision(this.getDivision());
 //espnTeam.setDivisionRecord(this.getDivisionRecord());
 espnTeam.setRecord(this.getRecord());
 espnTeam.setIcon(this.getTeamIcon());
 
 return espnTeam;
};

EspnNbaTeamParser.prototype.getSeasonHtml = function(){
 var tmp = document.createElement("DIV");
 var startPos = this._html.indexOf("<div class=\"sub-title\">");
 var endPos = this._html.indexOf("Clubhouse");
 var seasonHtml = this._html.substring(startPos);
 tmp.innerHTML = seasonHtml;
 return tmp.textContent || tmp.innerText;
};

EspnNbaTeamParser.getCurrentSeason = function() {
	var date = new Date();
	var year = date.getYear() + 1900;
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
		
	endYear =- 2000;
	
	return startYear + "-" + endYear;
};

NbaTeam = function() {
	
};

NbaTeam.prototype.setTeamName = function(name) {
	this.teamName = name;
};

NbaTeam.prototype.setDivision = function(name) {
	this.division = name;	
};

NbaTeam.prototype.setDivisionRecord = function(record) {
	this.divisionRecord = record;
};

NbaTeam.prototype.setRecord = function(record) {
	this.record = record;	
};

NbaTeam.prototype.setIcon = function(icon) {
	this.icon = icon;
};