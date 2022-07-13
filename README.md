# Creed Node Developer Code Test
## Antonio Gottsfritz

## Setup

1. Install Node.js in the environment that will run the application (the version used for development was 17.0.9, other versions might be compatible but have not been validated).

1. Using the NPM package manager, that should be installed with Node.js automatically, navigate to the project folder (path of this `README.md` file) with a command line tool and execute the command `npm install` to download and install the required project dependencies locally.

1. Run the application by navigating to the project folder and executing the command `npm run start`. It will by default use port 3000 if the is no `PORT` environment variable set.

1. The application is set to use the file `data.json` at the root of the project folder as its database. To use a different database, a new data layer, with equivalent functions to the existing `jsonDatabase.js`, can be written and put in the `/data` folder; to change the used implementation in the application, simply replace the passed concrete functions in `index.js:14-15` to the new functions.