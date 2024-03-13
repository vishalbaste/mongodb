#Install MongoDB in Python: pip install pymongo
from pymongo import MongoClient
from pymongo.errors import PyMongoError

# Connect to MongoDB
try:
    client = MongoClient('mongodb://localhost:27017')
except PyMongoError as e:
    print("Error connecting to MongoDB:", e)
    exit()

# Select database
try:
    db = client['students']
except PyMongoError as e:
    print("Error selecting database:", e)
    exit()

# Select collection
try:
    collection = db['data']
except PyMongoError as e:
    print("Error selecting collection:", e)
    exit()

# Insert a document
def insert_document(data):
    try:
        result = collection.insert_one(data)
        print("Document inserted with ID:", result.inserted_id)
    except PyMongoError as e:
        print("Error inserting document:", e)

# Insert Many documents
def insert_many_documents(data):
    try:
        result = collection.insert_many(data)
        print("Documet Inserted Successfully",result.inserted_ids)
    except PyMongoError as e:
        print("Error while inserting many documents:",e)

# Search documents
def find_documents(filter = {},projection = {}):
    try:
        result = collection.find(filter,projection)
        for cursor in result:
            print(cursor)
    except PyMongoError as e:
        print("Error while inserting many documents:",e)

# Update a document
def update_document(filter, update):
    try:
        result = collection.update_one(filter, update)
        print("Matched", result.matched_count, "document(s)")
        print("Modified", result.modified_count, "document(s)")
    except PyMongoError as e:
        print("Error updating document:", e)
        

# Update a document
def update_many_document(filter, update):
    try:
        result = collection.update_many(filter, update)
        print("Matched", result.matched_count, "document(s)")
        print("Modified", result.modified_count, "document(s)")
    except PyMongoError as e:
        print("Error updating document:", e)

# Delete a document
def delete_document(filter):
    try:
        result = collection.delete_one(filter)
        print("Deleted", result.deleted_count, "document(s)")
    except PyMongoError as e:
        print("Error deleting document:", e)

# Delete a many document
def delete_many_document(filter):
    try:
        result = collection.delete_many(filter)
        print("Deleted", result.deleted_count, "document(s)")
    except PyMongoError as e:
        print("Error deleting document:", e)

#MongoDB + Python CRUD
        
#A. Insert Documents
"""
insert_document({"name": "Vishal", "age": 30, "city": "New York","taluka": "Dindori"})
insert_many_documents([
    {"name" : "Chetan","age":21,"city":"Nashik","taluka":"Dindori"},
    {"name" : "Yogesh","age":22,"city":"Nashik","taluka":"Dindori"},
    {"name" : "Jeevan","age":23,"city":"Nashik","taluka":"Dindori"},
])
"""

# B. Find Documents
# find_documents({"age": {"$gt":15}})

# C. Update Documnt
"""
update_document({"age":21},{"$set" : {"city": "Thane"}})
update_many_document({"taluka":"Mmbai"},{"$set":{"taluka":"Mumbai"}})
"""

# D. Delete Documents
"""
delete_document({"age":21})
delete_many_document({"age": {"$gt":10}})
"""