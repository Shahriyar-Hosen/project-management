import { FC } from "react";

const AuthLayout: FC<IChildren> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-[#F9FAFB] bg-pattern">
      {children}
    </div>
  );
};

export default AuthLayout;
