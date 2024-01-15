import { usePermissions } from "@/lib/PermissionsContext";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <Dashboard>{children}</Dashboard>
    </ProtectedRoute>
  );
}
