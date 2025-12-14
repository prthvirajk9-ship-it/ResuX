'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const templates = [
  {
    id: 1,
    name: 'Modern Classic',
    description: 'Clean and professional design perfect for any industry',
    preview: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-300',
      headerColor: 'bg-primary-600',
      textColor: 'text-gray-800',
      accentColor: 'text-primary-600',
    },
  },
  {
    id: 2,
    name: 'Bold Professional',
    description: 'Stand out with this bold and modern template',
    preview: {
      bgColor: 'bg-gray-50',
      borderColor: 'border-primary-500',
      headerColor: 'bg-gray-900',
      textColor: 'text-gray-700',
      accentColor: 'text-primary-600',
    },
  },
  {
    id: 3,
    name: 'Minimal Elegant',
    description: 'Simple and elegant design for a sophisticated look',
    preview: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      headerColor: 'bg-gray-800',
      textColor: 'text-gray-800',
      accentColor: 'text-gray-900',
    },
  },
]

export default function TemplatesPage() {
  const router = useRouter()

  const handleUseTemplate = (templateId: number) => {
    localStorage.setItem('selectedTemplate', templateId.toString())
    router.push('/builder')
  }

  const TemplatePreview = ({ template }: { template: typeof templates[0] }) => {
    const { preview } = template
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`${preview.bgColor} ${preview.borderColor} border-2 rounded-lg p-4 shadow-lg transform transition-all`}
      >
        <div className={`${preview.headerColor} h-20 rounded-t mb-4 flex items-center px-4`}>
          <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md"></div>
          <div className="ml-4 text-white">
            <div className="h-4 bg-white/80 rounded w-32 mb-2"></div>
            <div className="h-3 bg-white/60 rounded w-24 mb-1"></div>
            <div className="h-3 bg-white/60 rounded w-20"></div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className={`${preview.accentColor} font-bold text-sm mb-2 border-b-2 ${preview.borderColor} pb-1`}>
            PROFESSIONAL SUMMARY
          </div>
          <div className={`${preview.textColor} text-xs space-y-1 mb-3`}>
            <div className="h-2 bg-gray-300 rounded w-full"></div>
            <div className="h-2 bg-gray-300 rounded w-5/6"></div>
            <div className="h-2 bg-gray-300 rounded w-4/6"></div>
          </div>
          <div className={`${preview.accentColor} font-bold text-sm mb-2 border-b-2 ${preview.borderColor} pb-1`}>
            EXPERIENCE
          </div>
          <div className={`${preview.textColor} text-xs space-y-2`}>
            <div>
              <div className="h-2 bg-gray-300 rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div>
              <div className="h-2 bg-gray-300 rounded w-2/3 mb-1"></div>
              <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className={`${preview.accentColor} font-bold text-sm mb-2 border-b-2 ${preview.borderColor} pb-1 mt-3`}>
            SKILLS
          </div>
          <div className="flex flex-wrap gap-1">
            <div className={`h-5 w-16 ${preview.headerColor} rounded-full`}></div>
            <div className={`h-5 w-20 ${preview.headerColor} rounded-full`}></div>
            <div className={`h-5 w-14 ${preview.headerColor} rounded-full`}></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Template</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a professional template that matches your style. All templates are free and fully customizable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-6">{template.description}</p>
                
                <div className="mb-6">
                  <TemplatePreview template={template} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUseTemplate(template.id)}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Use Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

