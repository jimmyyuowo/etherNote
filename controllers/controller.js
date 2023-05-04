var web3Util = require('../utils/web3Util.js')

exports.signup = (req, res) => {
	//console.log(req.body.username)
	var username = req.body.username
	if (web3Util.isExistUsername(username)) {
		res.json({label: false, msg: '注册失败：用户名已存在'})
		return
	}
	web3Util.createUser(req.body.username, (result) => {
		if (result) {
			res.json({label: true, msg: '注册成功'})
		} else {
			res.json({label: false, msg: '注册失败'})
		}
	})
}

exports.signin = (req, res) => {
	var username = req.body.username
	if (!web3Util.isExistUsername(username)) {
		res.json({label: false, msg: '登陆失败：用户名不存在'})
		return
	}
	res.json({label: true, msg: '登录成功'})
}

exports.getNote = (req, res) => {
	var username = req.params.username
	if (!web3Util.isExistUsername(username)) {
		res.json({label: false, msg: '获取Note失败：用户名不存在'})
		return
	}
	res.json({label: true, msg: '获取Note成功', note: web3Util.getNote(username)})
}

exports.updateNote = (req, res) => {
	var username = req.params.username
	var note = req.body.note
	if (!web3Util.isExistUsername(username)) {
		res.json({label: false, msg: '修改Note用户名不存在'})
		return
	}
	web3Util.setNote(username, note, (result) => {
		if (result) {
			res.json({label: true, msg: '修改Note成功'})
		} else {
			res.json({label: false, msg: '修改Note失败'})
		}
	})
}

exports.getUserCount = (req, res) => {
	res.json({userCount: web3Util.getUserCount()})
}