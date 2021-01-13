# TrackNote

TrackNote is a small prototype application which keeps track of to-do tasks for a paticular user. It also enables to deactivate a note and also to reactivate back as and when required. It also allows user to search for a specific note among other notes in list with relevance to name, body, created/updated date etc.

## Technical Details

This prototype application has been developed using Angular10. It is a static application which uses Angular-in-memory-web-api for the CRUD Api calls of notes and authentication module. For state management of application, [NGRX10](https://ngrx.io/) has been used. For styling part, this application stick to traditional CSS styling.

## Prerequisites

The application has already a default user and few notes attached to the user. However, a new user can signup and login and create new notes. But since we have used Angular-in-memory-web-api, as a mock backend simulator, on every refresh of browser, the memory gets cleared and hence fall back to initial application state, which means if any user has signed up or created notes for that user, all data would be lost with refresh of browser.


## Steps to run the application locally

1. Clone/Download the project from github repository.
2. Install Node (mine was v12.18.3), Angular CLI(mine was 10.0.8).
3. Move to the cloned/downloaded folder via terminal. Once inside, run `npm install`.
4. Once packages are installed, run `ng serve`.
5. Head to `http://localhost:4200/login` via browser, and then Happy Notetracking!!

