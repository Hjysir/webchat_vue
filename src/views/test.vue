<template>
  <div>
    <h2>WebSocket Chat</h2>
    <input v-model="username" placeholder="Your username">
    <button @click="subscribeToChatroom(chatroom)">Subscribe to Chatroom</button>
    <button @click="subscribeToPrivateMessage(username)">Subscribe to Private Message</button>
    <div>
      <input v-model="chatroom" placeholder="Chatroom name">
      <input v-model="broadcastMessage" placeholder="Broadcast message">
      <button @click="sendBroadcastMessage">Send to Chatroom</button>
    </div>
    <div>
      <input v-model="targetUsername" placeholder="Target username for private message">
      <input v-model="privateMessage" placeholder="Private message">
      <button @click="sendPrivateMessage">Send Private Message</button>
    </div>
    <div v-if="receivedMessages.length">
      <h3>Received Messages:</h3>
      <ul>
        <li v-for="(msg, index) in receivedMessages" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Stomp from 'stompjs';

export default {
  data() {
    return {
      stompClient: null,
      username: '',
      chatroom: '',
      broadcastMessage: '',
      privateMessage: '',
      targetUsername: '',
      receivedMessages: []
    };
  },
  mounted() {
    this.connectWebSocket();
  },

  methods: {
    connectWebSocket() {
      const socket = new SockJS('http://localhost:8080/ws'); // Adjust to your WebSocket URL
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        this.subscribeToChatroom();
      });
    },
    subscribeToChatroom(chatRoomName) {
      this.stompClient.subscribe('/topic/' + chatRoomName, message => {
        this.receivedMessages.push('Broadcast: ' + message.body);
      });
    },
    subscribeToPrivateMessage(username) {
      this.stompClient.subscribe('/user/' + username + '/queue/private', message => {
        console.log(message);
        this.receivedMessages.push('Private: ' + message.body);
      });
    },
    sendBroadcastMessage() {
      const sendUrl = `/app/ws/${this.chatroom}/${this.username}`;
      this.stompClient.send(sendUrl, {}, this.broadcastMessage);
    },
    sendPrivateMessage() {
      const sendUrl = `/app/ws/${this.targetUsername}`;
      this.stompClient.send(sendUrl, {}, this.privateMessage);
    }
  }
};
</script>
