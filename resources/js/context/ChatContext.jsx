import React, {useRef} from "react";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import InvoiceContext from "./InvoiceContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL + "/api/v1/";
const ChatContext = createContext();
export const ChatProvider = ({children}) => {
  const {user} = useAuthContext();
  // const [chatCopy, setChatCopy] = useState([]);
  const {data: chats, refetch: chatReFetch, isLoading: chatLoading} = useQuery(['chat'], () => {
    return Axios.get('chat').then((res) => {
      // setChatCopy(res.data.data);
      return res.data.data;
    });
  })
  const {data: message, refetch: messageReFetch, isLoading: messageLoading} = useQuery(['message'], () => {
    return Axios.get('message').then((res) => res.data.data);
  });
  const [chatErrors, setChatErrors] = useState([]);
  const [messageImage, setMessageImage] = useState(null)
  const [messagePost, setMessagePost] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const chatScroll = useRef(null);

  const getLatestMessage = (sender, receiver) => {
    return getChat(sender, receiver)[0]?.messages[getChat(sender, receiver)[0].messages?.length - 1];
  }

  const setSeen = (userMessage, receiver) => {
    if (userMessage?.length === 0) {
      return;
    }

    userMessage?.forEach(async (usrMsg) => {
      if (usrMsg.sender_id !== receiver) {
        // usrMsg.is_read = 1;
        try {
          await Axios.put(`message/${usrMsg.id}`, {...usrMsg, is_read: 1}).then(() => {
            messageReFetch();
          });
        } catch (e) {
          setChatErrors(e.response.data.errors)
          // console.log(e.response.data.errors);
        }
      }
    })
  };

  const initChat = async (sender, receiver) => {
    const newChat = {
      sender_id: sender,
      receiver_id: receiver,
    }
    try {
      await Axios.post('chat', newChat).then(async ({data}) => {
        chatReFetch()
      });
    } catch (msg) {
      setChatErrors(msg.response.data.errors)
      // console.log(msg.response.data.errors);
    }
    // if (!checkChatExist(newChat)) {
    //   try {
    //     await Axios.post('chat', newChat).then(async ({data}) => {
    //       chatReFetch()
    //     });
    //   } catch (msg) {
    //     setChatErrors(msg.response.data.errors)
    //     // console.log(msg.response.data.errors);
    //   }
    // }
  };
  const findChat = (sender, receiver) => {
    // if (!chats?.find((chat) => ((chat.sender_id === sender && chat.receiver_id === receiver) || (chat.sender_id === receiver && chat.receiver_id === sender)))) {
    //   chatReFetch()
    //   return Axios.get(`getChat/${sender}/${receiver}`).then(({data}) => data);
    // }
    return chats?.find((chat) => ((chat.sender_id === sender && chat.receiver_id === receiver) || (chat.sender_id === receiver && chat.receiver_id === sender)));
  }

  const getChat = (sender, receiver) => {
    return chats?.filter(chat => chat.sender_id === sender && chat.receiver_id === receiver || chat.sender_id === receiver && chat.receiver_id === sender);
  }

  const handleMessage = (event) => {
    if (event.target.value !== ' ') {
      setMessageInput(event.target.value);
    }
  }

  const clearMessage = () => {
    setMessageInput('');
    setMessagePost({});
    setMessageImage(null);
  };

  const [loadingSend, setLoadingSend] = useState(false);

  const sendMessage = async (sender, receiver) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    setLoadingSend(true);
    if (messageImage || messageInput !== '') {
      console.log(messageInput)
      // console.log(loadingSend)
      messagePost.msg_content = messageInput;
      messagePost.image = messageImage;
      messagePost.receiver_id = receiver;
      // messagePost.chat_id = findChat(user?.username, receiver)?.id ?? await findChat(user?.username, receiver)?.then(res => res.id);
      // messagePost.chat_id = getChat(user?.username, receiver)[0]?.id || await findChat(user?.username, receiver)?.then(res => res.id);
      messagePost.chat_id = getChat(user?.username, receiver)[0]?.id;
      messagePost.sender_id = user?.username;
      messagePost.time_sent = currentDate;
      messagePost.is_read = 0;
      setMessagePost({...messagePost});
      try {
        await Axios.post('message', messagePost, {
          headers: {'Content-Type': "multipart/form-data"}
        }).then(async () => {
          await messageReFetch();
          await chatReFetch();
          clearMessage();
          setLoadingSend(false);
        });
        chatScroll.current?.scrollIntoView({behavior: "smooth"});
      } catch (msg) {
        setChatErrors(msg.response.data.errors)
      }
    } else {
      setLoadingSend(false);
    }
  }
  const autoSendMessage = async (sender, receiver, msg) => {
    messagePost.msg_content = msg
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    if (messageImage || messageInput !== '') {
      messagePost.image = messageImage;
      messagePost.receiver_id = receiver;
      // messagePost.chat_id = findChat(user?.username, receiver)?.id ?? await findChat(user?.username, receiver)?.then(res => res.id);
      // messagePost.chat_id = getChat(user?.username, receiver)[0]?.id || await findChat(user?.username, receiver)?.then(res => res.id);
      messagePost.chat_id = getChat(user?.username, receiver)[0]?.id;
      messagePost.sender_id = user?.username;
      messagePost.time_sent = currentDate;
      messagePost.is_read = 0;
      setMessagePost({...messagePost});
      try {
        await Axios.post('message', messagePost, {
          headers: {'Content-Type': "multipart/form-data"}
        }).then(async () => {
          await messageReFetch();
          await chatReFetch()
          // setMessageImage('')
          chatScroll.current?.scrollIntoView({behavior: "smooth"});
          clearMessage()
        });
      } catch (msg) {
        console.log(msg)
      }
    }
  }

  return (
    <>
      <ChatContext.Provider value={{
        loadingSend,
        setLoadingSend,
        setMessageInput,
        messageInput,
        getChat,
        chatErrors,
        setChatErrors,
        clearMessage,
        messageImage,
        // checkChatExist,
        setSeen,
        getLatestMessage,
        findChat,
        initChat,
        chats,
        handleMessage,
        chatReFetch,
        sendMessage,
        message,
        messageReFetch,
        setMessageImage,
        setMessagePost,
        autoSendMessage,
        chatScroll,
      }}>
        {children}
      </ChatContext.Provider>
    </>
  );
};
export default ChatContext;
