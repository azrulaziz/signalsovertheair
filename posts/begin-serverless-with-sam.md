---
title: 'Begin serverless with SAM'
caption: 'Using Serverless Application Model(SAM) to start a serverless project on AWS'
author: 'Azrul Aziz'
tag: 'serverless'
---

The reason we need to create version for each function is to make deployment safer and rollback easier.
If we dont create function alias, everytime we deploy an update, the new function will replace the current version of the function with no history of past versions kept around.

With function versioning, each push will create a new version instead of replacing the old version. 
We create an alias to set which version of the function should be executed. 


Using SAM with the *AutoPublishAlias*, the alias will automatically point to the latest working version of a function everytime we deploy.
In case of the need of rollback, we can manually set the alias to point to the past version of a function, and all event sources will automatically execute that version. 

SAM can also automates the pointing of alias to previous version in case of any errors in the latest version by setting up CloudWatch and CodeDeploy.

```bash
brew install aws-sam-cli
```