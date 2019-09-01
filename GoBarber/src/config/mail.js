export default { //Comunicação via SMTP (protocolo de envio de emails)
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '4e6c58a93cb39a',
    pass: 'e12d729e7e8cca',
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