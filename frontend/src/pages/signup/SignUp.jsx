import GenderCheckBox from "./GenderCheckBox"

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base text-black label-text">Full Name</span>
            </label>
            <input type='text' placeholder="Enter your name" className="w-full input input-borderer h-10"/>
          </div>

          <div>
            <label className="label">
              <span className="text-base text-black label-text">Username</span>
            </label>
            <input type='text' placeholder="Enter username" className="w-full input input-borderer h-10"/>
          </div>

          <div>
            <label className="label">
              <span className="text-base text-black label-text">Password</span>
            </label>
            <input type='text' placeholder="Enter Password" className="w-full input input-borderer h-10"/>
          </div>

          <div>
            <label className="label">
              <span className="text-base text-black label-text">Confirm Password</span>
            </label>
            <input type='text' placeholder="Re-enter Password" className="w-full input input-borderer h-10"/>
          </div>

          <GenderCheckBox/>

          <a href='#' className="text-sm text-black hover:underline hover:text-blue-600 inline-block">Already have an account?</a>

          <div>
            <button className="btn btn-block btn-sm mt-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SignUp