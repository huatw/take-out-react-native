# Take-out-react-native
## About
Take-out is a food ordering application, built with React-Native and Express. 

* [front end repo](https://github.com/huatw/take-out-react-native) 
* [back end repo](https://github.com/huatw/take-out-node)

## Functionalities
* User system, login/register/update profile
* GPS Tracking/Auth
* Restaurant recommendation lists by distance/price/rating/sale
* Food ordering, view/add to shopping cart/checkout
* Order history management
* Basic restaurant/order history searching
* Restaurant rating/saving
* Real time text messaging with restaurant manager
 
## Tech stacks
* **Front-end**
    * Building iOS/Android application with ```React-Native```
    * Routing with ```React-Navigation```
    * Styling with ```Styled-Component```
    * UI Component with ```React-Native-Element```
    * state management with [```React-Minimal-Context```](https://github.com/huatw/react-minimal-context)(new ```Context``` API)
* **Back-end**
    * Building Backend with ```Express```
    * Real time messaging with ```Socket.io```
    * type checking and inspection with ```Typescript```
    * Unit testing with ```Jest```
* **Database**
    * Building Scehmas with ```Mongo```
    * caching with ```Redis```
    * Custom query ```GraphQL```
* **Others**
    * CI with ```Travis```

see ```package.json``` for more libs.

## Todos/Improvements
* AsyncStorage
* More tests
* Profiling, optimize React rendering
* Refactoring, more React HOC
* more Service for Restaurant owner
* better Text Messaging 

## Usage
#### seeding
```bash
cd take-out-node
yarn install
yarn seed
```
##### default account
username: ```username1```
password: ```password1```

#### start graphql server
```bash
cd take-out-node
yarn dev
```

#### start websocket
```bash
cd take-out-node
yarn io
# websocket messaging through terminal
```

#### start client
```bash
cd take-out-react-native
yarn install
yarn ios
```
