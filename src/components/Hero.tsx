import { type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Gauge, Star } from 'lucide-react'
import skylineHero from '../assets/skyline-hero.jpg'
import skylineLive from '../assets/skyline-live.mp4'

const USE_VIDEO = true

export default function Hero() {
  const scrollToMessage = () => {
    document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-racing-dark px-4 py-20 sm:px-6 md:px-8 lg:px-12">
      {/* Background */}
      {USE_VIDEO ? (
        <video
          src={skylineLive}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${skylineHero})` }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-racing-dark/90 via-racing-dark/60 to-racing-dark/35 md:from-racing-dark/85 md:via-racing-dark/55 md:to-racing-dark/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-racing-dark/20 to-racing-dark/20 md:from-racing-dark/85 md:via-transparent md:to-transparent" />

      {/* Speed lines */}
      <div className="speed-lines opacity-60 sm:opacity-80">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="speed-line"
            style={{
              top: `${10 + i * 11}%`,
              '--duration': `${2.5 + i * 0.4}s`,
              '--delay': `${i * 0.5}s`,
            } as CSSProperties}
          />
        ))}
      </div>

      {/* Blue accent glow */}
      <div className="pointer-events-none absolute right-[-90px] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-racing-blue/20 blur-3xl sm:h-96 sm:w-96 md:right-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:mb-8 sm:gap-3"
        >
          <div className="h-px w-8 bg-racing-blue sm:w-12" />
          <span className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-racing-blue-light sm:text-sm sm:tracking-[0.25em]">
            Nissan Skyline GT-R R34
          </span>
          <div className="h-px w-8 bg-racing-blue sm:w-12" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-4 font-display leading-[0.9] text-white"
          style={{ fontSize: 'clamp(3.05rem, 17vw, 8rem)', letterSpacing: '0.02em' }}
        >
          Feliz aniversario<br />
          <span className="text-racing-blue-light">ALICE</span>
        </motion.h1>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-xl font-body text-base font-light tracking-[0.18em] text-white/80 sm:text-xl md:text-2xl md:tracking-widest"
        >
          Hoje a estrada é toda sua.
        </motion.p>

        {/* Specs line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-7 mb-10 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-3 font-body text-xs text-white/55 sm:mt-8 sm:mb-12 sm:gap-x-6 sm:text-sm"
        >
          <span className="flex items-center gap-1.5">
            <Gauge size={14} className="text-racing-blue-light" />
            GTR R34
          </span>
          <div className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-racing-blue-light" />
            RB26DETT
          </span>
          <div className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
          <span>280 CV</span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={scrollToMessage}
          className="btn-glow inline-flex w-full max-w-xs items-center justify-center gap-3 bg-racing-blue px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-racing-blue-dark sm:w-auto sm:max-w-none sm:px-8 sm:text-sm sm:tracking-[0.15em]"
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
        >
          Comecar a surpresa
          <ChevronDown size={16} className="animate-bounce" />
        </motion.button>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <div className="h-12 w-px bg-gradient-to-b from-racing-blue to-transparent" />
      </motion.div>
    </section>
  )
}
