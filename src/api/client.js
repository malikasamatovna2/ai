// Minimal mock client wired to OpenAPI endpoints.
// Replace fetch mocks with real endpoints when backend is ready.

const api = {
  async recommendStyle({ photo_url, event_type, hair_length, maintenance, user_preferences }){
    // In production: POST /recommend/style
    // Mocked response uses simple heuristics combining inputs
    const styles = []
    if(event_type === 'formal' || event_type === 'wedding'){
      styles.push({ name: 'Modern Pompadour', image: 'https://placehold.co/300', confidence: 0.92, explain: 'Good for formal events and suits most face shapes', recommended_service_id: 'srv_1' })
    }
    if(hair_length === 'short' || maintenance === 'low'){
      styles.push({ name: 'Textured Crop', image: 'https://placehold.co/300', confidence: 0.78, explain: 'Short and low maintenance', recommended_service_id: 'srv_2' })
    }
    if(styles.length === 0){
      styles.push({ name: 'Classic Groom', image: 'https://placehold.co/300', confidence: 0.72, explain: 'Versatile for many events', recommended_service_id: 'srv_3' })
    }

    return {
      styles,
      audit_notes: [(event_type === 'wedding' && 'Selected style may require 60+ minutes — verify availability.') || (maintenance === 'high' && 'High maintenance recommended — discuss care with the stylist.')].filter(Boolean)
    }
  },

  async createBooking(payload){
    // In production: POST /bookings
    // Mocked: validate and return booking
    const booking = {
      id: 'bkg_demo_' + Math.random().toString(36).slice(2,8),
      ...payload,
      start_at: payload.start_at,
      end_at: new Date(new Date(payload.start_at).getTime() + 1000*60*30).toISOString(),
      status: 'pending',
      price_total: 35.0
    }
    return booking
  }
}

export default api
