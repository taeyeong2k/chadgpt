'use client'

import { useCompletion } from 'ai/react'

export default function WorkoutParser() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({ route: '/api/completion/route' })

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="whitespace-pre-wrap">
        {completion}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Paste your workout log here..."
          onChange={handleInputChange}
          style={{ color: 'black' }}
        />
        <input type="submit" value="Parse Workout Log" disabled={isLoading} />
      </form>
    </div>
  )
}
