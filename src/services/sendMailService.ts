import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

class SendMailService {
    private clint: Transporter

    constructor() {
        nodemailer.createTestAccount().then(accoount => {
            const transporter = nodemailer.createTransport({
                host: accoount.smtp.host,
                port: accoount.smtp.port,
                secure: accoount.smtp.secure,
                auth: {
                    user: accoount.user,
                    pass: accoount.pass
                },
            });

            this.clint = transporter;
        })
    }

    async execute(to: string, subject: string, variables: object, path: string) {
        
        const templateFileContent = fs.readFileSync(path).toString("utf8");

        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables);

        const message = await this.clint.sendMail({
            to: to,
            subject: subject,
            html: html,
            from: "NPS <noreplay@NSP.com.br>"
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message))
    }
}

export default new SendMailService();