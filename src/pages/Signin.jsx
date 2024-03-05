
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function Signin() {

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const {email,password} = formData

  const navigate = useNavigate()
  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))

  }
  const onSubmit = async (e)=>{
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth,email,password)

      console.log(userCredential);
      if(userCredential.user){
        // toast.success('Login Succesfull')
        navigate('/')
        console.log('done');
      }
    } catch (error) {
      // toast.error('Bad User Credentials');
      console.log(error);
      
    }
  }
  return (
    <div className="w-4/5 lg:w-2/5 m-auto mt-8 lg:mt-28">
      <form className=" shadow-2xl rounded-md lg:rounded-xl h-56 lg:h-72 flex flex-col gap-y-4 p-4 lg:p-10 " onSubmit={onSubmit}>
        <h1 className=" text-xl lg:text-4xl font-semibold">
          Welcome Back!
        </h1>
        <div>
          {/* <FaAddressBook/> */}
          <input type="email" className=" input input-sm lg:input-md w-full bg-transparent input-success" placeholder="Username or Email" id="email" value={email} onChange={onChange}/>
        </div>
        <div>
          <input type="password" className=" input input-sm lg:input-md w-full bg-transparent input-success" placeholder="password" id='password' value={password} onChange={onChange}/>
        </div>

        <button type="submit" className="btn w-2/5 mx-auto">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Signin