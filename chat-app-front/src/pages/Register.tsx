import { Link } from "react-router-dom"

const Register = () => {
    return (
        <section className="w-full flex items-center md:px-16 px-4 justify-center py-10">
            {/* Login Form */}
            <div className="mockup-browser border border-base-300 w-full">
                <div className="mockup-browser-toolbar">
                    <div className="input">Chat-App</div>
                </div>
                <div className="w-full pt-12 justify-center flex-col items-center flex gap-6">
                    <h1 className="font-bold">Login</h1>

                    <form action="" className="pb-6 flex flex-col gap-6">
                        <label className="floating-label">
                            <span>Username</span>
                            <input type="text" placeholder="Username" className="input input-md" />
                        </label>
                        <label className="floating-label">
                            <span>Fullname</span>
                            <input type="text" placeholder="Fullname" className="input input-md" />
                        </label>
                        <label className="floating-label">
                            <span>Password</span>
                            <input type="Password" placeholder="Password" className="input input-md" />
                        </label>
                        <label className="floating-label">
                            <span>C-Password</span>
                            <input type="Password" placeholder="C-Password" className="input input-md" />
                        </label>
                        <label className="floating-label">
                            <select defaultValue="Gender" className="select">
                                <option disabled={true}>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </label>
                        <button className="btn btn-active btn-success">Signup</button>
                        <hr />
                        <p className="text-center">Already have an Account! <Link className=" underline" to="/login" >Login</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register