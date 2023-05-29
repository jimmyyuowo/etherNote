<template>
    <div id="app">

        <div class="app-header">
            <div class="descp">
                <div class="descp-title">etherMsgBoard</div>
                <div class="descp-subtitle">A message board DAPP built on ethereum</div>
            </div>
        </div>
        <div class="app-main">
            <div class="chatinfo">
                <form action="#" method="">
                    <div class="form-group">
                        <label for="roomid">聊天室ID:</label>
                        <input type="text" name="roomid" id="roomid" v-model="roomid" placeholder="default" readonly>
                    </div>
                    <div class="form-group">
                        <label for="usename">用户名:</label>
                        <input type="text" name="username" id="username" v-model="username" placeholder="请输入名字">
                    </div>
                    <div class="form-group">
                        <p><label for="cont">留言内容:</label></p>
                        <textarea v-model="cont" placeholder="請輸入内容"></textarea>
                    </div>
                    <div class="form-group" style="text-align: center;">
                        <input type="button" value="添加" @click="add">
                        <input type="button" value="重新整理" @click="refresh">
                        <!--input type="reset" value="删除" @click="remove()"-->
                    </div>
                </form>
                <div v-show="this.arr.length == 0">暫無留言</div>
                <div class="card" v-for="item in arr" v-bind:key="item.id">
                    <div class="card-header">
                        <h6 class="card-title">{{ item.username }} , 發佈時間：{{ item.timer }}</h6>
                    </div>
                    <div class="card-body">
                        {{ item.cont }}
                    </div>
                </div>

                <Teleport to="body">
                    <!-- use the modal component, pass in the prop -->
                    <modal :show="showModal" @close="showModal = false">
                        <template #header>
                            <h3>請輸入聊天室ID:</h3>
                        </template>
                        <template #body>
                            <input type="text" class="form-control" id="chatroomid" ref="chatroomid" />
                        </template>
                        <template #footer>
                            <button id="show-modal" @click="onClickModalConfirm">確認</button>
                        </template>
                    </modal>
                </Teleport>
            </div>
        </div>
        <div class="app-bottom">
            <img class="github-icon" src="../assets/github.png" @click="githubLink">
            <div class="bottom-link">
                <span>built by </span>
                <span>Sefaice</span>
            </div>
        </div>

    </div>
</template>

<script>
import storeUtil from '../utils/mixins.js';
import Modal from './ModalView.vue'

export default {
    components: {
        Modal
    },
    mixins: [storeUtil],
    el: '#app',
    data: () => {
        return {
            username: '',
            cont: '',
            arr: [],
            // imgUrl: "./images/people.jpg",
            // imgUrl:"http://wx2.sinaimg.cn/bmiddle/006WWRhNgy1gbn1bc3itdj31410u0q7y.jpg",
            // index:0
            ctime: new Date(),
            showModal: true
        }
    },
    methods: {
        add() {
            this.arr.unshift({
                username: this.username,
                cont: this.cont,
                timer: this.getTime(new Date())
            });
            this.cont = "";
            console.log(this.arr);
            const rawObject = JSON.stringify(this.arr);
            this.setNote(this.roomid, rawObject);
        },

        async refresh() {
            const getNote = await this.getNote(this.roomid);
            console.log(getNote.note);
            if (getNote.note != '') {
                const jsonnote = JSON.parse(getNote.note);
                this.arr = jsonnote;
            }
        },

        remove(index) {
            this.arr.splice(index, 1);
        },

        getTime() {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var min = date.getMinutes();
            min = min < 10 ? ('0' + min) : min;
            var s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':'
                + s;
        },

        async onClickModalConfirm() {
            var chatroomid = this.$refs.chatroomid.value;
            if (chatroomid === '') {
                alert("請重新輸入")
                return
            }

            this.roomid = chatroomid
            this.showModal = false;
            if (await this.signin(chatroomid) === false) {
                if (await this.signup(chatroomid) === false) {
                    this.showModal = true;
                }
            }
            setInterval(() => {
                this.refresh()
            }, 1000)
        },

        githubLink: function () {
            window.open('https://github.com/jimmyyuowo/etherNote')
        },
    },

};

</script>

<style scoped>
#app {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, arial, sans-serif;
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

.form-group {
    margin-top: 10px;
}

.chatinfo {
    margin: auto;
    width: 400px;
}

.form-group textarea {
    resize: none;
    height: 144px;
    width: 391px;
    border-radius: 5px;
    padding-left: 16px;
    line-height: 16px;
    padding-top: 10px;
    font-size: 16px;
}

.card {
    width: 100%;
}
</style>