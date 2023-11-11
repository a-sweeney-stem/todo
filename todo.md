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

[x] ======================== Test  
error - 2 tasks - delete first = wrong showing
write e2e tests for:  
[x] on load behavior  
[x] on user create a task  
[x] on user delete a task  
[x] on user updates a task

do list below

write unit tests for:  
[ ] Task input component  
[ ] Task component

[ ] ======================== Deploy  
[ ] Deploy using vercel - might have issue because sq lite db [turso] = free tier

remove taskcompleted from input
fix - not saving task completed
empty input form when click submit
button -> add / hiding taskInput
add bootstrap styles to button
add error handling for api
use optimistic updates -> update when click add => add to local array => use useEffect on local array to sync with db
make Task dumb - pass in functionality to Home
add loading state -> use suspense / loading.tsx
add return types for APIs
add data validation (ZOD = option) examples in monorepo
change TaskInput name to TaskForm
add types for useState
add FE validation - on input and function
add return types for functions
add form labels - screen reader only (check on google) - accessible
React -bootstrap typed input - have a look at
prevent save when changed invalid
less verbose naming - names shouldn't reflect UI

v2 - research server actions
have a look at top level component = server component -> make Form component
react-hook-form

later
reusable inputs + atoms -> test at component level
