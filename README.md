# App Login

admin email : admin@gmail.com
admin password: 1234

Register for user account to do other functionalities.

# Steps
 - cd app
 - npm install
 - npm run start
 - update .env.development.local with base URL
     REACT_APP_SERVER_BASE_URL=http://localhost:8000

 - cd server
 - composer update
 - php artisan migrate
 - php artisan db:seed
 - php artisan serve
