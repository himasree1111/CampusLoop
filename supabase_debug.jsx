import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const Debug = () => {
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    console.log('Vite env:', {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0,20) + '...'
    })

    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL || '',
      import.meta.env.VITE_SUPABASE_ANON_KEY || ''
    )

    supabase.from('users').select('*').limit(1).then(({ data, error }) => {
      if (error) {
        console.error('Supabase error:', error)
        setStatus('Error: ' + error.message)
      } else {
        setStatus('Success: Supabase connected! Users: ' + (data?.length || 0))
      }
    })
  }, [])

  return <div>{status}</div>
}

export default Debug

