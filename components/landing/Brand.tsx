"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, CheckCircle, Target } from "lucide-react"

const brandValues = [
  {
    icon: Shield,
    title: "Надійність та міцність",
    description:
      "Наш одяг створений для найскладніших умов, використовуючи високоякісні матеріали та посилені шви.",
  },
  {
    icon: CheckCircle,
    title: "Комфорт у будь-яких умовах",
    description:
      "Ергономічний крій та продумані деталі забезпечують максимальну зручність навіть при тривалому носінні.",
  },
  {
    icon: Target,
    title: "Функціональність та практичність",
    description:
      "Кишені, зміцнені вставки та спеціальні матеріали роблять наш одяг ідеальним для професійного використання.",
  },
]

export default function Brand() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-24 bg-white"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-heading1-bold mb-12 text-center text-neutral-900"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Наші принципи
        </motion.h2>
        <motion.p
          className="text-body-medium text-neutral-600 text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Ми створюємо військовий одяг, який поєднує довговічність, комфорт та функціональність для професіоналів і ентузіастів.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {brandValues.map((value, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="mb-6 p-4 rounded-full bg-neutral-100">
                <value.icon className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-heading3-bold mb-4 text-neutral-900">{value.title}</h3>
              <p className="text-base-regular text-neutral-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}