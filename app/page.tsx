'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Zap, DollarSign } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen resume-print">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 resume-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 resume-print">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center resume-print"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 resume-print">
              Build Your Professional Resume in{' '}
              <span className="text-primary-600 resume-print">Minutes</span>
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-700 mt-2 block resume-print">
                Free Forever.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto resume-print">
              Create stunning resumes with our professional templates. No sign-up required. No credit card. Just free, forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center resume-print">
              <Link
                href="/builder"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 resume-print"
              >
                Create Resume
              </Link>
              <Link
                href="/templates"
                className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-all duration-200 shadow-md hover:shadow-lg resume-print"
              >
                Choose Template
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden resume-print">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob resume-print"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 resume-print"></div>
        </div>
      </section>

      <section className="py-20 bg-white resume-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 resume-print">
          <div className="text-center mb-16 resume-print">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 resume-print">Why Choose ResuX?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto resume-print">
              Everything you need to create a professional resume, completely free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 resume-print">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow resume-print"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 resume-print">
                <FileText className="w-6 h-6 text-primary-600 resume-print" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 resume-print">Professional Templates</h3>
              <p className="text-gray-600 resume-print">Choose from beautifully designed templates that make your resume stand out.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow resume-print"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 resume-print">
                <Zap className="w-6 h-6 text-primary-600 resume-print" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 resume-print">Quick & Easy</h3>
              <p className="text-gray-600 resume-print">Build your resume in minutes with our intuitive builder. No learning curve.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow resume-print"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 resume-print">
                <DollarSign className="w-6 h-6 text-primary-600 resume-print" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 resume-print">100% Free</h3>
              <p className="text-gray-600 resume-print">No hidden costs, no subscriptions. Create unlimited resumes for free, forever.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}



