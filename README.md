# Ponder Panda

Ponder Panda is a machine learning tool for data analysis - made to be simple yet powerful for the average user. The user uploads a CSV file and can then analyze the data using gradient descent, knn, or sentiment analysis, without having to know much about these topics. Analysis can be carried out both directly in the browser or on a backend server (backend not yet implemented!). The frontend is built using React, and the ML parts are implemented using TensorFlow. 

This was kind of a one weekend project - and is far from finished - so take it for what it is. I haven't started on the backend yet, but most of the basic analysis functionality is in place in the browser. I figured maybe someone could learn something from it.

## Installation
```bash
npm install
```

## Running
```bash
npm start
```

## Finally
The express tab holds the in-browser analysis part of the application. If you log in you will see a few additional tabs that are placeholders. The idea is that the user in the future should be able upload files and carry out analysis on a backend server for heavier loads, and then generate reports based on the results. 

By default your app will run on [localhost:3000](http://localhost:3000/).

![Screenshot 1](/img1.PNG?raw=true)
![Screenshot 2](/img2.PNG?raw=true)
![Screenshot 3](/img3.PNG?raw=true)
![Screenshot 4](/img4.PNG?raw=true)