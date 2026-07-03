import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 587,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

export const sendLeadEmail = async (data: {
    organization: string;
    name: string;
    phone: string;
    email: string;
    comment?: string;
}) => {
    await transporter.sendMail({
        from: `"SOLTEXT GROUP" <${SMTP_USER}>`,
        to: `${SMTP_USER.replace("@", "+leads@")}`,
        subject: `Новая заявка от ${data.name}`,
        html: `
            <h2>Новая заявка</h2>
            <p><b>Имя:</b> ${data.name}</p>
            <p><b>Телефон:</b> ${data.phone}</p>
            <p><b>Комментарий:</b> ${data.comment || "-"}</p>
        `,
    });
};
