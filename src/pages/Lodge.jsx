import { useState } from "react";
import { FaPlus } from "react-icons/fa"

function Lodge() {
  const handleClick=(e)=>{
    e.preventDefault()
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
              <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Lodge Name" />
            </div>

            <div>
              <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Lodge Webname" />
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
            Lodge
          </h1>
          <p className=" lg:text-xl">
            See all Lodge and their information
          </p>
        </div>

        <button className='btn btn-ghost btn-sm lg:btn-md' onClick={()=>document.getElementById('my_modal_3').showModal()}>
          <FaPlus/> Create Lodge
        </button>
      </header>
      <main className="overflow-x-auto mt-8">
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
            {/* row 1 */}
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>
                10
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>
                8
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>
                38
              </td>
            </tr>

            {/* row 1 */}
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>
                12
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>
                23
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>
                19
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default Lodge