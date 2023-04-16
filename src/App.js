import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
    Navigate,
} from "react-router-dom";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";

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
import SingleAssessment from "./pages/assessments/components/SingleAssessment";

// Users Page
import Users from "./pages/users/Users";
import SingleUser from "./pages/users/SingleUser";

import PrivateRoute from "./utils/PrivateRoutes";

const Root = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<h1>hi</h1>} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<PasswordReset />}></Route>
            <Route element={<PrivateRoute />}>
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route
                        index
                        element={<Navigate to="./beneficiaries" replace />}
                    />
                    <Route path="beneficiaries">
                        <Route index element={<Beneficiaries />} />
                        <Route
                            path="register"
                            element={<BeneficiaryRegistration />}
                        />
                        <Route
                            path=":beneficiaryId"
                            element={<Beneficiary />}
                        />
                    </Route>
                    <Route path="programs">
                        <Route index element={<Programs />} />
                        <Route path="singleview">
                            <Route
                                path=":programID"
                                element={<SingleProgram />}
                            />
                            <Route
                                path="attendance/:programID"
                                element={<MarkAttendance />}
                            />
                        </Route>
                    </Route>
                    <Route path="workshops">
                        <Route index element={<WorkshopsList />} />
                        <Route path="create" element={<WorkshopCreateForm />} />
                        {/* TODO: Make dynamic routes for each workshop */}
                        <Route
                            path=":workshopID"
                            element={<WorkshopSingle />}
                        />
                        <Route path="attendance">
                            <Route
                                path=":workshopID"
                                element={<WorkshopAttendance />}
                            />
                        </Route>
                    </Route>
                    <Route path="assessments">
                        <Route index element={<AssessmentsOverview />} />
                        <Route
                            path=":assessmentId"
                            element={<SingleAssessment />}
                        />
                        <Route path="assessment" element={<Assessments />} />
                    </Route>
                    <Route path="users">
                        <Route index element={<Users />} />
                        <Route path=":fbId" element={<SingleUser />} />
                        <Route path="onboard" element={<Register />} />
                    </Route>
                </Route>
            </Route>
        </Route>
    )
);

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
