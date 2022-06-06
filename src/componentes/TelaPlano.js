import Modal from "react-modal/lib/components/Modal";
import  {  useState ,  useEffect  }  from  "react" ;
import  {  Link, useParams }  from  "react-router-dom" ;
import  axios  from  "axios" ;
import styled from 'styled-components'
import { useContext } from "react";
import UserContext from './contexts/UserContext';
import TelaConfirmacao from "./TelaConfirmacao";
Modal.setAppElement('.root')

export default function TelaPlano(){
    
    

    const {idPlano} = useParams();
    const {dados} = useContext(UserContext)    
    const token = dados.token      
    const [plano, setPlano] = useState({})
    const [beneficios, setBeneficios] = useState([])
    const [escondido, setEscondido] = useState(false)
    const [cartao, setCartao] = useState({
        membershipId: '',
        cardName: '',
        cardNumber: '',
        securityNumber: '',
        expirationDate: ''
    })


    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`, config)
        promise.then(res => {
            setPlano(res.data)
            setBeneficios(res.data.perks)
            setCartao({
                ... cartao , 
                membershipId : res.data.id 
            })

        })

        promise.catch(err => {
            console.log(err)
        })
    },[])    


    function MudancaDoInput(e){
        setCartao({
            ...cartao,
            [e.target.name]: e.target.value,
          }) 
    }

    function Confirmacao(event){
        event.preventDefault();
        setEscondido ( ! escondido )      
    }



    
    return(
        <form onSubmit={Confirmacao}>
        <Container>
            
            <Link to = "/subscriptions">
                <ion-icon name="arrow-back-sharp"></ion-icon>
            </Link>
            

            <Topo>
                <img src={plano.image} alt="logo" />
                <span>DRIVEN+</span>
            </Topo>
                
            
            <Beneficios>
                <span><img src="/images/Vector.png"/> Benefícios:</span>
                <ol>
                    {beneficios.map ((beneficios) => (
                        <li key={beneficios.id}> {beneficios.title}</li>
                    ))}                
                </ol>
            </Beneficios>
                
            <Preco>            
                <span><img src="/images/VectorMoney.png"/> Preço:</span>
                <p>R$ {plano.price} cobrados mensalmente</p>
            </Preco>
            

            <Cartao>
                <CaixaDeTexto name="cardName" type="text" placeholder="Nome impresso no cartão" value = {cartao.cardName} onChange={MudancaDoInput} required  />
                <CaixaDeTexto name="cardNumber" type="text"  placeholder="Dígitos do cartão" value = {cartao.cardNumber} onChange={MudancaDoInput} required  />           
                <CaixaDeTextoMenor name="securityNumber" type="text" placeholder="Código de Segurança" value = {cartao.securityNumber} onChange={MudancaDoInput} required  />
                <CaixaDeTextoMenor name="expirationDate" type="text" placeholder="Validade" value = {cartao.expirationDate} onChange={MudancaDoInput} required />
            </Cartao>

            <Assinar onClick = {Confirmacao}>ASSINAR</Assinar>

            <Modal isOpen = {escondido} >
                <TelaConfirmacao setEscondido={setEscondido} cartao={cartao} plano={plano}/>
            </Modal>

        </Container>
        </form>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    
    ion-icon{
        color: #FFFFFF;
        font-size: 35px;
        margin-right: 315px;
        margin-bottom: 25px;
    }`    
    

const Topo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    img{
        height: 95px;
        width: auto;
    }
    
    span{
        margin-top: 12px;
        font-size: 32px;
        font-weight: 700;
    }`

const Beneficios = styled.div`
    width: 299px;
    display: flex;
    flex-direction: column;    
    margin-top: 22px;
    margin-bottom:12px;
    
    span{ 
        font-size: 16px;
        margin-bottom: 10px;
    }
    
    li{
        font-size: 14px;
        line-height: 16px;
    }`

const Preco = styled.div`
    width: 299px;
    display: flex;
    flex-direction: column;    
    margin-bottom: 34px;
    
    span{ 
        font-size: 16px;
        margin-bottom: 10px;
    }
    
    p{
        font-size: 14px;
    }`

const Cartao = styled.div`
    width: 299px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;`


const CaixaDeTexto = styled.input `
    margin-bottom: 8px;
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

const CaixaDeTextoMenor = styled.input `
    margin-bottom: 8px;    
    box-sizing: border-box;    
    width: 145px;
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
    
const Assinar = styled.button `
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
    padding: 18px 122px;
    gap: 10px;        
    width: 299px;
    height: 52px;
    background: #FF4791;
    border-radius: 8px;`  

