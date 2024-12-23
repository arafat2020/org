import { Transporter, createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
export class Mailer {
    transport: Transporter;
    mailOptionsTXT: Mail.Options;
    info: {
        err: boolean;
        info: any;
    };

    constructor(
        email: string,
        subject: string,
        text: string
    ) {
        // Create the transport with Namecheap Private Email SMTP settings
        this.transport = createTransport({
            host: "mail.privateemail.com", // Namecheap SMTP host
            port: 465, // SSL port for Private Email
            secure: true, // Use SSL
            auth: {
                user: "contact@anhabd.com", // Your Namecheap Private Email
                pass: "contact@1234", // Use environment variable for password
            },
        });

        // Define mail options
        this.mailOptionsTXT = {
            from: "contact@anhabd.com", // Sender's email (Namecheap email)
            to:  email, // Recipient's email
            subject: subject, // Email subject
            text: text, // Plain text content
        };

        this.info = {
            err: false,
            info: "idle",
        };
    }

    // Async method to send the email
    async sendMail() {
        console.log("Sending email...");

        try {
            const result = await this.transport.sendMail(this.mailOptionsTXT);
            console.log("Email sent successfully:", result);
            return result;
        } catch (error) {
            console.error("Error while sending email:", error);
            this.info.err = true;
            this.info.info = error;
            return error;
        }
    }
}
