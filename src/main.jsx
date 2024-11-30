import './index.css'
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout.jsx";
import HomeLayout from "./Layouts/HomeLayout/HomeLayout.jsx";
import AddNewCoffee from "./Components/AddNewCoffee/AddNewCoffee.jsx";
import CoffeeDetails from "./Components/CoffeeDetails/CoffeeDetails.jsx";
import UpdateACoffee from "./Components/UpdateACoffee/UpdateACoffee.jsx";
import Registration from "./Components/Registration/Registration.jsx";
import Login from "./Components/Login/Login.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import ProfileUpdate from "./Components/ProfileUpdate/ProfileUpdate.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import Error404 from "./Components/Error404/Error404.jsx";


const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path={'/'} element={<HomeLayout/>}/>
                    <Route path={'/add_new_coffee'} element={<AddNewCoffee/>}/>
                    <Route path={'/coffee_details/:id'} element={<CoffeeDetails/>}/>
                    <Route path={'/update_a_coffee/:id'} element={<UpdateACoffee/>}/>
                    <Route path={'/auth/registration'} element={<Registration/>}></Route>
                    <Route path={'/auth/login'} element={<Login/>}></Route>
                    <Route path={'/auth/user_profile'} element={<UserProfile/>}></Route>
                    <Route path={'/auth/profile_update'} element={<ProfileUpdate/>}></Route>
                    <Route path={'/auth/reset_password'} element={<ResetPassword/>}></Route>
                </Route>
                <Route path={'*'} element={<Error404/>}></Route>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);


/*
Layout Route usually doesn't need any path attribute.
*/
