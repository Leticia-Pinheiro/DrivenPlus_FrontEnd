import axios from 'axios'
import styled from "styled-components"
import  { Link }  from  'react-router-dom' ;
import  {  useState , useContext}  from  "react" ;
import UserContext from './contexts/UserContext';

export default function TelaPlanos(){

    const {dados} = useContext(UserContext)    
    const token = dados.token
    const [planos, setPlanos] = useState([])

    
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config)
        promise.then(res => {
            setPlanos(res.data)
        })

        promise.catch(err => {
            console.log(err)
        })
     


    return(
        <Container>
            <span>Escolha seu Plano</span>
            {planos.map((planos) => (
                
                <ContainerPlanos key = {planos.id}>
                   <Link to={`/subscriptions/${planos.id}`} style={{textDecoration: 'none' }}  >
                    <img src={planos.image} alt="logo" />
                    <span>{planos.price}</span>
                    </Link>
                </ContainerPlanos>
                
                
            ))}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    span{
        font-weight: 700;
        font-size: 32px;
        color: #FFFFFF;
        padding:24px;
    }`

const ContainerPlanos = styled.div`
    display: flex;    
    align-items: center;
    justify-content: space-around;
    width: 290px;
    height: 180px;
    background-color: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    margin-bottom: 10px;
    
    span{
        color: #FFFFFF;
        margin: 76px 0;        
    }`