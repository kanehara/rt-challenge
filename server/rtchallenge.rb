# bundle exec irb -I. -r rtchallenge.rb
require 'dotenv'
Dotenv.load
require 'sinatra'
require 'json'
require 'rest-client'
require 'pry'
require 'rb-readline'
require 'sinatra/activerecord'
require 'sinatra/cross_origin'
require 'sinatra/json'
require './config/environments'
require './models/owner'

class App < Sinatra::Base
  configure do
    enable :cross_origin
  end

  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  options '*' do
    response.headers["Allow"] = "GET, POST, OPTIONS, PUT"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Methods"] = "PUT"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end

  get '/healthz' do
    'Healthy as a horse!'
  end

  get '/api/v1/projects' do
    protected!
    headers = pivotal_headers
    url = "#{pivotal_url}/projects"
    RestClient.get(url, headers)
  end

  get '/api/v1/projects/:id' do |id|
    protected!
    headers = pivotal_headers
    url = "#{pivotal_url}/projects/#{id}"
    RestClient.get(url, headers)
  end

  get '/api/v1/projects/:id/labels' do |id|
    protected!
    headers = pivotal_headers
    url = "#{pivotal_url}/projects/#{id}/labels"
    RestClient.get(url, headers)
  end

  get '/api/v1/projects/:id/labels/:labelId' do |id, labelId|
    protected!
    headers = pivotal_headers
    url = "#{pivotal_url}/projects/#{id}/labels/#{labelId}"
    RestClient.get(url, headers)
  end

  get '/api/v1/projects/:id/stories' do |id|
    protected!
    labelId = params[:label]
    headers = pivotal_headers
    update_users(id)
    if labelId
      url = "#{pivotal_url}/projects/#{id}/labels/#{labelId}"
      label = make_call_parsed(url, headers)
      url = "#{pivotal_url}/projects/#{id}/search?query=label%3A#{label["name"]}+AND+includedone%3Atrue"
      res = make_call_parsed(url, headers)
      stories = res["stories"]["stories"]
      populate_owners(stories)
      json stories
    else
      url = "#{pivotal_url}/projects/#{id}/iterations?scope=current"
      res = make_call_parsed(url, headers)
      if res
        stories = res[0]["stories"]
        populate_owners(stories)
        json stories
      else
        404
      end
    end
  end

  put '/api/v1/projects/:projectId/stories/:storyId' do |projectId, storyId|
    protected!
    url = "#{pivotal_url}/projects/#{projectId}/stories/#{storyId}"
    headers = pivotal_headers
    updatedStory = JSON.parse(RestClient.put(url, JSON.parse(request.body.read), headers))
    populate_owners([updatedStory])
    json updatedStory
  end

  get '/api/v1/owners/:id' do |id|
    protected!
    owner = Owner.find_by_poid(id)
    if owner
      json owner
    else
      404
    end
  end

  helpers do

    def protected!
      return if authorized?
      headers['WWW-Authenticate'] = 'Basic realm="Restricted Area"'
      halt 401, "Not authorized\n"
    end

    def authorized?
      @auth ||=  Rack::Auth::Basic::Request.new(request.env)
      @auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == [ENV['RT_USER'], ENV['RT_USER_PW']]
    end

    def update_users(id)
      ownersDatum = make_call_parsed("#{pivotal_url}/projects/#{id}/memberships", pivotal_headers)
      ownersDatum.each do |ownerData|
        unless Owner.find_by_poid(ownerData["person"]["id"])
          Owner.create( poid: ownerData["person"]["id"],
                        initials: ownerData["person"]["initials"],
                        name: ownerData["person"]["name"])
        end
      end
    end

    def populate_owners(stories)
      stories.each do |story|
        owners = []
        story["owner_ids"].each do |id|
          owners.push(Owner.find_by_poid(id))
        end
        story["owners"] = owners
      end
    end

    def make_call_parsed(url, headers)
      response = RestClient.get url, headers
      JSON.parse(response)
    end

    def pivotal_headers
      { 'X-TrackerToken' => ENV['PT_TOKEN'] }
    end

    def pivotal_url
      "https://www.pivotaltracker.com/services/v5"
    end
  end

  run! if __FILE__ == $0
end
