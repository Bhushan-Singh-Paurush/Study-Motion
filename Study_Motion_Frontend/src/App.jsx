import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./component/Common/Navbar";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { About } from "./pages/About";
import { ContactUsPage } from "./component/Contact/ContactUsPage";
import { PrivateRoute } from "./component/Auth/PrivateRoute";
import { Dashboard } from "./component/Core/Dashboard/Dashboard";
import { MyProfile } from "./component/Core/Dashboard/MyProfile";
import { Settings } from "./component/Core/Dashboard/Settings";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import { EnrolledCourses } from "./component/Core/Dashboard/EnrolledCourses";
import { Cart } from "./component/Core/Dashboard/Cart";
import { AddCourse } from "./component/Core/Dashboard/Add_Course";
import { MyCourses } from "./component/Core/Dashboard/My_Courses";
import { EditCourse } from "./component/Core/Dashboard/Edit_Course";
import { Category } from "./pages/Category";
import { CourseDetails } from "./pages/CourseDetails";
import { ViewCourse } from "./pages/ViewCourse";
import { ViewDetail } from "./component/Core/ViewCourse/ViewDetail";
import { Error } from "./pages/Error";
import { Instructor } from "./component/Core/Dashboard/Instructor";
import { Slide} from 'react-toastify';

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="min-h-screen flex flex-col bg-richblack-900 scroll-smooth">
      <ToastContainer transition={Slide}  hideProgressBar={true} closeButton={false} position="top-center" autoClose={2000}/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/category/:catName" element={<Category />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="*" element={<Error />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {user && user?.accountType == ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
          {user && user?.accountType == ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/add-course" element={<AddCourse />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              <Route path="/dashboard/instructor" element={<Instructor />} />
            </>
          )}
        </Route>
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user && user.accountType == ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<ViewDetail />}
              />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
