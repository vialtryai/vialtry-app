'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Prompt {
  id: string
  prompt_text: string
  category: string
  is_active: boolean
  created_at: string
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [newPrompt, setNewPrompt] = useState('')
  const [category, setCategory] = useState('general')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchPrompts()
  }, [])

  async function fetchPrompts() {
    setLoading(true)
    const { data } = await supabase
      .from('user_prompts')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    if (data) setPrompts(data)
    setLoading(false)
  }

  async function addPrompt() {
    if (!newPrompt.trim()) return
    setSaving(true)
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .limit(1)
      .single()

    await supabase.from('user_prompts').insert({
      brand_id: brand?.id,
      prompt_text: newPrompt.trim(),
      category,
      is_active: true
    })
    setNewPrompt('')
    await fetchPrompts()
    setSaving(false)
  }

  async function deletePrompt(id: string) {
    await supabase
      .from('user_prompts')
      .update({ is_active: false })
      .eq('id', id)
    await fetchPrompts()
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-2">SOV Prompts</h1>
      <p className="text-gray-400 mb-6">
        Manage prompts used to check your AI visibility. 
        Runs automatically at low-traffic hours.
      </p>

      {/* Add Prompt */}
      <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
        <h2 className="text-white font-semibold mb-3">Add Prompt</h2>
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPrompt()}
            placeholder="e.g. best running shoes under $100"
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 
                       border border-gray-700 focus:border-purple-500 
                       focus:outline-none placeholder-gray-500"
          />
          <select
            value={cate
