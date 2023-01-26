import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

// Dashboard Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Beneficiaries
import Beneficiaries from "./routes/beneficiaries/Beneficiaries";
import BeneficiaryRegistration from "./routes/beneficiaries/registration/BeneficiaryRegistration";

// Programs
import Programs from "./routes/programs/Programs";
import SingleProgram from "./routes/programs/SingleProgram";

// Workshops
import {
    Workshops,
    WorkshopDeleteForm,
} from "./routes/workshops/Workshops";
import { WorkshopCreateForm } from "./routes/workshops/CreateWorkshop";
import { WorkshopsList } from "./routes/workshops/WorkshopView";
import { WorkshopSingle } from "./routes/workshops/singleView";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<h1>Index</h1>} />
            <Route path="beneficiaries">
                <Route index element={<Beneficiaries />} />
                <Route path="register" element={<BeneficiaryRegistration />} />
            </Route>
            <Route path="data" element={<h1>Data</h1>} />
            <Route path="programs">
                <Route index element={<Programs />} />
                <Route path="singleview" element={<SingleProgram />} />
            </Route>
            <Route path="workshops">
                <Route index element={<Workshops />} />
                <Route path="create" element={<WorkshopCreateForm />} />
                <Route path="all" element={<WorkshopsList />} />
                <Route path="delete" element={<WorkshopDeleteForm />} />
                <Route path="singleview" element={<WorkshopSingle />} />
            </Route>
            <Route path="assessments" element={<h1>Assessments</h1>} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
