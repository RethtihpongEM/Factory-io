import React from "react";
import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../AuthContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL + "/api/v1/";
const StateContext = createContext();
export const CommentContext = ({children}) => {
  const {data: comments, isLoading: commentsIsLoading, refetch: commentsReFetch} = useQuery(['comments'], () => {
    return Axios.get('comments').then(({data}) => data.data);
  })
  const {
    data: commentNotification,
    isLoading: commentNotificationIsLoading,
    refetch: commentNotificationReFetch
  } = useQuery(['commentNotification'], () => {
    return Axios.get('comment_notification').then(({data}) => data.data)
  })
  const [cmtErrors, setCmtErrors] = useState([]);
  const {user} = useAuthContext();
  const [commentInput, setCommentInput] = useState('');
  const [picture, setPicture] = useState(null);
  const [replyOpen, setReplyOpen] = useState(0);
  const [row, setRow] = useState(1); // text area row
  // const [cmtOpen, setCmtOpen] = useState(false);

  const commentNotiCount = parseInt(comments?.filter(cmt => cmt?.project?.user_id === user?.id && cmt?.user_id !== user?.id && !cmt.parent_id && cmt?.comment_seen === 0)?.length) +
    parseInt(comments?.filter(cmt => cmt?.replier_id === user?.id && cmt?.comment_seen === 0)?.length)
  const handleCommentInput = (event) => {
    if (event.target.value !== '\n' && event.target.value !== ' ')
      setCommentInput(event.target.value);
    setCmtErrors([])
  }
  const clearComment = () => {
    setCommentInput('');
    setPicture(null);
    setRow(1)
  }
  const reFetchAll = async () => {
    await commentsReFetch();
    await commentNotificationReFetch()
  }
  const [postCmtLoading, setPostCmtLoading] = useState(false);
  const submitComment = async (project, cmt) => {
    const comment_time = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').reverse().join('-') + ' ' + new Date().toTimeString().slice(0, 8);
    if (commentInput !== '' || picture) { // check whether we have at least a picture or message before submit
      setPostCmtLoading(true);
      await Axios.post('comments', {
        project_id: project.id,
        user_id: user?.id,
        comment_time: comment_time,
        body: commentInput,
        image: picture,
        parent_id: cmt?.id || null,
        replier_id: cmt?.user_id !== user?.id ? cmt?.user_id : null,
        comment_seen: 0,
        comment_indicator:
          (!cmt?.user_id && project?.user?.id === user?.id) || (cmt?.user_id === user?.id && project?.user?.id === user?.id) ? 0 :
            project?.user?.id !== user?.id && !cmt ? 1 :
              project?.user?.id !== user?.id && cmt?.user_id === user?.id ? 1 :
                project && cmt?.user_id !== user?.id && 2
      }, {headers: {"Content-type": "multipart/form-data"}}).then(({data}) => {
        reFetchAll();
        clearComment();
        setPostCmtLoading(false);
      }).catch(e => {
        setCmtErrors(e.response.data.errors)
        console.log(e.response.data.errors)
      })
    }
    setPostCmtLoading(false)
  }

  const handlePicture = (event) => {
    setCmtErrors([])
    setPicture(event.target.files[0])
  }

  const updateCommentIndi = async (cmt) => {
    if (cmt?.comment_seen === 1)
      return
    await Axios.put(`comments/${cmt?.id}`, {...cmt, comment_seen: 1}).then(() => {
      cmt?.replies.forEach(reply => {
        updateCommentIndi(reply) // recursively update child comments of parent
      })
    }).then(() => {
      reFetchAll()
    }).catch(e => {
      console.log(e.response.data.errors)
    })
  }

  return (
    <StateContext.Provider value={{
      // cmtOpen,
      // setCmtOpen,
      postCmtLoading,
      setPostCmtLoading,
      updateCommentIndi,
      commentNotiCount,
      commentNotificationIsLoading,
      commentNotification,
      commentNotificationReFetch,
      row,
      setRow,
      cmtErrors,
      setCmtErrors,
      setReplyOpen,
      replyOpen,
      setPicture,
      picture,
      handlePicture,
      submitComment,
      comments,
      commentsIsLoading,
      commentsReFetch,
      handleCommentInput,
      setCommentInput,
      commentInput,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useCommentContext = () => useContext(StateContext);
