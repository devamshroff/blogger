package edu.ucla.cs144

import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import org.apache.spark.SparkConf
import scala.io.Source 

object FollowerCount {
  def main(args: Array[String]) {
    val conf = new SparkConf().setAppName("Follower Count")
    val sc = new SparkContext(conf)

    // original map approach -- failed
    // // attempting to create a map between user and followers
    // val myMap = scala.collection.mutable.Map[String, Array[String]]() 
    // Source.fromFile("twitter.edges").getLines.foreach {
    //     line => myMap += (line.split(":")(0) -> line.split(": ")(1).split(","))
    // }

    // Spark - MapReduce Approach
    val lines = sc.textFile("twitter.edges")
    val splitRdd = lines.map(line => line.split(":"))
    val yourRdd = splitRdd.flatMap( arr => {
      val user = arr(0)
      val followsList = arr(1)
      val followedUser = followsList.split(",")
      followedUser.map(followedUser => (followedUser, user))
    })
    
    // yourRdd.foreach({case (followedUser, user) => println( s"{ $followedUser, $user") })

    val countRdd = yourRdd.groupBy({
      case (followedUser, user) => followedUser
    }).map({
       case (user, iter) => (user, iter.size) 
    }).filter({
      case (user, count) => count > 1000
    })
    
    countRdd.saveAsTextFile("output-users")

    sc.stop()
  }
}