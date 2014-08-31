ASSIGNMENT:
Awards analyzer

DESCRIPTION:
The core of our product at ClassDojo is the awards that teachers give to students each day in class.  These awards are a unique source of data on student behavior, and we feel that substantial insight can be drawn from them.

To this end, we've created an API route that will return 3000 imaginary awards, split across 3 classes.  Your task is to do something interesting with this data.  If you're one of those front-end dudes, you could make a nice visualizer for the teacher to see how their classes are doing.  If you're more of a data-science gal, why not try some statistical analyses?  Or, feel free to surprise us!

For this assignment, we value clean code, creativity, an easy-to-use product, and a passable design sense (no need to spend hours getting it pixel perfect, but make things easy on the eyes).  Please return us either a URL of your deployed project or a folder with all required files and instructions to get set up.

TECHNICAL DESCRIPTION:

  * The 3000 awards will be returned as the JSON response to the URL "http://teach.classdojo.com/api/interviewChallenge".
  * The route includes CORS headers for all domains, so you should be able to access it from localhost.
  * The returned payload will change every hour, on the hour.
  * An optional "size" query parameter will return the given number of awards, but the maximum is 3000.
  * Some patterns and regularities have been hard-coded into the data.  See if you can find them :)
  * The schema of each award is as follows:
    - id: A unique id for each award.
    - classroom: The class (physics, biology, or chemistry) in which the award was given.
    - student: The recipient of the award.
    - date: The time the award was given.
    - behavior: The name of the behavior the award was given for.
    - weight: How many points the award was worth (positive for good behaviors, negative for bad behaviors).