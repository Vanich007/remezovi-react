import styled from 'styled-components'
import React from "react";
import * as VKID from '@vkid/sdk';
import {useLocation} from 'react-router-dom';
import {selectUser, setUser} from "../../features/user/userSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button} from "@mui/material";

VKID.Config.set({
    app: 51859285,
    redirectUrl: 'https://xn--b1afaixoj8g.xn--p1ai'
});

const VkContainer = styled.div`
  margin: 10px;
  left: 20px;
  top: 20px;
  //width: 200px;
  //height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding: 3px 10px;
  border-radius: 5%;
  background-color: #0077FF;
`
const VKAvatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: blue;
`
const VKName = styled.span`
  font-size: 18px;
  font-family: -apple-system, system-ui, "Helvetica Neue", Roboto, sans-serif;
  color: white;
`


export default function LoginVKButton({text='Войти VK'}) {


    let location = useLocation();

    const dispatch = useAppDispatch()


    const user = useAppSelector(selectUser)
    console.log('user from redux', user)
    React.useEffect(() => {
        // @ts-ignore
        const params = new URLSearchParams(location.search);
        const payload = params.get('payload')
        if (!payload) return;
        dispatch(setUser(JSON.parse(payload)));
    }, [location.search]);


    const loginVK = () => {
        // @ts-ignore
        VKID.Auth.login()
    }
    return <>
        {user ? <VkContainer><VKAvatar src={user.avatar}></VKAvatar>
        <VKName>{user.first_name}</VKName>
    </VkContainer> : <><Button variant="text" onClick={loginVK}>{text}</Button></>}
    </>
}