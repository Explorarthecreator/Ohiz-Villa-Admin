import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa"
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
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
  // const [lodgeRef, setLodgeRef] = useState('')
  const [formData, setFormData] = useState({
    roomNumber: '',
    available: true,
    occupant: '',
    occupantNumber:'',
    price:0,
    lodge:'',
    lodgeRef: ''
  })


  const handleClick=async(e)=>{
    e.preventDefault()
    const lodgeRef = collection(db,'lodges')
    const q = query(lodgeRef,where('name','==',lodge))
    const lodgeSnap = await getDocs(q)

    lodgeSnap.forEach((doc)=>{
      console.log(doc.data());
      formData.lodgeRef = doc.id
    })

    // console.log(formData);

    // if(lodgeSnap.exists()){
    //   lodgeSnap.data()
    // }else{
    //   console.log("nothing");
    //   console.log(lodgeSnap);
    // }
    await addDoc(collection(db,'rooms'),formData)
    .then(()=>{
      document.getElementById('my_modal_3').close()
      console.log(('done'));
    }).catch((error)=>{
      console.log(error);
    })
     
  }
  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))

    console.log(formData);
  }
  const {roomNumber, price,lodge} = formData
  useEffect(()=>{
    const checkDutyLevel = async()=>{
      const userRef = doc(db,'users', auth.currentUser.uid)

      const querySnap = await getDoc(userRef)

      if(querySnap.exists()){
          console.log('Exists');
          // console.log(querySnap.data());
          // console.log(querySnap.data().duty);
          setWorkerDuty(querySnap.data().duty)

          if(querySnap.data().duty === 'Admin' ||querySnap.data().duty === 'sunny'){
            setLoading(false)
            fetchRooms()
            // console.log(formData);
          }else{
            setLoading(false)
          }
          // console.log(workerDuty);
      }
      else{
          console.log("Not Available and you need to log out and sign in again");
      }

    }
    checkDutyLevel()
    console.log('We are here');
  },[])

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

    console.log(rooms);
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
                <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Room Number" id="roomNumber" value={roomNumber} onChange={onChange}/>
              </div>

              <div>
                <input type="number" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="price" id="price" value={price} onChange={onChange}/>
              </div>
  
              <div>
                <select className="select select-md w-full max-w-xs bg-transparent input-success" id="lodge" value={lodge} onChange={onChange} >
                  <option value={'val'}>Choose room's lodge</option>
                  <option value={'Lodge A'}>
                    Lodge A
                  </option>
                  <option value={'Lodge B'}>
                    Lodge B
                  </option>
                  <option value={'Lodge C'}>
                    Lodge C
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
        <header className=" flex justify-between lg:items-center text-black">
          <div>
            <h1 className=" text-2xl font-semibold lg:text-4xl mb-2">
              Rooms
            </h1>
            <p className=" py-2 lg:text-xl text-sm">
              See all rooms and their occupants
            </p>
          </div>
  
          <button className={`btn btn-outline btn-md lg:btn-lg ${workerDuty === 'Agent'&&'hidden'} hover:bg-black hover:text-white border-black text-black`} disabled={workerDuty==='Agent'? true:false} onClick={()=>document.getElementById('my_modal_3').showModal()}>
            <FaPlus/> Create room
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
                  Room  <br className="lg:hidden" />Number
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
                  <RoomItem key={room.id} room={room.data}/>
                ))}
              {/* row 1 */}
              {/* <tr>
                <td>
                  A2
                </td>
                <td>
                  Fred-Adeji Emmanuel
                </td>
                <td>
                  08145156505
                </td>
                <td>
                  False
                </td>
                <td>
                  Lodge A
                </td>
              </tr> */}
              {/* row 2 */}
              {/* <tr>
                <td>
                  B7
                </td>
                <td>
                  Imogoh Alfred
                </td>
                <td>
                  09012919231
                </td>
                <td>
                  False
                </td>
                <td>
                  Lodge B
                </td>
              </tr> */}
              {/* row 3 */}
              {/* <tr>
                <td>
                  C12
                </td>
                <td>
                  Isedu Blessing
                </td>
                <td>
                  08145156505
                </td>
                <td>
                  False
                </td>
                <td>
                  Lodge C
                </td>
              </tr> */}
  
            </tbody>
          </table>
              }
        </main>
      </div>
    )
  }
  
// }

export default Room