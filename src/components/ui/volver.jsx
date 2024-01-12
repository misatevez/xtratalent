import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Volver() {
    const router = useRouter();
    return (
        <Button
        type="button"
        className="bg-red-500 text-white"
        variant="default"
        onClick={() => router.back()}
      >
        Volver
        </Button>
    );
}

