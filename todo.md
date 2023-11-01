[x] ======================== SETUP  
[x] Create Next.js app  
[x] Add remote to repo and push to github  
[x] Set up local database and document it into readme  
[x] Install drizzle and postgres  
[x] Using postgres and drizzle ORM create a database  
with a Tasks table with the following:

    columns: Id: serial,
    TaskName: varchar(255),
    TaskDescription: varchar(255),
    TaskCompleted: boolean,
    Created_at: timestamp

[x] Install bootstrap in Next.js app
[x] Add drizzle config file
[x] Install and Setup prettier, make sure it triggers on save

[x] ======================== UI Elements  
[x] Make task input component  
[x] Make task component

[x] ======================== API
Create following endpoints: look at stem proj + next docs
[x] POST/task  
[x] GET/tasks  
[x] UPDATE/task/[id]  
[x] DELETE/task/[id]

[x] ======================== App  
Create app with pages router that:
on load:  
[x] loads all tasks from database  
[x] displays task input component  
[x] displays task component for each task loaded from database

on user interaction:  
updates the database using the API when the user:  
[x] creates a task  
[x] deletes a task  
[x] updates a task

[ ] ======================== Test  
write e2e tests for:  
[ ] on load behavior  
[ ] on user create a task  
[ ] on user delete a task  
[ ] on user updates a task

write unit tests for:  
[ ] Task input component  
[ ] Task component

[ ] ======================== Deploy  
[ ] Deploy using vercel
