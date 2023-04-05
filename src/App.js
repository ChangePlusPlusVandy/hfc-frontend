import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

//Auth Layout
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PasswordReset from "./pages/auth/PasswordReset";

// Dashboard Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Beneficiaries Page
import Beneficiaries from "./pages/beneficiaries/Beneficiaries";
import BeneficiaryRegistration from "./pages/beneficiaries/registration/BeneficiaryRegistration";
import Beneficiary from "./pages/beneficiaries/Beneficiary";

// Programs Page
import Programs from "./pages/programs/Programs";
import SingleProgram from "./pages/programs/SingleProgram";
import MarkAttendance from "./pages/programs/MarkAttendance";

// Workshops Page
import { WorkshopCreateForm } from "./pages/workshops/CreateWorkshop";
import { WorkshopsList } from "./pages/workshops/WorkshopView";
import { WorkshopSingle } from "./pages/workshops/WorkshopSingle";
import { WorkshopAttendance } from "./pages/workshops/WorkshopAttendance";
// Assessments Page
import AssessmentsOverview from "./pages/assessments/AssessmentsOverview";
import Assessments from "./pages/assessments/Assessments";

// Users Page
import Users from "./pages/users/Users";
import SingleUser from "./pages/users/SingleUser";

//Utilis
import PrivateRoutes from "./utils/PrivateRoutes";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<PasswordReset />}></Route>
            <Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<h1>TODO: Index</h1>} />
                    <Route path="beneficiaries">
                        <Route index element={<Beneficiaries />} />
                        <Route
                            path="register"
                            element={<BeneficiaryRegistration />}
                        />
                    </Route>
                    <Route
                        path="data"
                        element={<h1>TODO: Data Dashboard</h1>}
                    />
                    <Route path="programs">
                        <Route index element={<Programs />} />
                        {/* TODO: Make dynamic routes for each program */}
                        <Route path="singleview" element={<SingleProgram />} />
                    </Route>
                    <Route path="workshops">
                        <Route index element={<Workshops />} />
                        <Route path="create" element={<WorkshopCreateForm />} />
                        <Route path="all" element={<WorkshopsList />} />
                        <Route path="delete" element={<WorkshopDeleteForm />} />
                        {/* TODO: Make dynamic routes for each workshop */}
                        <Route path="singleview" element={<WorkshopSingle />} />
                    </Route>
                    <Route path="assessments">
                        <Route index element={<Assessments />} />
                    </Route>
                    <Route path="users" element={<Users />}></Route>
                    <Route path="onboard" element={<Register />}></Route>
                    <Route path="users/:fbId" element={<SingleUser />}></Route>
                </Route>
            </Route>
        </>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
