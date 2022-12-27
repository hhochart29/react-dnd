// statusPending: 'En attente',
//             timeover: 'Dépassé',

import { TranslationBase, TranslationObject } from 'translations'

export default {
  base: TranslationBase.RECRUITER,
  langs: {
    en: {
      mission: {
        remainingDays: {
          legend: 'Remaining days',
          statusPending: 'Pending validation',
          timeOver: 'Time over',
        },
      },
    },
    fr: {
      mission: {
        remainingDays: {
          legend: 'Jours restants',
          statusPending: 'En validation',
          timeOver: 'Dépassé',
        },
      },
    },
  },
} as TranslationObject
