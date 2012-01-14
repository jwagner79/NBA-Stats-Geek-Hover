NbaPlayer = function(){

};

NbaPlayer.prototype.getName = function(){
 return this._name;
};

NbaPlayer.prototype.getAge = function(){
 return this._age;
};

NbaPlayer.prototype.getHeight = function(){
 return this._height;
};

NbaPlayer.prototype.getWeight = function(){
 return this._weight;
};

NbaPlayer.prototype.getDraftYear = function(){
 return this._draftYear;
};

NbaPlayer.prototype.getDraftNumber = function(){
 return this._draftNumber;
};

NbaPlayer.prototype.getDraftRound = function(){
  return this._draftRound;
};

NbaPlayer.prototype.getDraftTeam = function(){
 return this._draftTeam;
};

NbaPlayer.prototype.getSalary = function(){
 return this._salary;
};

NbaPlayer.prototype.getTeam = function(){
  return this._team;  
};

NbaPlayer.prototype.getImage = function(){
  return this._image;    
};

NbaPlayer.prototype.setName = function(name){
    this._name = name;
};

NbaPlayer.prototype.setAge = function(age){
    this._age = age;
};

NbaPlayer.prototype.setPosition = function(position){
    this._position = position;
};

NbaPlayer.prototype.setHeight = function(height){
    this._height = height;
};

NbaPlayer.prototype.setWeight = function(weight){
    this._weight = weight;
};

NbaPlayer.prototype.setExperience = function(experience){
    this._experience = experience;
};

NbaPlayer.prototype.setBirthDate = function(birthDate){
    this._birthDate = birthDate;  
};

NbaPlayer.prototype.setBirthPlace = function(birthPlace){
    this._birthPlace = birthPlace;
};

NbaPlayer.prototype.setSalary = function(salary){
	if (!salary) {
		salary = "N/A";
	}
    this._salary = salary;
};

NbaPlayer.prototype.setCollege = function(college){
    this._college = college ? college : "N/A";
};

NbaPlayer.prototype.setDrafted = function(drafted){
    this._drafted = drafted;  
};

NbaPlayer.prototype.setTeam = function(team){
    this._team = team;
};

NbaPlayer.prototype.setImage = function(image){
    this._image = image;
};

NbaPlayer.prototype.getPlayerInfo = function(){
    return {
        "name" : this._name,
        "age" : this._age,
        "position" : this._position,
        "height" : this._height,
        "weight" : this._weight,
        "experience" : this._experience,
        "birthdate" : this._birthDate,
        "birthplace" : this._birthPlace,
        "salary" : this._salary,
        "college" : this._college,
        "drafted" : this._drafted,
        "image" : this._image,
        "drafted" : this._drafted
    };
};