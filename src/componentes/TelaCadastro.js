import React from 'react'
import styled from "styled-components"
import axios from 'axios'
import  { Link , useNavigate}  from  'react-router-dom' ;

import  {  useState }  from  "react" ;


export default function TelaCadastro(){

    let navigate = useNavigate();
    
    const [cadastro, setCadastro] = useState({
        email: '',
        name: '',
        cpf: '',
        password: '',
    })

    

    function MudancaDoInput(e){
        setCadastro({
            ...cadastro,
            [e.target.name]: e.target.value,
          }) 
    }

    function LimparInput(){
        setCadastro({
            email: '',
            name: '',
            cpf: '',
            password: ''
        })
    }
    
    function Cadastrar(event){
        event.preventDefault();

        const promise = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up", cadastro)
        
        promise.then(res => {
            console.log(res.data)
            navigate("/");
        })

        promise.catch(erro => {
            console.log(erro)
            alert("ERRO!")
            LimparInput()
        })
        
    }

    return( 
        <form onSubmit={Cadastrar}>
        <Container>

            <CaixaDeTexto name="name" type="text" placeholder="Nome" value = {cadastro.name} onChange={MudancaDoInput} required  />
            <CaixaDeTexto name="cpf" type="text" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="CPF" value = {cadastro.cpf} onChange={MudancaDoInput} required  />           
            <CaixaDeTexto name="email" type="email" placeholder="E-mail" value = {cadastro.email} onChange={MudancaDoInput} required  />
            <CaixaDeTexto name="password" type="password" placeholder="Senha" value = {cadastro.password} onChange={MudancaDoInput} required />
            
            
            <BotaoCadastrar onClick={Cadastrar}>Cadastrar</BotaoCadastrar>
                        
            <Link to = '/'>
                <LinkLogin>Já possui uma conta? Entre</LinkLogin>
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

    const BotaoCadastrar = styled.button `
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

    const LinkLogin = styled.span `        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;`