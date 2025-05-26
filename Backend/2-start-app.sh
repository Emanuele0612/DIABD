#!/bin/bash 

#START NEO4J
sudo service neo4j start

#OPEN APP 
file="../Frontend/index.html"
xdg-open "$file"
