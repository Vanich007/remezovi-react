import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser, setUser} from "../../features/user/userSlice";
import React, {useCallback, useState} from "react";
import {Editor} from "./Editor";
import type {Post} from "./postsApiSlice";
import { useGetPostQuery} from "./postsApiSlice";

export default function EditorContainer({text = 'Войти VK'}) {

const [postId, setPostId] = useState<number>(0)
const [post, setPost] = useState<Post>()
    let location = useLocation();
    let {id} = useParams();

    const {data, error, isFetching}=useGetPostQuery({id: `${postId}`});

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        if(id)setPostId(+id)
    }, [id]);

    React.useEffect(() => {
        setPost(data)
    }, [data]);
    return <Editor post={post}/>
}