import React from "react";
import {createContext, useContext, useState} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useAuthContext} from "../AuthContext.jsx";
import axiosClient from "../../axios-client.js";
import {useProjectProtoContext} from "./ProjectProtoContext.jsx";
import ChatContext from "../../context/ChatContext.jsx";

Axios.defaults.baseURL = import.meta.env.VITE_APP_URL + "/api/v1/";
const StateContext = createContext();
export const ProjectContext = ({children}) => {
  const {user} = useAuthContext();
  // fetch project
  const {data: projects, refetch: projectsReFetch, isLoading: projectsIsLoading} = useQuery(['projects'], () => {
    return Axios.get('projects').then(({data}) => data.data);
  })
  const {
    data: projectLikes,
    refetch: projectLikesReFetch,
    isLoading: projectLikesIsLoading
  } = useQuery(['projectLikes'], () => {
    return Axios.get('project_likes').then(({data}) => data.data);
  })
  const {
    data: projectSaves,
    refetch: projectSavesReFetch,
    isLoading: projectSavesIsLoading
  } = useQuery(['projectSaves'], () => {
    return Axios.get('saved_projects').then(({data}) => data.data);
  })
  const {
    data: projectImages,
    refetch: projectImagesReFetch,
    isLoading: projectImagesIsLoading
  } = useQuery(['projectImages'], () => {
    return Axios.get('project_images').then(({data}) => data.data)
  })
  const {
    data: userLike,
    refetch: userLikeReFetch,
    isLoading: userLikeIsLoading
  } = useQuery(['userLike', user.id], () => {
    return Axios.get(`find_project/${user?.id}`).then((res) => {
      return res.data.data
    });
  })
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('')
  const {
    data: userComments,
    refetch: userCommentsReFetch,
    isLoading: userCommentsIsLoading
  } = useQuery(['userComments', user.id], () => {
    return Axios.get(`find_comment/${user?.id}`).then((res) => {
      return res.data.data
    });
  })

  const reFetchAll = async () => {
    await Promise.all([
      projectImagesReFetch(),
      projectsReFetch(),
      projectSavesReFetch(),
      projectLikesReFetch(),
      userLikeReFetch(),
    ])
    // await projectImagesReFetch()
    // await projectsReFetch()
    // await projectSavesReFetch()
    // await projectLikesReFetch()
    // await userLikeReFetch()
  }
  const likeNotiCount = userLike?.filter(pro => pro.user_id !== user?.id && pro.like_indicator === 1)?.length;
  const {postPrototype, clearPrototypes} = useProjectProtoContext();
  const [errors, setErrors] = useState({});
  const [picture, setPicture] = useState([]);
  const [file, setFile] = useState({});
  const [projectValues, setProjectValues] = useState({
    name: "",
    proposal: "",
    description: "",
    category: "",
    project_deadline: "",
    target_fund: "",
    funder_count: 0,
    like_count: 0,
    comment_count: 0,
    saved_count: 0,
    // image: picture,
    // file: file,
  })

  const handlePicture = (event) => {
    // console.log(event.target.files)
    setPicture([...event.target.files])

    // // check if input is image
    // if (event.target.attributes.accept.value.slice(0, 5) === event.target.files[0]?.type.slice(0, 5)) {
    //   setPicture(event.target.files[0]);
    //   setProjectValues({...projectValues, image: event.target.files[0]})
    // } else {
    //   setPicture('');
    // }
  }
  const handleFile = (event) => {
    if (event.length > 0) {
      setFile(event[0].file);
    } else {
      setFile(null)
    }
  }
  const clearProjectValues = () => {
    setErrors(null);
    setProjectValues({
      name: "",
      proposal: "",
      category: "",
      description: "",
      project_deadline: "",
      target_fund: "",
      funder_count: 0,
      like_count: 0,
      comment_count: 0,
      saved_count: 0,
    });
    setPicture([]);
    setFile(null);
  }
  const [isPosting, setIsPosting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const postProject = async (setModalOpen, user) => {
    setIsPosting(true);
    setErrors(null);
    projectValues.user_id = user.id;

    // to make sure that we have at least 1 image when we upload
    projectValues.image = picture[0];
    projectValues.file = file;

    try {
      await Axios.post('projects', projectValues, {
        headers: {"Content-type": "multipart/form-data"}
      }).then(async ({data}) => {
        const project_id = data?.id;
        await Axios.post('project_assets', {
          file: file,
          project_id: project_id
        }, {
          headers: {"Content-type": "multipart/form-data"}
        }).then(async () => {
          await Array.from(picture).forEach((pic) => {
            Axios.post('project_images', {
              image: pic,
              project_id: project_id
            }, {
              headers: {"Content-Type": "multipart/form-data"}
            })
          })
        }).then(async () => {
          await postPrototype(project_id);
        }).then(() => {
          reFetchAll()
          setIsPosting(false)
          // projectsReFetch();
          clearProjectValues();
          setModalOpen(false);
          setToastOpen(true);
        })
      })
    } catch (e) {
      setErrors(e.response.data.errors)
      setIsPosting(false)
    }

    // stop loading if posting
    setIsPosting(false);
  }
  const postLike = async (project) => {
    const likeTime = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').reverse().join('-') + ' ' + new Date().toTimeString().slice(0, 8);
    await Axios.post('checkLike', {
      user_id: user?.id,
      project_id: project.id
    }).then(async ({data}) => {
      if (!data) {
        await Axios.post('project_likes', {
          project_id: project.id,
          user_id: user?.id,
          like_state: 1,
          like_indicator: project?.user?.id === user?.id ? 0 : 1,
          like_time: likeTime,
        })
      } else {
        await Axios.put(`project_likes/${data.id}`, {
          like_state: !data.like_state,
          user_id: user?.id,
          project_id: project.id,
          like_indicator: project?.user?.id === user?.id ? 0 : !data.like_indicator,
          like_time: likeTime,
        })
      }
    }).then(() => {
      reFetchAll()
      // projectsReFetch();
      // userLikeReFetch();
    }).catch(e => console.log(e.response.data.errors))
  }

  const postSave = async (project) => {
    // console.log('saved')
    await Axios.post('checkUserSave', {
      project_id: project?.id,
      user_id: user?.id
    }).then(async ({data}) => {
      if (!data) {
        await Axios.post('saved_projects', {
          project_id: project?.id,
          user_id: user?.id,
          save_state: true,
        })
      } else {
        await Axios.put(`saved_projects/${data?.id}`, {...data, save_state: !data.save_state})
      }
    }).then(() => {
      // projectsReFetch()
      // projectSavesReFetch()
      reFetchAll()
    }).catch(e => console.log(e.response.data.errors))
  }
  const updateIndicator = async (project) => {
    if (project.like_indicator === 0)
      return
    await Axios.put(`project_likes/${project?.id}`, {...project, like_indicator: 0})
      .then(() => {
        // userLikeReFetch()
        reFetchAll()
      }).catch(e => console.log(e.response.data.errors))
  }

  const deleteProject = async (project) => {
    setIsPosting(true);

    await Axios.delete(`projects/${project?.id}`).then(() => {
      setIsPosting(false);
      reFetchAll();
    }).catch((e) => {
      console.log(e.response.data.errors);
    })
    setIsPosting(false)
  }
  return (
    <>
      <StateContext.Provider value={{
        deleteProject,
        searchInput,
        setSearchInput,
        modalOpen,
        setModalOpen,
        likeNotiCount,
        userComments,
        userCommentsIsLoading,
        userCommentsReFetch,
        reFetchAll,
        updateIndicator,
        userLike,
        projectSaves,
        projectSavesReFetch,
        projectSavesIsLoading,
        postSave,
        projectLikes,
        postLike,
        setErrors,
        errors,
        postProject,
        projectValues,
        setProjectValues,
        setPicture,
        picture,
        file,
        setFile,
        handleFile,
        handlePicture,
        projects,
        projectsReFetch,
        projectsIsLoading,
        setIsPosting,
        isPosting,
        setToastOpen,
        toastOpen,
      }}>
        {children}
      </StateContext.Provider>
    </>
  );
};

export const useProjectContext = () => useContext(StateContext);
