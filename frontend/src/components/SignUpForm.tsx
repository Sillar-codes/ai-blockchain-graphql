import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isAxiosError } from 'axios'

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { signUp } = useAuth()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (clientX - left) / width
      const y = (clientY - top) / height

      container.style.setProperty('--mouse-x', x.toString())
      container.style.setProperty('--mouse-y', y.toString())
    }

    container.addEventListener('mousemove', handleMouseMove)

    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await signUp(formData.email, formData.password, formData.name)
    } catch (error) {
      if (isAxiosError(error)) setError(error.response?.data)
      else setError('Failed to create new account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div
      ref={containerRef}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'
    >
      {/* Animated gradient orbs */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
      <div className='absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
      <div className='absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000' />

      {/* Enhanced mouse follow effect */}
      <div
        className='absolute inset-0 transition-all duration-300 pointer-events-none'
        style={{
          background: `
            radial-gradient(600px circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), 
              rgba(255, 255, 255, 0.15) 0%, 
              rgba(255, 255, 255, 0.05) 40%, 
              transparent 70%)
          `
        }}
      />

      {/* Additional mouse trail effect */}
      <div
        className='absolute inset-0 opacity-50 pointer-events-none'
        style={{
          background: `
            radial-gradient(300px circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(255, 255, 255, 0.1) 50%, 
              transparent 80%)
          `,
          transition: 'background 0.1s ease-out'
        }}
      />

      <div className='max-w-md w-full space-y-8 relative z-10'>
        <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]'>
          <div className='text-center'>
            <div className='inline-block p-3 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm mb-4 shadow-lg'>
              <svg className='w-12 h-12 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                />
              </svg>
            </div>
            <h2 className='text-4xl font-bold text-white mb-2 drop-shadow-lg'>Create Account</h2>
            <p className='text-white/80 text-sm'>
              Already have an account?{' '}
              <Link
                to='/signin'
                className='font-semibold text-white hover:text-white/90 transition-colors duration-200 underline underline-offset-2'
              >
                Sign in here
              </Link>
            </p>
          </div>

          <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
            {error && (
              <div className='bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-white px-4 py-3 rounded-xl animate-shake shadow-lg'>
                <div className='flex items-center'>
                  <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div className='space-y-4'>
              {[
                {
                  id: 'name',
                  type: 'text',
                  label: 'Full Name',
                  placeholder: 'Enter your full name',
                  autoComplete: 'name',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  )
                },
                {
                  id: 'email',
                  type: 'email',
                  label: 'Email Address',
                  placeholder: 'Enter your email',
                  autoComplete: 'email',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                    />
                  )
                },
                {
                  id: 'password',
                  type: 'password',
                  label: 'Password',
                  placeholder: 'Create a password (min. 8 characters)',
                  autoComplete: 'new-password',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  )
                },
                {
                  id: 'confirmPassword',
                  type: 'password',
                  label: 'Confirm Password',
                  placeholder: 'Confirm your password',
                  autoComplete: 'new-password',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  )
                }
              ].map(field => (
                <div key={field.id} className='group'>
                  <label htmlFor={field.id} className='block text-sm font-semibold text-white mb-2 drop-shadow'>
                    {field.label}
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-white/60 group-focus-within:text-white transition-colors duration-200'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        {field.icon}
                      </svg>
                    </div>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required
                      autoComplete={field.autoComplete}
                      className='w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 hover:bg-white/15 hover:border-white/40'
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className='pt-2'>
              <button
                type='submit'
                disabled={isLoading}
                className='group relative w-full py-3.5 px-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-purple-600 disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-xl hover:shadow-2xl overflow-hidden'
              >
                <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300' />
                {isLoading ? (
                  <span className='flex items-center justify-center'>
                    <div className='w-5 h-5 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mr-2' />
                    Creating your account...
                  </span>
                ) : (
                  <span className='flex items-center justify-center'>
                    Create Account
                    <svg
                      className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </span>
                )}
              </button>
            </div>

            <p className='text-center text-xs text-white/70 pt-2'>
              By signing up, you agree to our{' '}
              <a href='#' className='underline hover:text-white transition-colors'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='#' className='underline hover:text-white transition-colors'>
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
