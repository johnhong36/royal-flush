var socket = io();

// Tells the player whether or not they were able ot join
socket.on('joinResult', function(message) {
    document.getElementById("confirmationMessage").innerHTML = message;
});

// Moves to the game with the room name being transferred over
socket.on('startGame', function(room) {
    window.location.href = "player_game.html?room="+room;
});

const App = new Vue({
    el: '#app',
    data: {
        inputCode: "",
        username: "",
        startStack: "200",
        userId: ""
    },
    methods: {
        join() {
            var intStack = parseInt(this.startStack, 10);
            socket.emit('joinRoom', this.inputCode, this.username, this.userId, intStack);
        }
    },
    beforeMount() {
        console.log(window.location.host);
        // Sets the variable username
        this.$http.get('http://' + window.location.host + '/getName').then(response => {
            this.username = response.body;
            console.log(this.username);
        });

        // Grabs the userID from the database 
        this.$http.get('http://' + window.location.host + '/getUserId').then(response => {
            this.userId = response.body;
        });
    }
});
