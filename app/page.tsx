"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code, ExternalLink, Github, Linkedin, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParticlesBackground } from "@/components/particles-background"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <ParticlesBackground />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="container flex h-16 items-center justify-between"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <User className="h-6 w-6" />
            <span className="text-lg font-bold">AJAY KUMAR</span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            {["About", "Skills", "Projects", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform bg-transparent">
              <Link href="#contact">9848432979</Link>
            </Button>
          </motion.div>
        </motion.div>
      </header>

      <main className="container py-10 md:py-16">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-8 items-center py-12 md:py-20">
          <motion.div {...fadeInLeft} className="flex-1 space-y-4">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hi, I'm AJAY KUMAR
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I am passionate CSE student.
            </motion.p>
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                asChild
                className="hover:scale-105 transition-transform bg-gradient-to-r from-primary to-blue-600"
              >
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform bg-transparent">
                <Link href="#contact">9848432979</Link>
              </Button>
            </motion.div>
            <motion.div className="flex gap-4 pt-4" variants={staggerContainer} initial="initial" animate="animate">
              {[
                { href: "https://github.com/thundervission", icon: Github },
                { href: "https://www.linkedin.com/in/ajay-kumar-miryala", icon: Linkedin },
                { href: "mailto:ajaymiryala380@gmail.com", icon: Mail },
              ].map((social, index) => (
                <motion.div
                  key={social.href}
                  variants={scaleIn}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-6 w-6 text-primary hover:text-blue-600 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-600 animate-pulse" />
              <div className="absolute inset-1 rounded-full overflow-hidden border-4 border-white bg-white">
                <Image
                  src="/images/profile.jpg"
                  alt="Ajay Kumar"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-12 md:py-20 scroll-mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4 mb-8" {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            <motion.div
              className="w-20 h-1 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                "I am a passionate B.Tech student with a keen interest in software development, artificial intelligence and tools etc. My academic journey has equipped me with a solid foundation in engineering principles and technical skills. I thrive on challenges and enjoy problem-solving through innovative thinking and collaboration",
                "My journey in tech started when I built my first project in my 2nd year, I've been constantly learning and improving my skills towards software .",
                "When I'm not coding, you can find me in ground cricket,or experimenting with new recipes in the kitchen.",
              ].map((text, index) => (
                <motion.p key={index} className="text-lg" variants={fadeInUp}>
                  {text}
                </motion.p>
              ))}
            </motion.div>
            <motion.div className="space-y-4" {...fadeInRight} viewport={{ once: true }}>
              <h3 className="text-xl font-semibold">Education & Internships</h3>
              {[
                { title: "Bachelor's in Computer Science", org: "Vignan,2022" },
                { title: "Machine learning Internship", org: "Internshala,2024" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="border-l-2 border-primary pl-4 py-2"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-muted-foreground">{item.org}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="py-12 md:py-20 scroll-mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4 mb-8" {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold tracking-tight">Skills & Expertise</h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-primary to-blue-600"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          <Tabs defaultValue="frontend">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="tools">Tools & Others</TabsTrigger>
              </TabsList>
            </motion.div>
            {["frontend", "backend", "tools"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {(tab === "frontend"
                    ? ["JavaScript", "HTML5", "CSS3", "java applets"]
                    : tab === "backend"
                      ? ["Python", "Java", "Sql", "Firebase", "Flutter"]
                      : ["GitHub", "Docker", "Tableau", "power bi", "Figma", "VS Code", "Agile/Scrum", "ai"]
                  ).map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={scaleIn}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        y: -5,
                      }}
                      className="flex items-center gap-2 p-4 border rounded-lg bg-white shadow-sm transition-all cursor-pointer"
                    >
                      <Code className="h-5 w-5 text-primary" />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="py-12 md:py-20 scroll-mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4 mb-8" {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-primary to-blue-600"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "CricSpeed - Cricket Speed Tracker",
                description:
                  "A comprehensive cricket speed measurement application featuring AI-powered speed detection, live scoring, team management, and advanced player analytics",
                tags: ["React", "Next.js", "JavaScript", "Sports Analytics", "AI"],
                image: "/images/cricspeed-interface.png",
                github: "https://github.com/thundervission",
                demo: "https://cricspeed.vercel.app/",
              },
              {
                title: "Image Manipulation Tool",
                description:
                  "An extraordinary image manipulation tool with various enhancement features including filters, effects, and real-time processing capabilities",
                tags: ["React", "Node.js", "Python", "HTML", "CSS"],
                image: "/images/image-manipulator.png",
                github: "https://github.com/thundervission",
                demo: "https://image-manipulator-its.vercel.app/",
              },
              {
                title: "Drowsiness Detection System",
                description:
                  "Real-time drowsiness detection system using computer vision to monitor eye movements and alert users when they get sleepy while working",
                tags: ["Python", "OpenCV", "TensorFlow", "Computer Vision"],
                image: "/images/drowsiness-detection.jpg",
                github: "https://github.com/thundervission",
                demo: "#",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Card className="overflow-hidden transition-shadow group h-full">
                  <div className="relative h-48 overflow-hidden">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gradient">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div key={tag} variants={scaleIn} whileHover={{ scale: 1.1 }}>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:scale-105 transition-transform bg-transparent"
                    >
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="hover:scale-105 transition-transform bg-gradient-to-r from-primary to-blue-600"
                    >
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-12 md:py-20 scroll-mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4 mb-8" {...fadeInUp} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
            <motion.div
              className="w-20 h-1 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div className="space-y-4" {...fadeInLeft} viewport={{ once: true }}>
              <p className="text-lg">
                I'm currently open to new opportunities and collaborations. Whether you have a question or just want to
                say hi, I'll try my best to get back to you!
              </p>
              <motion.div
                className="space-y-4 mt-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { icon: Mail, href: "mailto:ajaymiryala380@gmail.com", text: "ajaymiryala380@gmail.com" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/ajay-kumar-miryala/",
                    text: "https://www.linkedin.com/in/ajay-kumar-miryala/",
                  },
                  {
                    icon: Github,
                    href: "https://github.com/thundervission",
                    text: "https://github.com/thundervission",
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={fadeInUp}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <contact.icon className="h-5 w-5 text-primary" />
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {contact.text}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div {...fadeInRight} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Your Name"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary transition-all"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Subject"
                  />
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border rounded-md resize-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Your message here..."
                  ></textarea>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full hover:scale-105 transition-transform bg-gradient-to-r from-primary to-blue-600 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-center"
                  >
                    Failed to send message. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t py-8 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="container flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div className="flex items-center gap-2 mb-4 md:mb-0" whileHover={{ scale: 1.05 }}>
            <User className="h-5 w-5 text-primary" />
            <span className="font-semibold">AJAY KUMAR</span>
          </motion.div>
          <motion.div
            className="flex gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {["About", "Skills", "Projects", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                variants={scaleIn}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </footer>
    </div>
  )
}
