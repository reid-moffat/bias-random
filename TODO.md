# TODO list

Congratulations, your package is almost ready! 🎉

## ⚙️ Package setup:

- In package.json, add the package description, author (your name(s)) and keywords
- Add you github repository URL to repository -> url in package.json, and issues page on that repo to 'bugs'
- Update LICENSE file with the year and your name (after copyright)
- Add any other files/folders you want git to ignore (e.g. IDE files) to the .gitignore file

## 🛠️ Working with your package:

- Add your source code to the src/ folder. You can use index.ts to export everything, then other files for 
  implementations
- Write comprehensive tests in the test/ folder. Files that end in .test.ts will be included automatically in tests
- The current setup builds the code into multiple file types (.cjs, .d.cts, .d.ts and .js) to allow for easy 
  importing for different node configurations by people who use your package. tsup will handle this 
  when you run ``npm run build``, minifying (reducing the size) of the code as much as possible - so you don't have 
  to worry about compatibility, writing in typescript is fine and your package can be used by plain js users
- To test, run ``npm run test``
- To lint, run ``npm run lint``
- If your package is ready to deploy, run ``npm run deployHelp`` and follow the steps provided

Note: You'll need to give permissions to the github token so it can make pull requests for changesets
