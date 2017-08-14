import React from 'react'
import {connect} from 'react-redux'

import * as actions from '../store/actions'
import StoryBoard from '../components/stories/StoryBoard'

const mapStateToProps = (state) => ({
  status: state.stories.status,
  stories: state.stories.stories,
  label: state.stories.label
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
    switch(this.props.status) {
        case 'loading':
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        case 'failure':
            return (
                <div>
                    <h3>Failed to retrieve stories</h3>
                </div>
            )
        case 'success':
            return (
                <div>
                    <h4>Showing: {this.props.label ? this.props.label : 'Current Iteration' }</h4>
                    <StoryBoard stories={this.props.stories} />
                </div>
            )
        default:
            return (<div><h3>500</h3></div>)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories)