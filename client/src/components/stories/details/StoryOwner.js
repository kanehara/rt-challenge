import React from 'react'

export default ({owner}) =>
  (<div className="ui image label small dummyAvatar">
    <img src="/dummyAvatar.jpg" alt="dummy avatar"/>
    {owner.initials}
  </div>)