<?php

/**
 * Install mongodb in PHP use steps
 * Download .dll file from:- https://pecl.php.net/package/mongodb
 * Copy and Paste it in C:\xampp\php\ext\php_mongodb.dll
 * Add in php.ini -> extension=mongodb
 * Install Library -> composer require mongodb/mongodb
 */
    require 'vendor/autoload.php';
    use MongoDB\Client;

    class Mongo
    {
        public $con;
        public $db;
        public function __construct()
        {
            try
            {
                //Connect with Database
                $this->con = new Client('mongodb://localhost:27017');
            }
            catch (MongoDB\Driver\Exception\Exception $e)
            {
                // Handle MongoDB driver exceptions
                echo "MongoDB Exception: " . $e->getMessage();
            }
            catch(Exception $e)
            {
                // Handle other exceptions
                echo "Error: " . $e->getMessage();
            }
        }

        public function useDB($dbname)
        {
            // Creating / select Database  
            return $this->db = $this->con->$dbname;
            die($dbname);
        }
        
        public function setCollection($collection)
        {
            // Creating Document  
            return $this->collection = $this->db->$collection;  
        }

        public function insertDocument($data)
        {
            try
            {
                $result = $this->collection->insertOne($data);
                echo "Document inserted successfully with ID: " . $result->getInsertedId() . PHP_EOL;
            }
            catch (Exception $e)
            {
                echo "Error: " . $e->getMessage();
            }
        }

        public function insertManyDocuments($data)
        {
            try
            {
                $result = $this->collection->insertMany($data);
                echo "Inserted " . count($result->getInsertedIds()) . " document(s)" . PHP_EOL;
            }
            catch (Exception $e)
            {
                echo "Error: " . $e->getMessage();
            }
        }

        public function findDocuments($filter = [])
        {
            try
            {
                $cursor = $this->collection->find($filter);
                echo '<pre>';
                print_r($cursor->toArray());
            }
            catch (Exception $e)
            {
                echo "Error: " . $e->getMessage();
            }
        }

        public function updateDocument($filter, $update)
        {
            try
            {
                $result = $this->collection->updateOne($filter, $update);
                echo "Matched " . $result->getMatchedCount() . " document(s)" . PHP_EOL;
                echo "Modified " . $result->getModifiedCount() . " document(s)" . PHP_EOL;
            }
            catch (Exception $e)
            {
                echo "Error: " . $e->getMessage();
            }
        }
        
        public function updateManyDocument($filter, $update)
        {
            try
            {
                $result = $this->collection->updateMany($filter, $update);
                echo "Matched " . $result->getMatchedCount() . " document(s)" . PHP_EOL;
                echo "Modified " . $result->getModifiedCount() . " document(s)" . PHP_EOL;
            }
            catch (Exception $e)
            {
                echo "Error: " . $e->getMessage();
            }
        }

        public function deleteDocument($filter)
        {
            try
            {
                $result = $this->collection->deleteOne($filter);
                echo "Deleted " . $result->getDeletedCount() . " document(s)" . PHP_EOL;
            }
            catch (Exception $e)
            {
                echo "Error: " . $e->getMessage();
            }
        }
        
        public function deleteManyDocument($filter)
        {
            try
            {
                $result = $this->collection->deleteMany($filter);
                echo "Deleted " . $result->getDeletedCount() . " document(s)" . PHP_EOL;
            }
            catch (Exception $e)
            {
                echo "Error: " . $e->getMessage();
            }
        }
    }

    $db = new Mongo();

    $db->useDB("students");
    $db->setCollection('data');

    // $db->collection->insertOne( [ 'name' =>'Peter', 'email' =>'peter@abc.com' ] );  ;
    // $record = $db->collection->find();
    // $count = $db->collection->countDocuments();
    // die("Count is: {$count}");
// echo '<pre>';
    // print_r($record->toArray());


    #CRUD

    //A. Insert Documents
/*
    $db->insertDocument([
        'name'          =>      'Vishal Baste',
        'age'           =>      22,
        'designation'   =>      'Software Developer',
        'education'     =>      'MCA',
    ]);

    $db->insertManyDocuments([
        [
            'name'          =>      'Vishal Baste',
            'age'           =>      22,
            'designation'   =>      'Software Developer',
            'education'     =>      'MCA',
        ],
        [
            'name'          =>      'Chetan Baste',
            'age'           =>      20,
            'designation'   =>      'Student',
            'education'     =>      'B.Com',
        ],
        [
            'name'          =>      'Yogesh Gaikwad',
            'age'           =>      21,
            'designation'   =>      'VLE',
            'education'     =>      'Graduate',
        ]
    ]);
*/
    //B. Find Documents
    // $db->findDocuments();

    //C. Update Document
    /*
    $db->updateManyDocument(
        [
            'age'   =>  ['$gte'    =>  20]
        ],
        [
            '$set' => ['age' => 15]
        ]
    );

    $db->updateDocument(
        [
            'age'   =>  ['$gte'    =>  20]
        ],
        [
            '$set' => ['age' => 25]
        ]
    );
    */

    //D. Delete Documents
    /*
    $db->deleteDocument(['age' => ['$gt' => 24]]);
    $db->deleteManyDocument(['age' => ['$gte' => 15]]);
    */