interface ContactFormValues {
  name: string
  email: string
  message: string
}

const contactMailboxParts = ['cm6lv03h', 'anonaddy.me']

function getContactAddress() {
  return `${contactMailboxParts[0]}@${contactMailboxParts[1]}`
}

function buildContactMailtoUrl({ name, email, message }: ContactFormValues) {
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedMessage = message.trim()

  const subject = `Portfolio inquiry from ${trimmedName || 'Website visitor'}`
  const bodyLines = [
    `Name: ${trimmedName || 'Not provided'}`,
    `Email: ${trimmedEmail || 'Not provided'}`,
    '',
    'Message:',
    trimmedMessage
  ]

  const query = new URLSearchParams({
    subject,
    body: bodyLines.join('\n')
  })

  return `mailto:${getContactAddress()}?${query.toString()}`
}

export type { ContactFormValues }
export { buildContactMailtoUrl }
