import { getLabelAndHandlers } from "../UpdateStoryButton";

const validStates = ['rejected', 'unstarted', 'started', 'finished', 'delivered']

describe('tests getLabelAndHandlers method', () => {
  it('handler dispatches passed in story and project id', () => {
    validStates.forEach(state => {
      const mockArg = {
        story: {
          id: 'testStory',
          current_state: state
        },
        projectId: 'testProject',
        updateStory: payload => {
          expect(payload.projectId).toEqual('testProject')
          expect(payload.storyId).toEqual('testStory')
        }
      }
      const result = getLabelAndHandlers(mockArg)
      result[0].handler()
    })
  })

  it('should have single handler to update state to started if current state is rejected', () => {
    const mockArg = {
      story: {
        current_state: 'rejected'
      },
      updateStory: payload => {
        expect(payload.requestBody.current_state).toEqual('started')
      }
    }

    const result = getLabelAndHandlers(mockArg)
    result[0].handler()
  })

  it('should have single handler to update state to started if current state is unstarted', () => {
    const mockArg = {
      story: {
        current_state: 'unstarted'
      },
      updateStory: payload => {
        expect(payload.requestBody.current_state).toEqual('started')
      }
    }

    const result = getLabelAndHandlers(mockArg)
    result[0].handler()
  })

  it('should have single handler to update state to accepted if current state is started and story is a chore', () => {
    const mockArg = {
      story: {
        current_state: 'started',
        story_type: 'chore'
      },
      updateStory: payload => {
        expect(payload.requestBody.current_state).toEqual('accepted')
      }
    }

    const result = getLabelAndHandlers(mockArg)
    result[0].handler()
  })

  it('should have single handler to update state to finished if current state is started and story is not a chore', () => {
    const mockArg = {
      story: {
        current_state: 'started',
        story_type: 'feature'
      },
      updateStory: payload => {
        expect(payload.requestBody.current_state).toEqual('finished')
      }
    }

    const result = getLabelAndHandlers(mockArg)
    result[0].handler()
  })

  it('should return two label and handler pairs if current state is delivered', () => {
    const mockArg = {
      story: {
        current_state: 'delivered'
      }
    }

    const result = getLabelAndHandlers(mockArg)
    expect(result).toHaveLength(2)
    const labels = result.map(r => r.label)
    expect(labels).toContain('Accept')
    expect(labels).toContain('Reject')
  })

  it('should have two handlers to update state to accepted or rejected if current state is delivered', () => {
    let expectedNextState;

    const mockArg = {
      story: {
        current_state: 'delivered'
      },
      updateStory: payload => {
        expect(payload.requestBody.current_state).toEqual(expectedNextState)
      }
    }

    const result = getLabelAndHandlers(mockArg)
    expectedNextState = 'accepted'
    result[0].handler()
    expectedNextState = 'rejected'
    result[1].handler()
  })

  it('should have single handler to update state to unstarted if current state is accepted', () => {
    const mockArg = {
      story: {
        current_state: 'accepted'
      },
      updateStory: payload => {
        expect(payload.requestBody.current_state).toEqual('unstarted')
      }
    }

    const result = getLabelAndHandlers(mockArg)
    result[0].handler()
  })
})