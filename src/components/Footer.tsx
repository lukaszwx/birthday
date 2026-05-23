import { type CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Gauge } from 'lucide-react'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <footer className="relative overflow-hidden bg-racing-dark px-5 py-10 sm:px-6 sm:py-12 md:px-8">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-racing-blue to-transparent" />

      {/* Speed lines bg */}
      <div className="speed-lines opacity-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="speed-line"
            style={{
              top: `${25 + i * 25}%`,
              '--duration': `${4 + i * 0.8}s`,
              '--delay': `${i * 1.2}s`,
            } as CSSProperties}
          />
        ))}
      </div>

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
        >
          {/* Left */}
          <div className="flex items-center gap-3">
            <Gauge size={16} className="text-racing-blue" />
            <span className="font-display text-xl tracking-widest text-white">
              SKYLINE R34
            </span>
          </div>

          {/* Center */}
          <p className="font-body text-xs uppercase tracking-[0.2em] text-white/40">
            Espero que tenha gostado
          </p>

          {/* Right */}
          <div className="flex max-w-xs flex-col items-center gap-1 md:items-end">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-racing-blue" />
              <blockquote className="font-body text-xs italic leading-relaxed text-white/45">
                “Eu vivo minha vida um quarto de milha por vez”
              </blockquote>
            </div>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-white/25">
              Brian O'Conner
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
