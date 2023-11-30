### Micro session on Meteor Js ###

# What is MeteorJS?
- Meteor.js, commonly referred to as Meteor, is an open-source JavaScript web framework.
- Meteor allows developers to "create real-time", "reactive applications" with less code and a more integrated development experience.
- Full stack pure JS Framework for building apps in no time

# Features
- Full-stack Development: Meteor enables developers to work on both the client and server sides of an application using JavaScript
- Live Reload: Meteor supports live reloading, meaning that changes made to the code are automatically reflected in the application without requiring a manual reload. This speeds up the development process and enhances productivity.
- Isomorphic Code: Meteor allows developers to write isomorphic code, meaning that the same code can be used on both the client and server sides. This can simplify the development process and reduce the amount of code duplication.
- Package System: Meteor has a built-in package system that simplifies the integration of third-party libraries and components into your application. This makes it easy to extend the functionality of your app.
- Community and Ecosystem: Meteor has an active and supportive community, and there is a wide range of packages and resources available through the Meteor Package Server and the Atmosphere package manager.

# Limitations
- Meteor isn't very suitable for large and complex applications.
- Although you can use SQL databases with Meteor, it's not as seamless as working with MongoDB. Handling data synchronization, reactivity, and updates may require more manual effort.
- Meteor's SSR support is not as robust as other frameworks like Next.js.

# How does client and server work in meteorjs?
- Client side
- Server side
- Data Synchronization: Meteor provides a built-in mechanism for automatic data synchronization between the server and the client. This is achieved through the use of reactive data sources, such as MongoDB collections on the server and Minimongo (an in-memory, client-side database) on the client.
- Publication and Subscription (Pub/Sub) System: 
    - Meteor uses a pub/sub system to manage the flow of data between the server and clients. 
    - The server publishes data sets, and clients subscribe to specific publications.
    - When the data changes on the server, the updates are automatically pushed to the subscribed clients in real-time.
- Reactivity: 
    - Meteor's reactivity system ensures that any changes to the data on the server are automatically reflected in the UI on the client.
    - This reactivity is applied both to the MongoDB collections on the server and to the Minimongo collections on the client.
- Methods for Server-Side Operations:
    - Meteor allows you to define methods that run on the server to perform operations such as database inserts, updates, and deletions. 
    - These methods can be called from the client, providing a secure way to execute server-side logic.

    // Example method for inserting a task on the server
        Meteor.methods({
            'tasks.insert'(text) {
                Tasks.insert({
                text,
                createdAt: new Date(),
                });
            },
        });
- Client-Side Database (Minimongo):
    - On the client side, Meteor uses a client-side, in-memory database called Minimongo. 
    - This allows the client to cache and manipulate data locally, providing a reactive data source for UI updates without constant server requests.


# How to add meteor packages?
- Adding packages was made real simple just find your desired package and type "meteor add <package>
- There are some usefull packages that is required in almost every app eg: accounts-base, jquery
- "meteor remove <package>" to remove that package
- https://guide.meteor.com/using-atmosphere-packages
- We can also create custom packages with meteor as well
- Visit: https://guide.meteor.com/writing-atmosphere-packages.html

# App Structure
-imports
-client
-server
-public


# Installation
    npm install -g meteor

# Create Meteor Project
    meteor create <name of project>

    - By default it will create a react project
    - Meteor can also be integrated with vuejs, Blaze, Svelte
    - eg meteor create <name of project> --vue

# Collections
    import { Mongo } from 'meteor/mongo';

    export const TasksCollection = new Mongo.Collection('tasks');

# Initialize Tasks Collection

    import { Meteor } from 'meteor/meteor';
    import { TasksCollection } from '/imports/api/TasksCollection';

    const insertTask = taskText => TasksCollection.insert({ text: taskText });

    Meteor.startup(() => {
    if (TasksCollection.find().count() === 0) {
        [
        'First Task',
        'Second Task',
        'Third Task',
        ].forEach(insertTask)
    }
    });

# Render Tasks Collection

    import React from 'react';
    import { useTracker } from 'meteor/react-meteor-data';
    import { TasksCollection } from '/imports/api/TasksCollection';
    import { Task } from './Task';

    export const App = () => {
    const tasks = useTracker(() => TasksCollection.find({}).fetch());

    return (
        <div>
        <h1>Welcome to Meteor!</h1>

        <ul>
            { tasks.map(task => <Task key={ task._id } task={ task }/>) }
        </ul>
        </div>
    );
    };


    - The useTracker function exported by react-meteor-data is a React Hook that allows you to have reactivity in your React components. Every time the data changes through reactivity your component will re-render.


# Adding User Accounts
    - Meteor already comes with a basic authentication and account management system out of the box, so you only need to add the accounts-password to enable username and password authentication

    - meteor add accounts-password

# Create User Account
    Accounts.createUser({
      username: "ayushi@gmail.com",
      password: "test@123",
    });

# Login
    - Meteor.loginWithPassword(username, password);

# Implement Method Calls
-  Meteor.call('tasks.insert', text);
-  Meteor.call('tasks.remove', _id)