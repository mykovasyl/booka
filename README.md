# booka

## Description

Booka is your personal recipe book wrapped neatly in a SPA. Random recipes can be fetched from the Spoonacular API to be added to your booka of recipes. If you have to have a few favorite recipes of your own, you can manually enter them into booka. All recipes can be rated on a 0 - 5 star scale for your future reference. Hope you enjoy your delicious meals!

Deployed application: https://booka.onrender.com

[Video walkthrough](https://youtu.be/syS3NQz1lzk): Updated version coming soon!

[Associated blog post](https://medium.com/@mykovasyl/adding-a-logo-react-36f0435cb6dc): a brief word about adding a logo

**Note on routing**: react-router-dom v6 was used. When changing front-end Routes, please double check your syntax. For more information, [check out this blog](https://blog.webdevsimplified.com/2022-07/react-router/)

## Future versions and application limitations

In future versions, sorting and filtering will be implemented for recipes inside your booka. There will be features added to reset your password (so don't forget it in the meantime) and find your username as well as a profile section where you can edit and update your personal information. 

At this time, fetching random recipes is restricted to the free version of Spoonacular. Some users may find the Random Recipe button not working due to the application hitting it's daily quote limit by other users. This will be fixed in upcoming versions so each user can fetch a specific number of recipes on a daily basis. 

## Cloning To Run Locally

The application is currently deployed with render. If you would like to run the application in localhost, do the following:

Start by **cloning** the application repository:

```console
$ git clone git@github.com:mykovasyl/phase-4-project-concert-goer.git your-project-name
```

Then, [create a new remote repository][create repo] on GitHub. Head to
[github.com](https://github.com) and click the **+** icon in the top-right
corner and follow the steps to create a new repository. **Important**: don't
check any of the options such as 'Add a README file', 'Add a .gitignore file',
etc. — since you're importing an existing repository, creating any of those
files on GitHub will cause issues.

[create repo]: https://docs.github.com/en/github/importing-your-projects-to-github/importing-source-code-to-github/adding-an-existing-project-to-github-using-the-command-line#adding-a-project-to-github-without-github-cli

Finally, connect the GitHub remote repository to your local repository and push
up your code:

```console
$ git remote add origin git@github.com:your-username/your-project-name.git
$ git push -u origin main
```
# Frontend set up: npm

## NPM install

Run 'npm install --prefix client' (or 'npm install' if you're in the /client directory) to install the package for the front end.

# Backend set up: migrations and seeding

## Migrations

To set up the database using migrations, run 'rails db:migrate'.

New migrations can be created using the rails generator 'rails g migration NAME_OF_MIGRATION'. Remember to use '--no-test-framework' at the end of a generator if you're not building out your own test code.

Note: New migrations should be used to make updates or changes to existing migrations and database tables. Using db:rollback can cause issues with the data currently stored. Only use rollback as a last resort.

If you make a mistake when creating the generator in CLI, run 'rails d migration NAME_OF_MIGRATION'

## Seeding

Run 'rails db:seed' to seed data. You'll need to create the data to be seeded in the db/seeds.rb file. Otherwise you can manually enter or randomly fetch recipes using the application.

If there are issues with the seed data and new data needs to be used, comment out the seed file and run 'rails db:reset' to drop and re-setup the DB.

# Starting the servers

You can use the following commands to run the application servers:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

Shut down servers with control+C.
