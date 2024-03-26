import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query} from "firebase/firestore";
import { db } from "../firebase.config";
import { FaPlus } from "react-icons/fa"
import Spinner from "../components/Spinner";
import LodgeItem from "../components/LodgeItem";
import BoxSpinner from "../components/BoxSpinner";

function Lodge() {
  

  const auth = getAuth()

  const [workerDuty, setWorkerDuty] = useState('')
  const [loading,setLoading]= useState(true)
  const [Mloading,setMLoading]= useState(true)
  const [lodge, setLodge] = useState([])
  const [buttonLoading, setButtonLoading] = useState(false)
  const [formData, setFormData] = useState({
    numberOfRooms: 0,
    name: '',
    webName:'',
    shortName: ''
  })

  const {numberOfRooms,name,webName, shortName} = formData

  const handleClick=async(e)=>{
    setButtonLoading(true)
    e.preventDefault()
    await addDoc(collection(db,'lodges'),formData).then((docRef)=>{
      console.log(formData);

      const rooms =[]
      for(let i = 0;i<numberOfRooms;i++){
        rooms.push({
          roomNumber: `${shortName.toUpperCase()}${i+1}`,
          lodgeRef: docRef.id,
          occupant: '',
          available: true,
          price: 120000,
          occupantNumber:''
        })
      }
      rooms.forEach(async (room)=>{
        await addDoc(collection(db,'rooms'),room)
      })

      document.getElementById('my_modal_3').close()
      setButtonLoading(false)
    }).catch((error)=>{
      console.log(error);
    })

    
  }
  const onChange = (e)=>{
      setFormData((prevState)=>({
        ...prevState,
        [e.target.id]:e.target.value
      }))
  }
  useEffect(()=>{
    const checkDutyLevel = async()=>{
      const userRef = doc(db,'users', auth.currentUser.uid)

      const querySnap = await getDoc(userRef)

      if(querySnap.exists()){
          setWorkerDuty(querySnap.data().duty)

          if(querySnap.data().duty === 'Admin' ||querySnap.data().duty === 'sunny'){

            setLoading(false)
            const q = query(collection(db,'lodges'), orderBy('name'))
            const logdeSnap = await getDocs(q)

            const lodges =[]

            logdeSnap.forEach((doc)=>{
              lodges.push({
                id:doc.id,
                data:doc.data()
              })
            })

            setLodge(lodges)
            setMLoading(false)
          }else{
            setLoading(false)
            setMLoading(false)
          }

      }
      else{
          console.log("Not Available and you need to log out and sign in again");
      }

    }
    checkDutyLevel()
    // eslint-disable-next-line 
  },[])

  if(loading){
    return <Spinner/>
  }else if(workerDuty === 'Agent'){
    return <p className=' p-3 lg:p-8'>
      You are not allowed to view this page
    </p>
  }
  return (
    <div className=' p-3 lg:p-8'>
      {/* This is basically the modal that pops up when you want to create a user */}
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box bg-white text-black"> 
          <h3 className="text-2xl font-semibold lg:text-4xl mb-2">
            Create a new lodge
          </h3>
          <p className="py-2 lg:text-xl text-sm">
            Enter details of user and check details very well before submission
          </p>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}

            <div>
              <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Lodge Name" id="name" value={name} onChange={onChange} />
            </div>

            <div>
              <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Lodge webname" id="webName" value={webName} onChange={onChange} />
            </div>

            <div>
              <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Lodge short name" id="shortName" value={shortName} onChange={onChange} />
            </div>

            <div>
              <input type="number" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="How many roms" id="numberOfRooms" value={numberOfRooms} onChange={onChange}/>
            </div>
      
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <button className={`btn btn-md btn-outline my-3 ${buttonLoading&&'btn-disabled'}`} onClick={(e)=>handleClick(e)}>
              {
                buttonLoading? <span className="loading loading-spinner"></span> : 'Submit'
              }
            </button>
          </form>
        </div>
      </dialog>
      <header className=" flex justify-between lg:items-center text-black">
        <div>
          <h1 className=" text-2xl font-semibold lg:text-4xl mb-2">
            Lodge
          </h1>
          <p className="  py-2 lg:text-xl text-sm">
            See all Lodge and their information
          </p>
        </div>

        <button className={`btn btn-outline btn-md lg:btn-lg ${workerDuty === 'Agent'&&'hidden'} hover:bg-black hover:text-white border-black text-black`} disabled={workerDuty==='Agent'? true:false} onClick={()=>document.getElementById('my_modal_3').showModal()}>
          <FaPlus/> Create Lodge
        </button>
      </header>
      <main className="overflow-x-auto mt-8">
        {
          Mloading?<BoxSpinner/>:
          <table className="table table-sm lg:table-lg w-full lg:w-4/5 m-auto shadow-2xl bg-neutral-100 mb-3">
          {/* head */}
          <thead className="bg-neutral-500 text-lg lg:text-2xl">
            <tr>
              <th>
                Name
              </th>
              <th>
                Webname
              </th>
              <th>
                Number of room
              </th>
            </tr>
          </thead>
          <tbody>

            {
              lodge.map((lo)=>(
                <LodgeItem lodge={lo.data} key={lo.id}/>
              ))
            }
          </tbody>
          </table>
        }
      </main>
    </div>
  )
}

export default Lodge