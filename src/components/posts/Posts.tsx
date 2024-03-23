import {useEffect, useMemo, useState} from "react"

import {useGetPostsQuery} from "./postsApiSlice"
import {PostItem} from "./PostItem"
import styled from 'styled-components'

import ReactPaginate from 'react-paginate';



const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
`

export const Posts = () => {
    // const [count, setCount] = useState(10);
    // const [page, setPage] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 100;
    // @ts-ignore
    const {data, error, isFetching}=useGetPostsQuery({count: itemsPerPage,skip: itemOffset});
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    const pageCount = data && data.count ? Math.ceil(data.count / itemsPerPage) : 1;
    const handlePageClick = (event:{selected: number, }) => {
        const newOffset = data && data.count ? (event.selected * itemsPerPage) % data.count : 0;
        // setPage(newOffset)
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
// const data1 = [{
//     "id": 132,
//     "title": "Пост о жизни в деревне",
//     "text": "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.</p>",
//     "author": 7198731,
//     category: 1,
//     "user": {
//         "id": 7198731,
//         "avatar": "https://sun9-48.userapi.com/s/v1/ig2/I08o5gwL6nCYKNJbWSDmbTZsKAuiGBxnct9F3lt29kpXFSxfUF6jEZ9RZp-I6WqHiaQQVF0pu2QlzZd_hM_XnqeY.jpg?size=200x200&quality=96&crop=675,222,756,756&ava=1",
//         "firstName": "Иван",
//         "lastName": "Р.",
//         "isActive": true
//     }
// }, {
//     "id": 132,
//     "title": "Пост о жизни в деревне",
//     "text": "<p>Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.Lorem500  ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur distinctio dolorem est ipsum officiis pariatur quaerat qui reiciendis, voluptatem.</p>",
//     "author": 7198731,
//     category: 1,
//     "user": {
//         "id": 7198731,
//         "avatar": "https://sun9-48.userapi.com/s/v1/ig2/I08o5gwL6nCYKNJbWSDmbTZsKAuiGBxnct9F3lt29kpXFSxfUF6jEZ9RZp-I6WqHiaQQVF0pu2QlzZd_hM_XnqeY.jpg?size=200x200&quality=96&crop=675,222,756,756&ava=1",
//         "firstName": "Иван",
//         "lastName": "Р.",
//         "isActive": true
//     }
// }]
    return     <Wrapper>
        <div className={'pagination'}>
            {data && data.count && data.count>itemsPerPage && <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
        />}
        </div>
        {data&& data.posts && data.posts.map(d => <PostItem key={d.id} category={d.category} id={d.id} title={d.title} author ={d.author} text={d.text} user={d.user}/>)}
        {/*{data1 && data1.map(d => <PostItem category={d.category} key={d.id} id={d.id} title={d.title} author ={d.author} text={d.text} user={d.user}/>)}*/}

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
