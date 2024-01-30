# Nest Blog API with JWT Auth
# Running the app
Make sure you have the Docker daemon running. You can use 
```
docker compose up
```
to start the API and MongoDB containers at the same time. Then, use Postman or your preferred API platform to start testing the project.
Try hitting 
```
POST localhost:3000/auth/signup 
with 
{
    "email": "mail@gmail.com",
    "password": "testing123",
    "name": "Testing Person 1"
}
```
Afterwards you can log in with a POST request with your email and password to /login.
```
POST localhost:3000/auth/login 
with 
{
    "email": "mail@gmail.com",
    "password": "testing123",
}
```
You can use the JWT token you receive after successfully logging in to edit the objects with required permissions. Just add the token to the header of your requests like:
```
Authorization: Bearer eyJhbGcio...
```
Then, explore the endpoints. Verify that
- Only blog owner can edit and delete blogs
- Only logged in users can comment under blog posts
  
You can hit  

```
localhost:3000/blogs?page=2
```
And so on to test pagination.


### TODO
- Increase test coverage 
- Integrate CI/CD
- Add slugs to blog posts and endpoints