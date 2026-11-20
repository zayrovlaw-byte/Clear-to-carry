import { CONSULT_FEE, CONSULT_MINUTES, ZELLE_TO, PHONE, money } from "@/lib/content";

/* Client-facing emails, one set per language. Each returns { subject, text }.
   The signature and Attorney Advertising line are added in lib/mail.js. */

const first = (name) => String(name || "").split(" ")[0];

const T = {
  en: {
    consultBooked: (c, link, card) => ({
      subject: `Your consultation request · Ref ${c.ref}`,
      text:
        `${first(c.name)},\n\nThank you. Your consultation request is in.\n\n` +
        `CONSULTATION: ${CONSULT_MINUTES} minutes with the attorney\nFEE: ${money(CONSULT_FEE)}, credited in full toward any retainer\nREFERENCE: ${c.ref}\n\n` +
        `TO CONFIRM YOUR SPOT\n` + (card ? `Pay by card: ${link}\nOr pay` : `Pay`) + ` by Zelle to ${ZELLE_TO}, amount ${money(CONSULT_FEE)}, memo ${c.ref}.\n` +
        `Prefer another method? Call ${PHONE}.\n\n` +
        `We will call you at ${c.phone} within one business day to set a time. ` +
        `At the consultation the attorney reviews your record and quotes your application in writing.\n\n` +
        `Your private file: ${link}`,
    }),
    consultPaid: (c) => ({
      subject: `Payment received · Ref ${c.ref}`,
      text:
        `${first(c.name)},\n\nWe received your ${money(CONSULT_FEE)} consultation fee. ` +
        `It is credited in full toward any retainer.\n\nIf we have not already set a time, we will call you at ${c.phone} shortly.`,
    }),
    quote: (c, link, card) => ({
      subject: `Your engagement · ${c.engagementName} · Ref ${c.ref}`,
      text:
        `${first(c.name)},\n\nThank you for meeting with us. Here is the engagement we discussed.\n\n` +
        `ENGAGEMENT: ${c.engagementName}\nFLAT FEE: ${money(c.quote)}\n` +
        (c.consultPaid ? `LESS CONSULTATION CREDIT: −${money(CONSULT_FEE)}\nBALANCE: ${money(balance(c))}\n` : "") +
        `REFERENCE: ${c.ref}\n\n` +
        `WHAT HAPPENS NEXT\n1. We email your engagement letter for signature.\n` +
        `2. Pay ${money(balance(c))}` + (card ? ` by card from your portal (link below), or` : ``) + ` by Zelle to ${ZELLE_TO}, memo ${c.ref}. To split payments, call ${PHONE}.\n` +
        `3. Your private portal is now open. Send documents there as we ask for them:\n${link}\n\n` +
        `Keep this email. The link is your key to the portal, so please do not forward it.\n\n` +
        `Representation begins when the engagement letter is signed and payment clears.`,
    }),
    retainerPaid: (c) => ({
      subject: `Retainer received · Ref ${c.ref}`,
      text: `${first(c.name)},\n\nYour retainer has cleared. Your file is active, and the attorney is working on it.`,
    }),
    phase: (c, name) => ({
      subject: `Next step open: ${name} · Ref ${c.ref}`,
      text: `${first(c.name)},\n\nThe attorney reviewed your documents and opened the next step: ${name}. Open your portal from your earlier email to continue.`,
    }),
    filed: (c) => ({
      subject: `Your application has been filed · Ref ${c.ref}`,
      text: `${first(c.name)},\n\nYour application is filed with the NYPD License Division. Your portal now shows its status and the 180-day clock. We will update you at every stage.`,
    }),
    status: (c, s) => ({
      subject: `Status update: ${s} · Ref ${c.ref}`,
      text: `${first(c.name)},\n\nYour application has moved to: ${s}. Call ${PHONE} with any questions.`,
    }),
    statuses: ["Filed with the License Division", "Under investigation", "Interview", "Decision"],
    lead: (l) => ({
      subject: "We received your request · Clear to Carry",
      text: `${first(l.name)},\n\nThank you for reaching out. The attorney will call you at ${l.phone} within one business day. If you would rather not wait, call ${PHONE}.`,
    }),
  },

  es: {
    consultBooked: (c, link, card) => ({
      subject: `Su solicitud de consulta · Ref. ${c.ref}`,
      text:
        `${first(c.name)}:\n\nGracias. Recibimos su solicitud de consulta.\n\n` +
        `CONSULTA: ${CONSULT_MINUTES} minutos con el abogado\nHONORARIO: ${money(CONSULT_FEE)}, acreditado en su totalidad a cualquier anticipo\nREFERENCIA: ${c.ref}\n\n` +
        `PARA CONFIRMAR SU CITA\n` + (card ? `Pague con tarjeta: ${link}\nO pague` : `Pague`) + ` por Zelle a ${ZELLE_TO}, monto ${money(CONSULT_FEE)}, concepto ${c.ref}.\n` +
        `¿Prefiere otro método? Llame al ${PHONE}.\n\n` +
        `Le llamaremos al ${c.phone} dentro de un día hábil para fijar la hora. ` +
        `En la consulta el abogado revisa su historial y le cotiza su solicitud por escrito.\n\n` +
        `Su expediente privado: ${link}`,
    }),
    consultPaid: (c) => ({
      subject: `Pago recibido · Ref. ${c.ref}`,
      text:
        `${first(c.name)}:\n\nRecibimos su honorario de consulta de ${money(CONSULT_FEE)}. ` +
        `Se acredita en su totalidad a cualquier anticipo.\n\nSi aún no hemos fijado la hora, le llamaremos pronto al ${c.phone}.`,
    }),
    quote: (c, link, card) => ({
      subject: `Su contratación · ${c.engagementName} · Ref. ${c.ref}`,
      text:
        `${first(c.name)}:\n\nGracias por reunirse con nosotros. Este es el servicio que acordamos.\n\n` +
        `SERVICIO: ${c.engagementName}\nHONORARIO FIJO: ${money(c.quote)}\n` +
        (c.consultPaid ? `MENOS CRÉDITO DE CONSULTA: −${money(CONSULT_FEE)}\nSALDO: ${money(balance(c))}\n` : "") +
        `REFERENCIA: ${c.ref}\n\n` +
        `PRÓXIMOS PASOS\n1. Le enviaremos la carta de contratación para su firma.\n` +
        `2. Pague ${money(balance(c))}` + (card ? ` con tarjeta desde su portal (enlace abajo), o` : ``) + ` por Zelle a ${ZELLE_TO}, concepto ${c.ref}. Para pagar en partes, llame al ${PHONE}.\n` +
        `3. Su portal privado ya está abierto. Envíe allí los documentos a medida que se los pidamos:\n${link}\n\n` +
        `Guarde este correo. El enlace es su llave del portal; por favor no lo reenvíe.\n\n` +
        `La representación comienza cuando se firma la carta de contratación y se acredita el pago.`,
    }),
    retainerPaid: (c) => ({
      subject: `Anticipo recibido · Ref. ${c.ref}`,
      text: `${first(c.name)}:\n\nSu anticipo fue acreditado. Su expediente está activo y el abogado está trabajando en él.`,
    }),
    phase: (c, name) => ({
      subject: `Siguiente paso abierto: ${name} · Ref. ${c.ref}`,
      text: `${first(c.name)}:\n\nEl abogado revisó sus documentos y abrió el siguiente paso: ${name}. Abra su portal desde el correo anterior para continuar.`,
    }),
    filed: (c) => ({
      subject: `Su solicitud fue presentada · Ref. ${c.ref}`,
      text: `${first(c.name)}:\n\nSu solicitud fue presentada ante la División de Licencias del NYPD. Su portal muestra ahora el estado y el plazo de 180 días. Le informaremos en cada etapa.`,
    }),
    status: (c, s) => ({
      subject: `Actualización: ${s} · Ref. ${c.ref}`,
      text: `${first(c.name)}:\n\nSu solicitud pasó a: ${s}. Para cualquier pregunta, llame al ${PHONE}.`,
    }),
    statuses: ["Presentada ante la División de Licencias", "En investigación", "Entrevista", "Decisión"],
    lead: (l) => ({
      subject: "Recibimos su solicitud · Clear to Carry",
      text: `${first(l.name)}:\n\nGracias por comunicarse. El abogado le llamará al ${l.phone} dentro de un día hábil. Si prefiere no esperar, llame al ${PHONE}.`,
    }),
  },

  ru: {
    consultBooked: (c, link, card) => ({
      subject: `Ваша заявка на консультацию · № ${c.ref}`,
      text:
        `${first(c.name)},\n\nСпасибо. Ваша заявка на консультацию получена.\n\n` +
        `КОНСУЛЬТАЦИЯ: ${CONSULT_MINUTES} минут с адвокатом\nСТОИМОСТЬ: ${money(CONSULT_FEE)}, полностью засчитывается в любой аванс\nНОМЕР: ${c.ref}\n\n` +
        `ЧТОБЫ ПОДТВЕРДИТЬ ЗАПИСЬ\n` + (card ? `Оплатить картой: ${link}\nИли оплатите` : `Оплатите`) + ` через Zelle на ${ZELLE_TO}, сумма ${money(CONSULT_FEE)}, в назначении укажите ${c.ref}.\n` +
        `Удобнее другой способ? Позвоните по номеру ${PHONE}.\n\n` +
        `Мы позвоним вам по номеру ${c.phone} в течение одного рабочего дня, чтобы назначить время. ` +
        `На консультации адвокат изучит вашу историю и письменно назовёт стоимость подачи заявления.\n\n` +
        `Ваше личное дело: ${link}`,
    }),
    consultPaid: (c) => ({
      subject: `Оплата получена · № ${c.ref}`,
      text:
        `${first(c.name)},\n\nМы получили оплату консультации ${money(CONSULT_FEE)}. ` +
        `Она полностью засчитывается в любой аванс.\n\nЕсли время ещё не назначено, мы скоро позвоним вам по номеру ${c.phone}.`,
    }),
    quote: (c, link, card) => ({
      subject: `Ваш договор · ${c.engagementName} · № ${c.ref}`,
      text:
        `${first(c.name)},\n\nСпасибо за встречу. Ниже — услуги, которые мы обсудили.\n\n` +
        `УСЛУГА: ${c.engagementName}\nФИКСИРОВАННЫЙ ГОНОРАР: ${money(c.quote)}\n` +
        (c.consultPaid ? `ЗАЧЁТ ОПЛАТЫ КОНСУЛЬТАЦИИ: −${money(CONSULT_FEE)}\nК ОПЛАТЕ: ${money(balance(c))}\n` : "") +
        `НОМЕР: ${c.ref}\n\n` +
        `ДАЛЬНЕЙШИЕ ШАГИ\n1. Мы пришлём договор на подпись.\n` +
        `2. Оплатите ${money(balance(c))}` + (card ? ` картой в личном кабинете (ссылка ниже) или` : ``) + ` через Zelle на ${ZELLE_TO}, в назначении укажите ${c.ref}. Чтобы платить частями, позвоните по номеру ${PHONE}.\n` +
        `3. Ваш личный кабинет открыт. Загружайте туда документы по мере нашего запроса:\n${link}\n\n` +
        `Сохраните это письмо. Ссылка — ваш ключ к кабинету, пожалуйста, не пересылайте её.\n\n` +
        `Представительство начинается после подписания договора и поступления оплаты.`,
    }),
    retainerPaid: (c) => ({
      subject: `Аванс получен · № ${c.ref}`,
      text: `${first(c.name)},\n\nВаш аванс поступил. Дело открыто, адвокат работает над ним.`,
    }),
    phase: (c, name) => ({
      subject: `Открыт следующий этап: ${name} · № ${c.ref}`,
      text: `${first(c.name)},\n\nАдвокат проверил ваши документы и открыл следующий этап: ${name}. Откройте личный кабинет по ссылке из предыдущего письма, чтобы продолжить.`,
    }),
    filed: (c) => ({
      subject: `Ваше заявление подано · № ${c.ref}`,
      text: `${first(c.name)},\n\nВаше заявление подано в отдел лицензий NYPD. В личном кабинете теперь видны его статус и 180-дневный срок. Мы будем сообщать вам о каждом этапе.`,
    }),
    status: (c, s) => ({
      subject: `Новый статус: ${s} · № ${c.ref}`,
      text: `${first(c.name)},\n\nВаше заявление перешло на этап: ${s}. С вопросами звоните по номеру ${PHONE}.`,
    }),
    statuses: ["Подано в отдел лицензий", "Проверка", "Собеседование", "Решение"],
    lead: (l) => ({
      subject: "Мы получили вашу заявку · Clear to Carry",
      text: `${first(l.name)},\n\nСпасибо за обращение. Адвокат позвонит вам по номеру ${l.phone} в течение одного рабочего дня. Если не хотите ждать, позвоните по номеру ${PHONE}.`,
    }),
  },
};

export function balance(c) {
  return Math.max(0, Number(c.quote || 0) - (c.consultPaid ? CONSULT_FEE : 0));
}

export function emails(lang) {
  return T[lang] || T.en;
}
