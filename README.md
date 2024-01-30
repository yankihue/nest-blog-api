# Nest Blog API with JWT Auth
## Running the app
Make sure you have the Docker daemon running. You can use 
```
docker compose up
```
to start the API and MongoDB containers at the same time. Then, use Postman or your preferred API platform to start testing the project. You can follow these instructions to set up a basic secnario, or go to `http://localhost:3000/api/` for Swagger docs.

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

`POST localhost:3000/auth/login`

with 
```
{
    "email": "mail@gmail.com",
    "password": "testing123",
}
```
You can use the JWT token you receive after successfully logging in to edit the objects with required permissions. Just add the token to the header of your requests like:
```
Authorization: Bearer eyJhbGcio...
```
You can create blog posts with `POST localhost:3000/blogs` 
```
{
    "title": "Test Blog Post",
    "content": "This is the content of the blog post"
}
```
If you are logged in, you will be the author of the post. If not, there will be no author. 

You can test the pagination and custom page size queries with the example
 ```
GET localhost:3000/blogs?size=1&page=2 
```


 You can also search the titles with the query parameter `keyword`:

 ```
GET localhost:3000/blogs?keyword=TitleTest
 ```
After creating a few posts, explore the endpoints. Verify that
- Only blog owner can edit and delete blogs
- Only logged in users can comment under blog posts



### TODO
- Increase test coverage 
- Integrate CI/CD
- Add slugs to blog posts and endpoints
- Improve Swagger documentation
