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
    'nav.trips': 'Experiences',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'nav.skipToContent': 'Skip to content',

    'brand.name': 'Cartacuba Nature & Arts',
    'brand.motto': "Havana's Art & Culture Specialists.",

    'home.hero.eyebrow': 'Private arts & academic experiences in Havana',
    'home.hero.cta': 'Explore experiences',
    'home.hero.ctaSecondary': 'Our approach',
    'home.valueProps.heading': 'Why travel with us',
    'home.valueProps.expertise.title': 'Genuine access',
    'home.valueProps.expertise.body':
      "Every experience opens a door that's normally closed to visitors — a working artist's studio, a musician's rehearsal space — instead of a scripted stop on a group circuit.",
    'home.valueProps.community.title': "Direct to Havana's artists",
    'home.valueProps.community.body':
      'We work directly with the artists, musicians, and venues themselves — not agencies or state tour operators — so your visit supports the people whose work you came to see.',
    'home.valueProps.standards.title': 'Small, private groups',
    'home.valueProps.standards.body':
      'Experiences are built for a handful of guests at a time, not a bus load — the kind of access and conversation that only happens in a small room.',
    'home.sustainability.heading': 'Our approach to access',
    'home.sustainability.body':
      "Havana's art and music scenes are extraordinary but easy to see only from the outside — a gallery wall, a stage from the back row. We build small, private experiences around direct introductions: into an artist's actual studio, alongside a working musician, at the table of the city's most storied kitchens.",
    'home.featured.heading': 'Featured experiences',
    'home.featured.daytripLabel': 'Daytrip',
    'home.featured.multidayLabel': 'Multiday tour',
    'home.featured.viewTrip': 'View experience',
    'home.trust.heading': 'Trust & credentials',
    'home.trust.phd': 'Direct relationships with working artists & musicians',
    'home.trust.ecotourism': 'Small, private group sizes',
    'home.trust.community': 'Access beyond the standard tourist circuit',

    'trips.index.heading': 'Our experiences',
    'trips.index.intro':
      "Two Havana arts and culture experiences, with more academic and cultural itineraries in development.",
    'trips.card.duration': 'Duration',
    'trips.card.price': 'Price',
    'trips.card.priceFrom': 'From',
    'trips.card.groupSize': 'Group size',
    'trips.card.difficulty': 'Difficulty',

    'trip.included': "What's included",
    'trip.excluded': "What's not included",
    'trip.highlights': 'Highlights',
    'trip.meetingPoint': 'Meeting point',
    'trip.cancellationPolicy': 'Cancellation policy',
    'trip.depositPolicy': 'Deposit policy',
    'trip.accommodation': 'Accommodation style',
    'trip.itinerary': 'Day-by-day itinerary',
    'trip.itinerary.day': 'Day',
    'trip.guide': 'Your host',
    'trip.guide.readBio': 'Read full bio',
    'trip.reserve': 'Reserve this experience',
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
    'booking.cta.daytrip': 'Reserve this experience',

    'gallery.heading': 'Gallery',
    'gallery.intro': 'A visual notebook — studios, stages, and the artists we work with.',
    'gallery.lightbox.close': 'Close',
    'gallery.lightbox.next': 'Next image',
    'gallery.lightbox.prev': 'Previous image',
    'gallery.lightbox.of': 'of',

    'about.heading': 'About Cartacuba Nature & Arts',
    'about.credibility.heading': "Direct access to Havana's art and music world",
    'about.sustainability.heading': 'Working directly with artists and venues',
    'about.ecotourism.heading': 'Small, private groups',

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
    'footer.legalName': 'Cartacuba Nature & Arts',
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
    'notFound.body': "This page doesn't exist — but these do:",
    'notFound.home': 'Back to homepage',
    'notFound.trips': 'Browse experiences',

    'common.readMore': 'Read more',
    'common.requiredField': 'Required',
    'common.difficulty.easy': 'Easy',
    'common.difficulty.moderate': 'Moderate',
    'common.difficulty.challenging': 'Challenging',
  },
  es: {
    'nav.trips': 'Experiencias',
    'nav.gallery': 'Galería',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar menú',
    'nav.skipToContent': 'Saltar al contenido',

    'brand.name': 'Cartacuba Nature & Arts',
    'brand.motto': 'Los especialistas en arte y cultura de La Habana.',

    'home.hero.eyebrow': 'Experiencias privadas de arte y academia en La Habana',
    'home.hero.cta': 'Explorar experiencias',
    'home.hero.ctaSecondary': 'Nuestro enfoque',
    'home.valueProps.heading': 'Por qué viajar con nosotros',
    'home.valueProps.expertise.title': 'Acceso genuino',
    'home.valueProps.expertise.body':
      'Cada experiencia abre una puerta que normalmente está cerrada para los visitantes — el estudio real de un artista, el espacio de ensayo de un músico — en lugar de una parada guionada en un circuito grupal.',
    'home.valueProps.community.title': 'Directo a los artistas de La Habana',
    'home.valueProps.community.body':
      'Trabajamos directamente con los artistas, músicos y espacios — no con agencias ni operadores turísticos estatales — para que tu visita apoye a las personas cuyo trabajo viniste a ver.',
    'home.valueProps.standards.title': 'Grupos pequeños y privados',
    'home.valueProps.standards.body':
      'Las experiencias están diseñadas para un puñado de personas a la vez, no para un autobús — el tipo de acceso y conversación que solo ocurre en un espacio íntimo.',
    'home.sustainability.heading': 'Nuestro enfoque sobre el acceso',
    'home.sustainability.body':
      'La escena de arte y música de La Habana es extraordinaria pero suele verse solo desde afuera — la pared de una galería, un escenario desde el fondo de la sala. Construimos experiencias pequeñas y privadas alrededor de presentaciones directas: dentro del estudio real de un artista, junto a un músico en activo, en la mesa de las cocinas más legendarias de la ciudad.',
    'home.featured.heading': 'Experiencias destacadas',
    'home.featured.daytripLabel': 'Excursión de un día',
    'home.featured.multidayLabel': 'Viaje de varios días',
    'home.featured.viewTrip': 'Ver experiencia',
    'home.trust.heading': 'Confianza y credenciales',
    'home.trust.phd': 'Relaciones directas con artistas y músicos en activo',
    'home.trust.ecotourism': 'Grupos pequeños y privados',
    'home.trust.community': 'Acceso más allá del circuito turístico habitual',

    'trips.index.heading': 'Nuestras experiencias',
    'trips.index.intro':
      'Dos experiencias de arte y cultura en La Habana, con más itinerarios académicos y culturales en desarrollo.',
    'trips.card.duration': 'Duración',
    'trips.card.price': 'Precio',
    'trips.card.priceFrom': 'Desde',
    'trips.card.groupSize': 'Tamaño del grupo',
    'trips.card.difficulty': 'Dificultad',

    'trip.included': 'Qué incluye',
    'trip.excluded': 'Qué no incluye',
    'trip.highlights': 'Destacados',
    'trip.meetingPoint': 'Punto de encuentro',
    'trip.cancellationPolicy': 'Política de cancelación',
    'trip.depositPolicy': 'Política de depósito',
    'trip.accommodation': 'Tipo de alojamiento',
    'trip.itinerary': 'Itinerario día a día',
    'trip.itinerary.day': 'Día',
    'trip.guide': 'Tu anfitrión',
    'trip.guide.readBio': 'Leer biografía completa',
    'trip.reserve': 'Reservar esta experiencia',
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
    'booking.cta.daytrip': 'Reservar esta experiencia',

    'gallery.heading': 'Galería',
    'gallery.intro': 'Un cuaderno visual — estudios, escenarios y los artistas con quienes trabajamos.',
    'gallery.lightbox.close': 'Cerrar',
    'gallery.lightbox.next': 'Siguiente imagen',
    'gallery.lightbox.prev': 'Imagen anterior',
    'gallery.lightbox.of': 'de',

    'about.heading': 'Sobre Cartacuba Nature & Arts',
    'about.credibility.heading': 'Acceso directo al mundo del arte y la música de La Habana',
    'about.sustainability.heading': 'Trabajamos directamente con artistas y espacios culturales',
    'about.ecotourism.heading': 'Grupos pequeños y privados',

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
    'footer.legalName': 'Cartacuba Nature & Arts',
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
    'notFound.body': 'Esta página no existe — pero estas sí:',
    'notFound.home': 'Volver al inicio',
    'notFound.trips': 'Ver experiencias',

    'common.readMore': 'Leer más',
    'common.requiredField': 'Obligatorio',
    'common.difficulty.easy': 'Fácil',
    'common.difficulty.moderate': 'Moderada',
    'common.difficulty.challenging': 'Exigente',
  },
} as const;

export type TranslationKey = keyof (typeof ui)['en'];
