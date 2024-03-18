# Uol-teste

REST service that supports the management of a client database developed with Golang and UI service with React.

## 💻 Backend Required

* go version 1.20

## 🚀 Installing Client Manager

To install the Client Manager, follow the steps:

Linux, MacOS e Windows:
```
go mod tidy
```

## ☕ Using Client Manager by build file
On MacOs or Linux:
```
./main
```
On Windows:
```
./main
```

## ☕ Using Client Manager

To use Client Manager, follow the steps:

Run the rest server
```
make run
```

Now it is possible access the application by the port 8080, follow the exemple to list all clients:
 ```
localhost:8080/clients
 ```

## ☕ Testing Client Manager

To run all the unit tests, follow the step:

```
make test
```
## 💻 Frontend Required

* Node and npm

## 🚀 Installing Client Manager UI

To install the Client Manager UI, follow the steps:

Linux, MacOS e Windows:
```
npm i
```

## ☕ Using Client Manager UI by build file
Linux, MacOS e Windows:
```
npm run build
```

## ☕ Using Client Manager UI

To use Client Manager UI, follow the steps:

Run the rest server
```
npm run dev:host
```

Now it is possible access the application by the port 3090, follow the exemple:
 ```
localhost:3090/cliente
 ```

[⬆ back to top](#Client Manager)<br>