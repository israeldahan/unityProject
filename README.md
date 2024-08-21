## Customer project 
### Create a simulation for a system to sell to customers and get their list of purchases and serve them with Kafka

There are 4 microservices to solve these challenges

1. Customer API - Backend for getting requests from the Frontend
2. Customer App - GUI for buying or getting a BuyList
3. Customer worker - worker for consuming the request and getting the data from database
4. WS app - WebSocket to consume the result from the worker and publish to subscribers 


used to in k3s on linux 
1. install kafka
~~~
helm install kafka ./kafka -n kafka --create-namespace
helm repo add kafka-ui https://provectus.github.io/kafka-ui-charts
helm install kafka-ui kafka-ui/kafka-ui -f kui/values
~~~

2. install mongo by mongo operator. 
~~~
  https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/docs/install-upgrade.md

  https://github.com/mongodb/mongodb-kubernetes-operator/blob/master/docs/deploy-configure.md
~~~

3. create User in mongo db on the database
~~~
db.createUser( { user: "my-user",
                 pwd: "password",  // Or  "<cleartext password>"
                 roles: [ { role: "clusterAdmin", db: "admin" },
                          { role: "readAnyDatabase", db: "admin" },
                          "readWrite"] },
               { w: "majority" , wtimeout: 5000 } )
~~~

4. Deploy the keda
~~~
helm install keda kedacore/keda --namespace keda --create-namespace
~~~
5. deploy 4 the services by helm 
~~~
helm install costumer-api ./customer-api/customer-api-chart/ -n app
helm install costumer-worker ./customer-worker/customer-worker-chart/ -n app
helm install costumer-app ./customer-app/customer-app-chart/ -n app
helm install ws-app ./ws-app/ws-app-chart/ -n app
~~~
