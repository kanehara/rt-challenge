import React from 'react'
import * as actions from '../store/actions'
import {connect} from 'react-redux'
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

  render() {
    return (
        <div>
          <StoryBoard stories={this.props.stories} />
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories)