import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create email content
    const emailContent = `
New Contact Form Submission from Portfolio

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.
Reply directly to ${email} to respond to this inquiry.
    `

    // In a real application, you would integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // For now, we'll simulate sending the email
    console.log("Email would be sent to: ajaymiryala380@gmail.com")
    console.log("Email content:", emailContent)

    // You can integrate with Resend (recommended for Vercel) like this:
    /*
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: 'ajaymiryala380@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: emailContent,
      replyTo: email,
    })
    */

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
