import {useEffect, useMemo, useState} from "react"
import type {CreatePostDto, GetPostDto} from "./postsApiSlice";
import {useGetPostsQuery} from "./postsApiSlice"
import {PostItem} from "./PostItem"
import styled from 'styled-components'

import {Button, Input} from "@mui/material";




const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
`

export const Posts = () => {
    const [count, setCount] = useState(10);
    const [page, setPage] = useState(1);

    // @ts-ignore
    const {data, error, isFetching}=useGetPostsQuery({count,page});
    // useEffect(() => {
    //     setQuery({ count: 10})
    // }, []);
    // const options: Post = useMemo(() => {
    //     if (!data || !text) return [];
    //     return data.map(({text, globalId}) => {
    //         return {
    //             key: globalId,
    //             text: <SelectAddressItemValue name={text} />,
    //         };
    //     });
    // }, [data, text]);

    useEffect(() => {
        console.log('data', data)
    }, [data]);


    return     <Wrapper>

        {data&& data.posts && data.posts.map(d => <PostItem key={d.id} id={d.id} title={d.title} text={d.text} author={d.author}/>)}

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
