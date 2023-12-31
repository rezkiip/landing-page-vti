import AXIOS from "./server"

export default {
  getEventInsight(eventPublicId) {
    return AXIOS.post('event/eventListByLink', {
      page: 0,
      size: 1,
      permanent_link: `https://ideo.id/${eventPublicId}` //hardcode
    })
  },
  getEventBanner(eventId) {
    return AXIOS.post('banner/byEvent', {
      page: 0,
      size: 999,
      event_id: eventId
    })
  }
}