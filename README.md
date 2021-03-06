# RT PivotalTracker Challenge - Yohei Kanehara

## The Stack

- Server
  - Language: Ruby
  - Framework: [sinatra](http://www.sinatrarb.com/)
  - PSQL
  
- Client
  - Language: JavaScript
  - Framework: React
  - State Management: Redux + Redux-Observable
  - Router: React Router
  

## To Run:
- Server
  - `bundle install`
  - `ruby rtchallenge.rb`
- Client
  - `yarn install` or `npm install`
  - `yarn start` or `npm start`

## Release Notes
- Decouple server and client
  - No longer render html on server
  - Refactored server to be RESTful
  - Moved client logic to separate module (`client`)
- Removed saving project info in environment variables (e.g. release tag)
- Removed auto tagging feature
- Added React + React-Router + Redux + Redux-Observable Front End
- Ability to view different projects
- Ability to view different tags
- CSS Grid

## Upgrade Notes
- Ability to update story state
- Styling updates
- Rearranged card layout
- Added unstarted tickets to board
- Renamed 'In Progress' column to 'Open'

## Additional Info:

### [Pivotal login](https://www.pivotaltracker.com/signin):
- user: `nate+test1@reviewtrackers.com`
- pw: `Password1!`
