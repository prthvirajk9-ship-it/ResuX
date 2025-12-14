'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, X, Upload, Download } from 'lucide-react'
import { ResumeData, Education, Experience } from '@/types/resume'
import { saveResumeData, getResumeData, getTemplate, saveTemplate } from '@/lib/resumeStorage'
import { exportToPDF } from '@/lib/pdfExport'
import ResumePreview from '@/components/ResumePreview'

export default function BuilderPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ResumeData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    photo: '',
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    skills: [],
  })
  const [skillInput, setSkillInput] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const savedData = getResumeData()
    const savedTemplate = getTemplate()
    if (savedData) {
      setFormData(savedData)
    }
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education]
    newEducation[index][field] = value
    setFormData((prev) => ({ ...prev, education: newEducation }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }],
    }))
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...formData.experience]
    newExperience[index][field] = value
    setFormData((prev) => ({ ...prev, experience: newExperience }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }],
    }))
  }

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleSave = () => {
    saveResumeData(formData)
    saveTemplate(selectedTemplate)
    alert('Resume saved successfully!')
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      saveResumeData(formData)
      saveTemplate(selectedTemplate)
      await exportToPDF('resume-preview', `${formData.fullName || 'resume'}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Fill in your information and see a live preview</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Template</label>
              <select
                value={selectedTemplate}
                onChange={(e) => {
                  const template = parseInt(e.target.value)
                  setSelectedTemplate(template)
                  saveTemplate(template)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value={1}>Modern Classic</option>
                <option value={2}>Bold Professional</option>
                <option value={3}>Minimal Elegant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Photo</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {formData.photo && (
                  <button
                    onClick={() => setFormData((prev) => ({ ...prev, photo: '' }))}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="City, State, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Brief professional summary..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Education</label>
                <button
                  onClick={addEducation}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                    {formData.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Experience</label>
                <button
                  onClick={addExperience}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {formData.experience.map((exp, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Duration (e.g., Jan 2020 - Present)"
                    value={exp.duration}
                    onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
                  />
                  {formData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Type skill and press Enter"
                />
                <button
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  'Exporting...'
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Live Preview</h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4">
              <ResumePreview data={formData} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

