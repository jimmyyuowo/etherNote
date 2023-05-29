import axios from 'axios'

var destinationDNS = "http://localhost:3000";

// 全站共用的 function，會注入每個 component 當中
export default {
    methods: {
        // 標註千分位
        formatComma(str) {
            return str ? str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : str
        },
        async signup(username) {
            return axios.post(destinationDNS + '/signup', {
                username: username
            })
                .then((response) => {
                    console.log(response.data)
                    alert(response.data.msg)
                    if (response.data.label) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch((error) => alert(error))
        },
        async signin(username) {
            return axios.post(destinationDNS + '/signin', {
                username: username
            }).then((response) => {
                console.log(response.data)
                alert(response.data.msg)
                if (response.data.label) {
                    return true;
                } else {
                    return false;
                }
            }).catch((error) => alert(error))
        },
        async getNote(username) {
            return axios.get(destinationDNS + '/getNote/' + username)
                .then(response => {
                    console.log(response.data)
                    if (response.data.label) {
                        return response.data
                    } else {
                        alert(response.data.msg)
                        throw new Error(response.data.msg)
                    }
                }).catch((error) => alert(error))
        },
        setNote(username, note) {
            console.log(username);
            console.log(note);
            axios.post(destinationDNS + '/updateNote/' + username, {
                note: note
            }).then((response) => {
                if (response.data.label) {
                    alert(response.data.msg)
                    return true;
                } else {
                    alert(response.data.msg)
                    return false;
                }
            }).catch((error) => alert(error))
        }
    }
}