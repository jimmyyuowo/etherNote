var Web3 = require('web3')
var TruffleContract = require("truffle-contract")

// pure web3
var url = 'http://127.0.0.1:10070'
web3 = new Web3(new Web3.providers.HttpProvider(url))

// 直接使用web3需要地址和abi
var address = '0xC2ac8203cF725FC2E6c7153247664fBdCf0E3877'
var abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getNote",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			}
		],
		"name": "isExistUsername",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_testc",
				"type": "string"
			}
		],
		"name": "setTest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_username",
				"type": "string"
			},
			{
				"name": "_note",
				"type": "string"
			}
		],
		"name": "setNote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

if (!web3.isConnected()) {
	throw new Error('unable to connect to ethereum node at ' + url)
} else {
	console.log('successfully connected to ehterum node at ' + url)
	/*let coinbase = web3.eth.coinbase
	console.log('coinbase:' + coinbase)
	let balance = web3.eth.getBalance(coinbase)
	console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH")
	let accounts = web3.eth.accounts
	console.log('accounts:'+ accounts)
	*/
}

// 获取合约对象
var contract = web3.eth.contract(abi).at(address)
// 解锁账户
var mainAccount = web3.eth.accounts[0]
//console.log('unlock mainAccount: ' + web3.personal.unlockAccount(mainAccount, '!qaz2wsx3edc', 600))

exports.isExistUsername = (username) => {
	return contract.isExistUsername(username)
}

exports.createUser = (username, callback) => {
	contract.createUser.sendTransaction(username, {from: mainAccount}, (error, result) => {
		//console.log(result)
		if (error == null) {
			callback(true)
		} else {
			callback(false)
		}
	})
}

exports.getUserCount = () => {
	return contract.getUserCount().toNumber()
}

exports.setNote = (username, note, callback) => {
	contract.setNote.sendTransaction(username, note, {from: mainAccount}, (error, result) => {
	  if (error == null) {
			callback(true)
		} else {
			callback(false)
		}
	})
}

exports.getNote = (username) => {
	return contract.getNote(username)
}
/*
console.log(contract.getUserCount().toNumber())
console.log(contract.getTest().toNumber())

console.log('unlock mainAccount: ' + web3.personal.unlockAccount(mainAccount, '123456', 600))


contract.setTest.sendTransaction('test2', {from: mainAccount})
*/

