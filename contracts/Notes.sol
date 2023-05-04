// SPDX-License-Identifier: MIT
pragma solidity >=0.4.11;

contract Notes {

	/* 本地web3无法在一个函数中调用两次数组push，或两次mapping，且mapping对象不能是结构体
	// 笔记结构体
	struct Note {
		string time;
		string content;
	}
	// 用户结构体
	struct User {
		address userAddress;
		string username;
		string note;
	}
	// 所有地址
	address[] userAddresses;
	*/

	// 所有用户名
	string[] usernames;


	// test
	string[] testc;
	function getTest() public view returns (uint) {
		return testc.length;
	}
	function setTest(string memory  _testc) public {
		testc.push(_testc);
	}
	

	// 映射
	//mapping(address => string) userAddressMap;
	mapping(string => string) usernameMap;

	/*
	function isExistUserAddress(address _userAddress) public constant returns (bool) {
		for(uint i = 0; i < usernames.length; i++){
			if(keccak256(usernames[i]) == keccak256(userAddressMap[_userAddress])) return true;
		}
		return false;
	}
	*/

	uint256 _unixTimestamp;
	uint256 _timeExpired;
	function isExistUsername(string memory _username) public view returns (bool) {
		for(uint i = 0; i < usernames.length; i++){
			if(keccak256(abi.encodePacked(usernames[i], _unixTimestamp, _timeExpired)) == keccak256(abi.encodePacked(_username, _unixTimestamp, _timeExpired))) {
			//if(keccak256(usernames[i]) == keccak256(_username)) {
				return true;
			}
		}
		return false;
	}

	/* disable for cannot add when register with web3
	function findUserAddressByUsername(string _username) public constant returns (address) {
		require (isExistUsername(_username));
		return usernameMap[_username].userAddress;
	}
	*/

	function createUser(string memory _username) public {
		//require (!isExistUserAddress(_userAddress));
		require (!isExistUsername(_username));

		//userAddresses.push(_userAddress);
		usernames.push(_username);

		//userAddressMap[_userAddress] =  _username;
		usernameMap[_username] = "";
	}

	function getUserCount() public view returns (uint) {
		return usernames.length;
	}

	function setNote(string memory _username, string memory _note) public {
		require (isExistUsername(_username));
		usernameMap[_username] = _note;
	}

	function getNote(string memory _username) public view returns (string memory) {
		require (isExistUsername(_username));
		return usernameMap[_username];
	}
}