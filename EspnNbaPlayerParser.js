
EspnNbaPlayerParser = function(html){
 this._html = html;
 this.htmlObj = $(html);
 this.parseNbaPlayer(this.htmlObj);
 this._playerRetired = false;
};

EspnNbaPlayerParser.AGE_LOCATION = "Age:";
EspnNbaPlayerParser.POSITION_LOCATION = "Position";
EspnNbaPlayerParser.EXPERIENCE_LOCATION = "Experience";
EspnNbaPlayerParser.PLAYERINFO_END = "Season</p>";
EspnNbaPlayerParser.COLLEGE_LOCATION = "College";
EspnNbaPlayerParser.DRAFTED_ROUND_1 = "1st Rnd";
EspnNbaPlayerParser.DRAFTED_ROUND_2 = "2nd Rnd"
EspnNbaPlayerParser.SALARY_LOCATION = "Salary";
EspnNbaPlayerParser.BIRTHDATE_LOCATION = "Birth Date";
EspnNbaPlayerParser.BIRTHPLACE_LOCATION = "Birth Place";
EspnNbaPlayerParser.WEIGHT_LOCATION = "Weight";
EspnNbaPlayerParser.HEIGHT_LOCATION = "Height";

EspnNbaPlayerParser.prototype.parseNbaPlayer = function(){
// console.log(this.htmlObj);

 var espnPlayer = new NbaPlayer();
 espnPlayer.setTeam(this.getTeam());
 espnPlayer.setName(this.getName());
 espnPlayer.setImage(this.getImage());
 EspnNbaPlayerParser.PLAYERINFO_START = "<h1>" + espnPlayer._name;
 this._playerHtml = this.getPlayerHtml();
 console.log(this._playerHtml);
 espnPlayer.setAge(this.getAge());
 espnPlayer.setHeight(this.getHeight());
 espnPlayer.setWeight(this.getWeight());
 espnPlayer.setSalary(this.getSalary());
 espnPlayer.setDrafted(this.getDrafted());
 espnPlayer.setExperience(this.getExperience());
 return espnPlayer;
};

EspnNbaPlayerParser.prototype.getPlayerHtml = function(){
 var tmp = document.createElement("DIV");
 var startPos = this._html.indexOf(EspnNbaPlayerParser.PLAYERINFO_START);
 var endPos = this._html.indexOf(EspnNbaPlayerParser.PLAYERINFO_END);
 if (endPos < 0) {
	 this._playerRetired = true;
	 endPos = this._html.indexOf("Career</p>");
 }
 var playerHtml = this._html.substring(startPos,endPos);
 tmp.innerHTML = playerHtml;
 return tmp.textContent || tmp.innerText;
};

EspnNbaPlayerParser.prototype.getName = function(){
 var name = $(this.htmlObj).filter("meta:[property=og:title]").attr("content");
 //console.log("name = " + name);
 return name;
};

EspnNbaPlayerParser.prototype.getTeam = function(){
 var title = $(this.htmlObj).filter("title").text();
 var titleArr = title.split("-");
 var team = titleArr && titleArr.length > 0 && titleArr[1];
 //console.log("team = " + team);
 return team;
};

EspnNbaPlayerParser.prototype.getImage = function(){
 var img = $(this.htmlObj).filter("meta:[property=og:image]").attr("content");
 //console.log("img = " + img);
 return img;
};

EspnNbaPlayerParser.prototype.getValue = function(start, end){
  var value = "";
  var startPos = this._playerHtml.indexOf(start) + start.length;
  if (startPos >= 0){
      if(end){
          var endPos = this._playerHtml.indexOf(end);
          value = jQuery.trim(this._playerHtml.substring(startPos, endPos));
      }else
        value = jQuery.trim(this._playerHtml.substring(startPos));
  }
  //console.log("value = " + value);
  return value;
};


EspnNbaPlayerParser.prototype.getBirthDate = function(){
  var birthDate = "";
  var bdayPos = this._playerHtml.indexOf(EspnNbaPlayerParser.BIRTHDATE_LOCATION);
  if (bdayPos >= 0) {
      var nextPos = this._playerHtml.indexOf(EspnNbaPlayerParser.BIRTHPLACE_LOCATION);
      birthDate = jQuery.trim(this._playerHtml.substring(bdayPos+EspnNbaPlayerParser.BIRTHDATE_LOCATION.length,nextPos));
      //console.log("birthdate = " + birthDate);
  }
  return birthDate;
};

