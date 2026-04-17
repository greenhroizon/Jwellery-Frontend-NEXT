"use client";

import { getAboutUsApi } from "@/service/about.service";
import { useEffect, useState } from "react";

export const useAboutUs = () => {
  const [topImage, setTopImage] = useState("");
  const [bottomImage, setBottomImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAboutUsApi();

        if (result?.success && Array.isArray(result.data)) {
          const top = result.data.find((i: any) => i.type === "top");
          const bottom = result.data.find((i: any) => i.type === "bottom");
          const bg = result.data.find((i: any) => i.type === "background");

          setTopImage(top?.image || "");
          setBottomImage(bottom?.image || "");
          setBackgroundImage(bg?.image || "");
        }
      } catch (err) {
        console.error("About Us error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    topImage,
    bottomImage,
    backgroundImage,
    loading,
  };
};