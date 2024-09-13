import React, { useState } from "react";

const LoginForm = ({ onSubmit }) => {
    const [profileImage, setProfileImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(); // You can pass additional data here if needed
    };

    return (
        <div>
            <h2>Login</h2>
            <form className="form" onSubmit={handleSubmit}>
                {profileImage && <img className="profile-image" src={profileImage} alt="Profile" />}
                <div className="input-group">
                    <label>Profile Pic</label>
                    <input onChange={handleImageUpload} type="file" id="profile-image" accept="image/*" />
                </div>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const SignUpForm = ({ onSubmit }) => {
    const [profileImage, setProfileImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(); // You can pass additional data here if needed
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form className="form" onSubmit={handleSubmit}>
                {profileImage && <img className="profile-image" src={profileImage} alt="Profile" />}
                <div className="input-group">
                    <label>Profile Pic</label>
                    <input onChange={handleImageUpload} type="file" id="profile-image" accept="image/*" />
                </div>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

const Day4 = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoginForm, setLoginMode] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogin = () => {
        setLoginMode(true);
    };

    const handleSignUp = () => {
        setLoginMode(false);
    };

    return (
        <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
            <div className="auth-tabs">
                <button
                    type="button"
                    className={isLoginForm ? "active" : ""}
                    onClick={handleLogin}
                >
                    Login
                </button>
                <button
                    type="button"
                    className={!isLoginForm ? "active" : ""}
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <button onClick={toggleDarkMode} className="toggle-button"> 
                {isDarkMode ? "Light Mode" : "Dark Mode" }
            </button>
            </div>
            {isLoginForm ? <LoginForm onSubmit={handleLogin} /> : <SignUpForm onSubmit={handleSignUp} />}
            <style jsx>
                {`
                    .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-height: 100vh;
                        background-color: #f4ecda;
                        padding: 20px;
                        max-width: 500px;
                        text-align: center;
                        margin: 0 auto;
                    }
                    .form {
                        display: flex;
                        flex-direction: column;
                        width: 300px;
                        background-color: #ebe3d8;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        margin-bottom: 20px;
                    }
                    .form button,
                    .auth-tabs button {
                        margin: 10px 0;
                        padding: 10px;
                        background-color: #4a8;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .input-group {
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 15px;
                    }
                    .profile-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin: 0 auto 15px;
                    }
                    .auth-tabs {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 20px;
                    }
                    .auth-tabs button {
                        background-color: #ddd;
                        color: black;
                        border: none;
                        padding: 10px 20px;
                        margin: 0 5px;
                        cursor: pointer;
                        border-radius: 4px;
                    }
                    .auth-tabs button.active {
                        background-color: #4caf50;
                        color: white;
                    }
                    .dark-mode .form {
                        background-color: #333;
                        color: white;
                    }
                    .dark-mode .form input {
                        background-color: #555;
                        color: white;
                        border-color: #666;
                    }
                `}
            </style>
        </div>
    );
};

export default Day4;
