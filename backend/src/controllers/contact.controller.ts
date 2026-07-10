import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const contactController = {
  async create(req: Request, res: Response) {
    try {
      const { name, email, country, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          message: 'Name, email and message are required' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: 'Invalid email',
          message: 'Please provide a valid email address' 
        });
      }

      // Log the submission
      console.log('Contact form submission:', {
        name,
        email,
        country,
        message,
        timestamp: new Date().toISOString()
      });

      // Send email notification
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        subject: `Nouveau contact de ${name} - Mon Bac Français`,
        html: `
          <h2>Nouveau message du formulaire de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Pays de résidence:</strong> ${country || 'Non spécifié'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Envoyé depuis le formulaire de contact de Mon Bac Français<br>
            Date: ${new Date().toLocaleString('fr-FR')}
          </p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(201).json({ 
        success: true,
        message: 'Contact form submitted successfully' 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: 'An error occurred while processing your request' 
      });
    }
  }
};
