function Signin() {
  return (
    <div className="w-4/5 lg:w-1/2 m-auto mt-8 lg:mt-28">
      <form className=" shadow-2xl rounded-md lg:rounded-xl h-56 lg:h-72 flex flex-col gap-y-4 p-4 lg:p-10 ">
        <h1 className=" text-xl lg:text-4xl font-semibold">
          Welcome Back!
        </h1>
        <div>
          {/* <FaAddressBook/> */}
          <input type="text" className=" input input-sm lg:input-md w-full bg-transparent input-success" placeholder="Username or Email"/>
        </div>
        <div>
          <input type="password" className=" input input-sm lg:input-md w-full bg-transparent input-success" placeholder="password"/>
        </div>

        <button type="submit" className="btn w-2/5 mx-auto">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Signin