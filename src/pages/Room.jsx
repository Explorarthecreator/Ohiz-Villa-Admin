import { useState, useEffect } from "react";
import { FaRedo } from "react-icons/fa"
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import RoomItem from "../components/RoomItem";
import BoxSpinner from "../components/BoxSpinner";

function Room() {
  const auth = getAuth()
  const [workerDuty, setWorkerDuty] = useState('')
  const [loading, setLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  const [minorLoading, setMinorLoading] = useState(true)
  const [showButton, setShowButton] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [formData, setFormData] = useState({})


  const handleEdit =async(room)=>{
    setFormData(room)

    document.getElementById('my_modal_3').showModal()
    const docRef = query(collection(db,'rooms'),where('roomNumber','==',room.roomNumber))
    const docSnap = await getDocs(docRef)
    docSnap.forEach((room)=>{
      setRoomId(room.id)
    })
  }
  const handleClick=async(e)=>{
    e.preventDefault()

    const roomRef = doc(db,'rooms',roomId)

    await updateDoc(roomRef,formData).then(()=>{
      document.getElementById('my_modal_3').close()
    })

    setShowButton(true)
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
            fetchRooms()
          }else{
            setLoading(false)
          }
      }
      else{
          console.log("Not Available and you need to log out and sign in again");
      }
    }
    checkDutyLevel()
    // eslint-disable-next-line 
  },[])

  const refresh = ()=>{
    setMinorLoading(true)
    fetchRooms()
    setShowButton(false)
  }

  const fetchRooms = async()=>{
    const docRef = collection(db,'rooms')

    const q = query(docRef,orderBy('roomNumber'))

    const docSnap = await getDocs(q)

    const rooms = []

    docSnap.forEach((doc)=>{
      rooms.push({
        id:doc.id,
        data:doc.data()
      })
    })
    setRooms(rooms)
    setMinorLoading(false)
  }

  if(loading){
    return <Spinner/>
  }
    return (
      <div className=' p-3 lg:p-8'>
        {/* This is basically the modal that pops up when you want to create a user */}
        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box bg-white text-black"> 
            <h3 className="text-2xl font-semibold lg:text-4xl mb-2">
              Create a new room
            </h3>
            <p className="py-2 lg:text-xl text-sm">
              Enter details of room and check details very well before submission
            </p>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
  
              <div>
                <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent input-disabled" placeholder="Enter Room Number" id="roomNumber" value={formData.roomNumber}/>
              </div>

              <div>
                <input type="number" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="price" id="price" value={formData.price} onChange={onChange}/>
              </div>

              <div>
                <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Occupant" id="occupant" value={formData.occupant} onChange={onChange}/>
              </div>

              <div>
                <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Occupant Phone Number" id="occupantNumber" value={formData.occupantNumber} onChange={onChange}/>
              </div>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <button className="btn btn-md btn-outline my-3" onClick={(e)=>handleClick(e)}>
                Update
              </button>
            </form>
          </div>
        </dialog>
        
        <header className=" flex justify-between lg:items-center text-black">
          <div>
            <h1 className=" text-2xl font-semibold lg:text-4xl mb-2">
              Rooms
            </h1>
            <p className=" py-2 lg:text-xl text-sm">
              See all rooms and their occupants
            </p>
          </div>
  
          <button className={`btn btn-outline btn-md lg:btn-lg ${workerDuty === 'Agent'&&'hidden'} ${showButton===false&&'hidden'}  hover:bg-black hover:text-white border-black text-black`} disabled={workerDuty==='Agent'? true:false} onClick={refresh}>
            <FaRedo/> Refresh
          </button>
        </header>
        <main className="overflow-x-auto mt-8">
        {
                minorLoading? <BoxSpinner/>:
                <table className="table table-sm lg:table-lg w-full lg:w-4/5 m-auto shadow-2xl bg-neutral-100 mb-3">
            {/* head */}
            <thead className="bg-neutral-500 text-sm lg:text-2xl text-white">
              <tr>
                <th>
                  Room  <br/>Number
                </th>
                <th>
                  Occupant Name
                </th>
                <th>
                  Occupant<br className="lg:hidden" /> Number
                </th>
                <th>
                  Available
                </th>
                <th>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              
            {rooms.map((room)=>(
                  <RoomItem key={room.id} room={room.data} handleEdit={handleEdit}/>
            ))}
            </tbody>
          </table>
              }
        </main>
      </div>
    )
  }
  
// }

export default Room