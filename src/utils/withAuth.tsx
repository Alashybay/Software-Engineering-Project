/* eslint-disable react/display-name */
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthSessionContext } from "../providers/auth/authProvider";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isLoading } = useAuthSessionContext();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        router.push("/auth/login");
      }
    }, [isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
