import freeWeights from '../assets/images/facility-free-weights.webp'
import dumbbells from '../assets/images/facility-dumbbells.webp'
import floor from '../assets/images/facility-floor.webp'
import racks from '../assets/images/facility-racks.webp'
import functional from '../assets/images/facility-functional.webp'
import turf from '../assets/images/facility-turf.webp'

/**
 * Representative photography. Replace with photos of the actual facility.
 * `shape` sets the card proportions in the horizontal gallery.
 */
export const facilities = [
  {
    title: 'Free Weights',
    caption: 'Dumbbells, plates and benches for every training style.',
    image: freeWeights,
    alt: 'Rows of dumbbells on racks in a modern gym',
    shape: 'wide',
  },
  {
    title: 'Power Racks',
    caption: 'Racks and platforms built for heavy, safe barbell work.',
    image: racks,
    alt: 'Black and white view of squat racks and barbells',
    shape: 'tall',
  },
  {
    title: 'Training Floor',
    caption: 'Open floor space for coached sessions and open gym.',
    image: floor,
    alt: 'Dark training floor with benches and machines',
    shape: 'wide',
  },
  {
    title: 'Dumbbell Zone',
    caption: 'A dedicated zone for accessory and hypertrophy work.',
    image: dumbbells,
    alt: 'Close-up of a long rack of dumbbells',
    shape: 'tall',
  },
  {
    title: 'Functional Zone',
    caption: 'Kettlebells, sleds, ropes and space to move.',
    image: functional,
    alt: 'Spacious industrial gym with functional training equipment',
    shape: 'wide',
  },
  {
    title: 'Turf & Conditioning',
    caption: 'Turf lanes for sled pushes, carries and sprints.',
    image: turf,
    alt: 'Dimly lit gym with turf lanes and conditioning equipment',
    shape: 'wide',
  },
]
