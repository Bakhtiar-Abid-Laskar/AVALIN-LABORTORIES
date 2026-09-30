/**
 * FormField — form primitive set — Avalin Laboratories
 *
 * Provides:
 *   - FormField (wrapper with Label, helper text, and error handling)
 *   - Input
 *   - Textarea
 *   - Select
 *
 * Usage:
 *   <FormField label="Full Name" required error={errors.name} id="name">
 *     <Input id="name" placeholder="Dr. John Doe" {...register('name')} />
 *   </FormField>
 */

import React, { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  id: string
  label?: string
  required?: boolean
  optional?: boolean
  error?: string
  hint?: string
  className?: string
  children: React.ReactNode
}

export function FormField({
  id,
  label,
  required = false,
  optional = false,
  error,
  hint,
  className,
  children,
}: FormFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="block text-sm font-semibold text-text-primary">
            {label}
            {required && <span className="ml-1 text-safety-unsafe-DEFAULT" aria-hidden="true">*</span>}
          </label>
          {optional && (
            <span className="text-xs text-text-tertiary">Optional</span>
          )}
        </div>
      )}

      {children}

      {hint && !error && (
        <p id={hintId} className="text-xs text-text-secondary leading-normal">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-safety-unsafe-DEFAULT leading-normal">
          {error}
        </p>
      )}
    </div>
  )
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full rounded-lg border bg-surface-alt px-3.5 py-2.5 text-base sm:text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-fast',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          hasError
            ? 'border-safety-unsafe-DEFAULT focus:border-safety-unsafe-DEFAULT focus:ring-safety-unsafe-DEFAULT/30'
            : 'border-border focus:border-primary-600 focus:ring-primary-600/20',
          'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-75',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full rounded-lg border bg-surface-alt px-3.5 py-2.5 text-base sm:text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-fast resize-y',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          hasError
            ? 'border-safety-unsafe-DEFAULT focus:border-safety-unsafe-DEFAULT focus:ring-safety-unsafe-DEFAULT/30'
            : 'border-border focus:border-primary-600 focus:ring-primary-600/20',
          'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-75',
          className,
        )}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-surface-alt px-3.5 py-2.5 text-base sm:text-sm text-text-primary transition-colors duration-fast appearance-none',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          hasError
            ? 'border-safety-unsafe-DEFAULT focus:border-safety-unsafe-DEFAULT focus:ring-safety-unsafe-DEFAULT/30'
            : 'border-border focus:border-primary-600 focus:ring-primary-600/20',
          'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-75',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    )
  },
)
Select.displayName = 'Select'
