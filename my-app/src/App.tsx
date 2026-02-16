import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet'
import { 
  ArrowDown, 
  ArrowUpRight, 
  GithubLogo, 
  LinkedinLogo, 
  List,
  Code,
  ChalkboardTeacher,
  Article,
  Moon,
  Sun
} from '@phosphor-icons/react'
import { useTheme } from './hooks/use-theme'
import { useScrollReveal } from './hooks/use-scroll-reveal'
import projectsData from './assets/projects.json'
import writingData from './assets/writings.json'
import { ContactForm } from './components/contact-form'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

interface Writing {
  id: string
  title: string
  date: string
  summary: string
  url: string
}

interface WritingData {
  mediumPageUrl: string
  articles: Writing[]
}

interface ProjectsData {
  projects: Project[]
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { projects } = projectsData as ProjectsData
  const { mediumPageUrl, articles: writings } = writingData as WritingData
  const resumeUrl = '/Jennifer_Roques_Senior_Software_Engineer2026.pdf'
  const { theme, toggleTheme } = useTheme()

  const heroReveal = useScrollReveal({ threshold: 0.2, rootMargin: '0px' })
  const projectsReveal = useScrollReveal()
  const mentorshipReveal = useScrollReveal()
  const writingReveal = useScrollReveal()
  const contactReveal = useScrollReveal()

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const heroHeadlineWords = ['Hi!', 'I’m', 'Jennifer', '—', 'Senior', 'Software', 'Engineer', '&', 'Tech', 'Lead', '👋']

