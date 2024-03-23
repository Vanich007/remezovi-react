import {useEffect, useState} from "react"
import type {CreatePostDto, PatchPostDto, Post} from "./postsApiSlice";
import {useAddPostMutation, usePatchPostMutation} from "./postsApiSlice"
import styled from 'styled-components'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageUploader from "quill-image-uploader";
import { Quill } from "react-quill";

import {API_URL} from "../../api/api";
import {Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectUser, selectUserId} from "../../features/user/userSlice";
import LoginVKButton from "../Buttons/LoginVKButton";
import {selectCategiries} from "./categoriesSlice";


Quill.register("modules/imageUploader", ImageUploader);

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    // clipboard: {
    //     // toggle to add extra line breaks when pasting HTML:
    //     matchVisual: false,
    // },
    imageUploader: {
        upload: (file: any) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("image", file);

                fetch(
                    `${API_URL}/post-image/`,
                    {
                        method: "POST",
                        body: formData
                    }
                )
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result.url);
                        resolve(result.url);
                    })
                    .catch((error) => {
                        reject("Upload failed");
                        console.error("Error:", error);
                    });
            });
        }
    }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

const options = [5, 10, 20, 30]

const Wrapper = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
`

export const Editor = ({post}: {post: Post|undefined}) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(0);
    const [id, setId] = useState(0);

    // @ts-ignore
    const [addPost, { isError: addError }]=useAddPostMutation();
    // @ts-ignore
    const [patchPost, { isError: patchError }]=usePatchPostMutation();
    const userId = useAppSelector(selectUserId)
    const categories = useAppSelector(selectCategiries)
    const saveHandler = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!id){
            const dto:CreatePostDto = {text, title, author: userId, category}
            addPost(dto)
        } else {
            console.log('patch')
            const dto: PatchPostDto = {text, title, author:userId, id, category}
            patchPost(dto)
        }

    }

    useEffect(()=>{
        if (!post) return;
        if(post.title) setTitle(post.title);
        if(post.text) setText(post.text);
        if(post.id) setId(post.id);
        if(post.category) setCategory(post.category.id);
    },[post])

    return     <Wrapper>
        {userId ? <>
                <OutlinedInput placeholder={'Название'}  value={title} onChange={(event)=>setTitle(event.target.value)}/>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Age"
                    onChange={(event)=>setCategory(+event.target.value)}
                >
                    {categories.map(c=><MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}

                </Select>
            </FormControl>
            {/*@ts-ignore*/}
        <ReactQuill modules={modules} formats={formats} theme="snow" value={text} onChange={setText} />
        <Button variant="text" onClick={saveHandler}>Сохранить</Button></> : <LoginVKButton text={"Для редактирваниям поста залогиньтесь в VK"} backUrl={post&&post.id ? `https://xn--b1afaixoj8g.xn--p1ai/editor/${post.id}`:'https://xn--b1afaixoj8g.xn--p1ai/editor'}/>
    }
    </Wrapper>

  // const [numberOfQuotes, setNumberOfQuotes] = useState(10)
  // // Using a query hook automatically fetches data and returns query values
  // const { data, isError, isLoading, isSuccess } =
  //   useGetQuotesQuery(numberOfQuotes)
  //
  // if (isError) {
  //   return (
  //     <div>
  //       <h1>There was an error!!!</h1>
  //     </div>
  //   )
  // }
  //
  // if (isLoading) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }
  //
  // if (isSuccess) {
  //   return (
  //     <div className={styles.container}>
  //       <h3>Select the Quantity of Quotes to Fetch:</h3>
  //       <select
  //         className={styles.select}
  //         text={numberOfQuotes}
  //         onChange={e => {
  //           setNumberOfQuotes(Number(e.target.text))
  //         }}
  //       >
  //         {options.map(option => (
  //           <option key={option} text={option}>
  //             {option}
  //           </option>
  //         ))}
  //       </select>
  //       {data.quotes.map(({ author, quote, id }) => (
  //         <blockquote key={id}>
  //           &ldquo;{quote}&rdquo;
  //           <footer>
  //             <cite>{author}</cite>
  //           </footer>
  //         </blockquote>
  //       ))}
  //     </div>
  //   )
  // }
  //
  // return null
}
