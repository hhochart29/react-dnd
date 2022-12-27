import { TranslationBase, TranslationObject } from 'translations'

export default {
  base: TranslationBase.RECRUITER,
  langs: {
    en: {
      mission: {
        details: {
          header: {
            createdAt: 'Créer le',
            actions: {
              renew: 'Renew',
              stop: 'Stop',
              resume: 'Resume',
            },
            declinedCandidate: 'See declined candidates',
            jobDescription: 'See job description',
          },
          item: {
            PROPOSED: {
              prefixDate: 'Reached the',
            },
            INTERESTING: {
              prefixDate: 'Reached the',
            },
            MEETING: {
              prefixDate: 'Meeting the',
            },
            RECRUITED: {
              prefixDate: 'Recruited the',
            },
            DECLINED: {
              prefixDate: 'Declined the',
            },
          },
          columns: {
            reached: 'Offered',
            interesting: 'Interesting',
            planned: 'Interview planned',
            recruited: 'Recruited',
          },
          modal: {
            title: 'Decline the candidate',
            description:
              'To decline the candidate and allow us to refine our selection, please select a reason',
            label: 'Decline reason',
            cancel: 'Cancel',
            validate: 'Validate the decline',
          },
          recover: {
            restore: 'Restore',
            cancel: 'Cancel',
          },
        },
      },
    },
    fr: {
      mission: {
        details: {
          header: {
            createdAt: 'Crée le',
            actions: {
              renew: 'Renouveler',
              stop: 'Arrêter',
              resume: 'Reprendre',
            },
            declinedCandidate: 'Voir les candidats refusés',
            jobDescription: 'Voir la fiche de poste',
          },
          item: {
            PROPOSED: {
              prefixDate: 'Proposé le',
            },
            INTERESTING: {
              prefixDate: 'Proposé le',
            },
            MEETING: {
              prefixDate: 'Entretien le',
            },
            RECRUITED: {
              prefixDate: 'Recruté le',
            },
            DECLINED: {
              prefixDate: 'Refusé le',
            },
          },
          columns: {
            reached: 'Proposé',
            interesting: 'Intéressant',
            planned: 'Entretien planifié',
            recruited: 'Recruté',
          },
          modal: {
            title: 'Refuser le candidat',
            description:
              "Pour refuser le candidat et nous permettre d'affiner notre selection, merci de selectionner un motif",
            label: 'Motif du refus',
            cancel: 'Annuler',
            validate: 'Valider le refus',
          },
          recover: {
            restore: 'Restaurer',
            cancel: 'Annuler',
          },
        },
      },
    },
  },
} as TranslationObject
