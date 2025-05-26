
#!/bin/bash

sudo apt-get update

# INSTALLING JAVA 11
sudo apt-get install -y openjdk-11-jdk

# INSTALLING HADOOP 3.4.1 (download and decompression) 

HADOOP_DIR = "/home/diabd"
wget https://archive.apache.org/dist/hadoop/common/hadoop-3.4.1//hadoop-3.4.1.tar.gz
tar -xzf hadoop-*
mv hadoop-3.4.1 HADOOP_DIR
rm hadoop-3.4.1.tar.gz

# INSTALLING SPARK 3.5.5
SPARK_HOME = "/home/diabd"
wget https://archive.apache.org/dist/spark/spark-3.5.5/spark-3.5.5-bin-hadoop3.tgz
tar -xzf spark-*
mv spark-3.5.5-bin-hadoop3 SPARK_HOME
rm spark-3.5.5-bin-hadoop3..tgz

# INSTALLING NEO4J 4.1.12
curl -fsSL https://debian.neo4j.com/neotechnology.gpg.key |sudo gpg --dearmor -o /usr/share/keyrings/neo4j.gpg
echo "deb [signed-by=/usr/share/keyrings/neo4j.gpg] https://debian.neo4j.com stable 4.4" | sudo tee -a /etc/apt/sources.list.d/neo4j.list
sudo apt update
sudo apt install neo4j

# INSTALLING PYTHON MODULES
pip install notebook
pip install neo4j
