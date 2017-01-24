# Chattrics

## What is it?

Chattrics unifies all your messaging services, into one, intuitive desktop application. So gone are the days of having multiple tabs for each chat client, and having to install and update a plethora of desktop applications.


## Client Support

Chattrics currently supports Facebook Messenger, Google Hangouts, WhatsApp and WeChat. The app was designed with scalability in mind, and additional platforms may be added, within minutes.


## Technologies

We used a variety of technologies, many of which we wanted to explore for the first time through this hack. Primarily Electron was used to create the desktop client. Vue.js was as a MVVM framework for building the interactive interface, and Bulma was used for CSS styling.


## Going Forward

Chattrics was designed a portmanteau of 'chat' and 'metrics'. The app has been built with this in mind, having full support for chart.js, which will help visualize chat statistics for the user. Events such as messages being sent, and platforms utilized will be beautifully presented to the user. These events will be tracked using injected javascript into the electron webviews, for which we have already created a proof of concept.


## Setup
Initialize and Clone Repository.
```
git init
git clone https://github.com/TanayParikh/Chattrics.git
```

Install node.js and electron.
```
sudo apt-get install node
sudo npm install electron -g
```

Install app node modules.
```
npm install
```

Run the app.
```
electron .
```
