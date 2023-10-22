# Dear reviewer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To install needed modules:

npm install

To run the project locally:
npm start

To build and run the project:
npm run build

cd ./build
npm start

## Project information

In the components folder, you will find "dummy" components.

App displays one smart component (page) /src/pages/Search

Time needed to fetch results is calculated in msw resolvers, I hope it's acceptable. Sometimes it displayes 0.00, sometimes correct values. It can depend on some internal msw timings.

msw library is used for mocking api responses

/src/mocks/handlers

endpoint uses JS method startsWith (Can be easily changed to includes - feel free to play around :) )

Some styled-components receive numbers instead of booleans to prevent browser warnings
