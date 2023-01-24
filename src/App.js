import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import BeneficiaryRegistration from "./routes/beneficiaries/BeneficiaryRegistration";
import Beneficiaries from "./routes/beneficiaries/Beneficiaries";
import {
    Workshops,
    WorkshopsList,
    WorkshopCreateForm,
    WorkshopDeleteForm,
} from "./routes/workshops/Workshops";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<h1>Index</h1>} />
            <Route path="beneficiaries">
                <Route path="all" element={<Beneficiaries />} />
                <Route path="register" element={<BeneficiaryRegistration />} />
            </Route>
            <Route path="data" element={<h1>Data</h1>} />
            <Route path="programs" element={<h1>Programs</h1>} />
            <Route path="workshops">
                <Route index element={<Workshops />} />
                <Route path="create" element={<WorkshopCreateForm />} />
                <Route path="all" element={<WorkshopsList />} />
                <Route path="delete" element={<WorkshopDeleteForm />} />
            </Route>
            <Route path="assessments" element={<h1>Assessments</h1>} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
