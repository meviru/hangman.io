import styled from "styled-components";
import siteLogo from "/logo.svg";

const WelcomeWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const BoxWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 20px;
    max-width:  700px;
    border-radius: 30px;
    background-color: rgba(38, 59, 116, 0.875);
    box-shadow: inset 4px -10px 2px rgba(0, 0, 0, 0.15), 
    inset -4px -15px 2px rgba(0, 0, 0, 0.15),
    inset 4px -4px 2px ${({ theme }) => theme.darkBlue},
    inset -4px 4px 2px ${({ theme }) => theme.darkBlue};
`

const LogoWrapper = styled.div`
    width: 100%;
    max-width: 300px;
    margin: -100px auto 0;
`

const Logo = styled.img`
    display: block;
`

const Welcome = () => {

    return <WelcomeWrapper>
        <BoxWrapper>
            <LogoWrapper>
                <Logo src={siteLogo} alt="The Hangman Game" title="The Hangman Game" />
            </LogoWrapper>
        </BoxWrapper>
    </WelcomeWrapper>
}

export default Welcome;