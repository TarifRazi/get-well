import { Link, NavLink } from "react-router-dom";
import userImg from "../assets/user.png"
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAppointments from "../Hooks/useAppointments";
import useBookTest from "../Hooks/useBookTest";


const NavBar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [appointment] = useAppointments()
    const [tests] = useBookTest()
    // console.log(appointment)

    const handleLogOut = () => {
        console.log('logout')
        logOut()
            .then(() => {
                console.log("log out successfull")
            })
            .catch(error => console.log('log out error', error));
    }

    const navItem = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/dashboard/appointments'}>My Appointment
            <div className="badge ">+{appointment.length}</div>
        </NavLink></li>
        <li><NavLink to={'/dashboard/testResult'}>Test Result
            <div className="badge ">+{tests.length}</div>
        </NavLink></li>
        <li><NavLink to={'/login'}>Login</NavLink></li>
        {/* <li><NavLink to={'/dashboard/adminPage'}><FaAddressCard className="text-2xl" /></NavLink></li> */}
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navItem}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">get-well</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">

                                <img alt="User Avatar" src={user?.photoURL || userImg} />

                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                user ? <>
                                    <h1 className="mx-2">{user.email}</h1>
                                </> : <>
                                    <h1>User email</h1>
                                </>
                            }

                            {
                                user ? (
                                    <>
                                        
                                        <Link to={`/myProfile/${user?.email}`}>
                                            <button className="text-center btn btn-ghost w-full">My Profile</button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <li className="text-center">Please login</li>
                                    </>
                                )
                            }


                            {
                                user ? <>
                                    <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
                                </> : <>
                                    <li className="w-full items-center text-center"> <Link to={'/login'}>Login</Link> </li>
                                </>
                            }


                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NavBar;