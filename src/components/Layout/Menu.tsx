import { NavLink, Outlet } from "react-router-dom";
import styled from 'styled-components'
import styles from "./menu.css"
import {useState} from "react";
const SideBarItem = styled.div`

  height: 35px;
  width: 300px;
  color: #353535;

  box-sizing: border-box;
  border-left: 5px solid transparent;
  font-family: 'Lato', sans-serif;
  transition: all .5s ease;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  
  :hover{
    border-left: 5px solid var(#52d6f4);
    background: linear-gradient(to left, #52d6f4, #FBFBFB);
    transition: .1s;
    transform: scale(1.05);
    border-radius: 5px;
  }
  a {
    color: #353535;
    text-decoration: none;
  }
`
const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  
`

const testMenuItems = [
    {
        href: '/',
        title: 'Introduction',
    },
    {
        href: 'about',
        title: 'About',
    },
    {
        href: 'contact',
        title: 'Contact',
    }
];

type MenuProps = {
    setMinimized: React.Dispatch<React.SetStateAction<boolean>>
    minimized: boolean
}
export default function Menu({minimized, setMinimized}: MenuProps) {

return  <>
        <aside className={minimized ?  "minimized" : ''}>
            <ul className={minimized ?  "asideList minimized" : "asideList"}>
                <li><a href="" className="asideAnchor">Link</a></li>
                <li><a href="" className="asideAnchor">Link</a></li>
                <li><a href="" className="asideAnchor">Link</a></li>
                <li><a href="" className="asideAnchor">Link</a></li>
            </ul>
        </aside>
        <div className='burger-container'>
            <input type="checkbox" id="myInput" onClick={()=>setMinimized(val=>!val)} />
                <label htmlFor="myInput">
                    <span className="bar top"></span>
                    <span className="bar middle"></span>
                    <span className="bar bottom"></span>
                </label>


        </div>
</>



}
            // <aside className='bg-gray-100 w-full md:w-60'>
        //     <Nav>
        //             {testMenuItems.map(({ href, title }) => (
//                 <SideBarItem key={title}>
//                     <NavLink to={href} >
//                         {title}
//                     </NavLink>
//                 </SideBarItem>
//             ))}
//     </Nav>
// </aside>