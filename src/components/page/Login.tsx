import React, { useContext, useState } from 'react';
import { getCurrentUser, getLoginToken } from '../../apicalls';
import { authContext } from '../../App';
import { LoginDetails } from '../../types';
import { Navigate,Route,useNavigate } from 'react-router-dom';
import path from 'path';
import Mainpage from '../Mainpage';


const Login = () => {
	const { loginToken, setLoginToken, userRole, setUserRole } = useContext(authContext) as LoginDetails;
	const [needsRedirect, setNeedsRedirect] = useState(false);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

	if(loginToken) {
		setNeedsRedirect(true);
	}

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData); Log form data to the console
		(async () => {
			let token = await getLoginToken(formData.username, formData.password);
			if(typeof token !== "undefined") {
				setLoginToken(token);
				let user_details = await getCurrentUser(token);
				if(typeof user_details !== "undefined") {
					setUserRole(user_details.role);
				} routeChange();
			} else {
				alert("Login failed");
			}
			})()
  };

	if(needsRedirect) {
		return (
		<Navigate replace to="/locations"/>
		);
	} else {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"> </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-600 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                  <input type="text" name="username" id="username" className=" border border-black shadow-md w-96 h-10 rounded-md" placeholder="    Username" onChange={handleInputChange} required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="     ••••••••" className="border border-black shadow-md w-96 h-10 rounded-md" onChange={handleInputChange} required />
                </div>
                <div className=" flex justify-center items-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center mb-20 mt-20">
      {/* <button type="submit" className={`text-white bg-gray-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"`} onClick={routeChange} >Select Account Type</button> */}
      </div>
        </div>
        
      </section>
      
    </div>
  );
};
}

export default Login;
