import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Error logging out");
      }

      toast.success("Logged out successfully");

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Couldn't log out. Please try again later.");
    }
  };

  return { signOut };
};
