Install k3s simple installation

Install kafka bitnami with

    helm install kafka ./kafka -n kafka --create-namespace

helm repo add kafka-ui https://provectus.github.io/kafka-ui-charts
helm install kafka-ui kafka-ui/kafka-ui -f kui/values.yaml

```

NAME: kafka
LAST DEPLOYED: Sun Aug 18 23:38:37 2024
NAMESPACE: kafka
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: kafka
CHART VERSION: 30.0.4
APP VERSION: 3.8.0

** Please be patient while the chart is being deployed **

Kafka can be accessed by consumers via port 9092 on the following DNS name from within your cluster:

    kafka.kafka.svc.cluster.local

Each Kafka broker can be accessed by producers via port 9092 on the following DNS name(s) from within your cluster:

    kafka-controller-0.kafka-controller-headless.kafka.svc.cluster.local:9092
    kafka-controller-1.kafka-controller-headless.kafka.svc.cluster.local:9092
    kafka-controller-2.kafka-controller-headless.kafka.svc.cluster.local:9092

To create a pod that you can use as a Kafka client run the following commands:

    kubectl run kafka-client --restart='Never' --image docker.io/bitnami/kafka:3.8.0-debian-12-r3 --namespace kafka --command -- sleep infinity
    kubectl exec --tty -i kafka-client --namespace kafka -- bash

    PRODUCER:
        kafka-console-producer.sh \
            --broker-list kafka-controller-0.kafka-controller-headless.kafka.svc.cluster.local:9092,kafka-controller-1.kafka-controller-headless.kafka.svc.cluster.local:9092,kafka-controller-2.kafka-controller-headless.kafka.svc.cluster.local:9092 \
            --topic test

    CONSUMER:
        kafka-console-consumer.sh \
            --bootstrap-server kafka.kafka.svc.cluster.local:9092 \
            --topic test \
            --from-beginning

WARNING: There are "resources" sections in the chart not set. Using "resourcesPreset" is not recommended for production. For production installations, please set the following values according to your workload needs:
  - controller.resources
+info https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
```

helm install customer-api ./customer-api/customer-api-chart/ -n app
helm install customer-worker customer-worker/customer-worker-chart/  -n app
helm install ws-app ws-app/ws-app-chart/ -n app
helm install customer-app ./customer-app/customer-app-chart -n app


helm repo add mongodb https://mongodb.github.io/helm-charts
helm install community-operator mongodb/community-operator --namespace mongodb-operator --create-namespac
helm install community-operator mongodb/community-operator --set operator.watchNamespace="mongodb"
kubectl create ns mongodb
kubectl apply -f mongodb/mongo.yaml -n mongodb


db.createUser( { user: "my-user",
                 pwd: "password",  // Or  "<cleartext password>"
                 roles: [ { role: "clusterAdmin", db: "admin" },
                          { role: "readAnyDatabase", db: "admin" },
                          "readWrite"] },
               { w: "majority" , wtimeout: 5000 } )


db.dropUser("my-user", {w: "majority", wtimeout: 5000})



NAME: keda
LAST DEPLOYED: Tue Aug 20 05:48:08 2024
NAMESPACE: keda
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
:::^.     .::::^:     :::::::::::::::    .:::::::::.                   .^.                  
7???~   .^7????~.     7??????????????.   :?????????77!^.              .7?7.                 
7???~  ^7???7~.       ~!!!!!!!!!!!!!!.   :????!!!!7????7~.           .7???7.                
7???~^7????~.                            :????:    :~7???7.         :7?????7.               
7???7????!.           ::::::::::::.      :????:      .7???!        :7??77???7.              
7????????7:           7???????????~      :????:       :????:      :???7?5????7.             
7????!~????^          !77777777777^      :????:       :????:     ^???7?#P7????7.            
7???~  ^????~                            :????:      :7???!     ^???7J#@J7?????7.           
7???~   :7???!.                          :????:   .:~7???!.    ~???7Y&@#7777????7.          
7???~    .7???7:      !!!!!!!!!!!!!!!    :????7!!77????7^     ~??775@@@GJJYJ?????7.         
7???~     .!????^     7?????????????7.   :?????????7!~:      !????G@@@@@@@@5??????7:        
::::.       :::::     :::::::::::::::    .::::::::..        .::::JGGGB@@@&7:::::::::        
                                                                      ?@@#~                  
                                                                      P@B^                   
                                                                    :&G:                    
                                                                    !5.                     
                                                                    .Kubernetes Event-driven Autoscaling (KEDA) - Application autoscaling made simple.

Get started by deploying Scaled Objects to your cluster:
    - Information about Scaled Objects : https://keda.sh/docs/latest/concepts/
    - Samples: https://github.com/kedacore/samples

Get information about the deployed ScaledObjects:
  kubectl get scaledobject [--namespace <namespace>]

Get details about a deployed ScaledObject:
  kubectl describe scaledobject <scaled-object-name> [--namespace <namespace>]

Get information about the deployed ScaledObjects:
  kubectl get triggerauthentication [--namespace <namespace>]

Get details about a deployed ScaledObject:
  kubectl describe triggerauthentication <trigger-authentication-name> [--namespace <namespace>]

Get an overview of the Horizontal Pod Autoscalers (HPA) that KEDA is using behind the scenes:
  kubectl get hpa [--all-namespaces] [--namespace <namespace>]

Learn more about KEDA:
- Documentation: https://keda.sh/
- Support: https://keda.sh/support/
- File an issue: https://github.com/kedacore/keda/issues/new/choose