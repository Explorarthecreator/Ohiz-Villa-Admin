import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa"
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

function Room() {
  const handleClick=(e)=>{
    e.preventDefault()
  }

  const auth = getAuth()
  const [workerDuty, setWorkerDuty] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    const checkDutyLevel = async()=>{
      const userRef = doc(db,'users', auth.currentUser.uid)

      const querySnap = await getDoc(userRef)

      if(querySnap.exists()){
          console.log('Exists');
          // console.log(querySnap.data());
          // console.log(querySnap.data().duty);
          setWorkerDuty(querySnap.data().duty)
          setLoading(false)
          // console.log(workerDuty);
      }
      else{
          console.log("Not Available and you need to log out and sign in again");
      }

    }
    checkDutyLevel()
    console.log('We are here');
  },[])

  if(loading){
    return <Spinner/>
  }
  // else if(workerDuty === 'Agent' || workerDuty === 'sunny'){
  //   return <p className=' p-3 lg:p-8'>
  //     You are not allowed to view this page
  //   </p>
  // }
  // else if(workerDuty === 'Admin'){
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
                <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Room Number" />
              </div>
  
              <div>
                <select className="select select-md w-full max-w-xs bg-transparent input-success" >
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
        <header className=" flex justify-between lg:items-center">
          <div>
            <h1 className=" text-2xl font-semibold lg:text-4xl mb-2">
              Rooms
            </h1>
            <p className=" lg:text-xl">
              See all rooms and their occupants
            </p>
          </div>
  
          <button className={`btn btn-ghost btn-sm lg:btn-md ${workerDuty === 'Agent'&&'hidden'}`} disabled={workerDuty==='Agent'? true:false} onClick={()=>document.getElementById('my_modal_3').showModal()}>
            <FaPlus/> Create room
          </button>
        </header>
        <main className="overflow-x-auto mt-8">
          <table className="table table-sm lg:table-lg w-full lg:w-4/5 m-auto shadow-2xl bg-neutral-100 mb-3">
            {/* head */}
            <thead className="bg-neutral-500 text-sm lg:text-2xl">
              <tr>
                <th>
                  Room  <br className="lg:hidden" />Number
                </th>
                <th>
                  Occupant Name
                </th>
                <th>
                  Occupant Number
                </th>
                <th>
                  Available
                </th>
                <th>
                  Lodge
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
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
              </tr>
              {/* row 2 */}
              <tr>
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
              </tr>
              {/* row 3 */}
              <tr>
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
              </tr>
  
            </tbody>
          </table>
        </main>
      </div>
    )
  }
  
// }

export default Room