EspnNbaPlayerParser.prototype.getBirthPlace = function(){
  var birthPlace = "";
  var birthPlacePos = this._playerHtml.indexOf(EspnNbaPlayerParser.BIRTHPLACE_LOCATION);
  if (birthPlacePos >= 0) {
      var nextPos = this._playerHtml.indexOf(EspnNbaPlayerParser.HEIGHT_LOCATION);
      birthPlace = jQuery.trim(this._playerHtml.substring(birthPlacePos+EspnNbaPlayerParser.BIRTHPLACE_LOCATION.length,nextPos));
      //console.log("birthplace = " + birthPlace);
  }
  return birthPlace;
};

EspnNbaPlayerParser.prototype.getHeight = function(){
  var height = "";
  var pattern=new RegExp("[0-9]\' [0-9]{1,2}[\"]");
  var heightPos = this._playerHtml.search(pattern);
  if (heightPos >= 0) {
      height = jQuery.trim(this._playerHtml.substring(heightPos, heightPos + 5));
      //console.log("height = " + height);
  }
  return height;
};

EspnNbaPlayerParser.prototype.getWeight = function(){
  var weight = "";
  var pattern = new RegExp("[0-9]{3} lbs");
  var weightPos = this._playerHtml.search(pattern);
  if (weightPos >= 0) {
      weight = jQuery.trim(this._playerHtml.substring(weightPos, weightPos + 7));
      //console.log("weight = " + weight);
  }
  return weight;
};


EspnNbaPlayerParser.prototype.getAge = function(){
  var age = "";
  var agePos = this._playerHtml.indexOf(EspnNbaPlayerParser.AGE_LOCATION);
  if (agePos >= 0) {
      age = jQuery.trim(this._playerHtml.substring(agePos + 5, agePos + 7 ));
      //console.log("age = " + age);
  }
  return age;
};

EspnNbaPlayerParser.prototype.getPosition = function(){
  var position = "";
  var positionPos = this._playerHtml.indexOf(EspnNbaPlayerParser.POSITION_LOCATION);
  if (positionPos >= 0) {
      var experiencePos = this._playerHtml.indexOf(EspnNbaPlayerParser.EXPERIENCE_LOCATION);
      position = jQuery.trim(this._playerHtml.substring(positionPos+EspnNbaPlayerParser.POSITION_LOCATION.length, experiencePos));
      //console.log("position = " + position);
  }
  return position;
};

EspnNbaPlayerParser.prototype.getExperience = function(){
 var experience = "1";
 var expPos = this._playerHtml.indexOf(EspnNbaPlayerParser.EXPERIENCE_LOCATION);
 if (expPos >= 0) {
  experience = jQuery.trim(this._playerHtml.substring(expPos+EspnNbaPlayerParser.EXPERIENCE_LOCATION.length, expPos+EspnNbaPlayerParser.EXPERIENCE_LOCATION.length + 2));
  //console.log("experience = " + experience);
 }
 return experience;
};

EspnNbaPlayerParser.prototype.getCollege = function(){
 var college = "";
 var collegePos = this._playerHtml.indexOf(EspnNbaPlayerParser.COLLEGE_LOCATION);
 if (collegePos >= 0) {
  var draftedPos = this._playerHtml.indexOf(EspnNbaPlayerParser.DRAFTED_LOCATION);
  college = jQuery.trim(this._playerHtml.substring(collegePos + EspnNbaPlayerParser.COLLEGE_LOCATION.length, draftedPos));
  //console.log("college = " + college);
 }
 return college;
};

EspnNbaPlayerParser.prototype.getDrafted = function(){
 var drafted = "";
 var draftedPos = this._playerHtml.indexOf(EspnNbaPlayerParser.DRAFTED_ROUND_1);
 if (draftedPos < 0)
    draftedPos = this._playerHtml.indexOf(EspnNbaPlayerParser.DRAFTED_ROUND_2);

 if (draftedPos >= 0) {
  drafted = jQuery.trim(this._playerHtml.substring(draftedPos -6, draftedPos + 19));
  //console.log("drafted = " + drafted);
 }
 return drafted;
};

EspnNbaPlayerParser.prototype.getSalary = function(){
 var salary = "";
 var years = "";

 years = this._html.match(/\d year remaining|\d years remaining/);
 //console.log("years = " + years);


 salary = this._html.match(/\$\d+,\d+,\d{3}|\$\d{3},\d{3}/);
 //console.log("salary = " + salary);

 if (!salary) {
	 return null;
 }
 return salary + " " + years;
};


