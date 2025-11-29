# Epoch

Epoch example`createAndPrintEpoch` method:

- `System.currentTimeMillis()/1000` gets current time in seconds since Unix epoch (Jan 1, 1970 UTC).

- `new SimpleDateFormat(...).format(new Date(epoch * 1000L))` converts epoch seconds back to a formatted date string.

- `SimpleDateFormat` uses pattern `"MM/dd/yyyy HH:mm:ss"` to format dates with month/day/year hour:minute:second.

- Parsing date with `SimpleDateFormat.parse(...)` converts formatted string to a Java `Date`, then `.getTime()` returns epoch in milliseconds.

- Dividing milliseconds by 1000L converts back to seconds.

- The parsing uses try-catch for `ParseException` to handle possible format errors.

- The method prints both current epoch and the epoch for a specified date string.

- Useful for converting between epoch seconds and human-readable date formats.



## Code example

```java
public static void createAndPrintEpoch() {

        long epoch = System.currentTimeMillis()/1000;

        System.out.println("Epoch 1: " + epoch);

        String date = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(new Date(epoch * 1000L));
        System.out.println("Creation Date epoch1 to date: " + date);

        try {
            long epoch2 = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse("01/02/1972 01:00:00").getTime() / 1000L;
            System.out.println("Epoch 2: " + epoch2);
        } catch (java.text.ParseException e) {
            System.err.println("Error parsing date: " + e.getMessage());
            e.printStackTrace();
        }
    }
```

```bash
/usr/lib/jvm/java-21-openjdk-amd64/bin/java -javaagent:/snap/intellij-idea-community/631/lib/idea_rt.jar=44703 -Dfile.encoding=UTF-8 -Dsun.stdout.encoding=UTF-8 -Dsun.stderr.encoding=UTF-8 -classpath /home/albert/MyProjects/Sandbox/rentingCarTest/rentingCar/target/classes:/home/albert/.m2/repository/com/github/javafaker/javafaker/1.0.2/javafaker-1.0.2.jar:/home/albert/.m2/repository/org/apache/commons/commons-lang3/3.5/commons-lang3-3.5.jar:/home/albert/.m2/repository/org/yaml/snakeyaml/1.23/snakeyaml-1.23-android.jar:/home/albert/.m2/repository/com/github/mifmif/generex/1.0.2/generex-1.0.2.jar:/home/albert/.m2/repository/dk/brics/automaton/automaton/1.11-8/automaton-1.11-8.jar org.example.App
Starting code...
Epoch 1: 1758797766
Creation Date epoch1 to date: 09/25/2025 12:56:06
Epoch 2: 63158400
Finished!

Process finished with exit code 0
```
