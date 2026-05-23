import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

export default function MessageSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="message" className="relative overflow-hidden bg-white px-5 py-20 sm:px-6 sm:py-24 md:px-8 md:py-32">
      {/* Background detail */}
      <div className="absolute left-0 top-0 ml-12 hidden h-full w-px bg-gradient-to-b from-transparent via-racing-blue/20 to-transparent md:block" />
      <div className="absolute right-0 top-0 mr-12 hidden h-full w-px bg-gradient-to-b from-transparent via-racing-blue/10 to-transparent md:block" />

      {/* Blue glow top */}
      <div className="absolute left-1/2 top-0 h-1 w-48 -translate-x-1/2 bg-racing-blue blur-sm sm:w-64" />

      <div ref={ref} className="mx-auto max-w-3xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-wrap items-center gap-3 sm:mb-12"
        >
          <div className="h-px w-8 bg-racing-blue" />
          <span className="font-body text-[0.68rem] font-medium uppercase tracking-[0.2em] text-racing-blue sm:text-xs sm:tracking-[0.3em]">
            Uma mensagem <span className="text-racing-blue-light">minha</span> para voce
          </span>
        </motion.div>

        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <Quote size={30} className="text-racing-blue/30 sm:h-8 sm:w-8" />
        </motion.div>

        {/* Message text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-body text-xl font-light leading-relaxed text-racing-dark-mid sm:text-2xl"
        >
          Algumas pessoas passam pela vida como carros raros: deixam presenca, estilo e uma marca impossivel de esquecer.
          <span className="text-racing-blue-light"> Você é uma delas.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="divider-racing my-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-body text-base font-light leading-relaxed text-racing-dark-mid/70 sm:text-lg md:text-xl"
        >
          Hoje e o seu dia, e eu quis criar algo que combinasse com uma das coisas que voce admira: velocidade, beleza, personalidade e aquele Skyline que parece ter saido do proprio filme de
          <span className="text-[#FF0033]"> Velozes e Furiosos</span>.
        </motion.p>

        {/* Signature detail */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-12 flex items-center gap-4 sm:mt-14"
        >
          <div className="flex flex-col gap-1">
            <div className="h-px w-20 bg-racing-blue sm:w-24" />
            <div className="h-px w-10 bg-racing-blue/40 sm:w-12" />
          </div>
          <span className="font-display text-2xl tracking-wider text-racing-blue">
            GT-R R34
          </span>
        </motion.div>
      </div>
    </section>
  )
}
