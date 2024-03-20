 import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc, serverTimestamp, getDoc, collection, getDocs} from "firebase/firestore"
import { db } from "../firebase.config"
import Spinner from "../components/Spinner"
import UserItem from "../components/UserItem"

function User() {
  const auth = getAuth()
  const [workerDuty, setWorkerDuty] = useState('')
  const [loading, setLoading] = useState(true)
  const [minorLoading, setMinorLoading] = useState(true)
  const [users,setUsers] = useState([])
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    duty:''
  })
  const {name,email,password,duty} = formData
  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }
  const handleClick=async(e)=>{
    e.preventDefault()
    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth,email,password)

      const userId = userCredential.user.uid

      const formDataCopy = {...formData}

      delete formDataCopy.password

      formDataCopy.timestamp =serverTimestamp()

      await setDoc(doc(db,'users',userId),formDataCopy)

      document.getElementById('my_modal_3').close()

      console.log('done');
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }

  useEffect(()=>{
    const checkDutyLevel = async()=>{
      const userRef = doc(db,'users', auth.currentUser.uid)

      const querySnap = await getDoc(userRef)

      if(querySnap.exists()){
          console.log('Exists');
          console.log(querySnap.data().duty);
          setWorkerDuty(querySnap.data().duty)
          if(querySnap.data().duty === 'Admin'){
            // This is where the request for the data will be made
            setLoading(false)
            fetchUsers()
          }else{
            setLoading(false)
            console.log('object');
          }
      }
      else{
          console.log("Not Available and you need to log out and sign in again");
      }

    }
    checkDutyLevel()
    console.log('We are here');
    // eslint-disable-next-line
  },[])

  const fetchUsers = async()=>{
    const docRef = collection(db,'users')

    const docSnap = await getDocs(docRef)

    const users = []
    docSnap.forEach((dc)=>{
      users.push({
        id:dc.id,
        data:dc.data()
      })
    })

    console.log(users);
    setUsers(users)
    setMinorLoading(false)
    // console.log(docSnap.docs);
  }


  if(loading){
    return <Spinner/>
  }
  else if(workerDuty === 'Agent' || workerDuty === 'sunny'){
    return <p className=' p-3 lg:p-8'>
      You are not allowed to view this page
    </p>
  }
  else if(workerDuty === 'Admin'){
    return (
      <div className=' p-3 lg:p-8'>
        {/* This is basically the modal that pops up when you want to create a user */}
        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box bg-white text-black"> 
            <h3 className="font-bold text-lg">
              Create a new user
            </h3>
            <p className="py-2">
              Enter details of user and check details very well before submission
            </p>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
  
              <div>
                <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Full name" id="name" value={name} onChange={onChange}/>
              </div>
  
              <div>
                <input type="password" className="input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter password" id="password" value={password} onChange={onChange}/>
              </div>
  
              <div>
                <input type="email" className="input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter email" id="email" value={email} onChange={onChange} />
              </div>
              <div>
                <select className="select select-md w-full max-w-xs bg-transparent input-success" id="duty" value={duty} onChange={onChange} >
                  <option value={'val'}>Choose user's authorisation</option>
                  <option value={'Agent'}>
                    Agent
                  </option>
                  <option value={'sunny'}>
                    Sunny
                  </option>
                </select>
              </div>
        
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button className="btn btn-md btn-outline my-3" onClick={(e)=>handleClick(e)}>
                Submit
              </button>
            </form>
          </div>
        </dialog>
        <header className=" flex justify-between items-center text-black">
          <div>
            <h1 className=" text-2xl font-semibold lg:text-4xl mb-2">
              Users
            </h1>
            <p className=" py-2 lg:text-xl text-sm">
              See all admin users and their privileges
            </p>
          </div>
  
          <button className='btn btn-outline btn-md lg:btn-lg hover:bg-black hover:text-white border-black text-black' onClick={()=>document.getElementById('my_modal_3').showModal()}>
            <FaPlus/> Create user
          </button>
        </header>
        <main className="overflow-x-auto mt-8">
          {
            minorLoading? 
            <div className=" h-5/6 flex items-center justify-center mt-20">
               <span className="loading loading-bars w-24 text-black"></span>
            </div> :
            <table className="table table-sm lg:table-lg w-full lg:w-4/5 m-auto shadow-2xl bg-neutral-100 mb-8">
            {/* head */}
            <thead className="bg-neutral-500 text-white text-lg lg:text-2xl">
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Duty
                </th>
                <th>
                  Email
                </th>
              </tr>
            </thead>
            <tbody >

              {users.map((user)=>(
                <UserItem user={user.data} key={user.id}/>
              ))}
              {/* row 1 */}
              {/* <tr>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr> */}
              {/* row 2 */}
              {/* <tr>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr> */}
              {/* row 3 */}
              {/* <tr>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr> */}
  
              {/* row 1 */}
              {/* <tr>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr> */}
              {/* row 2 */}
              {/* <tr>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr> */}
              {/* row 3 */}
              {/* <tr>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr> */}
            </tbody>
          </table>
          }
  
          
        </main>
      </div>
    )
  }
  
}

export default User