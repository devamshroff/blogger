package edu.ucla.cs144

import org.apache.spark.SparkContext
import org.apache.spark.SparkContext._
import org.apache.spark.SparkConf
import scala.io.Source 

object FollowerCount {
  def main(args: Array[String]) {
    val conf = new SparkConf().setAppName("Follower Count")
    val sc = new SparkContext(conf)

    // attempting to create a map between user and followers
    val myMap = scala.collection.mutable.Map[String, Array[String]]() 
    Source.fromFile("twitter.edges").getLines.foreach {
        line => myMap += (line.split(":")(0) -> line.split(": ")(1).split(","))
    }

    // alternative approach: just create a list of users and then count number of times it appeas in twitter.edges - 1

    // now getting counts for each user
    // for ((user,followers) <- myMap){
        
    // }

    val lines = sc.textFile("twitter.edges")
    val words = lines.flatMap(
      lines.split("\n").lines.split(":")(0) => 
        lines.split("\n").line.split(": ")(1).split(","))
    val word1s = words.map(word => (word, 1))
    val wordCounts = word1s.reduceByKey((a,b) => a+b)
    wordCounts.saveAsTextFile("output-users")

    sc.stop()
  }
}