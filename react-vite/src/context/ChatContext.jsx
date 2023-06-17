import {createContext, useCallback, useContext, useEffect, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "./AuthContext.jsx";
import InvoiceContext from "./InvoiceContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
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
  const [messageImage, setMessageImage] = useState('')
  const [messagePost, setMessagePost] = useState({});

  const checkChatExist = (newChat) => {
    if (!chatLoading) {
      return chats.some((copy) => {
        return (copy.sender_id === newChat.sender_id && copy.receiver_id === newChat.receiver_id) || (copy.sender_id === newChat.receiver_id && copy.receiver_id === newChat.sender_id)
      })
    }
  };

  const getLatestMessage = (sender, receiver) => {
    return findChat(sender, receiver)?.messages[findChat(sender, receiver)?.messages.length - 1];
  }

  const setSeen = (userMessage, receiver) => {
    if (userMessage?.length === 0) {
      return;
    }
    userMessage?.forEach(async (usrMsg) => {
      if (usrMsg.sender_id !== receiver) {
        usrMsg.is_read = 1;
        try {
          await Axios.patch(`message/${usrMsg.id}`, usrMsg);
        } catch (e) {
          console.log(e.response.data.errors);
        }
      }
    })
  };

  const initChat = async (sender, receiver) => {
    const newChat = {
      sender_id: sender,
      receiver_id: receiver,
    }
    if (!checkChatExist(newChat)) {
      try {
        await Axios.post('chat', newChat);
      } catch (msg) {
        console.log(msg.response.data.errors);
      }
    }
  };
  const findChat = (sender, receiver) => {
    return chats?.find((chat) => ((chat.sender_id === sender && chat.receiver_id === receiver) || (chat.sender_id === receiver && chat.receiver_id === sender)));
  }

  const handleMessage = (event, setMessageInput) => {
    setMessageInput(event.target.value);
    setMessagePost({
      msg_content: event.target.value.trim(),
    });
  }

  const clearMessage = (setMessageInput) => {
    setMessageInput('');
    setMessagePost({});
    setMessageImage('');
  };

  const sendMessage = async (sender, receiver, setMessageInput) => {
    const tempDate = new Date();
    const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
    if (messageImage !== '' || messagePost.msg_content) {
      messagePost.image = messageImage;
      messagePost.receiver_id = receiver;
      messagePost.chat_id = findChat(user?.username, receiver)?.id;
      messagePost.sender_id = user?.username;
      messagePost.time_sent = currentDate;
      messagePost.is_read = 0;
      setMessagePost({...messagePost});
      try {
        await Axios.post('message', messagePost, {
          headers: {'Content-Type': "multipart/form-data"}
        });
        await messageReFetch();
        clearMessage(setMessageInput);
      } catch (msg) {
        console.log(msg.response.data.errors);
      }
    }
  }
  return (
    <>
      <ChatContext.Provider value={{
        clearMessage,
        messageImage,
        checkChatExist,
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
        setMessagePost
      }}>
        {children}
      </ChatContext.Provider>
    </>
  );
};
export default ChatContext;
