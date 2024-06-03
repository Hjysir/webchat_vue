// // 导入axios库用于发送HTTP请求
// import axios from 'axios'

// // 创建一个axios实例，设置基础URL为你的Spring Boot应用程序的URL
// const instance = axios.create({
//     baseURL: 'http://localhost:8080', // 你的 Spring Boot 应用程序的 URL
// })

// // 发送登录请求的函数
// export const sendLogin = (userName, passWord) => {
//     return instance.post('/api/login', { userName, passWord}) // 向 /api/login 发送包含用户名和密码的POST请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('登录失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 发送注册请求的函数
// export const sendRegister = (userName, passWord, email) => {
//     return instance.post('/api/register', { userName, passWord, email }) // 向 /api/register 发送包含用户名、密码和电子邮件的POST请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('注册失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 创建聊天室的函数
// export const createChat = (userId, name) => {
//     return instance.post(`/api/createchatroom/${userId}`, { name }) // 向 /api/createchatroom 发送包含用户ID和聊天室名称的POST请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('创建聊天室失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 删除聊天室的函数
// export const deleteChat = (name) => {
//     return instance.delete(`/api/deletechatroom/${name}`) // 向 /api/deletechatroom 发送包含聊天室名称的DELETE请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('删除聊天室失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 添加聊天室成员的函数
// export const addChatMember = (username, name) => {
//     return instance.post(`/api/joinchatroom/${username}`, {name}) // 向 /api/joinchatroom 发送包含用户名和聊天室名称的POST请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('添加聊天室成员失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 移除聊天室成员的函数
// export const removeChatMember = (username, name) => {
//     return instance.delete(`/api/leavechatroom/${username}`, {data: name}) // 向 /api/leavechatroom 发送包含用户名和聊天室名称的DELETE请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('移除聊天室成员失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 获取聊天室详情的函数
// export const getChatRoom = (chatRoomName) => {
//     return instance.get(`/api/getchatroom/${chatRoomName}`) // 向 /api/getchatroom 发送包含聊天室名称的GET请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('获取聊天室详情失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 发送聊天室消息的函数
// export const sendChatMessage = (chatRoomName, message) => {
//     return instance.post(`/api/sendmessage/${chatRoomName}`, { message }) // 向 /api/sendmessage 发送包含聊天室名称和消息内容的POST请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('发送聊天室消息失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 获取聊天室消息的函数
// export const getChatMessages = (chatRoomname) => {
//     return instance.get(`/api/getmessage/${chatRoomname}`) // 向 /api/getmessage 发送包含聊天室名称的GET请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('获取聊天室消息失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 获取用户的聊天室列表的函数
// export const getChatList = (userName) => {
//     return instance.get(`/api/getchatlist/${userName}`) // 向 /api/getchatlist 发送包含用户名的GET请求
//         .then(response => {
//             return response.data // 如果成功，返回响应数据
//         })
//         .catch(error => { // 如果有错误
//             console.error('获取聊天室列表失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 注销用户的函数
// export const apilogout = (userName) => {
//     return instance.get(`/api/logout/${userName}`) // 向 /api/logout 发送包含用户名的GET请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('注销失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }

// // 更改用户密码的函数
// export const changePassword = (userName, newPassword) => {
//     return instance.post(`/api/updatepassword/${userName}`, { newPassword }) // 向 /api/updatepassword 发送包含用户名和新密码的POST请求
//         .then(response => response.data) // 如果成功，返回响应数据
//         .catch(error => { // 如果有错误
//             console.error('更改密码失败:', error) // 在控制台打印错误
//             throw error // 抛出错误以供调用者处理
//         })
// }


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



