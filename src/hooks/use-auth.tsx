import { useRouter } from "next/navigation";
import { toast } from "sonner";

function useAuth() {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res) {
        throw new Error();
      }
      toast.success("Logged out successfully!");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Couldn't logout. Please try again");
    }
  };

  const resetP = async () => {
    router.push("/sell/forgot");
  };

  return { logout, resetP };
}

export default useAuth;
