"use client";

import { Girassol } from "next/font/google"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const girassol = Girassol({ weight: '400', subsets: ['latin']})

const ROTATION_ANGLE_RATIO = 10
const X_SEPARATION = 8
const MENU_CONTENT = [
  { text: 'ABOUT ME', link: '/about' },
  { text: 'PROJECTS', link: '/projects' },
  { text: 'CONTACT', link: '/contact' },
  { text: 'BLOG', link: '/blog' },
  { text: 'FUN', link: '/fun' },
]

export const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex fixed left-3 top-1/2 bottom-1/2 items-center">
      <div className="cursor-pointer z-20" onMouseEnter={() => setIsOpen(true)}>
        <svg width="30" height="33" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H29" stroke="#B3B3B3" strokeWidth="6" strokeLinecap="round"/>
          <path d="M4 17.5H29" stroke="#B3B3B3" strokeWidth="6" strokeLinecap="round"/>
          <path d="M4 31.5H29" stroke="#B3B3B3" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      </div>

      <motion.div
        initial={{ x: -50, scale: 0, opacity: 0 }}
        animate={{ x: isOpen ? 20 : -60, scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0.7 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10"
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex flex-col gap-6">          
          {MENU_CONTENT.map((item, index) => (
            <motion.div
              key={index}
              initial={{ x: -10, rotate: 0 }}
              animate={{
                x: isOpen ? 30 + -Math.pow(index - Math.floor(MENU_CONTENT.length / 2), 2) * X_SEPARATION : 0,
                rotate: isOpen ? (index - Math.floor(MENU_CONTENT.length / 2)) * ROTATION_ANGLE_RATIO : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Link href={item.link}>
                <p className={`${girassol.className} text-3xl text-white`}>
                  {item.text}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}