<?php
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
    }

    $db = new Mongo();

    $db->useDB("swift-code");
    $db->setCollection('swiftdata');
    $db->collection->insertOne( [ 'name' =>'Peter', 'email' =>'peter@abc.com' ] );  ;
    $record = $db->collection->find();
    // $count = $db->collection->countDocuments();
    // die("Count is: {$count}");
echo '<pre>';
    print_r($record->toArray());
