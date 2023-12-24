import { Dashboard } from "@/components/dashboard/dashboard";

export default function Layout({children}) {
    return (
        <Dashboard>
{children}
            </Dashboard>
    );
}

