import styled from 'styled-components'
import axios from 'axios'
import  { useNavigate}  from  'react-router-dom' ;
import { useContext } from "react";
import UserContext from './contexts/UserContext';


export default function TelaConfirmacao({setEscondido, cartao, plano}){

    const {dados, setPlanoAssinado} = useContext(UserContext)    
    const token = dados.token
    const navigate = useNavigate();
   

    function BtSim(){
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', cartao, config)
        
        promise.then(res => {
            setPlanoAssinado(res.data)
            
            navigate("/home");

        })

        promise.catch(erro => {
            console.log(erro)
            alert("ERRO!")
            
        })
    }

   
    return(        
        <Caixa>
            <span>Tem certeza que deseja assinar o plano Driven Plus (R$ {plano.price})?</span>
            <Botoes>
                <Nao onClick = {() => setEscondido ( false )}>Não</Nao>
                <Sim onClick = {BtSim}>Sim</Sim>
            </Botoes>

        </Caixa>            
        
    )

}

const Caixa = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    width: 248px;
    height: 210px;
    background: #DBDBDB;
    border-radius: 12px;

    span{
        width: 204px;
        font-family: 'Roboto', sans-serif;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;        
        color: #000000;
    }
    `

const Botoes = styled.div `
    margin-top: 47px;
    width: 204px;
    display: flex;
    justify-content: space-between;`

const Nao = styled.div `
    display: flex;    
    justify-content: center;
    align-items: center;
    
    gap: 10px;    
    width: 95px;
    height: 52px;
    background: #CECECE;
    border-radius: 8px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #FFFFFF;`

const Sim = styled.div `
    display: flex;    
    justify-content: center;
    align-items: center;
    
    gap: 10px;    
    width: 95px;
    height: 52px;
    background: #FF4791;;
    border-radius: 8px;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    color: #FFFFFF;`