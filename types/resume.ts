export interface ResumeData {
  fullName: string
  email: string
  phone: string
  address: string
  summary: string
  photo?: string
  education: Education[]
  experience: Experience[]
  skills: string[]
}

export interface Education {
  school: string
  degree: string
  year: string
}

export interface Experience {
  company: string
  role: string
  duration: string
  description: string
}


