import React from 'react'
import {connect} from 'react-redux'

import * as actions from '../store/actions'
import StoryBoard from '../components/stories/StoryBoard'

const mapStateToProps = (state) => ({
  stories: state.stories.stories
})

const mapDispatchToProps = (dispatch) => ({
  getStories: (payload) => dispatch(actions.getStories(payload))
})

export class Stories extends React.Component {

  componentWillMount() {
    this.props.getStories(this.props.match.params)
  }

  componentWillUpdate(nextProps) {
    if (this.props.match.params.labelId !== nextProps.match.params.labelId) {
      this.props.getStories(nextProps.match.params)
    }
  }

  render() {
    return (
        <div>
          <StoryBoard stories={this.props.stories} />
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories)