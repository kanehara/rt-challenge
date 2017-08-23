import React from 'react'
import 'semantic-ui-label/label.min.css'
import 'semantic-ui-icon/icon.min.css'
import 'semantic-ui-card/card.min.css'
import 'semantic-ui-button/button.min.css'
import { withRouter } from 'react-router-dom'

import '../../components/stories/StoryCard.css'
import StoryOwner from '../../components/stories/details/StoryOwner'
import StoryType from '../../components/stories/details/StoryType'
import StoryEstimate from '../../components/stories/details/StoryEstimate'
import StoryLabel from '../../components/stories/details/StoryLabel'

export const StoryCard = ({history, story, match}) => {

    const owners = story.owners.map(owner => (<StoryOwner key={owner.poid} owner={owner}/>))

    const estimate = story.story_type === 'feature'
        ? <StoryEstimate estimate={story.estimate}/>
        : null

    const labelClickHandler = ({id}) => history.push(`/projects/${match.params.projectId}/stories/${id}`)
    const labels = story.labels.map(label => <StoryLabel key={label.id} label={label} clickHandler={labelClickHandler} />)

    return (
        <div key={story.id} className="ui card">
            <div className="content">
                <div className="header">
                    <a href={story.url} target="_blank">{story.name}</a>
                    <div>
                        {labels}
                    </div>
                </div>
            </div>
            <div className="content">
                <div>{owners}</div>
                <StoryType story={story}/>
                {estimate}
                <h4>State: {story.current_state}</h4>
                <div className="ui button">Action</div>
            </div>
        </div>
    )
}

export default withRouter(StoryCard)