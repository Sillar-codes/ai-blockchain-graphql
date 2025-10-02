import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { isAxiosError } from 'axios'

import { useAuth } from '../contexts/AuthContext'

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { signIn } = useAuth()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = ((clientX - left) / width - 0.5) * 20
      const y = ((clientY - top) / height - 0.5) * 20

      container.style.setProperty('--mouse-x', `${x}px`)
      container.style.setProperty('--mouse-y', `${y}px`)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await signIn(email, password)
    } catch (error) {
      if (isAxiosError(error)) setError(error.response?.data?.message)
      else setError('Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className='min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8'
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      {/* Animated Background Orbs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float-delayed' />
        <div className='absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-float-slow' />
      </div>

      {/* Floating Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-white/20 rounded-full animate-particle'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className='max-w-md w-full relative z-10'>
        {/* Glassmorphism Card */}
        <div
          className='backdrop-blur-2xl bg-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 relative overflow-hidden transition-transform duration-300'
          style={{
            transform: 'translate(calc(var(--mouse-x, 0px) * 0.05), calc(var(--mouse-y, 0px) * 0.05))'
          }}
        >
          {/* Shimmer Effect */}
          <div className='absolute inset-0 opacity-30'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer' />
          </div>

          {/* Content */}
          <div className='relative z-10'>
            {/* Logo/Icon */}
            <div className='flex justify-center mb-6'>
              <div className='w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
              </div>
            </div>

            {/* Header */}
            <div className='text-center mb-8'>
              <h2 className='text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight'>Welcome Back</h2>
              <p className='text-white/80 text-sm'>
                Don't have an account?{' '}
                <Link
                  to='/signup'
                  className='font-semibold text-white hover:text-white/90 underline underline-offset-2 transition-all duration-200'
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Form */}
            <form className='space-y-5' onSubmit={handleSubmit}>
              {/* Error Message */}
              {error && (
                <div className='bg-red-500/20 backdrop-blur-xl border border-red-300/30 text-white px-4 py-3 rounded-2xl animate-slideDown flex items-start gap-3'>
                  <svg className='w-5 h-5 flex-shrink-0 mt-0.5' fill='currentColor' viewBox='0 0 20 20'>
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='text-sm'>{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div className='space-y-2'>
                <label htmlFor='email' className='block text-sm font-medium text-white/90'>
                  Email Address
                </label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg
                      className='w-5 h-5 text-white/60 group-focus-within:text-white transition-colors'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                      />
                    </svg>
                  </div>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    autoComplete='email'
                    className='w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 hover:bg-white/15'
                    placeholder='you@example.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className='space-y-2'>
                <label htmlFor='password' className='block text-sm font-medium text-white/90'>
                  Password
                </label>
                <div className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <svg
                      className='w-5 h-5 text-white/60 group-focus-within:text-white transition-colors'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                      />
                    </svg>
                  </div>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete='current-password'
                    className='w-full pl-12 pr-12 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 hover:bg-white/15'
                    placeholder='••••••••'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors'
                  >
                    {showPassword ? (
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                        />
                      </svg>
                    ) : (
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className='flex items-center justify-between text-sm'>
                <label className='flex items-center cursor-pointer group'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 rounded border-white/30 bg-white/10 text-white focus:ring-2 focus:ring-white/50 cursor-pointer'
                  />
                  <span className='ml-2 text-white/80 group-hover:text-white transition-colors'>Remember me</span>
                </label>
                <Link to='/forgot-password' className='text-white/80 hover:text-white font-medium transition-colors'>
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full py-4 px-6 bg-white text-purple-600 font-semibold rounded-2xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 shadow-xl hover:shadow-2xl relative overflow-hidden group'
              >
                <span className='absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300' />
                <span className='relative flex items-center justify-center'>
                  {isLoading ? (
                    <>
                      <div className='w-5 h-5 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mr-2' />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <svg
                        className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 7l5 5m0 0l-5 5m5-5H6'
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {/* Divider */}
              <div className='relative my-6'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-white/20' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-4 bg-transparent text-white/60'>Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className='grid grid-cols-2 gap-3'>
                {[
                  {
                    name: 'Google',
                    icon: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                  },
                  {
                    name: 'GitHub',
                    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                  }
                ].map(provider => (
                  <button
                    key={provider.name}
                    type='button'
                    className='flex items-center justify-center gap-2 py-3 px-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200 group'
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d={provider.icon} />
                    </svg>
                    <span className='text-sm font-medium'>{provider.name}</span>
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>

        {/* Footer Text */}
        <p className='mt-6 text-center text-white/60 text-sm'>Protected by enterprise-grade security</p>
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes particle {
          0%, 100% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px) scale(1); opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
