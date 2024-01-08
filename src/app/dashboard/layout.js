import ProtectedRoute from "@/components/ProtectedRoute";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Layout({children}) {
    return (
        <ProtectedRoute>
        <Dashboard>
{children}
            </Dashboard>
        </ProtectedRoute>
    );
}

