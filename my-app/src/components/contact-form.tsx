import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const contactEndpoint = 'https://formsubmit.co/ajax/cm6lv03h@anonaddy.me'
const submitCooldownMs = 30000
const celebrationStars = [
  { key: 'star-1', endX: 0, endY: -220, delay: 0 },
  { key: 'star-2', endX: 170, endY: -150, delay: 0.05 },
  { key: 'star-3', endX: 210, endY: 30, delay: 0.1 },
  { key: 'star-4', endX: 130, endY: 170, delay: 0.15 },
  { key: 'star-5', endX: -10, endY: 220, delay: 0.2 },
  { key: 'star-6', endX: -170, endY: 150, delay: 0.25 },
  { key: 'star-7', endX: -210, endY: -30, delay: 0.3 },
  { key: 'star-8', endX: -130, endY: -170, delay: 0.35 }
]

function ContactForm() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPostCloseCelebration, setShowPostCloseCelebration] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [lastSubmittedAt, setLastSubmittedAt] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState(() => Date.now())

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [])

  const remainingCooldownMs = lastSubmittedAt
    ? Math.max(0, submitCooldownMs - (currentTime - lastSubmittedAt))
    : 0
  const isCoolingDown = remainingCooldownMs > 0
  const remainingCooldownSeconds = Math.ceil(remainingCooldownMs / 1000)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isCoolingDown) {
      setSubmitError(`Please wait ${remainingCooldownSeconds}s before sending another message.`)
      return
    }

    if (honeypot.trim().length > 0) {
      setOpen(false)
      window.setTimeout(() => {
        setShowPostCloseCelebration(true)
      }, 240)

      window.setTimeout(() => {
        setShowPostCloseCelebration(false)
      }, 1750)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _honey: honeypot,
          _subject: `Portfolio inquiry from ${name}`,
          _captcha: 'false',
          form_name: 'portfolio-contact-form',
          submitted_at: new Date().toISOString(),
          source_page: window.location.href,
          user_agent: window.navigator.userAgent
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message.')
      }

      setName('')
      setEmail('')
      setMessage('')
      setHoneypot('')
      setLastSubmittedAt(Date.now())
      setOpen(false)

      window.setTimeout(() => {
        setShowPostCloseCelebration(true)
      }, 240)

      window.setTimeout(() => {
        setShowPostCloseCelebration(false)
      }, 1750)
    } catch {
      setSubmitError('Unable to send right now. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)

        if (!nextOpen) {
          return
        }

        setSubmitError(null)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          Email Me
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
          <DialogDescription>
            Fill out the form and send your message directly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="How can I help?"
              className="min-h-32"
              disabled={isSubmitting}
              required
            />
          </div>

          <Button type="submit" variant="default" size="lg" disabled={isSubmitting || isCoolingDown}>
            {isSubmitting
              ? 'Sending...'
              : isCoolingDown
                ? `Please wait ${remainingCooldownSeconds}s`
                : 'Send Message'}
          </Button>

          {submitError ? (
            <p className="text-sm text-destructive" role="alert">
              {submitError}
            </p>
          ) : null}

          {isCoolingDown ? (
            <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
              Cooldown active: {remainingCooldownSeconds}s remaining.
            </p>
          ) : null}
        </form>
      </DialogContent>

      <AnimatePresence>
        {showPostCloseCelebration ? (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {celebrationStars.map((star, index) => (
              <motion.span
                key={star.key}
                aria-hidden="true"
                className={
                  index % 2 === 0
                    ? 'absolute text-3xl text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.35)]'
                    : 'absolute text-3xl text-accent drop-shadow-[0_0_10px_hsl(var(--accent))]'
                }
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.2, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: [0, star.endX * 0.35, star.endX],
                  y: [0, star.endY * 0.35, star.endY],
                  scale: [0.2, 1.15, 0.8],
                  rotate: [0, 40, 95]
                }}
                transition={{ duration: 1.1, delay: star.delay, ease: 'easeOut' }}
              >
                {index % 2 === 0 ? '✦' : '✨'}
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Dialog>
  )
}

export { ContactForm }
