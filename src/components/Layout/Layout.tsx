import {NavLink, Outlet} from "react-router-dom";
import styled from 'styled-components'
import Menu from "./Menu";

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
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  position: relative;
  padding: 20px;
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


    return (
        <Container>
            <Wrapper>

                    <Header>
                        Ремезовы.рф
                    </Header>


                        <main>
                            <Menu/>
                            <div className="content">
                            <Outlet/>
                            </div>
                        </main>


            </Wrapper>
        </Container>
    );
}