import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const moments = [
  {
    phrase: 'Que seu novo ciclo seja leve.',
    detail: 'Como a entrada de uma reta depois de uma curva pesada.',
    accent: '#2563EB',
  },
  {
    phrase: 'Que seus sonhos acelerem.',
    detail: 'Sem freio de mao. Sem olhar so pelo retrovisor.',
    accent: '#94A3B8',
  },
  {
    phrase: 'Que nunca falte brilho no caminho.',
    detail: 'Aquele brilho que ve nos farois do R34 na noite. Nao apaga.',
    accent: '#38BDF8',
  },
  {
    phrase: 'E pros seus 18 anos.',
    detail: 'Que esse novo ciclo Deus abençoe seu caminho, suas escolhas e sua vida. Você é incrivel!!!',
    accent: '#FF0033',
  },
]

export default function MomentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 sm:px-6 sm:py-24 md:px-8 md:py-28">
      <div ref={ref} className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center sm:mb-16 md:mb-20"
        >
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <div className="h-px w-8 bg-racing-blue" />
            <span className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-racing-blue sm:text-xs sm:tracking-[0.3em]">
              Para o novo ciclo
            </span>
            <div className="h-px w-8 bg-racing-blue" />
          </div>
          <h2
            className="font-display leading-none text-racing-dark-mid"
            style={{ fontSize: 'clamp(2.3rem, 11vw, 4rem)' }}
          >
            Tres desejos meus pra você, sem pressa
          </h2>
        </motion.div>

        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
          {moments.map((m, i) => (
            <motion.div
              key={m.phrase}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.18 }}
              className={`card-hover relative overflow-hidden p-6 sm:p-8 md:p-10 ${i % 2 !== 0 ? 'md:ml-16' : ''}`}
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                clipPath:
                  i % 2 === 0
                    ? 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)'
                    : 'polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)',
              }}
            >
              {/* Accent line */}
              <div className="absolute bottom-0 left-0 top-0 w-1" style={{ background: m.accent }} />

              <div className="pl-4 sm:pl-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <p
                      className="mb-3 font-display leading-tight text-racing-dark-mid"
                      style={{ fontSize: 'clamp(1.55rem, 8vw, 2.2rem)', letterSpacing: '0.02em' }}
                    >
                      {m.phrase}
                    </p>
                    <p className="font-body text-sm font-light leading-relaxed text-racing-dark-mid/55 sm:text-base">
                      {m.detail}
                    </p>
                  </div>
                  <ArrowRight size={20} style={{ color: m.accent }} className="mt-2 hidden flex-shrink-0 sm:block" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
