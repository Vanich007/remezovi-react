import React, {useCallback, useEffect,  useRef, useState} from "react"
import type { Post, } from "./postsApiSlice";
import {useDeletePostQuery,} from "./postsApiSlice"
import styled from 'styled-components'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import { selectUserId} from "../../features/user/userSlice";
import {
        DeleteSweep, ExpandCircleDown,
} from "@mui/icons-material";
import AlertDialog from "../Dialogs/AlertDialog";

const MAX_HEIGHT = 260

const OverWrapper = styled.div`
  padding-bottom: 20px;
  position: relative;

`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
  padding: 15px 15px 30px;
  position: relative;
  max-height: ${({showMore}) => showMore ? 'unset' : `${MAX_HEIGHT}px`};
  overflow: hidden;
  transition: .4s;
`
const Title = styled.h2`
  font-size: 20px;
  text-decoration: none;
`;
const Text = styled.p`
  font-size: 16px;
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

export const PostItem = ({text, title, author, user, id}: Post) => {
    const [idToDelete, setIdToDelete] = useState<number>(0)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const [showMore, setShowMore] = useState<boolean>(false)
    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    const userId = useAppSelector(selectUserId)
    const {data, error, isFetching} = useDeletePostQuery({idToDelete});

    useEffect(() => {
        // @ts-ignore
        if (ref.current) setHeight(ref.current.clientHeight)
    })

    const cancelCb = useCallback(() => {
        setShowDeleteDialog(false);
        setShowDeleteDialog(false)
    }, [id])
    const agreeCb = useCallback(() => {
        setIdToDelete(id);
        setShowDeleteDialog(false)
    }, [id])

    // @ts-ignore
    return <OverWrapper>
        <Wrapper showMore={showMore}>
            <div ref={ref}>
                <Container>
                    {user &&
                        <Tooltip title={`${user.firstName} ${user.lastName}`}><Avatar
                            src={user.avatar}></Avatar></Tooltip>}
                    <Link to={`/post/${id}`}><Title>{title}</Title></Link>
                    {userId && userId === author &&
                        <Link to={`/editor/${id}`}><Tooltip
                            title={`Это Ваш пост, Вы можете его редактировать.`}><IconButton color={'info'}>
                            <EditNoteIcon/>
                        </IconButton></Tooltip></Link>}
                    {userId && userId === author &&
                        <Tooltip title={`Удалить пост`}><IconButton color={'info'} onClick={() => setShowDeleteDialog(true)}>
                            <DeleteSweep/>
                        </IconButton></Tooltip>
                    }
                </Container>


                <Text dangerouslySetInnerHTML={{__html: text}}></Text>

                {showDeleteDialog &&
                    <AlertDialog cancelCb={cancelCb} agreeCb={agreeCb}
                                 title={'Подтвердите удаление'} text={`Удалить пост "${title}"`}/>

                }
            </div>
        </Wrapper>
        {height > MAX_HEIGHT + 50 && <ShowMorePlate showMore={showMore}>
            <Tooltip title={showMore ? 'Свернуть' : 'Показать полностью'}>
                <IconButton color={'info'} size={"large"} onClick={() => setShowMore(val => !val)}>
                    <ExpandCircleDown/>
                </IconButton>
            </Tooltip>
        </ShowMorePlate>}
        <Hr />
    </OverWrapper>

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
