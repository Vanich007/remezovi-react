import React, {useCallback, useEffect, useRef, useState} from "react"
import type {Post,} from "./postsApiSlice";
import {useDeletePostQuery, useGetPostQuery,} from "./postsApiSlice"
import styled from 'styled-components'
import EditNoteIcon from '@mui/icons-material/EditNote';
import {IconButton, Tooltip} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectUserId} from "../../features/user/userSlice";
import {
    DeleteSweep, ExpandCircleDown,
} from "@mui/icons-material";
import AlertDialog from "../Dialogs/AlertDialog";
import {selectCategiries} from "./categoriesSlice";

const MAX_HEIGHT = 260

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
  padding: 15px 15px 30px;
  position: relative;
`
const Title = styled.h2`
  font-size: 20px;
  text-decoration: none;
`;
const Text = styled.p`
  font-size: 16px;
  //letter-spacing: 20px;
`;
const Category = styled.p`
  font-size: 12px;
  //letter-spacing: 20px;
`;

const Container = styled.div`
  //position: absolute;
  top: 10px;
  right: 40px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  padding: 3px 10px;
  border-radius: 5%;
  //background-color: #0077FF;
`
const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  //background-color: blue;
`
const ShowMorePlate = styled.div`
  position: absolute;
  bottom: -10px;
  right: 105px;
  transform: ${({showMore}) => showMore ? 'rotate(180deg)' : 'none'};
  transition: .7s;
  width: 40px;
  height: 40px;
  //background-color: blue;
`
const Hr = styled.hr`
  height: 0;
  width: 100%;
  background: linear-gradient(#0077FF, pink);
  border: none;
  box-shadow: 0 0 10px 1px #0077FF;
`

export const FullPostItem = () => {
    const [idToDelete, setIdToDelete] = useState<number>(0)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    const ref = useRef(null)

    const userId = useAppSelector(selectUserId)
    let {id} = useParams();
    const {} = useDeletePostQuery({idToDelete});
    const {data: post} = useGetPostQuery({id});


    const cancelCb = useCallback(() => {
        setShowDeleteDialog(false);
        setShowDeleteDialog(false)
    }, [id])
    const agreeCb = useCallback(() => {
        if (id) setIdToDelete(+id);
        setShowDeleteDialog(false)
    }, [id])

    // @ts-ignore
    return <>{post && <Wrapper>

        <Container>
            {post.user &&
                <Tooltip title={`${post.user.firstName} ${post.user.lastName}`}><Avatar
                    src={post.user.avatar}></Avatar></Tooltip>}
            <Link to={`/post/${id}`}><Title>{post.title}</Title></Link> / {post.category &&
            <Category>{post.category.name}</Category>}
            {userId && userId === post.author &&
                <Link to={`/editor/${id}`}><Tooltip
                    title={`Это Ваш пост, Вы можете его редактировать.`}><IconButton color={'info'}>
                    <EditNoteIcon/>
                </IconButton></Tooltip></Link>}
            {userId && userId === post.author &&
                <Tooltip title={`Удалить пост`}><IconButton color={'info'} onClick={() => setShowDeleteDialog(true)}>
                    <DeleteSweep/>
                </IconButton></Tooltip>
            }
        </Container>


        <Text dangerouslySetInnerHTML={{__html: post.text}}></Text>

        {showDeleteDialog &&
            <AlertDialog cancelCb={cancelCb} agreeCb={agreeCb}
                         title={'Подтвердите удаление'} text={`Удалить пост "${post.title}"`}/>

        }
    </Wrapper>}

    </>
}
