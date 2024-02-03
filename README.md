## Simple car dealership app

### Requirements
- Node version 16+
- Make sure you have `json-server` package installed in the system. If not, install it by running the command `npm install json-server`

### How to run:
1. The data required for the app is served from a static json file from an API. First we need to start the mock server by running the command `npx json-server -p 5000 mock_data.json` from within the root directory
2. Install the dependecies and run the app
   - `npm install`
   - `npm run dev`
   
### About the code and approach
- I've tried to build a working application within the given time. So, there will be some verbosity and hacky code
- Since the data in filters page will be received from an external API ideally, I didn't find storing the data in a store necessary. Similarly, there are no deeply nested components to use the Context API.
- I'm open to suggestions and feedback