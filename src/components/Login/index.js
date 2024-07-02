import React from 'react';

const Index = () => {
    return (
        <div className="container">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Login</header>
                <form action="#">
                    <input type="text" id='inUsr' placeholder="Enter your email" />
                    <input type="password" id="inPass" placeholder="Enter your password" />
                    <span className="signup">
                        <a href="#" id="forgotLabel">Forgot password?</a>
                    </span>
                    <input type="button" className="button loginbtn" value="Login" />
                </form>
                <div className="signup">
                    <span className="signup">Don't have an account?
                        <a href="#" id="signupLabel">Signup</a>
                    </span>
                </div>
            </div>
            <div className="registration form">
                <header>Signup</header>
                <form action="#">
                    <input type="text" id="name" placeholder="Enter your name" />
                    <input type="text" id='username' placeholder="Enter your username" />
                    <input type="text" id='email' placeholder="Enter your email" />
                    <input type="password" id='password' placeholder="Create a password" />
                    <input type="button" className="button signupbtn" value="Signup" />
                </form>
                <div className="signup">
                    <span className="signup">Already have an account?
                        <a href="#" id="loginLabel">Login</a>
                    </span>
                </div>
            </div>
            <div className="forgot form" >
                <header>Forgot Password</header>
                <form action="#">
                    <input type="text" id='forgotinp' placeholder="Enter your email" />
                    <input type="button" className="button forgotbtn" value="Submit" />
                </form>
                <div className="signup">
                    <span className="signup">Don't have an account?
                        <a href="#" id="signupLabel">Signup</a>
                    </span>
                </div>
                <div className="signup">
                    <span className="signup">Already have an account?
                        <a href="#" id="loginLabel">Login</a>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Index;
