import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 你的 Spring Boot 应用程序的 URL
})

export const sendLogin = (userName, passWord) => {
    return instance.post('/api/login', { userName, passWord})
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to login:', error)
            throw error
        })
}

export const sendRegister = (userName, passWord, email) => {
    return instance.post('/api/register', { userName, passWord, email })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to register:', error)
            throw error
        })
}

export const createChat = (userId, name) => {
    return instance.post(`/api/createchatroom/${userId}`, { name })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to create chat:', error)
            throw error
        })
}

export const deleteChat = (name) => {
    return instance.delete(`/api/deletechatroom/${name}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to delete chat:', error)
            throw error
        })
}

export const addChatMember = (username, name) => {
    return instance.post(`/api/joinchatroom/${username}`, {name})
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to add chat member:', error)
            throw error
        })
}

export const removeChatMember = (username, name) => {
    return instance.delete(`/api/leavechatroom/${username}`, {data: name})
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to remove chat member:', error)
            throw error
        })
}

export const getChatRoom = (chatRoomName) => {
    return instance.get(`/api/getchatroom/${chatRoomName}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to get chat room:', error)
            throw error
        })
}

export const sendChatMessage = (chatRoomName, message) => {
    return instance.post(`/api/sendmessage/${chatRoomName}`, { message })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to send chat message:', error)
            throw error
        })
}

export const getChatMessages = (chatRoomname) => {
    return instance.get(`/api/getmessage/${chatRoomname}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to get chat messages:', error)
            throw error
        })
}

export const getChatList = (userName) => {
    return instance.get(`/api/getchatlist/${userName}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Failed to get chat list:', error)
            throw error
        })
}

export const apilogout = (userName) => {
    return instance.get(`/api/logout/${userName}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to logout:', error)
            throw error
        })
}

export const changePassword = (userName, newPassword) => {
    return instance.post(`/api/updatepassword/${userName}`, { newPassword })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to change password:', error)
            throw error
        })
}