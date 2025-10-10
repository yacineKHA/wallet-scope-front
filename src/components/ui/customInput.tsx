import { Label } from "@radix-ui/react-label";
import { useState, forwardRef } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomInputProps {
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  name?: string;
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, type, placeholder, icon, error, name, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="space-y-2">
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
        <div className="flex relative mt-2">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4">
            {icon}
          </div>
          <Input
            id={name}
            name={name}
            type={inputType}
            placeholder={placeholder}
            className={cn(
              "pl-10 h-11",
              type === "password" ? "pr-10" : "pr-3",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
