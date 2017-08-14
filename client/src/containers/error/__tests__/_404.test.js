import React from 'react'
import {shallow} from 'enzyme'
import { _404 } from '../_404'

it('renders 404 message', () => {
    const output = shallow(<_404/>)
    const message = <h1>404</h1>
    expect(output.contains(message)).toEqual(true)
})