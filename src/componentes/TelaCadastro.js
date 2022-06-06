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
            
            
            <BotaoCadastrar onClick={Cadastrar}>CADASTRAR</BotaoCadastrar>
                        
            <Link to = '/'>
                <LinkLogin>Já possui uma conta? Entre</LinkLogin>
            </Link>
            
        </Container>       
        </form> 
    )
}


    const Container = styled.div `
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;`

       

    const CaixaDeTexto = styled.input `
        margin-bottom: 16px;
        box-sizing: border-box;    
        width: 299px;
        height: 52px;
        background: #FFFFFF;   
        border-radius: 8px;
        border: none;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;       
        ::placeholder{
            color:#7E7E7E;
        }`

    const BotaoCadastrar = styled.button `
        border: none;
        margin-top: 8px;
        margin-bottom: 24px;       
        
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        
        display: flex;        
        justify-content: center;
        align-items: center;
        padding: 18px 122px;
        gap: 10px;        
        width: 298px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;`

    const LinkLogin = styled.span `        
             
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;        
        text-align: center;
        text-decoration-line: underline;
        color: #FFFFFF;`