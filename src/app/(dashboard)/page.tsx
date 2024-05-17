"use client";

import { useStores } from "@/stores/provider";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { count, incrementCount, decrementCount } = useStores((state) => state);

  return (
    <main>
      <div>
        Count: {count}
        <hr />
        <button type="button" onClick={() => incrementCount()}>
          Increment Count
        </button>
        <button type="button" onClick={() => decrementCount()}>
          Decrement Count
        </button>
      </div>
      <h1>Home</h1>
    </main>
  );
};

export default Home;
