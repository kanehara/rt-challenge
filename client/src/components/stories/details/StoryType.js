import React from 'react'

export default ({story}) => {
  let storyTypeIcon = null
  switch(story.story_type) {
    case 'feature':
      storyTypeIcon = (<i className="code icon"/>)
      break;
    case 'bug':
      storyTypeIcon = (<i className="bug icon"/>)
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

  const capitlizedStoryType = story.story_type.charAt(0).toUpperCase() + story.story_type.slice(1)

  return (<h4>{storyTypeIcon} {capitlizedStoryType}</h4>)
}