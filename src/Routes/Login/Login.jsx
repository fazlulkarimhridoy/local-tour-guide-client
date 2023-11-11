import { useContext } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
    const { loginWithGoogle, signIn } = useContext(AuthContext);


    // handle google login
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                swal("Google login!", "Successfully logged in using google!", "success")
            })
    }


    // handle sign in
    const handleSignIn = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const email = form.get("email");
        const password = form.get("password");

        // sign in existing user
        signIn(email, password)
            .then(result => {
                const user = result.user;
                if (user.uid) {
                    swal("Login Successful", "You are logged in", "success");
                }
            })
            .catch(err => {
                console.log(err.error);
                swal("Login failed", "Create a account to login", "error")
            })
    }



    return (
        <div className="container mx-auto mt-20 w-full max-w-md p-4 rounded-md border sm:p-8 text-gray-800">
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center text-gray-600">Dont have account?
                <Link to="/register">Sign up here</Link>
            </p>
            <div className="my-6 space-y-4">
                {/* login with google */}
                <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ri focus:ri border-gray-600 focus:ri">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>
            </div>
            {/* form started */}
            <form onSubmit={handleSignIn} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm">Email address</label>
                        <input type="email" required name="email" id="email" placeholder="Enter email" className="w-full px-3 py-2 border rounded-md border-gray-300  text-gray-800 focus:border-cyan-600" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm">Password</label>
                        </div>
                        <input type="password" required name="password" id="password" placeholder="Enter password" className="w-full px-3 py-2 border rounded-md border-gray-300  text-gray-800 focus:border-cyan-600" />
                    </div>
                </div>
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-cyan-600 text-gray-50">Sign in</button>
            </form>
            {/* form ended */}
        </div>
    );
};

export default Login;