import { useState } from "react"
import styles from "../../features/quotes/Quotes.module.css"
import { useGetQuotesQuery } from "./editorApiSlice"
import styled from 'styled-components'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageUploader from "quill-image-uploader";
import { Quill } from "react-quill";
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
                    "http://localhost:5000/upload/",
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

const wrapper = styled.div`
width: 100%;
`

export const Editor = () => {
    const [value, setValue] = useState('');
    return     <div className="App">
        <ReactQuill modules={modules} formats={formats} theme="snow" value={value} onChange={setValue} />{value}
    </div>
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
  //         value={numberOfQuotes}
  //         onChange={e => {
  //           setNumberOfQuotes(Number(e.target.value))
  //         }}
  //       >
  //         {options.map(option => (
  //           <option key={option} value={option}>
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
