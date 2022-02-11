npm run build -prod

heroku container:push web -a ecommus-aluka-v1
heroku container:release web -a ecommus-aluka-v1
