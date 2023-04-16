import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<h1>TODO: Index</h1>} />
            <Route path="beneficiaries">
                <Route index element={<Beneficiaries />} />
                <Route path="register" element={<BeneficiaryRegistration />} />
                <Route path=":beneficiaryId" element={<Beneficiary />} />
            </Route>
            <Route path="data" element={<h1>TODO: Data Dashboard</h1>} />
            <Route path="programs">
                <Route index element={<Programs />} />
                <Route path="singleview">
                    <Route path=":programID" element={<SingleProgram />} />
                    {/* <Route index element={<SingleProgram />} /> */}
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
                <Route path=":workshopID" element={<WorkshopSingle />} />
                <Route path="attendance">
                    <Route
                        path=":workshopID"
                        element={<WorkshopAttendance />}
                    />
                </Route>
            </Route>
            <Route path="assessments">
                <Route index element={<AssessmentsOverview />} />
                <Route path=":assessmentId" element={<SingleAssessment />} />
                <Route path="assessment" element={<Assessments />} />
            </Route>
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
