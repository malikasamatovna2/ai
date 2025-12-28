export function recommendMock({ photo_url, event_type, hair_length, maintenance }:{photo_url:string,event_type:string,hair_length:string,maintenance:string}){
  const styles:any[] = []
  if(event_type === 'formal' || event_type === 'wedding'){
    styles.push({ name: 'Modern Pompadour', image: 'https://placehold.co/300', confidence: 0.92, explain: 'Good for formal events', recommended_service_id: 'srv_1' })
  }
  if(hair_length === 'short' || maintenance === 'low'){
    styles.push({ name: 'Textured Crop', image: 'https://placehold.co/300', confidence: 0.78, explain: 'Short and low maintenance', recommended_service_id: 'srv_2' })
  }
  if(styles.length === 0){
    styles.push({ name: 'Classic Groom', image: 'https://placehold.co/300', confidence: 0.72, explain: 'Versatile style', recommended_service_id: 'srv_3' })
  }
  return { styles, audit_notes: ([(event_type === 'wedding' && 'Selected style may require 60+ minutes — verify availability.')].filter(Boolean)) as string[] }
}
