
import { Transporter, createTransport, } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';


export class Mailer {
    transport: Transporter
    mailOptionsTXT: Mail.Options
    info: {
        err: boolean,
        info: any
    }
    constructor(
        email: string,
        subject: string,
        text: string,
    ) {
        this.transport = createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "arafatmannan2019@gmail.com",
                pass: process.env.PASS
            }
        })
        this.mailOptionsTXT = {
            from: "arafatmannan2019@gmail.com",
            to: email ? email : 'arafatmannan9@gmail.com',
            subject: subject,
            text: text,
        }
        this.info = {
            err: false,
            info: 'idle'
        }
    }
    async sendMail() {
        console.log(process.env.PASS);
        
        await this.transport.sendMail(this.mailOptionsTXT, (err, data) => {
            if (err) {
                console.log(err);
                return err
            } else {
                console.log(data);
                return data
            }
        })
    }
}