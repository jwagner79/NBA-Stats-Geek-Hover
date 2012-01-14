NbaPlayerStats = function(){

};

NbaPlayerStats.prototype.setGames = function(games){
    this._games = games;
};

NbaPlayerStats.prototype.setPPG = function(ppg){
    this._ppg = ppg;
};

NbaPlayerStats.prototype.setRPG = function(rpg){
    this._rpg = rpg;
};

NbaPlayerStats.prototype.setBPG = function(bpg){
    this._bpg = bpg;
};

NbaPlayerStats.prototype.setAPG = function(apg){
    this._apg = apg;
};

NbaPlayerStats.prototype.setBlk = function(blk){
    this._blk = blk;
};

NbaPlayerStats.prototype.setStl = function(stl){
    this._stl = stl;
};

NbaPlayerStats.prototype.setAsst = function(asst){
    this._asst = asst;  
};

NbaPlayerStats.prototype.setTO = function(turnover){
    this._to = turnover;
};

NbaPlayerStats.prototype.setMin = function(min){
    this._min = min;
};

NbaPlayerStats.prototype.setFoul = function(foul){
    this._foul = foul;
};

NbaPlayerStats.prototype.setFGAttemptsMake = function(fgAttemptMake){
    this._fgAttemptMake = fgAttemptMake;
};

NbaPlayerStats.prototype.setFTAttemptMake = function(ftAttemptMake){
    this._ftAttemptMake = ftAttemptMake;
};

NbaPlayerStats.prototype.setFGPercent = function(fgpercent){
    this._fgpercent = fgpercent;
};

NbaPlayerStats.prototype.setFTPercent = function(ftpercent){
    this._ftpercent = ftpercent;  
};

NbaPlayerStats.prototype.set3PTPercent = function(threePointPercent){
    this._threePointPercent = threePointPercent;
};

NbaPlayerStats.prototype.set3PtAttemptMake = function(threePointAttemptMake){
    this._threePointAttemptMake = threePointAttemptMake;
};

NbaPlayerStats.prototype.setSeason = function(season){
    this._season = season;
};

NbaPlayerStats.prototype.setPlusMinus = function(plusMinus){
    this._plus_minus = plusMinus;  
};

NbaPlayerStats.prototype.setGameInfo = function(gameObj) {
    this._gameTeams = gameObj.teams;
    this._gameDate = gameObj.date;
};

NbaPlayerStats.prototype.getSingleGame = function(){
    return {
        "min" : this._min,
        "points" : this._ppg,
        "ft" : this._ftAttemptMake,
        "fg" : this._fgAttemptMake,
        "3pt": this._threePointAttemptMake,
        "reb" : this._rpg,
        "to" : this._to,
        "blk" : this._blk,
        "foul" : this._foul,
        "plus_mins": this._plus_minus,
        "asst" : this._asst,
        "stl" : this._stl,
        "teams" : this._gameTeams,
        "gameDate" : this._gameDate
    };
};


NbaPlayerStats.prototype.getSeasonStats = function(){
    return {
        "games" : this._games,
        "min" : this._min,
        "points" : this._ppg,
        "ft" : this._ftpercent,
        "fg" : this._fgpercent,
        "3pt": this._threePointPercent,
        "reb" : this._rpg,
        "to" : this._to,
        "blk" : this._blk,
        "foul" : this._foul,
        "asst" : this._asst,
        "stl" : this._stl,
        "season": this._season
    };
};

NbaPlayerStats.prototype.getCareerStats = function(){
    return {
        "games" : this._games,
        "min" : this._min,
        "points" : this._ppg,
        "ft" : this._ftpercent,
        "fg" : this._fgpercent,
        "3pt": this._threePointPercent,
        "reb" : this._rpg,
        "to" : this._to,
        "blk" : this._blk,
        "foul" : this._foul,
        "asst" : this._asst,
        "stl" : this._stl
    };
};