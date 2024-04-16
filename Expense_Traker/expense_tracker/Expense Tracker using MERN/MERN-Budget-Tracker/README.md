# MERN-Budget-Tracker
A full-stack application utilizing the MERN framework. This application allows the user to track their income and expenses. Implements REST API's with axios, CRUD functionality, JSON, User Authentication using JWT and bcryptJS, MongoDB with mongoose, State Management using Context API, Styling of the UI with CSS, use of React libraries such as BrowserRouter, React-Router-Dom, Hooks, Bootstrap/Reactstrap and more. 

![Image](https://github.com/smkattoula/smkattoula.github.io/blob/master/assets/img/BudgetTrackerPic.png)

## Installation 
Clone this repo to your text editor and `cd into the root folder`. In the command line, go ahead and run `npm install`. Afterwards, `cd into the frontend folder` and run `npm install` as well. This will install all of the dependacies for both server side and client side package.json. You can then `cd back into the root folder` and run `npm run dev` to start up the nodemon server (for real-time error handling) and the development server (to view the app in localhost on your browser). 

## System Requirement Specification (SRS)
### Overview
I am a full-stack web developer specializing in the MERN framework and currently seeking opportunities for full-time employment. My goal is to create high-quality web and mobile applications that help to solve real world business problems and engineer creative solutions to excell your company in the marketplace. The scope of this project is fairly small and simple, but provides a functional software that allows anyone to track their income and expenses for both personal and business reasons. The completion of this full-stack application demonstrates my understanding of the core fundamentals of web development. Budget Tracker implements REST API's with axios, CRUD functionality, JSON, MVC design pattern, User Authentication using JWT and bcryptJS, MongoDB with mongoose, State Management using Context API, Styling of the UI with CSS, use of React libraries such as BrowserRouter, React-Router-Dom, Hooks, Bootstrap/Reactstrap and more. 

### Project Developer

**Shaker Kattoula - Full Stack Web Developer - shakerkattoula.com**

### Goal
* Manage and organize your company's budget to potentially improve sales and reduce costs.

### Phases
* Phase 1: Backend - MongoDB with express API and mongoose, Models, API routes, CRUD functionality.
* Phase 2: Frontend - React, UI design with CSS and Bootstrap/Reactstrap, connecting frontend to backend via axios.
* Phase 3: User Authentication - JSON Web Token(JWT), bcryptJS, form validations, error handling, auth middleware.
* Phase 4: Review - Debugging, refactoring, improvements, and documentation.
* Phase 5: Deployment - Prepare build and deploy to Heroku.

### User Stories
* As a user, I WANT to be able to register my own account with a name, email and password so that I can have access to my own personal budget tracker.
* As a user, I WANT to be able to log into my own account with my email and password.
* As a user, I WANT to be able to log out of my own account.
* As a user, I WANT to be able to create both income and expense transactions wherein each transaction item includes a name and amount, so that I can keep track of my budget.
* As a user, I WANT to be able to see a list of all of my income and expense transactions
* As a user, I WANT to be able to delete a single income or expense transaction.
* As a user, I WANT to be able to see a "balance" total that gets updated every time I submit an income or expense transaction.
* As a user, I WANT to be able to see individual amount totals for the income transaction and the expense transaction.

## Blockers and Challenges
1) One of the most challenging aspects of this project was properly connecting the frontend to the backend via axios http requests. For example, since the Schema in my Model contained both income and expense transaction items, the "GET_TRANSACTIONS" case in my AppReducer file was returning the payload for both the income and expense transaction items in both the income and expense transaction lists of the UI(does that make sense?). At first I wasn't sure how to deal with this issue so I had two ideas. The first idea was to create two seperate models called IncomeTransaction and ExpenseTransaction to house their individual schema's and then call their individual payloads from the AppReducer. However, I decided to go with my second idea which was quicker, and that was to add a filter inside of the "GET_TRANSACTIONS" case for both the income transaction and the expense transaction. This would still call the payload twice, but filtering out the expenses in the income transaction list and vice versa for the expense transaction list. 
2) Another blocker involving axios http requests was the delete functionality. The issue was that upon posting a transaction to one of the lists, clicking delete on the newly posted transaction would return a 404 error, as the console revealed a DELETE request with an undefined endpoint. It was only upon refreshing the page that the DELETE request would work. I eventually solved the issue by calling the "getTransactions" function (which GETs the data for the income and expense transaction lists from GlobalState) with the "useEffect" hook in the IncomeTransaction and ExpenseTransaction components. For some reason unbeknownst to me at my current level of understanding, initially posting an income or expense transaction would only return the "_id" of that transaction after refreshing the page. This was probably the biggest blocker I had on this project and I was actually stuck on it for about 3-4 days trying to resolve the issue, which I eventually did after a lot of trial and error, as well as just sheer determination to figure out at least some working solution. Although the solution took way longer than it needed to be for me to figure it out, I did learn a lot about myself, how I approach problems and go about finding solutions. This is the kind of stuff that drives my passion to code! I love encountering new challenges with code, I even welcome and embrace them because in my mind, they represent an opportunity to learn and to grow, to think outside of the box, to improve the brain's ability for critical thinking and to handle more complex information. I'm excited to learn more and reach new heights in web development!
3) One more notable challenge for me was styling the UI with CSS. I am especially eager to get good at CSS because of the very fact that it is actually hard to master! I took one full day during my sprint just to work on CSS, trying out different styles and aligning all of the content properly using Flex Box.

## Ways to Improve and Future Updates
1) Plenty of room for the code to be be refactored.
2) I still need to implement media queries to allow for responsiveness on all devices.
4) I didn't really feel the need to add the UPDATE functionality to this particular project because it's really easy to just delete a transaction and create a new one. However, just for the sake of implementing full CRUD features, I may return to this project in the near future to implement the UPDATE functionality which will allow a user to edit an existing transaction. 
5) Improving the UI with CSS styling. I'm happy with the simple design I was able to create from scratch with CSS, however, I'd like to improve upon this and make it look even better! 
