import API from './client'

export const competitionApi = {
  // Organizer event CRUD
  getAll: () => API.get('/organizer/events'),
  getById: (id) => API.get(`/organizer/events/${id}`),
  create: (data) => API.post('/organizer/events', data),
  update: (id, data) => API.put(`/organizer/events/${id}`, data),
  delete: (id) => API.delete(`/organizer/events/${id}`),
  updateStatus: (id, status) => API.patch(`/organizer/events/${id}/status`, { status }),

  // Image upload to Cloudinary via backend
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return API.post('/organizer/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Public events for participants/discovery
  getPublicEvents: (params) => API.get('/organizer/events/public', { params }),

  // bookmarks
  toggleBookmark: (eventId) => API.post(`/participant/bookmarks/${eventId}`),
  removeBookmark: (eventId) => API.delete(`/participant/bookmarks/${eventId}`),
  getBookmarks: () => API.get('/participant/bookmarks'),
}
