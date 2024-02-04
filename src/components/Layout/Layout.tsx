import {NavLink, Outlet} from "react-router-dom";
import styled from 'styled-components'
import Menu from "./Menu";
import {useState} from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0799d3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
`
const Wrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  background-color: white;
  position: relative;
  padding: 20px;
`
const Subwrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: .4s;
  width: ${(props)=> props.minimized ? '100%' : '80%'};
`
const Header = styled.header`
  width: 100%;
  height: 100px;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-family: 'Rubik Doodle Shadow', system-ui;
  font-size: 40px;
  padding-right: 200px;
  color: #0799d3;
`


export default function Layout() {
    const [minimized, setMinimized] = useState(true)

    return (
        <Container>
            <Wrapper>
                <Subwrapper minimized={minimized}>

                    <Header>
                        Ремезовы.рф
                    </Header>


                        <main>
                            <Menu minimized={minimized} setMinimized={setMinimized}/>
                            <div className="content">
                            <Outlet/>
                            </div>
                        </main>

                </Subwrapper>
            </Wrapper>
        </Container>
    );
}