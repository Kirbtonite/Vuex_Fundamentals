import EventList from "@/views/EventList"
import { config, mount } from "@vue/test-utils"
import store from "@/store"
import router from "@/router"
import { event as mockEvents } from '../../db.json'

function mountEventList(config = {}) {
    config.mountOptions = config.mountOptions || {}
    config.plugins = config.plugins || []
    return mount(EventList, {
        global: {
            plugins: [store, router]
        },
        ...config.mountOptions
    })
}

let wrapper

describe('EventList', () => {

    beforeEach(() => {
        wrapper = mountEventList()
    })

  it('renders props.msg when passed', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  describe('page title', () => {
    it('is rendered with the correct text', () => {
       const title = wrapper.find('[data-testid=event-list-title]')
        expect(title.exists()).toBeTruthy()
        expect(title.text()).toContain('Events for Good')
    })
  })
  describe('events', () => {
    it('are rendered in a list with necessary information', () => {
        const mockEvents = [{ description: 'An event', title: 'A title', id: '0'}]
        store.commit('SET_EVENTS', mockEvents)
        wrapper = mountEventList({
            plugins: {
                store: {
                    state: () => ({
                        events: mockEvents
                    })
                }
            }
        })
        const events = wrapper.find('[data-testid=event]')
        expect(events).toHaveLength(mockEvents.length)

        events.forEach((event, i) => {
            const eventText = event.text()
            expect(eventText).toContain(mockEvents[i].title)
            expect(eventText).toContain(mockEvents[i].date)
        })
    })
  })
})
