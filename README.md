# Evented
Fire and listen to events in TypeScript

#### Basic usage
###### On an Evented class instance
```typescript
obj.fire(eventName, eventArgs, eventTarget);
obj.on(eventName, listener);
obj.off(eventName, listener);
obj.listensTo(eventName);
```
###### Statically
```typescript
Evented.fire(eventName, eventArgs, eventTarget);
Evented.on(eventName, listener);
Evented.off(eventName, listener);
Evented.listensTo(eventName);
```

#### Usage example

```typescript
class User extends Evented {
  ...
}

var user = new User();

user.on("loggedIn", function(e){
  //Do something on user login
});

//Fire the event after authentication
user.fire("loggedIn");

Evented.on("userLoggedOut", function(e){
  //Do something on user logout
});

//Fire the event after user logout
Evented.fire("userLoggedOut");
```
