import { Link } from "react-router-dom"


const Login = () => {
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
                            <input type="text" placeholder="Ex : John" className="input input-md" />
                        </label>
                        <label className="floating-label">
                            <span>Password</span>
                            <input type="Password" placeholder="Password" className="input input-md" />
                        </label>
                        <button className="btn btn-active btn-success">Login</button>
                        <hr />
                        <p className="text-center">Create an Account! <Link className=" underline" to="/register" >Register</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login