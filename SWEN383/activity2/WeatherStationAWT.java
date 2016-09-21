/*
 * Initial Author
 *      Michael J. Lutz
 *
 * Other Contributers
 *
 * Acknowledgements
 */

/*
 * Class for a simple computer based weather station that reports the current
 * temperature (in Celsius) every second. The station is attached to a
 * sensor that reports the temperature as a 16-bit number (0 to 65535)
 * representing the Kelvin temperature to the nearest 1/100th of a degree.
 *
 * This class is implements Runnable so that it can be embedded in a Thread
 * which runs the periodic sensing.
 */

public class WeatherStationAWT implements Runnable {

    private final KelvinTempSensor sensor ; // Temperature sensor.
    private final AWTUI awt ;
    private final long PERIOD = 1000 ;      // 1 sec = 1000 ms.

    /*
     * When a WeatherStation object is created, it in turn creates the sensor
     * object it will use.
     */
    public WeatherStationAWT() {
        sensor = new KelvinTempSensor() ;
        awt = new AWTUI();
       
        
    }

    /*
     * The "run" method called by the enclosing Thread object when started.
     * Repeatedly sleeps a second, acquires the current temperature from
     * its sensor, and reports this as a formatted output string.
     */
    public void run() {
        int reading ;           // actual sensor reading.
        double celsius ;        // sensor reading transformed to celsius
        double fahrenheit ;     // sensor reading transformed to fahrenheit
        
        final int KTOC = -27315 ;   // Convert raw Kelvin reading to Celsius
		  final int KTOF =  -45787 ;  //Convert raw Kelvin to Fahrenheit

        while( true ) {
            try {
                Thread.sleep(PERIOD) ;
            } catch (Exception e) {}    // ignore exceptions

            reading = sensor.reading() ;              //reading method returns temperature in raw kelvin
            celsius = (reading + KTOC) / 100.0 ;      //raw kelvin converted to celcius
            fahrenheit = (reading + KTOF) / 100.0;    //raw kelvin converted to fahrenheit 
            
            /*
             * System.out.printf prints formatted data on the output screen.
             *
             * Most characters print as themselves.
             *
             * % introduces a format command that usually applies to the
             * next argument of printf:
             *   *  %6.2f formats the "celsius" (2nd) argument in a field
             *      at least 6 characters wide with 2 fractional digits.
             *   *  The %n at the end of the string forces a new line
             *      of output.
             *   *  %% represents a literal percent character.
             *
             * See docs.oracle.com/javase/tutorial/java/data/numberformat.html
             * for more information on formatting output.
             */
            //Prints the temperature in celcius and kelvin            
            //System.out.printf("Reading is %6.2f degrees C and %6.2f degrees K%n", celsius,(reading/100.0)) ;
            
            //Update the public labels in AWTUI with readings
             awt.kelvinField.setText(String.valueOf(String.format("%6.2f",reading/100.0)));
             awt.celsiusField.setText(String.valueOf(String.format("%6.2f",celsius)));
            
        }
    }

    /*
     * Initial main method.
     *      Create the WeatherStation (Runnable).
     *      Embed the WeatherStation in a Thread.
     *      Start the Thread.
     */
    public static void main(String[] args) {
    
    	WeatherStationAWT ws = new WeatherStationAWT() ;
        Thread thread = new Thread(ws) ;
        thread.start() ;
    }
}
