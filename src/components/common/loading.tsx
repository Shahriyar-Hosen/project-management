import { Oval } from "react-loader-spinner";

export const Loading = () => (
  <div className="w-full h-screen flex bg-violet-100 items-center justify-center">
    <Oval
      height={50}
      width={50}
      color="#5b21b6"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#ddd6fe"
      strokeWidth={4}
      strokeWidthSecondary={3}
    />
  </div>
);
