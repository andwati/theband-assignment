import { toast } from "sonner";

export const showError = (message: string) => {
    toast.error(message);
};

export const showSuccess = (message: string) => {
    toast.success(message);
};
