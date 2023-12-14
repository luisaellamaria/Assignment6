Assignment 6 Solution
---------------------

# Team Members

- Emma Kozmér
- Luisa Ella Maria

# GitHub link to your (forked) repository

- https://github.com/luisaellamaria/Assignment6.git

# Task 1

1. WebIDs of the group members

Ans:
- https://solid.interactions.ics.unisg.ch/emmas-pod/profile/card#me
- https://solid.interactions.ics.unisg.ch/luisaspoddie/profile/card#me


2. Group profile

Ans:
- https://solid.interactions.ics.unisg.ch/emmas-pod/10people


# Task 2

1. What command did you perform to get the group name from the WebId?

Ans: 

- The query is:
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?group WHERE {
  ?group foaf:member <https://solid.interactions.ics.unisg.ch/emmas-pod/profile/card#me> .
}


- Transformed to a Communica command:
comunica-sparql https://solid.interactions.ics.unisg.ch/emmas-pod/profile/card#me 'PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?group WHERE { ?group foaf:member <https://solid.interactions.ics.unisg.ch/emmas-pod/profile/card#me> . }'

Result:
[
{"group":"https://solid.interactions.ics.unisg.ch/emmas-pod/10people"}
]


2. Which command did you perform to get the group members from the WebId?

Ans:

- The query with link traversal is:
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT ?memberName
WHERE {
  SERVICE <https://solid.interactions.ics.unisg.ch/emmas-pod/10people> {
    <https://solid.interactions.ics.unisg.ch/emmas-pod/10people#group> foaf:member ?member .
    ?member foaf:name ?memberName .
  }
}


- Transformed to a Communica command:
comunica-sparql-link-traversal https://solid.interactions.ics.unisg.ch/emmas-pod/10people \
"PREFIX foaf: <http://xmlns.com/foaf/0.1/>
 SELECT ?memberName
 WHERE {
   SERVICE <https://solid.interactions.ics.unisg.ch/emmas-pod/10people> {
     <https://solid.interactions.ics.unisg.ch/emmas-pod/10people#group> foaf:member ?member .
     ?member foaf:name ?memberName .
   }
 }"

Result:
[
{"memberName":"\"Luisa Mueller\""},
{"memberName":"\"Emma Kozmer\""}
]

3. Which command did you performed to get the group members from the WebId without link traversal? Which result did you get? Is it correct?
 
Ans:

- The query without link traversal is:
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT ?memberName
WHERE {
  <https://solid.interactions.ics.unisg.ch/emmas-pod/10people#group> foaf:member ?member .
  ?member foaf:name ?memberName .
}



- Transformed to a Communica command:
comunica-sparql https://solid.interactions.ics.unisg.ch/emmas-pod/10people \
"PREFIX foaf: <http://xmlns.com/foaf/0.1/>
 SELECT ?memberName
 WHERE {
   <https://solid.interactions.ics.unisg.ch/emmas-pod/10people#group> foaf:member ?member .
   ?member foaf:name ?memberName .
 }"

Result:
[
{"memberName":"\"Luisa Mueller\""},
{"memberName":"\"Emma Kozmer\""}
]

Assumption: Link traversal is not necessary because all the required information (the names of the group members) is directly available in the RDF data located at https://solid.interactions.ics.unisg.ch/emmas-pod/10people.

