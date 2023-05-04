<template>
  <div id="app">
    <div class="app-header">
      <div class="descp">
        <div class="descp-title">etherNote</div>
        <div class="descp-subtitle">A note DAPP built on ethereum</div>
      </div>
    </div>
    <div class="app-main">
      <div class="userinfo">
        <div class="userinfo-usernum">
          <span>目前总用户数: </span>
          <span>{{userCount}}</span>
        </div>
        <div class="userinfo-current">
          <span>当前用户: </span>
          <span>{{currentUser}}</span>
        </div>
        <button class="userinfo-signinbtn" @click="signinClick">切换用户</button>
        <button class="userinfo-signupbtn" @click="signupClick">注册用户</button>
      </div>

      <div class="note">
        <textarea class="note-content" spellcheck="false" v-model="note"></textarea>
        <button class="note-getbtn" @click="getNoteClick">获取Note</button>
        <button class="note-setbtn" @click="setNoteClick">修改Note</button>
      </div>
    </div>
    <div class="app-bottom">
      <img class="github-icon" src="./assets/github.png" @click="githubLink">
      <div class="bottom-link">
        <span>built by </span>
        <span>Sefaice</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

var destinationDNS = "http://localhost:3000";

export default {
  name: 'app',
  data: () => {
    return {
      userCount: 0,
      currentUser: null,
      note: ''
    }
  },
  mounted: function() {
    setInterval(() => {
      this.getUserCount()
    }, 3000)
  },
  methods: {
    signinClick: function() {
      var username = prompt('用户名：')
      if(username == '' || username == null) {
        return
      }
      axios
      .post(destinationDNS+'/signin', {
        username: username
      })
      .then((response) => {
        if (response.data.label) {
          this.currentUser = username
        } else {
          alert(response.data.msg)
        }
      })
      .catch((error) => alert(error))
    },
    signupClick: function() {
      var username = prompt('新用户名：')
      if(username == '' || username == null) {
        return
      }
      axios
      .post(destinationDNS+'/signup', {
        username: username
      })
      .then((response) => {
        if (response.data.label) {
          alert('注册成功！')
          this.currentUser = username
        } else {
          alert(response.data.msg)
        }
      })
      .catch((error) => alert(error))
    },
    getNoteClick: function() {
      if(this.currentUser == null || this.currentUser == ''){
        alert('请先登录')
        return
      }
      axios
      .get(destinationDNS+'/getNote/' + this.currentUser)
      .then((response) => {
        if (response.data.label) {
          this.note = response.data.note
        } else {
          alert(response.data.msg)
        }
      })
      .catch((error) => alert(error))
    },
    setNoteClick: function() {
      if(this.currentUser == null || this.currentUser == ''){
        alert('请先登录')
        return
      }
      axios
      .post(destinationDNS+'/updateNote/' + this.currentUser, {
        note: this.note
      })
      .then((response) => {
        if (response.data.label) {
          alert(response.data.msg)
        } else {
          alert(response.data.msg)
        }
      })
      .catch((error) => alert(error))
    },
    getUserCount: function() {
      axios
      .get(destinationDNS+'/getUserCount')
      .then((response) => {
        this.userCount = response.data.userCount
      })
      .catch((error) => alert(error))
    },
    githubLink: function() {
      window.open('https://github.com/Sefaice')
    }
  }
}
</script>

<style>
:root {
  --purple: #503C58;
  --light-blue: #a9c5e6;
  --blue: #5C7EAB;
  --light-gray: #c3ccdb;
  --gray: #102026;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,arial,sans-serif;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-header {
  width: 100%;
  height: 180px;
  top: 0;
  background-color: var(--gray);
  overflow: hidden;
}

.app-main {
  width: 100%;
  height: calc(100vh - 240px);
  overflow: hidden;
}

.app-bottom {
  width: 100%;
  height: 60px;
  background-color: var(--gray);
  overflow: hidden;
}

.descp {
  text-align: center;
  color: var(--light-blue);
}

.descp-title {
  margin-top: 30px;
  font-size: 60px;
  font-weight: lighter;
}

.descp-subtitle {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bolder;
}

.userinfo {
  margin: auto;
  width: 300px;
}

.userinfo-usernum {
  margin-top: 30px;
  margin-left: 40px;
  font-size: 18px;
}

.userinfo-current {
  margin-top: 20px;
  margin-left: 40px;
  font-size: 18px;
}

.userinfo-signinbtn {
  margin-top: 20px;
  margin-left: 40px;
  width: 100px;
  height: 32px;
  font-size: 14px;
  border: none;
  color: white;
  background-color: var(--blue);
}

.userinfo-signupbtn {
  margin-top: 20px;
  margin-left: 20px;
  width: 100px;
  height: 32px;
  font-size: 14px;
  border: none;
  color: white;
  background-color: var(--blue);
}

.note {
  width: 600px;
  margin: auto;
  margin-top: 50px;
}

.note-content {
  width: 100%;
  height: calc(40vh);
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  font-size: 16px;
  color: #3a3f44;
  border: none;
  outline: none;
  text-align: top;
}

.note-getbtn {
  margin-top: 20px;
  margin-left: 190px;
  width: 100px;
  height: 32px;
  font-size: 14px;
  border: none;
  color: white;
  background-color: var(--blue);
}

.note-setbtn {
  margin-top: 20px;
  margin-left: 20px;
  width: 100px;
  height: 32px;
  font-size: 14px;
  border: none;
  color: white;
  background-color: var(--blue);
}

.bottom-link {
  float: right;
  display: inline-block;
  margin-right: 20px;
  margin-top: 24px;
  font-size: 16px;
  color: var(--light-gray);
}

.github-icon {
  float: right;
  display: inline-block;
  margin-top: 12px;
  margin-right: 80px;
  background-image: url('');
}

.github-icon:hover {
  cursor: pointer;
}
</style>
