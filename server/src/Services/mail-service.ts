//import "dotenv/config";
//@ts-nocheck
import nodemailer from "nodemailer";

export const sendAuthMail = async (to: string, link: string) => {
  console.log(process.env.SMTP_Host, process.env.SMTP_Post);
  if (
    !process.env.SMTP_Host ||
    !process.env.SMTP_Post ||
    !process.env.Mail_auth_log ||
    !process.env.Mail_auth_pass
  ) {
    throw new Error("email problem");
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_Host,
    port: process.env.SMTP_Post,
    secure: false,
    auth: {
      user: process.env.Mail_auth_log,
      pass: process.env.Mail_auth_pass,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_Host,
    to,
    subject: `Account activation for ${process.env.Api_Url}`,
    text: "",
    html: `
        <div> 
            <h1>Click link for activation</h1>
            <a href="${link}">${link}</a>
        </div>
        `,
  });
};
