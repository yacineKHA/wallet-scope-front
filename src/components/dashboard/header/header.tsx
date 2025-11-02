import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardHeader = ({ title, description }: { title: string, description: string }) => {
    const router = useRouter();
    
    return (
        <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
            <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    );
};

export default DashboardHeader;