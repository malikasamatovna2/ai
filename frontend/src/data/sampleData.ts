export const categories = ['Haircut', 'Color', 'Beard', 'Styling', 'Packages']

export const services = [
  { id: 'srv_1', salon_id: 'salon_1', name: 'Classic Haircut', duration: 45, price: 25, category: 'Haircut', tags: ['classic','men'] },
  { id: 'srv_2', salon_id: 'salon_1', name: 'Beard Trim', duration: 30, price: 15, category: 'Beard', tags: ['trim','shave'] },
  { id: 'srv_3', salon_id: 'salon_1', name: 'Styling + Finish', duration: 60, price: 40, category: 'Styling', tags: ['party','event'] },
  { id: 'srv_4', salon_id: 'salon_2', name: 'Color Touch-up', duration: 90, price: 80, category: 'Color', tags: ['dye','highlights'] },
  { id: 'srv_5', salon_id: 'salon_2', name: 'Groom Package (Cut+Beard)', duration: 90, price: 60, category: 'Packages', tags: ['package','combo'] }
]

export const salons = [
  { id: 'salon_1', name: 'Barber & Co.', location: 'Downtown', rating: 4.8 },
  { id: 'salon_2', name: 'Groom Studio', location: 'Uptown', rating: 4.6 }
]
