

$(document).ready(function(){
    var links = document.links;
    var playerLinkPattern = "nba/player/_/id/";
	var oldPlayerLinkPattern = "nba/players/profile?playerId="
	var teamLinkPattern = "/nba/team/_/name/";
	var altTeamLinkPattern = "nba/clubhouse?team=";
    var gameId, playerId = null;
    if (window.location.search.indexOf("?gameId=") >= 0)
        gameId = window.location.search.substring(window.location.search.indexOf("?gameId=")+8);
    else if (window.location.search.indexOf("recap?id") >= 0)
        gameId = window.location.search.substring(window.location.search.indexOf("recap?id=")+9);

    for (var i=0; i<links.length; i++){
     if (links[i].href.indexOf(playerLinkPattern)>0 || (links[i].href.indexOf(oldPlayerLinkPattern)>0 && links[i].href.indexOf("nba") > 0)) {
        links[i].className="playerProfileLink";
     }
	 
	 else if (links[i].href.indexOf(teamLinkPattern) > 0 || links[i].href.indexOf(altTeamLinkPattern) > 0) {
	     links[i].className="teamLink";
     }
    }
    var width = "500px";
    //console.log("gameId = " + gameId);

    var themePath = chrome.extension.getURL("jquerybubblepopup-theme");
        $(".playerProfileLink").CreateBubblePopup({
            position : 'right',
            align	 : 'middle',
            tail     : 'middle',
            themeName: 	'all-black',
            themePath: 	themePath,
            width: width
        });
	
	var teamPath =  chrome.extension.getURL("jquerybubblepopup-theme");
        $(".teamLink").CreateBubblePopup({
            position : 'right',
            align	 : 'middle',
            tail     : 'middle',
            themeName: 	'all-black',
            themePath: 	teamPath,
            width: "250px"
        });
	
		$(".teamLink").mouseover(function() {
			var team = $(this);
			var href = this.href;
			var teamName = this.href.indexOf(teamLinkPattern) > 0 ? this.href.substring(this.href.indexOf(teamLinkPattern)+teamLinkPattern.length) :
						   this.href.substring(this.href.indexOf(altTeamLinkPattern) + altTeamLinkPattern.length);
			if (teamName.indexOf("/")) {
				teamName = teamName.substring(teamName.indexOf("/")+1);
			}

			console.log("teamName = " + teamName);
			
			//TODO: Fetching & parsing
			function teamFetch(objLink, teamName) {
				var stats = new NBAStats();
				stats.setTeamName(teamName);
				stats.fetchTeam(objLink);
			}
			
			if (!document.getElementById("TEAMINFO_" + teamName)){
                teamFetch(this, teamName);
            }
			
			var seconds_to_wait = 52;

            function teamPause(obj){
                var showMe = false;
                var loadingHtml = "<table width='" + width + "'><tr><td>Loading...</td></tr></table>";
	            team.SetBubblePopupInnerHtml(loadingHtml, false);

                if (document.getElementById("TEAMINFO_" + obj._teamName)){
                    var teamHtml = document.getElementById("TEAMINFO_" + obj._teamName).innerHTML;
                    team.SetBubblePopupInnerHtml(teamHtml, true); //false -> it shows new innerHtml but doesn't save it, then the script is forced to load everytime the innerHtml...

                }else{
                    var timer = setTimeout(function(){
                        seconds_to_wait--;
                        if(seconds_to_wait > 0){
                            if ($("TEAMINFO_" + obj._teamName))
                                showMe = true;
                            else
                                teamPause(obj);
                        }else{
                            showMe = true;
                        }
                        if (showMe) {
                            //set new innerHtml for the Bubble Popup
                            if (document.getElementById("TEAMINFO_" + obj._teamName))
                                var teamHtml = document.getElementById("TEAMINFO_" + obj._teamName).innerHTML;
                            team.SetBubblePopupInnerHtml(teamHtml, true); //false -> it shows new innerHtml but doesn't save it, then the script is forced to load everytime the innerHtml...

                            // take a look in documentation for SetBubblePopupInnerHtml() method

                        };
                    },1000);
                }
            };teamPause({"_teamName" : teamName});
			
			
		});

        $(".playerProfileLink").mouseover(function(){
            var player = $(this);
            var href = this.href;
            if (this.href.indexOf(playerLinkPattern) >= 0)
                playerId = this.href.substring(this.href.indexOf(playerLinkPattern)+playerLinkPattern.length, this.href.indexOf(playerLinkPattern)+playerLinkPattern.length + 4);
            else if (this.href.indexOf("profile?playerId=") >= 0)
                playerId = this.href.substring(this.href.indexOf("profile?playerId=")+17);

            if (playerId.indexOf("/") > 0)
                playerId = playerId.substring(0, playerId.indexOf("/"));

            //console.log("playerId = " + playerId);

            function fetch(objLink, pId, gId, boxScore){
                var stats = new NBAStats(pId, gId);
                //console.log("playerId = " + stats._playerId);
                if (boxScore)
                    stats.fetchBoxScore(objLink);
                else
                    stats.fetchStats(objLink);
            };

            if (!document.getElementById("STATS_" + playerId) && !document.getElementById("PLAYER_" + playerId)){
                if (document.getElementById("STATS_" + playerId) && !document.getElementById("PLAYER_" + playerId))
                    fetch(this, playerId, gameId, true);
                else
                    fetch(this, playerId, gameId);
            }


            var seconds_to_wait = gameId ? 5 : 2;

            function pause(obj){
                var showMe = false;
                var loadingHtml = "<table width='" + width + "'><tr><td>Loading...</td></tr></table>";
                player.SetBubblePopupInnerHtml(loadingHtml, false);

                if (document.getElementById("STATS_" + obj._playerId) && (document.getElementById("PLAYER_" + obj._playerId) || !gameId)){
                   var statsHtml, infoHtml = "";
                    var playerHtml = "";
                    var el = document.getElementById("STATS_" + obj._playerId);
                    if (el)
                        statsHtml = el.innerHTML ? el.innerHTML : "";

                    el = document.getElementById("PLAYER_" + obj._playerId);
                    if (el && obj._gameId)
                        playerHtml = el.innerHTML ? el.innerHTML + "<br/>" : "";

                    infoHtml = document.getElementById("NBAINFO_" + obj._playerId).innerHTML + "<br/>";
                    player.SetBubblePopupInnerHtml(infoHtml + playerHtml + statsHtml, true); //false -> it shows new innerHtml but doesn't save it, then the script is forced to load everytime the innerHtml...

                }else{
                    var timer = setTimeout(function(){
                        seconds_to_wait--;
                        if(seconds_to_wait > 0){
                            if (document.getElementById("STATS_" + obj._playerId) && (document.getElementById("PLAYER_" + obj._playerId) || !gameId))
                                showMe = true;
                            else
                                pause(obj);
                        }else{
                            showMe = true;
                        }
                        if (showMe) {
                            //set new innerHtml for the Bubble Popup
                            var statsHtml, infoHtml = "";
                            var playerHtml = "";
                            var el = document.getElementById("STATS_" + obj._playerId);
                            if (el)
                                statsHtml = el.innerHTML ? el.innerHTML : "";

                            el = document.getElementById("PLAYER_" + obj._playerId);
                            if (el && obj._gameId)
                                playerHtml = el.innerHTML ? el.innerHTML + "<br/>" : "";

                            infoHtml = document.getElementById("NBAINFO_" + obj._playerId).innerHTML + "<br/>";
                            player.SetBubblePopupInnerHtml(infoHtml + playerHtml + statsHtml, true); //false -> it shows new innerHtml but doesn't save it, then the script is forced to load everytime the innerHtml...

                            // take a look in documentation for SetBubblePopupInnerHtml() method

                        };
                    },1000);
                }
            };pause({"_playerId" : playerId, "_gameId" : gameId});
        });
});

