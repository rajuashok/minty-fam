# DeMentha Members Registration App

## Developer Setup
### Clone, Install and Run
1. Simple clone this repo.
2. Run `npm install` to install all packages.
3. Run `npm run dev` to run locally in dev mode.
4. Visit the page at `localhost:3000`.

### Simple DB Setup (JSON file database)
When running the above, you'll noticed that your DB is already working. By default your app will use a JSON file as a backing database.

NOTE: This DB will get wiped and reset on every re-run of the app.

### Local MongoDB
If you want your local data to actually persist and feel more like a production environment you should setup your local Mongo DB server.
1. Install mongoDB
2. Create db `minty-fam`.
  Run `use minty-fam`.
3. Create collections:
```
db.createCollection(
  "user",
  {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email"],
        properties: {
          email: {
            bsonType: "string",
            pattern: "^.+@.+\.com$",
            description: "must be a string and a valid email address"
          }
        }
      }
    }
  }
)
```
4. Create a Unique Index on the email field of user collection.
```
db.user.createIndex( { "email": 1 }, { unique: true } )
```

5. Insert dummy data [WIP]
```
...
```

6. Check performance of a query and ensure the index is used.
```
db.user.find({ email: "email@email.com" }).explain("executionStats")
```