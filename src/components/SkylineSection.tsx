import { type CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Wind, Shield, Award } from 'lucide-react'
import skylineHero from '../assets/skyline-hero.jpg'

const specs = [
  { label: 'Motor', value: 'RB26DETT Twin-Turbo' },
  { label: 'Potencia', value: '280 CV (320+ real)' },
  { label: 'Tracao', value: 'ATTESA ET-S AWD' },
  { label: 'Cambio', value: '6 marchas manual' },
]

export default function SkylineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-racing-dark py-0">
      {/* Car image full bleed */}
      <div className="relative min-h-[720px] sm:min-h-[680px] md:h-[76vh] md:min-h-[560px]">
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-center"
          style={{ backgroundImage: `url(${skylineHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-racing-dark/45 via-racing-dark/20 to-racing-dark md:bg-gradient-to-r md:from-racing-dark md:via-racing-dark/55 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-racing-dark/35 to-transparent md:via-transparent md:to-racing-dark/40" />

        {/* Speed lines over image */}
        <div className="speed-lines opacity-35 sm:opacity-50 md:opacity-60">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="speed-line"
              style={{
                top: `${20 + i * 14}%`,
                '--duration': `${3 + i * 0.5}s`,
                '--delay': `${i * 0.7}s`,
              } as CSSProperties}
            />
          ))}
        </div>

        {/* Content */}
        <div ref={ref} className="absolute inset-0 flex items-end px-5 pb-16 pt-20 sm:px-8 sm:pb-20 md:items-center md:px-16 md:py-0 lg:px-24">
          <div className="max-w-xl rounded-none border border-white/0 bg-racing-dark/0 md:bg-transparent">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-5 flex flex-wrap items-center gap-3 sm:mb-6"
            >
              <div className="h-px w-8 bg-racing-blue-light" />
              <span className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-racing-blue-light sm:text-xs sm:tracking-[0.3em]">
                Nissan Skyline GT-R34
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-5 font-display leading-none text-white sm:mb-6"
              style={{ fontSize: 'clamp(3rem, 16vw, 5.5rem)', letterSpacing: '0.03em' }}
            >
              BNR34<br />
              <span className="text-racing-blue-light">Skyline</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 max-w-[34rem] font-body text-sm font-light leading-relaxed text-white/75 sm:text-base md:mb-10"
            >
              O R34 nao esta aqui so por estetica. Ele representa presenca, forca, personalidade e aquele tipo de beleza que chama atencao sem precisar pedir licenca. E é claro, ele lembra nosso eterno <span className="text-racing-blue-light">Brian O'Conner</span>.
            </motion.p>

            {/* Icons row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              {[
                { Icon: Wind, label: 'Twin-Turbo' },
                { Icon: Shield, label: 'AWD' },
                { Icon: Award, label: 'Lenda' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="glass-dark flex h-10 w-10 items-center justify-center">
                    <Icon size={16} className="text-racing-blue-light" />
                  </div>
                  <span className="font-body text-[0.65rem] uppercase tracking-widest text-white/55 sm:text-xs">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Specs bar */}
      <div className="border-t border-racing-blue/20 bg-racing-dark px-5 py-6 sm:px-8 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0"
            >
              <span className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-white/30">{spec.label}</span>
              <span className="font-display text-lg tracking-wider text-white md:text-xl">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
