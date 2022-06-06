import  {  useState ,  useEffect  }  from  "react" ;
import  {  useNavigate  }  from  "react-router-dom" ;
import  axios  from  "axios" ;
import styled from 'styled-components'
import { useContext } from "react";
import UserContext from './contexts/UserContext';



export default function TelaHome(){

    const navigate = useNavigate()
    const {dados, planoAssinado, setPlanoAssinado} = useContext(UserContext)    
    const token = dados.token
    const [beneficios, setBeneficios] = useState([])    

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', config)
       
        promise.then(res => {

            setPlanoAssinado(res.data)
            setBeneficios(res.data.perks)
            
        })

        promise.catch(erro => {
            console.log(erro)
            alert("ERRO!")
           
        })
    }, [])
            

    function Cancelar(){
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config)
       
        promise.then(() => {            
           console.log("Cancelado")
           navigate("/subscriptions")
        })

        promise.catch(erro => {
            console.log(erro)
            alert("ERRO!")
           
        })
    }


    function Mudar(){
        navigate("/subscriptions")
    }


    return(
        <Container>
            <Topo>
                <img src={planoAssinado.image} alt="logo" />
                <ion-icon name="person-circle"></ion-icon>
            </Topo>

            <span>Olá, {dados.name}</span>
            

            <Beneficios>            
                <ul>
                    {beneficios.map ((beneficios) => (
                        <a href={beneficios.link} target="_blank" key={beneficios.id} style={{textDecoration: 'none' }}>
                            <Beneficio>{beneficios.title}</Beneficio>
                        </a>
                        
                    ))}
                
                </ul>
            </Beneficios>
                
            
            <Botoes>
                <MudarPlano onClick={Mudar}>Mudar Plano</MudarPlano>
                <CancelarPlano onClick = {Cancelar}>Cancelar Plano</CancelarPlano>
            </Botoes>
            
        </Container>
        
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    color: #FFFFFF;
    
    span{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        margin-top: 10px;               
    }`

const Topo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;    
    margin-top:32px;
    
    img{
        height: 50px;
        width: auto;
        margin-left: 38px;
    }
    
    ion-icon{
        font-size: 40px;
        margin-right: 25px;
    }`

const Beneficios = styled.div`
    margin-top: 53px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;`


const Beneficio = styled.button`
        
        border: none;
        margin-top: 8px;    
            
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        
        text-align: center;
        color: #FFFFFF;
            
        display: flex;        
        justify-content: center;
        align-items: center;
        
               
        width: 299px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px; `

const Botoes = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 12px;`


const MudarPlano = styled.button`
        border: none;
        margin-top: 8px;    
            
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
            
        display: flex;        
        justify-content: center;
        align-items: center;
               
        width: 299px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px; `

const CancelarPlano = styled.button`
        border: none;
        margin-top: 8px;    
            
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
            
        display: flex;        
        justify-content: center;
        align-items: center;
                
        width: 299px;
        height: 52px;
        background: #FF4747;
        border-radius: 8px; `