var allRights = ["manage content", "play games", "delete users", "view site"];


var allGroups = {
	"admin": [allRights[2]],
	"manager": [allRights[0]],
	"basic": [allRights[1], allRights[3]]
}

var allUsers = [
	{nickname: "admin", pas: "1234", groups: ["admin", "manager", "basic"],session: false},
	{nickname: "sobakajozhec", pas: "ekh228", groups: ["basic", "manager"],session: false},
	{nickname: "patriot007", pas: "russiaFTW", groups: ["basic"],session: false}
];


function createUser(username, password) {
	allUsers.push({nickname:username,pas:password,groups:[],session:false});
	return allUsers[allUsers.length-1];
};

function deleteUser(user) {
	var count = 0;
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].nickname==user){
			count++;
			allUsers.splice(i,1);
		}
	}
	if(count==0){
		throw new Error("такого пользователя нет")
	}
};

function users() {
	return allUsers;
};

function createGroup(group) { //не берет парметр group ли удаляет admin
	allGroups[group]=[];
	return allGroups[group];
};

function deleteGroup(group) {
	delete allGroups[group];
};

function groups() {
	var a=[];
	for(key in allGroups){
		a.push(key);
	}
	return a;
};

function addUserToGroup(user,group) {
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].nickname==user){
			if(group in allGroups){
				allUsers[i].groups.push(group);
				break
			}
			throw new Error("такой группы нет");
		}
		//throw new Error("такого пользователя нет");	
	}
};

function userGroups(user) {
	var da=[];
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].nickname==user){
			for(var j=0;allUsers[i].groups.length;j++){
				da.push(allUsers[i].groups[j]);
			}
		}
	}
	return da;
};

function removeUserFromGroup(user,group) {
	var count=0;
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].nickname==user){
			for(var j;j<allUsers[i].groups.length;j++){
				if(allUsers[i].groups[j]==group){
					count++;
					allUsers[i].groups.splice(j,1);
				}
			}
		}
	}
	if(count==0){
		throw new Error("пользователя нет в этой группе");
		return undefined;
	}	
};

function createRight(right) {
	rights().push(right);
	return allRights[length-1];
};

function deleteRight(right) {
	for(var i=0;i<allRights.length;i++){
		if(allRights[i]==right){
			allRights.splice(i,1);
		}
	}
};

function groupRights(group) {
	if(group in allGroups){
		return allGroups[group];
	}
	throw new Error(group+" нет в списке групп")
};

function rights() {
	return allRights;
};

function addRightToGroup(right,group) {
	for(var i=0;i<allRights.length;i++){
		if(allRights[i]==right){
			if(group in allGroups){
				allGroups[group].push(right);
			}
			throw new Error("такой группы нет");
		}
		throw new Error("такого права нет");
	}
};

function removeRightFromGroup(right,group) {
	for(var i=0;i<allGroups[group].length;i++){
		if(allGroups[group][i]==right){
			allGroups[group].splice(i,1);
		}
	}
};

function login(username, password) {
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].nickname==username && allUsers[i].pas==password){
			allUsers[i].session=true;
			return true;
		}
		return false;
	}
};

function currentUser() {
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].session==true){
			return allUsers[i];
		}
	return undefined;	
	}
};

function logout() {
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].session==true){
			allUsers[i].session=false;
		}
	}
};

function isAuthorized(user, right) {
	for(var i=0;i<allUsers.length;i++){
		if(allUsers[i].nickname==user){
			for(var j=0;j<allUsers[i].groups.length;j++){
				if(allGroups[allUsers[i].groups[j]]==right){
					return true;
				}
			}
			return false;
	}
};


console.log(addUserToGroup("patriot007","admin"));
console.log(userGroups("patriot007"));
console.log(allUsers);

