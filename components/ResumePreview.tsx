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

export default function ResumePreview({
  data,
  template,
}: ResumePreviewProps) {
  const style =
    templateStyles[template as keyof typeof templateStyles] ??
    templateStyles[1]

  return (
    <div
      id="resume-preview"
      className={`${style.bgColor} ${style.borderColor} border-2 rounded-lg p-6 shadow-lg`}
    >
      {/* HEADER */}
      <div
        className={`${style.headerColor} rounded-lg p-6 mb-6 text-white`}
      >
        <div className="flex items-center gap-4">
          {data.photo && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={data.photo}
                alt={data.fullName || 'Profile photo'}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {data.fullName || 'Your Name'}
            </h1>
            <div className="text-sm space-y-1 opacity-90">
              {data.email && <div>{data.email}</div>}
              {data.phone && <div>{data.phone}</div>}
              {data.address && <div>{data.address}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      {data.summary && (
        <div className="mb-6">
          <h2
            className={`${style.accentColor} font-bold text-lg mb-2 border-b-2 ${style.borderColor} pb-1`}
          >
            Professional Summary
          </h2>
          <p
            className={`${style.textColor} text-sm leading-relaxed`}
          >
            {data.summary}
          </p>
        </div>
      )}

      {/* EXPERIENCE */}
      {data.experience?.some(exp => exp.company || exp.role) && (
        <div className="mb-6">
          <h2
            className={`${style.accentColor} font-bold text-lg mb-3 border-b-2 ${style.borderColor} pb-1`}
          >
            Experience
          </h2>

          <div className="space-y-4">
            {data.experience.map(
              (exp, index) =>
                (exp.company || exp.role) && (
                  <div key={index}>
                    <h3
                      className={`${style.accentColor} font-semibold text-base`}
                    >
                      {exp.role || 'Role'}
                    </h3>
                    <p
                      className={`${style.textColor} text-sm font-medium`}
                    >
                      {exp.company || 'Company'}
                    </p>
                    {exp.duration && (
                      <p
                        className={`${style.textColor} text-xs italic mt-1`}
                      >
                        {exp.duration}
                      </p>
                    )}
                    {exp.description && (
                      <p
                        className={`${style.textColor} text-xs mt-2`}
                      >
                        {exp.description}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {data.education?.some(edu => edu.school || edu.degree) && (
        <div className="mb-6">
          <h2
            className={`${style.accentColor} font-bold text-lg mb-3 border-b-2 ${style.borderColor} pb-1`}
          >
            Education
          </h2>

          <div className="space-y-3">
            {data.education.map(
              (edu, index) =>
                (edu.school || edu.degree) && (
                  <div key={index}>
                    <h3
                      className={`${style.accentColor} font-semibold text-base`}
                    >
                      {edu.degree || 'Degree'}
                    </h3>
                    <p
                      className={`${style.textColor} text-sm`}
                    >
                      {edu.school || 'School'}
                    </p>
                    {edu.year && (
                      <p
                        className={`${style.textColor} text-xs mt-1`}
                      >
                        {edu.year}
                      </p>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <div>
          <h2
            className={`${style.accentColor} font-bold text-lg mb-3 border-b-2 ${style.borderColor} pb-1`}
          >
            Skills
          </h2>

          <div className="space-y-1">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className={`${style.textColor} text-sm`}
              >
                • {skill}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
