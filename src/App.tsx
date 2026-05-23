import { useState } from "react";
import BirthdayGate from "./components/BirthdayGate";
import Hero from "./components/Hero";
import MessageSection from "./components/MessageSection";
import ReasonCards from "./components/ReasonCards";
import SkylineSection from "./components/SkylineSection";
import MomentsSection from "./components/MomentsSection";
import FinalLetter from "./components/FinalLetter";
import Footer from "./components/Footer";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered && <BirthdayGate onEnter={() => setEntered(true)} />}

      {entered && (
        <main className="min-h-screen overflow-x-hidden">
          <Hero />
          <MessageSection />
          <ReasonCards />
          <SkylineSection />
          <MomentsSection />
          <FinalLetter />
          <Footer />
        </main>
      )}
    </>
  );
}
