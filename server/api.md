# Invites

## /api/invites/
get all invites if the user is an admin

## /api/invites/create
create an invite if the user is an admin

# Users

## /api/users/register
register a new user

## /api/users/login
login

## /api/users/:id
get user information from the id

## /api/users/updateEmail
update user email

## /api/users/updatePassword
update user password

# Files

## /api/files/
get user files

## /api/files/all
get all files if user is an admin

## /api/files/upload
upload a file

## /api/files/update/:id
update a file by id (only user's own files)

## /api/files/delete/:id
delete a file by id (only user's own files)

## /api/files/delete
delete all files (only user's own files)