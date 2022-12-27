import { TranslationBase, TranslationObject } from 'translations'

export default {
  base: TranslationBase.RECRUITER,
  langs: {
    en: {
      mission: {
        create: {
          breadcrumb: 'Create mission',
          tabs: {
            mission: {
              title: 'Mission',
              subtitle: 'Please fill in the information on the position related to this mission',
              form: {
                name: {
                  title: 'Title of the mission',
                  placeholder: 'Enter the title of the assignment',
                },
                profileCount: {
                  title: 'Number of profiles sought for this position',
                  placeholder: 'Enter a name',
                },
                jobDescription: {
                  title: 'Job description ( required)',
                  placeholder: 'Attach job description',
                  create: 'Create a job description',
                },
                submit: 'Validate the mission',
              },
            },
            offerValidation: {
              title: 'Validation of the offer',
              subtitle: 'Please confirm the Isidore offer before proceeding.',
              info: {
                title: '1% per month for 18 months',
                firstText:
                  "Entrust us with your recruitment by creating your mission, it's all about success and we are looking for the ideal candidate specific to your needs.",
                content: `Billing only by <span> success </span> and <span> very attractive </span>.
                        representing <span> 1% of the gross annual package </span> of the candidate's remuneration per
                        months for 18 months. If the candidate does not stay in your company, the invoicing
                        stops.`,
                conditions: 'Accept the general terms and conditions of sale',
                cgv: 'general terms and conditions of sale',
                submit: 'Confirm the offer',
              },
              aside: {
                a: 'Advice and support by a consultant',
                b: 'Sourcing specific to your needs',
                c: 'Preview of new candidates matching your criteria on Isidore.io',
                d:
                  'Pre-qualification of candidates by profile, video interview and presentation of your company',
                e: 'Follow-up of the candidates presented throughout your recruitment process',
                f:
                  'Loyalty of the employee during his integration and throughout the duration of the contract',
              },
            },
            confirm: {
              title: 'Confirmation',
              description:
                'Thank you for your request, an Isidore consultant will contact you shortly.',
              button: 'See the list of missions',
            },
          },
          error: {
            title: 'Creation of the mission',
            description:
              'An error has occurred. Please check the information entered and contact an administrator if the error persists.',
          },
        },
      },
    },
    fr: {
      mission: {
        create: {
          breadcrumb: 'Créer une mission',
          tabs: {
            mission: {
              title: 'Mission',
              subtitle: 'Veuillez renseigner les informations sur le poste lié à cette mission',
              form: {
                name: {
                  title: 'Intitulé de la mission',
                  placeholder: 'Saisissez le titre de la mission',
                },
                profileCount: {
                  title: 'Nombre de profils recherchés pour ce poste',
                  placeholder: 'Entrez un nombre entier',
                },
                jobDescription: {
                  title: 'Fiche de poste (obligatoire)',
                  placeholder: 'Joindre fiche de poste',
                  create: 'Créer une fiche de poste',
                },
                submit: 'Valider la mission',
              },
            },
            offerValidation: {
              title: 'Validation de l’offre',
              subtitle: 'Veuillez confirmer l’offre Isidore avant de poursuivre.',
              info: {
                title: '1% par mois pendant 18 mois',
                firstText:
                  'Confiez-nous votre recrutement en créant votre mission, c’est au succès et nous recherchons le candidat idéal spécifique à votre besoin.',
                content: `Une facturation uniquement au <span> succès </span> et <span> très attractive </span>
                      représentant <span> 1% du package annuel brut </span> de la rémunération du candidat par
                      mois pendant 18 mois. Si le candidat ne reste pas dans votre société, la facturation
                      s’arrête.`,
                conditions: 'Accepter les',
                cgv: 'conditions générales de vente',
                submit: 'Confirmer l’offre',
              },
              aside: {
                a: 'Conseil et accompagnement par un consultant',
                b: 'Sourcing spécifique à votre besoin',
                c:
                  'Présentation en avant première des nouveaux candidats sur Isidore.io correspondant à vos critères',
                d:
                  'Pré-qualification des candidats par profil, entretien en visio et présentation de votre entreprise',
                e: 'Suivi des candidats présentés tout au long de votre process de recrutement',
                f:
                  ' Fidélisation du collaborateur durant son intégration et tout au long du contrat',
              },
            },
            confirm: {
              title: 'Confirmation',
              description:
                'Merci de votre demande, un consultant Isidore va prendre contact avec vous prochainement.',
              button: 'Voir la liste des missions',
            },
          },
          error: {
            title: 'Création de la mission',
            description:
              "Une erreur s'est produite. Veuillez vérifier les informations saisies et contacter un administrateur si l'erreur persiste.",
          },
        },
      },
    },
  },
} as TranslationObject
