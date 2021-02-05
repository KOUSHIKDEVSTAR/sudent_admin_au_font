import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";


// Dashboard user view vendor
import Dashboard from "../pages/Dashboard/index";
import UserListPage from "../pages/users/usersList";
import ProfileView from "../pages/Authentication/ProfileView";
import userEdit from "../pages/users/userEdit";
import studentList from "../pages/student/studentList";
import addUsers from "../pages/users/addUsers";
import addStudent from "../pages/student/addStudent";
import studentEdit from "../pages/student/studentEdit";
import foodCouponsList from "../pages/foodCoupons/foodCouponsList";
import addFoodCoupons from "../pages/foodCoupons/addFoodCoupons";
import addJobPost from "../pages/jobPost/addJobPost";
import jobPostList from "../pages/jobPost/jobPostList";
import categoryList from "../pages/category/categoryList";
import addCategory from "../pages/category/addCategory";
import accomodationList from "../pages/accomodation/accomodationList";
import addAccomodation from "../pages/accomodation/addAccomodation";
import jobCategoryList from "../pages/jobCategory/jobCategoryList";
import editJobCategory from "../pages/jobCategory/editJobCategory";
import editCategory from "../pages/category/editCategory";






const authProtectedRoutes = [

	{ path: "/dashboard", component: Dashboard },
	{ path: "/userList", component: UserListPage },
	{ path: "/userProfile", component: ProfileView },
	{ path: "/userEdit", component: userEdit },
	{ path: "/addUsers", component: addUsers },
	{ path: "/studentlist", component: studentList },
	{ path: "/addStudent", component: addStudent },
	{ path: "/studentEdit", component: studentEdit },
	{ path: "/foodCouponsList", component: foodCouponsList },
	{ path: "/addFoodCoupons", component: addFoodCoupons },

	{ path: "/addJobPost", component: addJobPost },
	{ path: "/jobPostList", component: jobPostList },
	{ path: "/jobCategoryList", component: jobCategoryList },
	{ path: "/jobCategoryEdit", component: editJobCategory },

	{ path: "/categoryList", component: categoryList },
	{ path: "/editCategory", component: editCategory },
	{ path: "/addCategory", component: addCategory },
	
	{ path: "/accomodationList", component: accomodationList },
	{ path: "/addAccomodation", component: addAccomodation },
	
	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/login" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },
	{ path: "/auth-lock-screen", component: AuthLockScreen },
];

export { authProtectedRoutes, publicRoutes };