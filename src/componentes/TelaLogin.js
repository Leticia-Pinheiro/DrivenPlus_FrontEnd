import React from 'react'
import styled from "styled-components"
import axios from 'axios'
import  {Link , useNavigate}  from  'react-router-dom' ;
import  {  useState }  from  "react" ;
import { useContext } from "react";

import UserContext from './contexts/UserContext';



export default function TelaLogin(){
    const { setDados } = useContext(UserContext);
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        email: '',
        password: '',
    })

    function MudancaDoInput(e){
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
          }) 
    }
    
    function LimparInput(){
        setLogin({
            email: '',
            password: ''
        })
    }
    
    function Logar(event){ 
        event.preventDefault();

        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login", login)
        

        // QUANDO TIVER ASSINATURA MANDA P HOME QUANDO NAO MANDA P PLANOS
        // TERNARIO NO NAVIGATE
        promise.then(res => {            
            setDados(res.data)            
            navigate("/home");
        })

        promise.catch(erro => {
            console.log(erro)
            alert("Email ou senha incorretos!")
            LimparInput()
        })        
    }

    return( 
        <form onSubmit={Logar}>
        <Container>

            <span>DRIVEN</span><span>+</span>       
            <CaixaDeTexto name="email" type="email" placeholder="email" value = {login.email} onChange={MudancaDoInput}  required  />
            <CaixaDeTexto name="password" type="password" placeholder="senha" value = {login.password} onChange={MudancaDoInput} required />
            <Entrar onClick={Logar}>Entrar</Entrar>
                        
            <Link to = '/signup'>
                <LinkCadastro>Não possui uma conta? Cadastre-se</LinkCadastro>
            </Link>
            
        </Container>       
        </form> 
    )
}


    const Container = styled.div `
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;`    

    const Foto = styled.img `
        margin: 60px 0;
        height: 180px;
        width: auto;`    

    const CaixaDeTexto = styled.input `
        margin: 3px;
        box-sizing: border-box;    
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        
        ::placeholder{
            color:#DBDBDB;
        }`

    const Entrar = styled.button `
        border: none;
        margin-top:3px;
        margin-bottom:25px;
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 5px;
        font-family:'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 21px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;`    

    const LinkCadastro = styled.span `        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;`