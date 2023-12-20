import { Dashboard } from "@/components/dashboard";

export default function Layout({children}) {
    return (
        <Dashboard>
{children}
            </Dashboard>
    );
}

