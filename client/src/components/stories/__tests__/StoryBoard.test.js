import { buildStoriesByStatus } from "../StoryBoard";

describe('tests buildStoriesByStatus', () => {
  it('returns a map of stories by status', () => {
    const testStories = [
      { id: 1, current_state: 'accepted' },
      { id: 2, current_state: 'delivered' },
      { id: 3, current_state: 'finished' },
      { id: 4, current_state: 'started' },
      { id: 5, current_state: 'rejected' },
      { id: 6, current_state: 'planned' },
      { id: 7, current_state: 'unstarted' },
      { id: 8, current_state: 'unscheduled' }
    ]

    const result = buildStoriesByStatus(testStories)
    expect(result.accepted.includes(testStories[0])).toEqual(true)
    expect(result.delivered.includes(testStories[1])).toEqual(true)
    expect(result.finished.includes(testStories[2])).toEqual(true)
    expect(result.started.includes(testStories[3])).toEqual(true)
    expect(result.rejected.includes(testStories[4])).toEqual(true)
    expect(result.planned.includes(testStories[5])).toEqual(true)
    expect(result.unstarted.includes(testStories[6])).toEqual(true)
    expect(result.unscheduled.includes(testStories[7])).toEqual(true)
  })

  it('leaves out stories with invalid state', () => {
    const testStories = [
      { id: 1, current_state: 'accepted' },
      { id: 2, current_state: 'invalid' }
    ]

    const result = buildStoriesByStatus(testStories)
    expect(result.accepted.includes(testStories[0])).toEqual(true)
    expect(result.invalid).toBeFalsy()
  })
})
