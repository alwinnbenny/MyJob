import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Findjob } from "./pages/FindJob";
import { Employers } from "./pages/Employers";
import { Candidates } from "./pages/Candidates";
import { Pricing } from "./pages/Pricing";
import { Support } from "./pages/Support";
import { Createaccount } from "./pages/CreateAccount";
import { Verification } from "./pages/Verification";
import { Signin } from "./pages/Signin";
import { Forgotpassword } from "./pages/Forgotpassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Dashboard } from "./Employee/Dashboard";
import { PostJob } from "./Employee/PostJob";
import { MyJob } from "./Employee/MyJob";
import { MyJobList } from "./Employee/MyJobList";
import { Applicants } from "./Employee/Applicants";
import { EditProfile } from "./Employee/EditProfile";
import { ViewProfile } from "./Employee/ViewProfile";
import { CandidateEditProfile } from "./Candidate/EditProfile";
import { CandidateViewProfile } from "./Candidate/ViewProfile";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { GuestRoute } from "./Routes/GuestRoute";
import { JobDetailed } from "./pages/JobDetailed";
import { EditJob } from "./Employee/EditJob";


function App() {
  return (
    <Routes>
      {/* Public routes — logged-in users get redirected to /Dashboard */}
      <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
      <Route path="/sign-in" element={<GuestRoute><Signin /></GuestRoute>} />
      <Route path="/create-account" element={<GuestRoute><Createaccount /></GuestRoute>} />
      <Route path="/verification" element={<GuestRoute><Verification /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><Forgotpassword /></GuestRoute>} />
      <Route path="/Reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />

      {/* Freely accessible routes (no auth restriction) */}
      <Route path="/Findjob" element={<Findjob />} />
      <Route path="/Employers" element={<Employers />} />
      <Route path="/Pricing" element={<Pricing />} />
      <Route path="/Support" element={<Support />} />
      <Route path="/job/:id" element={<JobDetailed />} />

      {/* Protected routes — unauthenticated users get redirected to /sign-in */}
      <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
      <Route path="/my-job" element={<ProtectedRoute><MyJobList /></ProtectedRoute>} />
      <Route path="/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
      <Route path="/my-job/:id" element={<ProtectedRoute><MyJob /></ProtectedRoute>} />
      <Route path="/employee/edit-job/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
      {/* <Route path="/employee/edit-job/:id" element={<ProtectedRoute><PostJob /></ProtectedRoute>} /> */}
      <Route path="/employee/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/view-profile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />
      <Route path="/candidate/view-profile" element={<ProtectedRoute><CandidateViewProfile /></ProtectedRoute>} />
      <Route path="/candidate/edit-profile" element={<ProtectedRoute><CandidateEditProfile /></ProtectedRoute>} />
      <Route path="/Candidates" element={<ProtectedRoute><Candidates /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
