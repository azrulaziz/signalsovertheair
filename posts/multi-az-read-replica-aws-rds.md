---
title: 'Multi AZ & read replica on AWS RDS'
caption: 'Understanding what they are & their use case'
author: 'Azrul Aziz'
date: "2020-09-28"
tag: 'aws'
---
![alt text](/awsrdslogo.png "docs")

### **Multi AZ**

Multi AZ means replicating a database instance synchronously in another availability zone (datacenter).
AWS basically creates an exact copy of our database in standby and in a situation where our main database go down, the rds will simply flip the cname of our db instance to the standby instance. 

### **Read Replica**

Setting up read replica allow us to have a read-only copy of our rds. It replicate asynchronously from the primary database. We can have up to 5 copies of read replicas and each replica will have its own dns endpoint.

#### **Use case**

Both of them make copies of the main database. So how to determine which one should be implemented?
Well then we have to look at our use case. 


Imagine an application with a very read-heavy workload. Without spawning another database instance to handle the load, our primary database probably wouldnt survive and performance could be affected. That's where read replicas come in handy. By setting up multiple read-only db instances, we can elastically scales out beyond the constraint of a single database instance. Now the read-heavy traffic can be spread around a few database instance instead of just a single db. So if performance or scaling is the main criteria, implementing read-replica is a good way to achieve it.

Its possible to promote a read-replica db to become the primary db should we want to. However by doing that, the replication will no longer work and we have to setup the replication again for that newly promoted primary database. We can also launch the read replicas in another AZ or even in another region.

There may be cases where performance may not matter too much to a point where setting up read replicas is pretty much pointless. But if ensuring the availability of the data is crucial and we cannot afford the downtime while restoring from backup, then turning on multi-az is sensible. 

With multi-az, in case of failure to the primary db, aws will automatically point the rds dns endpoint to the backup instance located in another AZ without any intervention from us. This in turn minimizes the potential downtime of our application. We can also force a failover to another AZ by rebooting the primary db instance.

Its important to note that the multi-az instance is just a standby instance. Its intended usage is mainly for disaster recovery and not performance so we cannot utilize it to reduce the load on the primary db.

Obviously there are many other ways to improve performance or setting up for disaster recovery, but these are the two built-in features which we can easily utilize when we use AWS RDS.