
import { FaPlus } from "react-icons/fa"

function User() {
  const handleClick=(e)=>{
    e.preventDefault()
  }
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
              <input type="text" className=" input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter Full name" />
            </div>

            <div>
              <input type="password" className="input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter password" />
            </div>

            <div>
              <input type="password" className="input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Confirm password" />
            </div>

            <div>
              <input type="email" className="input input-md w-full input-bordered input-success mb-2 bg-transparent" placeholder="Enter email" />
            </div>
            <div>
              <select className="select select-md w-full max-w-xs bg-transparent input-success" >
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
      <header className=" flex justify-between lg:items-center">
        <div>
          <h1 className=" text-2xl font-semibold lg:text-4xl mb-2">
            Users
          </h1>
          <p className=" py-2 lg:text-xl text-sm">
            See all admin users and their privileges
          </p>
        </div>

        <button className='btn btn-ghost btn-sm lg:btn-md' onClick={()=>document.getElementById('my_modal_3').showModal()}>
          <FaPlus/> Create user
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
                Duty
              </th>
              <th>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>

            {/* row 1 */}
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>

        
      </main>
    </div>
  )
}

export default User