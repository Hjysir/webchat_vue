
// -----------------------------------------------------------------------------------------------


import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 你的 Spring Boot 应用程序的 URL
})

export const sendLogin = (name, password) => {
    return instance.post('/api/login', { name, password })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to login:', error)
            throw error
        })
}

export const sendRegister = (name, password, email) => {
    return instance.post('/api/register', { name, password, email })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to register:', error)
            throw error
        })
}

export const createChat = (username, chatname, flag) => {
    return instance.post(`/api/createchatroom/${username}/${ flag }`, {chatname})
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

export const addChatMember = (username, name,flag) => {
    return instance.post(`/api/joinchatroom/${username}`, {name},{flag})
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

export const getChatMessages = (chatRoomname) => {
    return instance.get(`/api/gethistory/${chatRoomname}`)
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

export const changePassword = (userName, newPassword) => {
    return instance.post(`/api/updatepassword/${userName}`, { newPassword })
        .then(response => response.data)
        .catch(error => {
            console.error('Failed to change password:', error)
            throw error
        })
}






// ----------------------------------------------------------------------------------------










// 获取聊天历史记录
// export const getHistoryMsg = (chatName,tag) => {
//     return instance.post(`/api/gethistory/${chatName}${tag}?'/${tag}':''`)
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error(error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }
// export const getHistoryMsg = (name, tag) => {
//     // 检查 chatName 和 tag 是否有有效值
//     // if (!tag) {
//     //     throw new Error('tag 不能为空');
//     // }
//     // if (!chatName) {
//     //     throw new Error('chatName 和不能为空');
//     // }
//
//
//
//     // 构造正确的 URL
//     const url = tag ? `/api/gethistory/${name}/${tag}` : `/api/gethistory/${name}`;
//
//     // 发送 POST 请求
//     return instance.post(url)
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error(error); // 在控制台打印错误
//             throw error; // 抛出错误以供调用者处理
//         });
// }










export const getHistoryMsg = (name, tag) => {
    if (!name) {
        throw new Error('chatName 不能为空');
    }
    const url = tag ? `/api/gethistory/${name}/${tag}` : `/api/gethistory/${name}`;
    return instance.post(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
    throw error;
});
}