/* deploy by web3 -- not work
var notesContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_username","type":"string"}],"name":"findUserAddressByUsername","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userAddress","type":"address"},{"name":"_content","type":"string"},{"name":"_time","type":"string"}],"name":"setNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_username","type":"string"}],"name":"isExistUsername","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUserCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"isExistUserAddress","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userAddress","type":"address"},{"name":"_username","type":"string"}],"name":"createUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userAddress","type":"address"}],"name":"getNote","outputs":[{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]);
var notes = notesContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x608060405234801561001057600080fd5b50610fdd806100206000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063295db3921461008857806333179a6b1461013157806385b78d4a14610200578063b5cb15f714610281578063b9aae32b146102ac578063f9bcd54514610307578063fc643efe14610390575b600080fd5b34801561009457600080fd5b506100ef600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506104b8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561013d57600080fd5b506101fe600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610564565b005b34801561020c57600080fd5b50610267600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610631565b604051808215151515815260200191505060405180910390f35b34801561028d57600080fd5b50610296610859565b6040518082815260200191505060405180910390f35b3480156102b857600080fd5b506102ed600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610866565b604051808215151515815260200191505060405180910390f35b34801561031357600080fd5b5061038e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610909565b005b34801561039c57600080fd5b506103d1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610caa565b604051808060200180602001838103835285818151815260200191508051906020019080838360005b838110156104155780820151818401526020810190506103fa565b50505050905090810190601f1680156104425780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561047b578082015181840152602081019050610460565b50505050905090810190601f1680156104a85780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b60006104c382610631565b15156104ce57600080fd5b6003826040518082805190602001908083835b60208310151561050657805182526020820191506020810190506020830392506104e1565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b61056d83610866565b151561057857600080fd5b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160000190805190602001906105d1929190610e8c565b5081600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600101908051906020019061062b929190610e8c565b50505050565b600080600090505b60018054905081101561084e57826004546005546040516020018084805190602001908083835b6020831015156106855780518252602082019150602081019050602083039250610660565b6001836020036101000a03801982511681845116808217855250505050505090500183815260200182815260200193505050506040516020818303038152906040526040518082805190602001908083835b6020831015156106fc57805182526020820191506020810190506020830392506106d7565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191660018281548110151561073c57fe5b9060005260206000200160045460055460405160200180848054600181600116156101000203166002900480156107aa5780601f106107885761010080835404028352918201916107aa565b820191906000526020600020905b815481529060010190602001808311610796575b505083815260200182815260200193505050506040516020818303038152906040526040518082805190602001908083835b60208310151561080157805182526020820191506020810190506020830392506107dc565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191614156108415760019150610853565b8080600101915050610639565b600091505b50919050565b6000600180549050905090565b600080600090505b6000805490508110156108fe578273ffffffffffffffffffffffffffffffffffffffff166000828154811015156108a157fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108f15760019150610903565b808060010191505061086e565b600091505b50919050565b61091282610866565b15151561091e57600080fd5b61092781610631565b15151561093357600080fd5b60008290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505060018190806001815401808255809150509060018203906000526020600020016000909192909190915090805190602001906109d6929190610e8c565b50506060604051908101604052808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020016040805190810160405280602060405190810160405280600081525081526020016020604051908101604052806000815250815250815250600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019080519060200190610ae0929190610f0c565b506040820151816002016000820151816000019080519060200190610b06929190610f0c565b506020820151816001019080519060200190610b23929190610f0c565b5050509050506060604051908101604052808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200160408051908101604052806020604051908101604052806000815250815260200160206040519081016040528060008152508152508152506003826040518082805190602001908083835b602083101515610bc75780518252602082019150602081019050602083039250610ba2565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019080519060200190610c5d929190610f0c565b506040820151816002016000820151816000019080519060200190610c83929190610f0c565b506020820151816001019080519060200190610ca0929190610f0c565b5050509050505050565b606080610cb683610866565b1515610cc157600080fd5b600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600001600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600101818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610de05780601f10610db557610100808354040283529160200191610de0565b820191906000526020600020905b815481529060010190602001808311610dc357829003601f168201915b50505050509150808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610e7c5780601f10610e5157610100808354040283529160200191610e7c565b820191906000526020600020905b815481529060010190602001808311610e5f57829003601f168201915b5050505050905091509150915091565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610ecd57805160ff1916838001178555610efb565b82800160010185558215610efb579182015b82811115610efa578251825591602001919060010190610edf565b5b509050610f089190610f8c565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f4d57805160ff1916838001178555610f7b565b82800160010185558215610f7b579182015b82811115610f7a578251825591602001919060010190610f5f565b5b509050610f889190610f8c565b5090565b610fae91905b80821115610faa576000816000905550600101610f92565b5090565b905600a165627a7a7230582043f68a38754ae051b7ea129c77f672e3f75b53c518de231590174108a371088f0029', 
     gas: '4700000'
   }, function (e, contract){
    //console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
 */


/**
 * set provider
 */
 /*
var contractBuild = require("./build/contracts/Notes.json")
var contract = TruffleContract(contractBuild)
var url = 'http://127.0.0.1:10070'
contract.setProvider(new Web3.providers.HttpProvider(url))

console.log(contract.web3.eth.accounts)

var mainAccount = contract.web3.eth.accounts[0]
var subAccount1 = contract.web3.eth.accounts[1]
var subAccount2 = contract.web3.eth.accounts[2]

// test
contract.deployed().then(function(instance){
	Notes = instance
	instance.getUserCount.call().then(function(result){
		console.log('usr: ' + result.toNumber())
	})
}).catch(function(err){
	console.log(err)
})

contract.deployed().then(function(instance){
	contract.web3.personal.unlockAccount(mainAccount, '123456')
	instance.createUser.sendTransaction('0x5b6b5bfaaa8eade49dc47b86b8e5a2ebef664629', 'sefaice', {from: mainAccount}).catch(function(err){
		console.log(err)
	})
}).catch(function(err){
	console.log(err)
})
*/