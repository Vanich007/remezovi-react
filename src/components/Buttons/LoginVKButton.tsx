import styled from 'styled-components'
import React, {useEffect, useState} from "react";
import * as VKID from '@vkid/sdk';
import {useLocation} from 'react-router-dom';
import type {CreateUserDto} from "../../features/user/userSlice";
import {selectUser, setUser} from "../../features/user/userSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button} from "@mui/material";
import {API_URL} from "../../api/api";
import {postData} from "../../features/user/userAPI";

VKID.Config.set({
    app: 51859285,
    redirectUrl: 'https://xn--b1afaixoj8g.xn--p1ai/editor'
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


export default function LoginVKButton({text = 'Войти VK', backUrl = 'https://xn--b1afaixoj8g.xn--p1ai/'}) {
    const [dtoUser, setDtoUser] = useState(undefined as CreateUserDto | undefined)
    // @ts-ignore
    // const {error: patchError, isFetching: patchIsFetching}=useAddUserQuery(dtoUser);
    let location = useLocation();

    const dispatch = useAppDispatch()


    const user = useAppSelector(selectUser)
    React.useEffect(() => {
        // @ts-ignore
        const params = new URLSearchParams(location.search);
        const payload = params.get('payload')
        if (!payload) return;
        const dto = JSON.parse(payload)
        dispatch(setUser(dto));

        const dtoUser: CreateUserDto = {
            firstName: dto.user.first_name,
            lastName: dto.user.last_name,
            id: dto.user.id,
            avatar: dto.user.avatar
        }
        setDtoUser(dtoUser)
        postData(`${API_URL}/users/add`, dtoUser)
    }, [location.search]);

    useEffect(() => {
        VKID.Config.set({
            app: 51859285,
            redirectUrl: backUrl
        });
    }, [backUrl]);


    const loginVK = () => {
        // @ts-ignore
        VKID.Auth.login()
    }
    return <>
        {user ? <VkContainer><VKAvatar src={user.avatar}></VKAvatar>
            <VKName>{user.first_name}</VKName>
        </VkContainer> : <><Button variant="contained" onClick={loginVK}>{text}</Button></>}
    </>
}