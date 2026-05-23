import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Sparkles, Sun, Car } from 'lucide-react'

const cards = [
  {
    icon: Sparkles,
    title: 'Seu estilo',
    desc: 'Unico, marcante e sem esforco. O tipo de presenca que dispensa explicacao, a vibe que você transmite é incrivel!!',
  },
  {
    icon: Zap,
    title: 'Sua energia',
    desc: 'Intensa na medida certa. Aquele motor que nunca apaga, mesmo nas curvas mais fechadas você mantem um sorriso lindo no rosto.',
  },
  {
    icon: Sun,
    title: 'Seu dia',
    desc: 'Hoje merece ser celebrado com a mesma potencia e elegancia que voce carrega por ai.',
  },
  {
    icon: Car,
    title: 'Sua paixao pelo R34',
    desc: 'Porque voce entende que existem maquinas e existem obras de arte. O Skyline é as duas coisas.',
  },
]

export default function ReasonCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-racing-silver-light px-5 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #2563EB,
            #2563EB 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <div className="h-px w-8 bg-racing-blue" />
            <span className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-racing-blue sm:text-xs sm:tracking-[0.3em]">
              Por que esse site existe?
            </span>
            <div className="h-px w-8 bg-racing-blue" />
          </div>
          <h2
            className="font-display leading-none text-racing-dark-mid"
            style={{ fontSize: 'clamp(2.35rem, 11vw, 4rem)', letterSpacing: '0.03em' }}
          >
            Feito especialmente para voce
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card-hover glass group p-6 sm:p-8"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-racing-blue/10 transition-colors duration-300 group-hover:bg-racing-blue/20 sm:h-12 sm:w-12"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                  >
                    <Icon size={20} className="text-racing-blue" />
                  </div>

                  <div>
                    <h3 className="mb-2 font-display text-2xl tracking-wide text-racing-dark-mid transition-colors duration-300 group-hover:text-racing-blue sm:text-[1.7rem]">
                      {card.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-racing-dark-mid/60 sm:text-[0.95rem]">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-px bg-gradient-to-r from-racing-blue/40 to-transparent transition-all duration-500 group-hover:from-racing-blue" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