  const headlineContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.07
      }
    }
  }

  const headlineWord = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }
    }
  }

  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Mentorship', href: '#mentorship' },
    { label: 'Writing', href: '#writing' },
    { label: 'Contact', href: '#contact' },
  ]

  const separatorTintStyle = {
    backgroundColor: 'color-mix(in oklch, var(--accent) 24%, var(--border) 76%)'
  }

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <nav className="flex items-center justify-between">
            <a 
              href="#hero" 
              className="text-lg font-medium tracking-tight text-foreground hover:text-accent"
              style={{ transition: 'color var(--transition-fast) ease' }}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#hero')
              }}
            >
              Portfolio
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="text-sm text-muted-foreground hover:text-accent"
                  style={{ transition: 'color var(--transition-fast) ease' }}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="default" size="sm" asChild>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                  <ArrowDown className="mr-2" />
                  Resume
                </a>
              </Button>
              <Button 
                variant="default" 
                size="icon" 
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="default" size="icon">
                  <List />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-8 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavClick(item.href)
                      }}
                      className="text-lg text-muted-foreground hover:text-accent"
                      style={{ transition: 'color var(--transition-fast) ease' }}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button variant="default" className="mt-4 w-full" asChild>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                      <ArrowDown className="mr-2" />
                      Resume
                    </a>
                  </Button>
                  <Button 
                    variant="default" 
                    className="w-full" 
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2" />
                        Dark Mode
                      </>
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </header>

      <main>
        <motion.section 
          id="hero" 
          className="relative overflow-hidden px-6 py-24 md:py-32"
          ref={heroReveal.ref}
          initial="hidden"
          animate={heroReveal.isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(900px circle at 8% 12%, color-mix(in oklch, var(--accent) 18%, transparent), transparent 58%), radial-gradient(820px circle at 92% 2%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 55%)'
            }}
          />
          <div className="container mx-auto max-w-6xl">
            <motion.h1
              className="mb-6 text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl md:leading-tight"
              variants={headlineContainer}
              initial="hidden"
              animate={heroReveal.isVisible ? 'visible' : 'hidden'}
            >
              {heroHeadlineWords.map((word) => (
                <motion.span
                  key={word}
                  className={`inline-block mr-3 ${word === 'Jennifer' ? 'text-accent' : ''}`}
                  variants={headlineWord}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Building elegant, scalable systems and mentoring the next generation of engineers. 
              Specializing in distributed systems, frontend architecture, and technical leadership.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" asChild>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                  <ArrowDown className="mr-2" />
                  Download Resume
                </a>
              </Button>
              <Button variant="default" size="lg" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </motion.section>

        <Separator style={separatorTintStyle} />

        <motion.section 
          id="projects" 
          className="px-6 py-16 md:py-24"
          ref={projectsReveal.ref}
          initial="hidden"
          animate={projectsReveal.isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 flex items-center gap-3">
              <Code size={32} className="text-accent" />
              <h2 className="text-3xl font-medium tracking-tight text-foreground">
                Live Projects
              </h2>
            </div>

            {!projects || projects.length === 0 ? (
              <p className="text-muted-foreground">Projects coming soon...</p>
            ) : (
              <motion.div 
                className="grid gap-8 md:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                animate={projectsReveal.isVisible ? "visible" : "hidden"}
              >
                {projects.map((project) => (
                  <motion.div key={project.id} variants={fadeInUp}>
                    <Card 
                      className="hover:shadow-md hover:border-accent/50 h-full"
                      style={{ 
                        transition: 'box-shadow var(--transition-normal) ease, border-color var(--transition-normal) ease' 
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="font-mono text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        {(project.liveUrl || project.githubUrl) && (
                          <div className="flex flex-wrap gap-3">
                            {project.liveUrl && (
                              <Button variant="default" size="sm" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  Live Demo
                                  <ArrowUpRight />
                                </a>
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  View Repo
                                  <ArrowUpRight />
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>

        <Separator style={separatorTintStyle} />

        <motion.section 
          id="mentorship" 
          className="px-6 py-16 md:py-24"
          ref={mentorshipReveal.ref}
          initial="hidden"
          animate={mentorshipReveal.isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 flex items-center gap-3">
              <ChalkboardTeacher size={32} className="text-accent" />
              <h2 className="text-3xl font-medium tracking-tight text-foreground">
                Mentorship
              </h2>
            </div>

            <div className="max-w-3xl space-y-6 text-base leading-relaxed text-foreground">
              <p>
                I believe that great engineering is as much about teaching and enabling others as it is about 
                writing code. Throughout my career, I've mentored junior and mid-level engineers, helping them 
                grow their technical skills and develop their problem-solving abilities.
              </p>
              <p className="text-muted-foreground">
                My mentorship approach focuses on:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Code review as a teaching tool, not just quality control</li>
                <li>Breaking down complex problems into learnable chunks</li>
                <li>Encouraging ownership and independent decision-making</li>
                <li>Building confidence through incremental challenges</li>
                <li>Sharing lessons from production incidents and architectural decisions</li>
              </ul>
              <p className="text-muted-foreground">
                I'm currently available for 1:1 mentorship on a limited basis for early-career engineers 
                looking to level up their skills.
              </p>
              <Button variant="default" size="lg" asChild>
                <a
                  href="https://calendly.com/jenniferroques/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Let's Chat!
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </motion.section>

        <Separator style={separatorTintStyle} />

        <motion.section 
          id="writing" 
          className="px-6 py-16 md:py-24"
          ref={writingReveal.ref}
          initial="hidden"
          animate={writingReveal.isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12 flex items-center gap-3">
              <Article size={32} className="text-accent" />
              <h2 className="text-3xl font-medium tracking-tight text-foreground">
                Writing
              </h2>
            </div>

            {!writings || writings.length === 0 ? (
              <p className="text-muted-foreground">Articles coming soon...</p>
            ) : (
              <motion.div 
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                animate={writingReveal.isVisible ? "visible" : "hidden"}
              >
                {writings.map((writing) => (
                  <motion.div key={writing.id} variants={fadeInUp}>
                    <a
                      href={writing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <Card
                        className="h-full hover:shadow-md hover:border-accent/50"
                        style={{
                          transition: 'box-shadow var(--transition-normal) ease, border-color var(--transition-normal) ease'
                        }}
                      >
                        <CardHeader className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <time className="text-sm text-muted-foreground">{writing.date}</time>
                            <ArrowUpRight className="text-muted-foreground" />
                          </div>
                          <CardTitle className="text-xl leading-snug transition-colors group-hover:text-accent group-focus-visible:text-accent">
                            {writing.title}
                          </CardTitle>
                          <CardDescription className="leading-relaxed">{writing.summary}</CardDescription>
                        </CardHeader>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-8 flex justify-start">
              <Button variant="default" asChild>
                <a
                  href={mediumPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Visit Medium Page
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
        </motion.section>

        <Separator style={separatorTintStyle} />

        <motion.section 
          id="contact" 
          className="px-6 py-16 md:py-24"
          ref={contactReveal.ref}
          initial="hidden"
          animate={contactReveal.isVisible ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="mb-12 text-3xl font-medium tracking-tight text-foreground">
              Get in Touch
            </h2>

            <div className="max-w-3xl space-y-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                I'm always interested in hearing about new opportunities, collaborations, or just 
                connecting with fellow engineers. Send a message through the email form or connect through the channels below.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <ContactForm />
                <Button variant="default" size="lg" asChild>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <GithubLogo />
                    GitHub
                  </a>
                </Button>
                <Button variant="default" size="lg" asChild>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <LinkedinLogo />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-border px-6 py-8">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Jennifer Roques - All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App