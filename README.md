[![Codeship Status for Crxssroad/dashy](https://app.codeship.com/projects/725b4fc0-253b-0138-e6c3-6247b5fc51b3/status?branch=master)](https://app.codeship.com/projects/383388)

# Dashy

Dashy is a platform for a variety of custom widgets ranging from journals, notes, rss feeds and weather widgets.

## Author
  * Gabriel Encarnacion

## Dependencies
  * ruby 2.6.5
  * ruby-on-rails 5.2.3
  * react 16.8.0
  * devise
  * carrierwave
  * fog-AWS
  * react-dnd
  * react-dnd-html5-backend
  * bootstrap
  * react-animated-weather
  * react-time-ago
  * react-dropzone

## Setup Instructions
  1. `bundle install`
  2. `yarn install`
  3. `bundle exec rake db:create`
  4. `bundle exec rake db:migrate`
  5. `rails s`
  6. In a separate tab, `yarn start`
  7. In a browser, visit, `http://localhost:3000`
