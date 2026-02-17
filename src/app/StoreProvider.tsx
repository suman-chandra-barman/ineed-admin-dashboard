"use client";

import { makeStore } from "@/redux/store";
import { useState } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create the store instance only once using lazy initialization
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
