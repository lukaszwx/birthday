import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Star } from 'lucide-react'

export default function FinalLetter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-racing-silver-light px-5 py-20 sm:px-6 sm:py-24 md:px-8 md:py-32">
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-racing-blue to-transparent" />

      {/* Corner details */}
      <div className="absolute left-5 top-5 h-6 w-6 border-l border-t border-racing-blue/25 sm:left-8 sm:top-8 sm:h-8 sm:w-8" />
      <div className="absolute right-5 top-5 h-6 w-6 border-r border-t border-racing-blue/25 sm:right-8 sm:top-8 sm:h-8 sm:w-8" />
      <div className="absolute bottom-5 left-5 h-6 w-6 border-b border-l border-racing-blue/25 sm:bottom-8 sm:left-8 sm:h-8 sm:w-8" />
      <div className="absolute bottom-5 right-5 h-6 w-6 border-b border-r border-racing-blue/25 sm:bottom-8 sm:right-8 sm:h-8 sm:w-8" />

      <div ref={ref} className="relative mx-auto max-w-2xl text-center">
        {/* Icon cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center justify-center gap-3 sm:mb-10 sm:gap-4"
        >
          <Star size={16} className="text-racing-blue/40" />
          <div className="h-px w-10 bg-racing-blue sm:w-12" />
          <Heart size={20} className="text-racing-blue" />
          <div className="h-px w-10 bg-racing-blue sm:w-12" />
          <Star size={16} className="text-racing-blue/40" />
        </motion.div>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-7 sm:mb-8"
        >
          <span className="font-body text-[0.68rem] uppercase tracking-[0.22em] text-racing-blue sm:text-xs sm:tracking-[0.3em]">
            Carta final
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 font-display leading-none text-racing-dark-mid sm:mb-10"
          style={{ fontSize: 'clamp(2.45rem, 12vw, 4.5rem)', letterSpacing: '0.03em' }}
        >
          Feliz Aniversario, <span className="text-racing-blue">Alice</span>
        </motion.h2>

        {/* Letter text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-body text-base font-light leading-[1.85] text-racing-dark-mid/70 sm:text-lg sm:leading-[1.9]"
        >
          Que esse novo ciclo venha com paz, conquistas, boas memorias e motivos para sorrir.
          Que voce continue sendo essa pessoa unica, intensa, bonita por dentro e por fora.
          E que a vida te entregue caminhos tao incriveis quanto o som de um Skyline passando a noite nas estradas do japão. Feliz aniversário, Alice, de coração eu te desejo todas as melhores coisas que a vida possa oferecer!
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-10 h-px bg-gradient-to-r from-transparent via-racing-blue to-transparent sm:my-12"
        />

        {/* Final badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="glass inline-flex max-w-full flex-wrap items-center justify-center gap-3 px-5 py-3 sm:px-6"
          style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
        >
          <div className="h-2 w-2 rounded-full bg-racing-blue animate-pulse" />
          <span className="font-display text-lg tracking-widest text-racing-dark-mid sm:text-xl">
            De Lucas para <span className="text-racing-blue">Alice</span>
          </span>
          <div className="h-2 w-2 rounded-full bg-racing-blue animate-pulse" />
        </motion.div>
      </div>
    </section>
  )
}
