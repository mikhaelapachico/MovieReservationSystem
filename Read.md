GETTING STARTED:
1. Clone Repository
2. Unzip Movies.zip folder as this contains the .bak file
3. Restore .bak file to MS Sql Server Management Studio (I Used SQL Server 13 if in any case a compatible issue will prevent the file from getting restored)
4. Once restored, open the api-project folder find the MovieReservation.sln and open on Visual Studio
5. Build project and install necessary nuget packages if needed.
6. Run the project and a console window will first show up followed by a chrome window showing a json formatted data obtained from the database.
7. Once the web api solution is up and running(note: just leave it running until testing for the project is done), open the angular-project solution in VS Code.
8. Make sure node and angular is installed on the system.
9. Open terminal on VS Code and navigate to the angular project. Install npm using the "npm install" command.
10. Enter "ng serve" and you will be prompted to go to http://localhost:4200/ on ur browser.
11. Site should now be up and CRUD transactions can be done.

The following are not part of the scope of this project due to time constraints and unforeseen development hurdles:
1. Images are not rendered properly.
2. The requirement on disabling ticket reservation when time already passed.
3. Clearing of all reservations made at once. 
