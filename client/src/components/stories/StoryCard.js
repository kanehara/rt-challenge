import React from 'react'
import 'semantic-ui-label/label.min.css'
import 'semantic-ui-icon/icon.min.css'
import 'semantic-ui-card/card.min.css'
import { withRouter } from 'react-router-dom'

export default withRouter(({history, story, match}) => {
    let storyTypeIcon = null
    switch(story.story_type) {
        case 'feature':
            storyTypeIcon = (<i className="bug icon"/>)
            break;
        case 'bug':
            storyTypeIcon = (<i className="code icon"/>)
            break;
        case 'chore':
            storyTypeIcon = (<i className="cubes icon"/>)
            break;
        case 'release':
            storyTypeIcon = (<i className="checkmark box icon"/>)
            break;
        default:
            console.error(`Invalid story type for story: ${story}`)
    }

    return (
        <div key={story.id} className="ui card">
            <div className="content">
                <div className="header">
                    <a href={story.url} target="_blank">{story.name}</a>
                </div>
            </div>
            <div className="content">
                <div>
                    {
                        story.owners.map(owner => (
                            <a key={owner.poid} className="ui image label small">
                                <img src="/dummyAvatar.jpg" alt="dummy avatar"/>
                                {owner.initials}
                            </a>
                        ))
                    }
                </div>
                <h4>{storyTypeIcon} {story.story_type}</h4>
                {
                    story.story_type === 'feature' ? (
                        <h4>Estimate: {story.estimate ? story.estimate : 'Unestimated'}</h4>) : ''
                }
                <h4>State: {story.current_state}</h4>
                {story.labels.map(label => (
                    <div key={label.id} className="ui label tiny"
                         onClick={() => history.push(`/projects/${match.params.projectId}/stories/${label.id}`)}>
                        {label.name}
                    </div>
                ))}
            </div>
        </div>
    )
})