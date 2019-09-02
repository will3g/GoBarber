export default { //Comunicação via SMTP (protocolo de envio de emails)
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/**
 * Serviços de envio de emails:
 * + Amazon SES
 * + Maligun
 * + Sparkpost
 * + Mandril (que só pode ser usado com o Mailchip)
 *
 * -- Durante desenvolvimento -- *
 * + Mailtrap (somente DEV)
 */
