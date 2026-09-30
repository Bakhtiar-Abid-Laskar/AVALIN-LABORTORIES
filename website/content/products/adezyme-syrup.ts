import type { LightProduct } from '../types'

const adezymeSymp: LightProduct = {
  slug: 'adezyme-syrup',
  name: 'Adezyme Syrup',
  template: 'light',
  classification: 'OTC',
  therapeuticArea: 'gastrointestinal',

  shortDescription:
    'A digestive syrup enriched with pepsin and fungal diastase that helps balance and regulate normal digestion. Used for loss of appetite, stomach fullness, and indigestion.',

  keyIngredients: [
    'Fungal Diastase IP (1:1200)',
    'Pepsin IP (1:3000)',
    'Sorbitol Solution',
  ],

  keyBenefits: [
    'Pepsin breaks down proteins into smaller peptides, supporting protein digestion',
    'Fungal Diastase assists in carbohydrate and starch digestion',
    'Aids digestion of starch, carbohydrates, fats, and proteins',
    'Relieves loss of appetite, stomach fullness, and indigestion',
  ],

  directionsForUse:
    'As mentioned on the label or as advised by a healthcare professional.',

  safetyInformation:
    'Read the label carefully before use. Store in a cool, dry place away from direct sunlight. Keep out of reach of children.',

  storage: 'Store in a cool, dry place away from sunlight.',

  manufacturer: {
    name:    'Supermax Drugs & Pharmaceuticals Pvt. Ltd.',
    address: 'Khasra No.322, Nanheda, Anantpur, Bhagawanpur, Roorkee-247668, Haridwar, Uttarakhand',
  },

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default adezymeSymp
