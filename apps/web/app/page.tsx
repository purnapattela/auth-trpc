"use client";

import React, { useEffect } from "react";
import { trpc } from "./trcp-client";

const Home = () => {
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const health = await trpc.health.getHealth.query();
        console.log(health);
      } catch (error) {
        console.error("Error fetching health:", error);
      }
    };

    fetchHealth();
  }, []);
  return <div>Home Page</div>;
};

export default Home;
