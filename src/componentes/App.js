import  {  BrowserRouter ,  Routes ,  Route  }  from  'react-router-dom' ;
import  {  useState  }  from  'react' ;

import  "./assets/reset.css"
// import  "../assets/style.css"

import TelaLogin from './TelaLogin'
import TelaCadastro from './TelaCadastro'
import TelaPlanos from './TelaPlanos'
import TelaPlano from './TelaPlano'
import TelaHome from './TelaHome'
import UserContext from './contexts/UserContext';

export default function App(){
    const [dados, setDados]= useState({})

    return(
        <UserContext.Provider value = {{dados, setDados}}>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<TelaLogin />} />
            <Route path="/signup" element={<TelaCadastro />} />
            <Route path="/subscriptions" element={<TelaPlanos />} />
            <Route path="/plano" element={<TelaPlano />} />
            <Route path="/home" element={<TelaHome />} />
        </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    )

}