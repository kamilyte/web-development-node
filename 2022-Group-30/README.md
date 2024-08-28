<br />
<p align="center">
  <h1 align="center">Web Engineering Project Team 30</h1>

  <p align="center">
    Spotify 1921-2020 Dataset WebApp
  </p>
  <small>
    <p align="center">
      Developed by Kamilė Kaškelytė, Anthi Georgiadou, Maria Mariza Christodoulou <br>
      (s4668324 & s4753690 & s4698649)
    </p>
  </small>
</p>

## Table of Contents

* [Overview/Introduction](#overview/introduction)
* [M1: API Design](#m1:-api-design)
* [M2: API Implementation](#m2:-api-implementation)
* [M3: UI Implementation & Deployment](#m3:-ui-implementation-&-deployment)
* [Running](#running)
* [Outcomes](#outcomes)
* [Team Contribution](#team-contribution)


## Overview/Introduction

For this project, our team developed a RESTful Web App to present the 1921-2020 Spotify dataset statistics. We divided the work into 4 milestones (M1, M2, M3 and M4), which correspond to the steps that needed to be followed in order to build such a web app; API design and specification (the spec.yml file), API implementation (back-end implementation), User Interface with some functionality (front-end implementation) and the final deployable Web app with all the functionality accompanied with a report. Note that in our code the `api` package contains our back-end implementation and our `ui` package contains our front-end implementation. Use the following command in the terminal to get the web-app started;
```sh
docker-compose up
```


## M1: API Design

The first thing we needed to do was to create the API design (the specification) in YAML format in order to represent the design of our endpoints. In total we have 13 endpoints. Below we explain each endpoint and its functionalities (the bold text represents the type of endpoint and how to access it):

1. **GET: /songs** Retrieves a list of selected songs using name of a song.    
This endpoint will retrieve results when the user inputs the name of the song he/she wishes to retrieve and then will give the result in either JSON or CSV format. It will return the name of the song, id of the song, artist name(s), artist ID(s), popularity and release date. The errors are 204 (when the list is empty or when we have no results), 400 (when the request is not well formed e.g. missing input) and 5xx (server error). 
2. **POST: /songs** Creates a new song.   
This endpoint will create a song when the user inputs the song name, artist name(s), artist ID(s), popularity and release date and will then give the result in JSON format. It will return whether or not the query was successful. The errors are 400 (when the request is not well formed e.g. missing input), 409 (a duplicate song exists) and 5xx (server error).
3. **GET: /songs/id** Retrieves a song using song ID.   
This endpoint will retrieve results when the user inputs the song ID and will then give the result in either JSON or CSV format. It will return the name of the song, id of the song, artist name(s), artist ID(s), popularity and release date. The errors are 404 (when the list is empty or when we have no results), 400 (when the request is not well formed e.g. missing input) and 5xx (server error). 
4. **PUT: /songs/id** Updates a song using song ID.   
This endpoint will update a song when the user inputs the song ID, the song name, artist name(s), artist ID(s), popularity and release date. All these fields will get updated depending on what the user inputs and then the result will be given. The updated song state returns in JSON format. The errors are 400 (when the request is not well formed e.g. missing input), 404 (song wasn't found) and 5xx (server error).  
5. **DELETE: /songs/id** Deletes a song using song ID.   
This endpoint will delete a song when the user inputs the song ID and will then give a confirmation in JSON format. It will return whether or not the query was successful and if it was, it will also return the deleted song's name and id. The errors are 400 (when the request is not well formed e.g. missing input), 404 (song wasn't found) and 5xx (server error).
6. **DELETE: /songs/artist** Deletes songs by artist name.   
This endpoint will delete the songs of a specific artist when the user inputs the artist name and will then give a confirmation in JSON format. It will return whether or not the query was successful and if it was, it will also return the number of deleted songs. The errors are 400 (when the request is not well formed e.g. missing input), 404 (artist wasn't found) and 5xx (server error).
7. **DELETE: /songs/artist/id** Deletes songs by artist ID.   
This endpoint will delete all songs of a specific artist when the user inputs the artist ID and will then give a confirmation in JSON format. It will return whether or not the query was successful and if it was, it will also return the number of deleted songs. The errors are 400 (when the request is not well formed e.g. missing input), 404 (artist wasn't found) and 5xx (server error). 
8. **GET: /songs/top** Retrieves top **n** songs.   
This endpoint will retrieve the top N songs when the user inputs the number of top songs he/she wishes to get and will then give the result in either JSON or CSV format. It will return all the songs in the top N. The errors are 400 (when the request is not well formed e.g. missing input), 404 (songs weren't found) and 5xx (server error).
9. **GET: /artists/summary** Retrieves summary of artist using artist name.   
This endpoint will retrieve the summary of artists when the user inputs the artist name and will then give the result in either JSON or CSV format. It will return, for each artist found, the artist ID, artist name, number of songs, most popular song, earliest song and latest song. The errors are 400 (when the request is not well formed e.g. missing input), 404 (artist not found) and 5xx (server error).
10. **GET: /artists/summary/id** Retrieves summary of artist using artist ID.   
This endpoint will retrieve the summary of an artist when the user inputs the artist ID and will then give the result in either JSON or CSV format. It will return the artist ID, artist name, number of songs, most popular song, earliest song and latest song. The errors are 400 (when the request is not well formed e.g. missing input), 404 (artist not found) and 5xx (server error). 
11. **GET: /artists/songs** Retrieves songs of artist using artist name.   
This endpoint will retrieve the songs of an artist when the user inputs the artist name and will then give the result in either JSON or CSV format. It will return, for each artist, the artist information, and each song's information. The errors are 400 (when the request is not well formed e.g. missing input), 404 (artist not found) and 5xx (server error). 
12. **GET: /artists/songs/id** Retrieves songs of artist using artist ID.   
This endpoint will retrieve the songs of an artist when the user inputs the artist ID and will then give the result in either JSON or CSV format. It will return the artist's and each song's information. The errors are 400 (when the request is not well formed e.g. missing input), 404 (artist not found) and 5xx (server error).
13. **GET: /artists/top** Retrieves top **n** artists.   
This endpoint will retrieve the top N artists when the user inputs the number of top artists he/she wants and will then give the result in either JSON or CSV format. The top N artists along with their information will then be returned. The errors are 400 (when the request is not well formed e.g. missing input), 404 (songs weren't found) and 5xx (server error).


## M2: API Implementation

For the API implementation, we were originally going to use Java and Springboot, however, we came across some difficulties, especially when trying to connect to an external database, and so we decided to switch to the MERN stack.      
The MERN stack is a software stack, a collection of technologies, that is being used for fast application development for dynamic web sites and web applications. It consists of 4 components: MongoDB used as an external online database, Express.js used as a web application framework, React.js used for building the user interface and Node.js used for server-side programming. This meant that we would have to use Javascript for the back-end and the front-end instead of Java (our original plan).      

In order to start creating the API, we needed to connect to a port and to a database. Since we are using MongoDB, we had to create a database that we can connect to over the internet. After doing that, we added the link needed to connect to it in our `.env` file.

```sh
    NODE_ENV=development 

    DATABASE_URI=mongodb+srv://mongo:mongo@cluster0.uveog9h.mongodb.net/?retryWrites=true&w=majority
```

Afterwards, we needed to connect to a port, create the routes and connect them all (shown in `server.js`).   
We then had to create models (for artists and songs) so we could create objects and store them in the database. With the use of `mongoose.Schema`, each object created would have its own personal ID, so the use of ID from the songs and artists data would be unnecessary (check `Artist.js` and `Song.js`).   
Then, we created the controllers for the artists and songs, which are responsible for carrying out all the endpoints as necessary. For the GET requests the outputs are either in JSON or CSV format, specified by the response type (see `artistsController.js` and `songsController.js`).   
Next, we had to create the routes for the endpoints, how they are going to be accessed from the URL, as well as which route corresponds to which controller function (see `artistRoutes.js` and `songRoutes.js`).   
After putting everything together in the `server.js` file, we were able to run it on port: 3500. 
One thing to note is that in order to get the backend to connect to the database, the person running it requires access to the database, which means that before running we have to manually add our IP address on the database. To avoid this, we took advantage of the fact that `MongoDB` allows to give global access by giving access to the IP address 0.0.0.0/0, meaning that everyone can now access our database.


## M3: UI Implementation & Deployment

For the final part of the project (UI implementation) we needed to make the frontend and have it connect to the backend. For this we used React.js and Redux RTK Query to make frontend slices that can access the backend endpoints and retrieve the necessary data. The `songsApiSlice.js` and `artistsApiSlice.js` display what endpoints the frontend can currently access. Of course separate files had to be made for each slice in order to present the information to the user. `App.js` and `Welcome.js` are used together to provide links and paths to what the user should be able to see and the data they can input. 
For the appearance of the frontend, our team used `css` and `javascript` along with other external sources.

One more thing that needed to be taken care of was the deployment. For this part, we created a `Dockerfile.dev` in both the `api` and `ui` files so they could be in multiple containers. They run based on the information in the `docker-compose.yaml` file in the root directory, which uses the information in both containers to run it. If a user wishes to run our Web-App, it can be built by running the following command in the root file terminal:
```sh
docker-compose build --no-cache
```
 To start it use:
 ```sh
 docker-compose up
 ```


## Running 

At the M2 point of the project, in order to build and test our backend we would do the following:
1. Navigate to the `2022-Group-30` directory and then to `api`
2. Build and run the back-end by typing in the terminal:
```sh
npm run dev
```   

In a similar way to running the backend, in order to run the frontend, after accessing the backend, we would follow similar steps as before:
1. Navigate to the `2022-Group-30` directory and then to `ui` 
2. Build and run the front-end by typing in the terminal:
```sh
npm start
```
3. Open a web browser and go to: `http://localhost:3000` to see the web-app


## Outcomes

At first, for the first milestone we were very confused as to what was required to submit. We did not realise we just needed the `spec.yml` file for the first couple of days, so we ended up starting to build the API before our specification was complete. To do this, we used the framework `SpringBoot` and coded in Java, however we realized that we would end up encountering some difficulties. For this reason, for the second milestone, we decided to implement the back-end using the framework `Node.js` along with `Express.js` and coding in javascript. Although this would require more self-learning, we found that it was easier to implement and faster to actually build the backend. Overall, we were able to create the required endpoints as well as a few extra ones for the artists.   

Implementing the front-end had a smooth start but unfortunately we faced  some problems, one of them being that the front-end was not able to process the data sent by the back-end properly. We realised we had to pass infomation to the GET endpoints not by using a body, but through the parameter, which required slight changes to the backend. Even though these were not significant changes, we were able to retrieve the data from the back-end. The problem now was that the front-end would not access it properly, which probably meant that there was an issue with the way that we loaded the data in the slices. In order to show the functionality of our endpoints we generated some model entities for our database. To sum up, we were able to present CRUD methods that are being deployed across the front-end and back-end, and although we were not able to complete all the endpoints for the front-end, we believe that the basic functionality is there. 

Note that for both the back-end and the front-end, since we were learning a new programming language and we had to do a lot of self-studying (mostly from online sources), we decided to each member work on an implementation for the first few days, and then chose one of them (the one that looked the most promising) to continue with.

## Team Contribution

In this section, we include how the work was distributed between the members of our group and how the team worked to create the Web-App.

The following table contains an general overview of which member worked on each component of the project that is now on GitHub;

|                        | Anthi | Mariza | Kamile |
| ---------------------- |  ---  |   ---  |   ---  |
|   Specification file   |   ✔️  |   ✔️  |   ✔️  |
|        Back - end      |       |        |   ✔️  |
|       Front - end      |   ✔️  |   ✔️  |   ✔️   |
|       Deployment       |       |        |   ✔️  |
| Report / Documentation |   ✔️  |       |   ✔️   |
|     Decision Making    |   ✔️  |   ✔️  |   ✔️  |

During the back-end developement, our team faced some problems. Starting off the project, we had decided to work with `Java` using the framework `SpringBoot`, however we had some difficulty trying to understand how we would connect the backend to the database. We had the idea to switch to the `MERN stack` with `Javascript`. To make this decision we split and each member started working on a back-end using either Java or Javascript. To be specific, we had 3 implementations at that time, one for Java, one for Javascript using express as it was presented in the tutorial on campus and one using express again but following an online tutorial. We thought that this would help figuring out which was best, if some member faced problems with the one we would continue with the other or if some member succesfully connected to the database we would continue from there. For this reason and because we did not want to mess up with GitHub, at that first stage of experimenting we shared our code to the team using other methods than GitHub. Note that Kamile was responsible for the creation of the `MongoDB` we ended up using.   

Next, was the front-end developement. Since we decided to switch to the `MERN stack`, we did some self studying from online sources and again split into trying different approaches in order to find the best approach faster. We had to create a Web-App for another course that we were all taking at the same time, so Mariza started one more implementation where she tried to adapt her code from the other project that she made using JavaScript for the purposes of our Spotify Dataset. We had to watch some online tutorials to learn how to work with `React.js` while we also tried using all the releant knowledge we gained from the tutorials that our TAs and our fellow students gave, so we ended up with 3 different implementations. We decided to continue with the solution Kamile was working on, since it was in a really good place. In the end, Kamile implemented the code for most of it and Mariza worked more on fixing some of the endpoints that were not working properly, while Anthi tried to continue on the report that the group started preparing while working on M2. Anthi and Mariza had some difficulty following Kamile's code at first, since she made most of the code, so to save time Anthi started dealing with the appearance of the web-app and Mariza went on to ask for advanced help from our TAs and other experienced friends. Anthi started working on deployment however Kamile was the one who finished and committed that part.

To sum up, all the members contributed to the project, some more on the final implementation and some more on the code that was discarded during the process. We had a few disagreements along the way, a few thoughts to start over, but most times we were trying to discuss our thoughts and choose the option that the majority preferred in a mature and professional way. We always got good feedback on our Pull Requests, which gave us more motivation to keep going and achieve our final result. While we did have some communication issues, that started mainly after the Christmas break, all the members kept trying to fix broken endpoints, add functionality and work on the code in any possible way until the final deadline.
