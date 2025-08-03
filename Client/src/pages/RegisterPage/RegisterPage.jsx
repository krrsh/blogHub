import { useState } from 'react';
import { useRegister } from '../../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'

const RegisterPage = () => {

  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //useRegister hook
  const {register, error} = useRegister()
  const navigate = useNavigate();


  const handleClick = async (e)=>{
    e.preventDefault();
    setLoading(true);
     const success = await register(username, email, password);
      if(success){
        setLoading(false);
        setUsername('')
        setEmail('')
        setPassword('')
        navigate('/HomePage');
      }
      setLoading(false);
  };


{loading ?       <div className="loadingContainer"><div className="spinner"></div></div> : <form>...</form>}


  return (
      <div className='signup_formContainer'>
            <h1>Create an account</h1>
            <div>
                <p>User name</p>
                <input
                required 
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                type="text" />
            </div>
            <div>
                <p>Email</p>
                <input 
                required 
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                type="email" />
            </div>
            <div>
                <p>Set Password</p>
                <input 
                required 
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type="password" />
            </div>
            <div className='termsCheckBox'>
                <input type="checkbox" required/>
                <p>By creating an account, I agree to our <span>Terms of use</span> and <span>Privacy Policy</span> </p>
            </div>
            <button onClick={handleClick} className='signinPageBtn'>Create an account</button>
            {error  && <p style={{color:'red', fontFamily: "Poppins", textAlign: "center"}}>{error}</p>} 
            <p className='haveaccnt'>Already have an account? <span onClick={()=>navigate('/loginPage')}>Login</span></p>
        <p className='terms'>This site is protected by and the <span>Google Privacy Policy</span> and <span>Terms of Service</span> apply.</p>
      </div>
  )
}

export default RegisterPage
