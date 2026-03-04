import { mount } from "@vue/test-utils"
import EventCard from "@/components/EventCard"

describe('EventCard', () => {
  it(`renders the event's data successfully`, () => {
    const event = {
      id: 1,
      time: '12:00PM',
      date: 'September 29th, 2022',
      title: 'Coaching Little League'
    }
    const wrapper = mount(EventCard, {
      props: {
        event
      }
    })
    const wrapperHTML = wrapper.html()
    expect(wrapperHTML).toContain(event.title)
    expect(wrapperHTML).toContain(event.date)
    expect(wrapperHTML).toContain(event.time)
  })
})
