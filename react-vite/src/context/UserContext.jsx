import {createContext, useState, useEffect} from "react";
import Axios from "axios";
import {useQuery} from "@tanstack/react-query";


Axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [admin,setAdmin] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    username:"",
    password:"",
    new_password:"",
    password_confirmation:"",
  })
  const [errors, setErrors] = useState({})

  const getAdmin = async () => {
    const apiItems = await Axios.get("getAdmin");
    setAdmin(apiItems.data.data[0])
  }
  const {data: usersQuery, refetch: usersQueryReFetch} = useQuery(['users'], () => {
    return Axios.get('users').then(res => {
      setUsers(res.data.data);
      return res.data.data;
    })
  })

  const getUsers = async () => {
    const apiItems = await Axios.get("users");
    setUsers(apiItems.data.data);
  };

  const storeUser = async (e) => {
    e.preventDefault()
    try {
      await Axios.post("users", formValues)
      location.reload()
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors)
      }
    }
  }
  const onChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]: value})
  }

  const getUser = async (id) => {
    const response = await Axios.get(`users/${id}`)
    const apiItem = response.data.data
    setUser(apiItem);
    setFormValues({
      firstName: apiItem.firstName,
      lastName: apiItem.lastName,
      gender: apiItem.gender,
      phoneNumber: apiItem.phoneNumber,
      email: apiItem.email,
      username:apiItem.username,
      password:"",
      new_password:"",
      password_confirmation:"",
    })
  };

  const updateUser = async (e) => {
    e.preventDefault()
    try {
      await Axios.put("users/" + user.id, formValues)
      resetFormValues()
      history.back()
    } catch (msg) {
      if (msg.response.status === 422) {
        setErrors(msg.response)
      }
    }
  }

  const resetFormValues = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      gender: "",
      phoneNumber: "",
      email: "",
      username:"",
      password:"",
      new_password: "",
      password_confirmation:"",
    })
  }

  const updatePassword = async (e) => {
    e.preventDefault()
    try {
      await Axios.put("users/" + user.id + "/change-password", formValues)
      resetFormValues()
      history.back()
    } catch (msg) {
      if (msg.response.status === 422) {
        setErrors(msg.response)
      }
    }
  }

  return <UserContext.Provider
    value={{
      usersQuery,
      usersQueryReFetch,
      users,
      user,
      formValues,
      setFormValues,
      errors,
      storeUser,
      getUsers,
      getUser,
      onChange,
      updateUser,
      updatePassword,
      getAdmin,
      admin
    }}>{children}</UserContext.Provider>;
};

export default UserContext;
