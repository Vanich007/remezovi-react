import React, {useMemo, useState} from "react"
import type {CreatePostDto, Post} from "./postsApiSlice";
import { useAddPostQuery} from "./postsApiSlice"
import styled from 'styled-components'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageUploader from "quill-image-uploader";
import { Quill } from "react-quill";

import {API_URL} from "../../api/api";
import {Button, OutlinedInput } from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectUser, selectUserId} from "../../features/user/userSlice";
import LoginVKButton from "../Buttons/LoginVKButton";


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

export const Editor = () => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState(undefined as CreatePostDto | undefined);
    // @ts-ignore
    const {data, error, isFetching}=useAddPostQuery(query);
    const saveHandler = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const dto:CreatePostDto = {text, title, author:0}
        setQuery(dto)
    }

    const userId = useAppSelector(selectUserId)

    // const options: Post = useMemo(() => {
    //     if (!data || !text) return [];
    //     return data.map(({text, globalId}) => {
    //         return {
    //             key: globalId,
    //             text: <SelectAddressItemValue name={text} />,
    //         };
    //     });
    // }, [data, text]);


    return     <Wrapper>
        {userId ? <>
                <OutlinedInput placeholder={'Название'}  value={title} onChange={(event)=>setTitle(event.target.value)}/>
                {/*@ts-ignore*/}
        <ReactQuill modules={modules} formats={formats} theme="snow" value={text} onChange={setText} />
        <Button variant="text" onClick={saveHandler}>Сохранить</Button></> : <LoginVKButton text={"Для работы с редактором текстов, залогиньтесь в VK"}/>
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
