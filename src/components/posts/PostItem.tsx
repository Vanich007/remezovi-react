import {useEffect, useMemo, useState} from "react"
import type {CreatePostDto, GetPostDto, Post, PostsApiResponse} from "./postsApiSlice";
import {useGetPostsQuery, useLazyGetPostsQuery} from "./postsApiSlice"
import styled from 'styled-components'

import {Button, Input} from "@mui/material";




const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
  padding: 15px;
`
const Title = styled.span`
 font-size: 14px;
`;
const Text = styled.p`
 font-size: 12px;
  letter-spacing: 20px;
`;

export const PostItem = ({text, title, author, id}: Post) => {

    return     <Wrapper>
<Title>{title}</Title>
<Text dangerouslySetInnerHTML={{__html: text}}></Text>

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
