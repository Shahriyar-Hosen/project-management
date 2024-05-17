"use client";

import { StoreProvider } from "@/stores/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, useState } from "react";

export const Providers: FC<IChildren> = ({ children }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <StoreProvider>
      <AntdRegistry>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AntdRegistry>
    </StoreProvider>
  );
};
