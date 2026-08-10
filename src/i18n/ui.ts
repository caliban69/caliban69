export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

// Every user-facing UI string lives here — components read from this
// dictionary, never a hardcoded string, so a translator can update copy
// without touching component code.
export const ui = {
  en: {
    'nav.trips': 'Trips',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'nav.skipToContent': 'Skip to content',

    'brand.name': 'Cartacuba Tours & Travels',
    'brand.motto': 'The Cuban Nature Specialists.',

    'home.hero.eyebrow': 'Community-based ecotourism in Cuba',
    'home.hero.cta': 'Explore trips',
    'home.hero.ctaSecondary': 'Our sustainability commitment',
    'home.valueProps.heading': 'Why travel with us',
    'home.valueProps.expertise.title': 'Scientific credibility',
    'home.valueProps.expertise.body':
      'Every itinerary is designed and led with a PhD ornithologist’s field expertise — species knowledge you can trust, not a generic checklist tour.',
    'home.valueProps.community.title': 'Community-based ecotourism',
    'home.valueProps.community.body':
      'Trips are built around Cuban local guides, family-run casas, and conservation partners, so your travel spend stays where it matters.',
    'home.valueProps.standards.title': 'Ecotourism Australia–aligned',
    'home.valueProps.standards.body':
      'We hold ourselves to Ecotourism Australia’s certification standards for environmental and social responsibility, even operating outside Australia.',
    'home.sustainability.heading': 'Our sustainability statement',
    'home.sustainability.body':
      'Small groups, low-impact routes, and revenue shared directly with the habitats and communities we visit — nature tourism should leave a place better documented and better funded for its protection, not just better photographed.',
    'home.featured.heading': 'Featured trips',
    'home.featured.daytripLabel': 'Daytrip',
    'home.featured.multidayLabel': 'Multiday tour',
    'home.featured.viewTrip': 'View trip',
    'home.trust.heading': 'Trust & credentials',
    'home.trust.phd': 'PhD Ornithologist-led',
    'home.trust.ecotourism': 'Ecotourism Australia–aligned standards',
    'home.trust.community': 'Community-based tourism partner network',

    'trips.index.heading': 'Our trips',
    'trips.index.intro':
      'Four closer-to-home daytrips and two flagship multiday tours, with more itineraries in development.',
    'trips.card.duration': 'Duration',
    'trips.card.price': 'Price',
    'trips.card.priceFrom': 'From',
    'trips.card.groupSize': 'Group size',
    'trips.card.difficulty': 'Difficulty',

    'trip.included': "What's included",
    'trip.excluded': "What's not included",
    'trip.highlights': 'Species & highlights',
    'trip.meetingPoint': 'Meeting point',
    'trip.cancellationPolicy': 'Cancellation policy',
    'trip.depositPolicy': 'Deposit policy',
    'trip.accommodation': 'Accommodation style',
    'trip.itinerary': 'Day-by-day itinerary',
    'trip.itinerary.day': 'Day',
    'trip.guide': 'Your guide',
    'trip.guide.readBio': 'Read full bio',
    'trip.reserve': 'Reserve this trip',
    'trip.bookingWidget.heading': 'Check availability & reserve',
    'trip.sampleContentNotice':
      'Sample content — for MVP review only, to be replaced with final copy and photography.',

    'booking.form.heading': 'Availability & deposit inquiry',
    'booking.form.intro':
      'This is not a live checkout — no payment is collected here. Tell us your preferred dates and traveler count and we’ll confirm availability, then send a secure payment link.',
    'booking.form.tripDate': 'Preferred start date',
    'booking.form.travelers': 'Number of travelers',
    'booking.form.paymentPreference': 'Payment preference',
    'booking.form.paymentPreference.deposit': 'Pay deposit now',
    'booking.form.paymentPreference.full': 'Pay in full',
    'booking.form.name': 'Full name',
    'booking.form.email': 'Email',
    'booking.form.phone': 'Phone (optional)',
    'booking.form.notes': 'Anything else we should know?',
    'booking.form.submit': 'Send inquiry',
    'booking.form.submitting': 'Sending…',
    'booking.form.success.heading': 'Thanks — request received',
    'booking.form.success.body':
      'We’ll confirm availability and send a secure payment link by email. No payment has been taken.',
    'booking.form.error':
      'Something went wrong sending your inquiry. Please try again or email us directly.',
    'booking.cta.daytrip': 'Reserve this trip',

    'gallery.heading': 'Gallery',
    'gallery.intro':
      'A field notebook in photographs — habitats, species, and the communities we travel with.',
    'gallery.lightbox.close': 'Close',
    'gallery.lightbox.next': 'Next image',
    'gallery.lightbox.prev': 'Previous image',
    'gallery.lightbox.of': 'of',

    'about.heading': 'About Cartacuba Tours & Travels',
    'about.credibility.heading': 'A scientist-led operator',
    'about.sustainability.heading': 'Sustainability & community commitments',
    'about.ecotourism.heading': 'Ecotourism Australia alignment',

    'contact.heading': 'Contact us',
    'contact.intro':
      'General questions, booking questions, or a technical issue with the site — this one form reaches the right person.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.category': 'What is this about?',
    'contact.form.category.general': 'General inquiry',
    'contact.form.category.booking': 'Booking question',
    'contact.form.category.technical': 'Technical issue',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send message',
    'contact.form.submitting': 'Sending…',
    'contact.form.success': 'Thanks — we’ll reply by email shortly.',
    'contact.form.error':
      'Something went wrong sending your message. Please try again or email us directly.',

    'footer.rights': 'All rights reserved.',
    'footer.legalName': 'Cartacuba Tours & Travels',
    'footer.address': '[Business Address — placeholder, to be confirmed]',
    'footer.email': 'fcg69.cloud.gcp@gmail.com',
    'footer.privacy': 'Privacy policy',
    'footer.cookies': 'Cookie policy',
    'footer.sitemap': 'Sitemap',

    'cookieConsent.message':
      'We use cookies only where necessary and for optional analytics. Non-essential scripts stay off until you accept.',
    'cookieConsent.accept': 'Accept all',
    'cookieConsent.reject': 'Reject non-essential',
    'cookieConsent.settingsLink': 'Cookie policy',

    'notFound.heading': 'Page not found',
    'notFound.body': 'This trail doesn’t lead anywhere — but these do:',
    'notFound.home': 'Back to homepage',
    'notFound.trips': 'Browse trips',

    'common.readMore': 'Read more',
    'common.requiredField': 'Required',
    'common.difficulty.easy': 'Easy',
    'common.difficulty.moderate': 'Moderate',
    'common.difficulty.challenging': 'Challenging',
  },
  es: {
    'nav.trips': 'Viajes',
    'nav.gallery': 'Galería',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar menú',
    'nav.skipToContent': 'Saltar al contenido',

    'brand.name': 'Cartacuba Tours & Travels',
    'brand.motto': 'Los especialistas en la naturaleza cubana.',

    'home.hero.eyebrow': 'Ecoturismo comunitario en Cuba',
    'home.hero.cta': 'Explorar viajes',
    'home.hero.ctaSecondary': 'Nuestro compromiso de sostenibilidad',
    'home.valueProps.heading': 'Por qué viajar con nosotros',
    'home.valueProps.expertise.title': 'Credibilidad científica',
    'home.valueProps.expertise.body':
      'Cada itinerario está diseñado y guiado con la experiencia de campo de un ornitólogo con doctorado — conocimiento de especies en el que puedes confiar, no un recorrido genérico.',
    'home.valueProps.community.title': 'Ecoturismo comunitario',
    'home.valueProps.community.body':
      'Los viajes se organizan en torno a guías locales cubanos, casas familiares y socios de conservación, para que tu gasto de viaje se quede donde importa.',
    'home.valueProps.standards.title': 'Alineado con Ecotourism Australia',
    'home.valueProps.standards.body':
      'Nos exigimos los estándares de certificación de Ecotourism Australia en responsabilidad ambiental y social, incluso operando fuera de Australia.',
    'home.sustainability.heading': 'Nuestra declaración de sostenibilidad',
    'home.sustainability.body':
      'Grupos pequeños, rutas de bajo impacto e ingresos compartidos directamente con los hábitats y comunidades que visitamos — el turismo de naturaleza debe dejar un lugar mejor documentado y mejor financiado para su protección, no solo mejor fotografiado.',
    'home.featured.heading': 'Viajes destacados',
    'home.featured.daytripLabel': 'Excursión de un día',
    'home.featured.multidayLabel': 'Viaje de varios días',
    'home.featured.viewTrip': 'Ver viaje',
    'home.trust.heading': 'Confianza y credenciales',
    'home.trust.phd': 'Dirigido por un ornitólogo con doctorado',
    'home.trust.ecotourism': 'Estándares alineados con Ecotourism Australia',
    'home.trust.community': 'Red de socios de turismo comunitario',

    'trips.index.heading': 'Nuestros viajes',
    'trips.index.intro':
      'Cuatro excursiones de un día y dos viajes insignia de varios días, con más itinerarios en desarrollo.',
    'trips.card.duration': 'Duración',
    'trips.card.price': 'Precio',
    'trips.card.priceFrom': 'Desde',
    'trips.card.groupSize': 'Tamaño del grupo',
    'trips.card.difficulty': 'Dificultad',

    'trip.included': 'Qué incluye',
    'trip.excluded': 'Qué no incluye',
    'trip.highlights': 'Especies y destacados',
    'trip.meetingPoint': 'Punto de encuentro',
    'trip.cancellationPolicy': 'Política de cancelación',
    'trip.depositPolicy': 'Política de depósito',
    'trip.accommodation': 'Tipo de alojamiento',
    'trip.itinerary': 'Itinerario día a día',
    'trip.itinerary.day': 'Día',
    'trip.guide': 'Tu guía',
    'trip.guide.readBio': 'Leer biografía completa',
    'trip.reserve': 'Reservar este viaje',
    'trip.bookingWidget.heading': 'Consultar disponibilidad y reservar',
    'trip.sampleContentNotice':
      'Contenido de muestra — solo para revisión del MVP, será reemplazado con el texto y las fotografías finales.',

    'booking.form.heading': 'Consulta de disponibilidad y depósito',
    'booking.form.intro':
      'Esto no es un pago en línea — aquí no se cobra ningún pago. Indícanos tus fechas preferidas y el número de viajeros y confirmaremos disponibilidad, luego enviaremos un enlace de pago seguro.',
    'booking.form.tripDate': 'Fecha de inicio preferida',
    'booking.form.travelers': 'Número de viajeros',
    'booking.form.paymentPreference': 'Preferencia de pago',
    'booking.form.paymentPreference.deposit': 'Pagar depósito ahora',
    'booking.form.paymentPreference.full': 'Pagar el total',
    'booking.form.name': 'Nombre completo',
    'booking.form.email': 'Correo electrónico',
    'booking.form.phone': 'Teléfono (opcional)',
    'booking.form.notes': '¿Algo más que debamos saber?',
    'booking.form.submit': 'Enviar consulta',
    'booking.form.submitting': 'Enviando…',
    'booking.form.success.heading': 'Gracias — solicitud recibida',
    'booking.form.success.body':
      'Confirmaremos disponibilidad y enviaremos un enlace de pago seguro por correo electrónico. No se ha realizado ningún cobro.',
    'booking.form.error':
      'Ocurrió un error al enviar tu consulta. Por favor intenta de nuevo o escríbenos directamente.',
    'booking.cta.daytrip': 'Reservar este viaje',

    'gallery.heading': 'Galería',
    'gallery.intro':
      'Un cuaderno de campo en fotografías — hábitats, especies y las comunidades con las que viajamos.',
    'gallery.lightbox.close': 'Cerrar',
    'gallery.lightbox.next': 'Siguiente imagen',
    'gallery.lightbox.prev': 'Imagen anterior',
    'gallery.lightbox.of': 'de',

    'about.heading': 'Sobre Cartacuba Tours & Travels',
    'about.credibility.heading': 'Un operador dirigido por una científica',
    'about.sustainability.heading': 'Compromisos de sostenibilidad y comunidad',
    'about.ecotourism.heading': 'Alineación con Ecotourism Australia',

    'contact.heading': 'Contáctanos',
    'contact.intro':
      'Preguntas generales, preguntas sobre reservas o un problema técnico con el sitio — este formulario llega a la persona correcta.',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Correo electrónico',
    'contact.form.category': '¿De qué se trata?',
    'contact.form.category.general': 'Consulta general',
    'contact.form.category.booking': 'Pregunta sobre reserva',
    'contact.form.category.technical': 'Problema técnico',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.submitting': 'Enviando…',
    'contact.form.success': 'Gracias — responderemos por correo pronto.',
    'contact.form.error':
      'Ocurrió un error al enviar tu mensaje. Por favor intenta de nuevo o escríbenos directamente.',

    'footer.rights': 'Todos los derechos reservados.',
    'footer.legalName': 'Cartacuba Tours & Travels',
    'footer.address': '[Dirección comercial — pendiente de confirmar]',
    'footer.email': 'fcg69.cloud.gcp@gmail.com',
    'footer.privacy': 'Política de privacidad',
    'footer.cookies': 'Política de cookies',
    'footer.sitemap': 'Mapa del sitio',

    'cookieConsent.message':
      'Usamos cookies solo cuando es necesario y para análisis opcionales. Los scripts no esenciales permanecen desactivados hasta que aceptes.',
    'cookieConsent.accept': 'Aceptar todo',
    'cookieConsent.reject': 'Rechazar no esenciales',
    'cookieConsent.settingsLink': 'Política de cookies',

    'notFound.heading': 'Página no encontrada',
    'notFound.body': 'Este sendero no lleva a ninguna parte — pero estos sí:',
    'notFound.home': 'Volver al inicio',
    'notFound.trips': 'Ver viajes',

    'common.readMore': 'Leer más',
    'common.requiredField': 'Obligatorio',
    'common.difficulty.easy': 'Fácil',
    'common.difficulty.moderate': 'Moderada',
    'common.difficulty.challenging': 'Exigente',
  },
} as const;

export type TranslationKey = keyof (typeof ui)['en'];
