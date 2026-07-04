"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutServices from "@/components/AboutServices";
import SelectedCases from "@/components/SelectedCases";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <Header start={loaded} />
      <main>
        <Hero start={loaded} />
        <AboutServices />
        <SelectedCases />
        <Awards />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
