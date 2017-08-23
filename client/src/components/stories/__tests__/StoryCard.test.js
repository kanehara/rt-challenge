import React from 'react'
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer'
import {Router} from 'react-router'

import {StoryCard} from '../../../containers/stories/StoryCard'

describe('StoryCard rendering', () => {
    it('renders story details', () => {
        const mockStory = {
            id: 1,
            story_type: 'feature',
            url: 'test.com',
            name: 'test story',
            owners: [
                {
                    poid: 1,
                    initials: 'yk'
                }
            ],
            estimate: 1,
            labels: [
                {
                    id: 1,
                    name: 'test label'
                }
            ],
            current_state: 'finished'
        }

        const mockHistory = {

        }

        const mockMatch = {
            params: {
                projectId: '1'
            }
        }

        const result = renderer.create(
            <StoryCard story={mockStory} history={mockHistory} match={mockMatch}/>
        ).toJSON()
        expect(result).toMatchSnapshot()
    })
})