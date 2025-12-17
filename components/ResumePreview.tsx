'use client'

import { ResumeData } from '@/types/resume'

interface ResumePreviewProps {
  data: ResumeData
  template: number
}

const templateStyles = {
  1: {
    bgColor: 'bg-white',
    headerColor: 'bg-primary-600',
    textColor: 'text-gray-800',
    accentColor: 'text-primary-600',
    borderColor: 'border-gray-300',
  },
  2: {
    bgColor: 'bg-gray-50',
    headerColor: 'bg-gray-900',
    textColor: 'text-gray-700',
    accentColor: 'text-primary-600',
    borderColor: 'border-primary-500',
  },
  3: {
    bgColor: 'bg-white',
    headerColor: 'bg-gray-800',
    textColor: 'text-gray-800',
    accentColor: 'text-gray-900',
    borderColor: 'border-gray-200',
  },
} as const

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const style =
    templateStyles[template as keyof typeof templateStyles] ??
    templateStyles[1]

  return (
    <div
      className="preview-wrapper w-full overflow-auto"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div
        id="resume-preview"
        className={`${style.bgColor} ${style.borderColor} border-2 rounded-lg p-6 shadow-lg`}
        style={{
          width: '794px',
          minHeight: '1123px',
          maxWidth: '794px',
          height: 'auto',
          margin: '0 auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* HEADER */}
        <div
          className={`${style.headerColor} rounded-lg p-6 mb-6 text-white resume-header`}
        >
          <div className="flex items-center gap-4">
            {data.photo && (
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={data.photo}
                  alt={data.fullName || 'Profile photo'}
                  className="w-full h-full object-cover resume-photo"
                />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold">
                {data.fullName || 'Your Name'}
              </h1>
              <p className="opacity-90">{data.email}</p>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        {data.summary && (
          <div>
            <h2 className={`${style.accentColor} font-bold mb-2`}>
              Professional Summary
            </h2>
            <p className={style.textColor}>{data.summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
