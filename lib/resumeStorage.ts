import { ResumeData } from '@/types/resume'

const STORAGE_KEY = 'resumeData'
const TEMPLATE_KEY = 'selectedTemplate'

export const saveResumeData = (data: ResumeData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export const getResumeData = (): ResumeData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  }
  return null
}

export const saveTemplate = (templateId: number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TEMPLATE_KEY, templateId.toString())
  }
}

export const getTemplate = (): number => {
  if (typeof window !== 'undefined') {
    const template = localStorage.getItem(TEMPLATE_KEY)
    return template ? parseInt(template) : 1
  }
  return 1
}


